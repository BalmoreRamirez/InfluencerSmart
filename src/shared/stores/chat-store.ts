import { create } from "zustand";
import {
  createRoomId,
  disconnectChatSocket,
  joinChatRoom,
  leaveChatRoom,
  onSocketStatusChange,
  sendChatMessage,
} from "@/shared/services/chat-socket";
import {
  subscribeChatMessages,
  subscribeUserConversations,
} from "@/shared/services/firebase-chat-service";
import {
  fetchConversationsViaApi,
  fetchMessagesViaApi,
  markConversationReadViaApi,
  sendMessageViaApi,
} from "@/shared/services/chat-api-service";

type ChatRole = "influencer" | "empresa";

type ChatMessage = {
  by: ChatRole;
  senderName: string;
  senderProfileImage: string;
  text: string;
  at: string;
};

type ConversationItem = {
  id: string;
  contactId: string;
  name: string;
  last: string;
  unread: number;
};

const EMPTY_THREAD: ChatMessage[] = [];
const EMPTY_CONVERSATIONS: ConversationItem[] = [];

let stopConversationsListener: (() => void) | null = null;
let stopMessagesListener: (() => void) | null = null;
let stopSocketStatusListener: (() => void) | null = null;
let stopConversationsPoll: (() => void) | null = null;
let stopMessagesPoll: (() => void) | null = null;
let activeMessagesChannelId: string | null = null;

function mergeConversationsPreservingActive(
  mapped: ConversationItem[],
  state: Pick<ChatState, "conversations" | "activeConversationId">
) {
  if (!state.activeConversationId) return mapped;

  const activeInMapped = mapped.some((item) => item.id === state.activeConversationId);
  if (activeInMapped) return mapped;

  const activeFromState = state.conversations.find((item) => item.id === state.activeConversationId);
  if (!activeFromState) return mapped;

  return [activeFromState, ...mapped];
}

type ChatState = {
  chatThread: ChatMessage[];
  message: string;
  sending: boolean;
  connected: boolean;
  currentUserId: string | null;
  currentUserName: string | null;
  currentUserRole: ChatRole | null;
  conversations: ConversationItem[];
  activeConversationId: string | null;
  activeContactName: string | null;
  startConversation: (params: { contactId: string; contactName: string }) => Promise<void>;
  setActiveConversation: (conversationId: string) => void;
  initializeChat: (params: { userId: string; userName: string; role: ChatRole }) => void;
  disconnectChat: () => void;
  setMessage: (value: string) => void;
  sendMessage: () => void;
  resetThread: () => void;
};

export const useChatStore = create<ChatState>((set, get) => ({
  chatThread: EMPTY_THREAD,
  message: "",
  sending: false,
  connected: false,
  currentUserId: null,
  currentUserName: null,
  currentUserRole: null,
  conversations: EMPTY_CONVERSATIONS,
  activeConversationId: null,
  activeContactName: null,
  startConversation: async ({ contactId, contactName }) => {
    const { currentUserId, currentUserName, currentUserRole } = get();
    if (!currentUserId || !currentUserName || !currentUserRole) return;

    const normalizedContactId = contactId.trim();
    const normalizedContactName = contactName.trim();
    if (!normalizedContactId || !normalizedContactName) return;

    const chatId = createRoomId(currentUserId, normalizedContactId);

    set((state) => {
      const exists = state.conversations.some((item) => item.id === chatId);
      if (exists) return state;

      return {
        conversations: [
          {
            id: chatId,
            contactId: normalizedContactId,
            name: normalizedContactName,
            last: "",
            unread: 0,
          },
          ...state.conversations,
        ],
      };
    });

    get().setActiveConversation(chatId);
  },
  setActiveConversation: (conversationId) => {
    set((state) => {
      const selected = state.conversations.find((item) => item.id === conversationId);
      const updated = state.conversations.map((item) =>
        item.id === conversationId ? { ...item, unread: 0 } : item
      );

      if (!selected || !state.currentUserId || !state.currentUserRole) {
        return {
          activeConversationId: conversationId,
          activeContactName: selected?.name ?? null,
          conversations: updated,
        };
      }

      if (activeMessagesChannelId === conversationId) {
        return {
          activeConversationId: conversationId,
          activeContactName: selected.name,
          conversations: updated,
        };
      }

      stopMessagesListener?.();
      stopMessagesPoll?.();
      stopMessagesListener = null;
      stopMessagesPoll = null;
      activeMessagesChannelId = conversationId;

      const roomId = createRoomId(state.currentUserId, selected.contactId);
      leaveChatRoom(roomId);
      joinChatRoom({ roomId, userId: state.currentUserId, role: state.currentUserRole });

      stopMessagesListener = subscribeChatMessages(
        conversationId,
        state.currentUserId,
        state.currentUserRole,
        (rows) => {
          set({
            chatThread: rows.map((item) => ({
              by: item.by,
              senderName: item.senderName,
              senderProfileImage: item.senderProfileImage,
              text: item.text,
              at: item.at,
            })),
          });
        },
        () => {
          const loadMessages = async () => {
            const rows = await fetchMessagesViaApi(conversationId, state.currentUserRole!, 40);
            set({
              chatThread: rows.map((item) => ({
                by: item.by,
                senderName: item.senderName,
                senderProfileImage: item.senderProfileImage,
                text: item.text,
                at: item.at,
              })),
            });
          };

          loadMessages().catch(() => undefined);
          const timer = setInterval(() => {
            loadMessages().catch(() => undefined);
          }, 15000);
          stopMessagesPoll = () => clearInterval(timer);
        }
      );

      markConversationReadViaApi(conversationId).catch(() => undefined);

      return {
        activeConversationId: conversationId,
        activeContactName: selected.name,
        chatThread: EMPTY_THREAD,
        conversations: updated,
      };
    });
  },
  initializeChat: ({ userId, userName, role }) => {
    if (get().currentUserId === userId && stopConversationsListener) return;

    stopConversationsListener?.();
    stopMessagesListener?.();
    stopSocketStatusListener?.();
    stopConversationsPoll?.();
    stopMessagesPoll?.();

    set({
      currentUserId: userId,
      currentUserName: userName,
      currentUserRole: role,
      chatThread: EMPTY_THREAD,
      activeConversationId: null,
      activeContactName: null,
      message: "",
      conversations: EMPTY_CONVERSATIONS,
    });

    stopSocketStatusListener = onSocketStatusChange((connected) => {
      set({ connected });
    });

    stopConversationsListener = subscribeUserConversations(userId, (rows) => {
      const mapped: ConversationItem[] = rows.map((item) => ({
        id: item.chatId,
        contactId: item.contactId,
        name: item.contactName,
        last: item.last,
        unread: item.unread,
      }));

      set((state) => {
        const merged = mergeConversationsPreservingActive(mapped, state);
        if (merged.length === 0) {
          return {
            conversations: EMPTY_CONVERSATIONS,
            activeConversationId: null,
            activeContactName: null,
            chatThread: EMPTY_THREAD,
          };
        }

        const stillExists = state.activeConversationId
          ? merged.some((item) => item.id === state.activeConversationId)
          : false;

        const nextActiveId = stillExists ? state.activeConversationId : merged[0].id;
        const nextActive = merged.find((item) => item.id === nextActiveId) ?? merged[0];

        return {
          conversations: merged,
          activeConversationId: nextActive.id,
          activeContactName: nextActive.name,
        };
      });

      const nextActiveId = get().activeConversationId;
      if (nextActiveId && nextActiveId !== activeMessagesChannelId) {
        get().setActiveConversation(nextActiveId);
      }
    },
    () => {
      const loadConversations = async () => {
        const rows = await fetchConversationsViaApi();
        const mapped: ConversationItem[] = rows.map((item) => ({
          id: item.chatId,
          contactId: item.contactId,
          name: item.contactName,
          last: item.last,
          unread: item.unread,
        }));

        set((state) => {
          const merged = mergeConversationsPreservingActive(mapped, state);
          if (merged.length === 0) {
            return {
              conversations: EMPTY_CONVERSATIONS,
              activeConversationId: null,
              activeContactName: null,
              chatThread: EMPTY_THREAD,
            };
          }

          const stillExists = state.activeConversationId
            ? merged.some((item) => item.id === state.activeConversationId)
            : false;

          const nextActiveId = stillExists ? state.activeConversationId : merged[0].id;
          const nextActive = merged.find((item) => item.id === nextActiveId) ?? merged[0];

          return {
            conversations: merged,
            activeConversationId: nextActive.id,
            activeContactName: nextActive.name,
          };
        });

        const nextActiveId = get().activeConversationId;
        if (nextActiveId && nextActiveId !== activeMessagesChannelId) {
          get().setActiveConversation(nextActiveId);
        }
      };

      loadConversations().catch(() => undefined);
      const timer = setInterval(() => {
        loadConversations().catch(() => undefined);
      }, 15000);
      stopConversationsPoll = () => clearInterval(timer);
    });

    fetchConversationsViaApi()
      .then((rows) => {
        const mapped: ConversationItem[] = rows.map((item) => ({
          id: item.chatId,
          contactId: item.contactId,
          name: item.contactName,
          last: item.last,
          unread: item.unread,
        }));

        set((state) => {
          const merged = mergeConversationsPreservingActive(mapped, state);
          if (merged.length === 0) {
            return state;
          }

          const stillExists = state.activeConversationId
            ? merged.some((item) => item.id === state.activeConversationId)
            : false;

          const nextActiveId = stillExists ? state.activeConversationId : merged[0].id;
          const nextActive = merged.find((item) => item.id === nextActiveId) ?? merged[0];

          return {
            conversations: merged,
            activeConversationId: nextActive.id,
            activeContactName: nextActive.name,
          };
        });

        const nextActiveId = get().activeConversationId;
        if (nextActiveId && nextActiveId !== activeMessagesChannelId) {
          get().setActiveConversation(nextActiveId);
        }
      })
      .catch(() => undefined);
  },
  disconnectChat: () => {
    const currentUserId = get().currentUserId;
    const currentContactId = get().conversations.find((item) => item.id === get().activeConversationId)
      ?.contactId;

    if (currentUserId && currentContactId) {
      leaveChatRoom(createRoomId(currentUserId, currentContactId));
    }

    stopConversationsListener?.();
    stopMessagesListener?.();
    stopSocketStatusListener?.();
    stopConversationsPoll?.();
    stopMessagesPoll?.();
    stopConversationsListener = null;
    stopMessagesListener = null;
    stopSocketStatusListener = null;
    stopConversationsPoll = null;
    stopMessagesPoll = null;
    activeMessagesChannelId = null;
    disconnectChatSocket();

    set({
      currentUserId: null,
      currentUserName: null,
      currentUserRole: null,
      connected: false,
      sending: false,
      chatThread: EMPTY_THREAD,
      message: "",
      conversations: EMPTY_CONVERSATIONS,
      activeConversationId: null,
      activeContactName: null,
    });
  },
  setMessage: (value) => set({ message: value }),
  sendMessage: async () => {
    const {
      message,
      sending,
      activeConversationId,
      conversations,
      currentUserId,
      currentUserName,
      currentUserRole,
    } = get();
    if (!message.trim() || sending) return;
    if (!activeConversationId || !currentUserId || !currentUserRole || !currentUserName) return;

    const activeConversation = conversations.find((item) => item.id === activeConversationId);
    if (!activeConversation) return;

    const roomId = createRoomId(currentUserId, activeConversation.contactId);

    set({ sending: true });

    try {
      const apiResult = await sendMessageViaApi({
        chatId: activeConversationId,
        contactId: activeConversation.contactId,
        contactName: activeConversation.name,
        text: message.trim(),
      });

      await sendChatMessage({
        roomId,
        senderId: currentUserId,
        senderRole: currentUserRole,
        text: message.trim(),
      }).catch(() => undefined);

      set((state) => ({
        message: "",
        sending: false,
        activeConversationId: apiResult.chatId,
        activeContactName: apiResult.contactName,
        conversations: state.conversations.map((item) =>
          item.id === activeConversationId || item.id === apiResult.chatId
            ? { ...item, id: apiResult.chatId, contactId: apiResult.contactId, name: apiResult.contactName, last: message.trim() }
            : item
        ),
      }));
    } catch (error) {
      const failedMessage: ChatMessage = {
        by: currentUserRole,
        senderName: "Sistema",
        senderProfileImage: "",
        text: error instanceof Error ? `Error: ${error.message}` : "No se pudo enviar el mensaje. Reintenta.",
        at: "--:--",
      };

      set((state) => ({
        chatThread: [...state.chatThread, failedMessage],
        sending: false,
      }));
    }
  },
  resetThread: () =>
    set({
      chatThread: EMPTY_THREAD,
      message: "",
      sending: false,
      connected: false,
      conversations: EMPTY_CONVERSATIONS,
      activeConversationId: null,
      activeContactName: null,
    }),
}));
