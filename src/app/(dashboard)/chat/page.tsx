"use client";

import { FormEvent } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { AuthenticatedRoute } from "@/shared/components/auth/authenticated-route";
import { useChatStore } from "@/features/chat/stores/chat-store";
import { useAuthStore } from "@/features/auth/stores/auth-store";

function ChatPageContent() {
  const searchParams = useSearchParams();
  const session = useAuthStore((state) => state.session);
  const chatThread = useChatStore((state) => state.chatThread);
  const message = useChatStore((state) => state.message);
  const sending = useChatStore((state) => state.sending);
  const connected = useChatStore((state) => state.connected);
  const conversations = useChatStore((state) => state.conversations);
  const activeConversationId = useChatStore((state) => state.activeConversationId);
  const activeContactName = useChatStore((state) => state.activeContactName);
  const setMessage = useChatStore((state) => state.setMessage);
  const setActiveConversation = useChatStore((state) => state.setActiveConversation);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const startConversation = useChatStore((state) => state.startConversation);
  const initializeChat = useChatStore((state) => state.initializeChat);
  const disconnectChat = useChatStore((state) => state.disconnectChat);

  useEffect(() => {
    if (!session) return;

    initializeChat({
      userId: session.uid,
      userName: session.username,
      role: session.role,
    });

    return () => {
      disconnectChat();
    };
  }, [disconnectChat, initializeChat, session]);

  useEffect(() => {
    if (!session || session.role !== "empresa") return;

    const contactId = searchParams.get("contactId")?.trim();
    const contactName = searchParams.get("contactName")?.trim();
    if (!contactId || !contactName) return;

    startConversation({ contactId, contactName }).catch(() => undefined);
  }, [searchParams, session, startConversation]);

  async function handleSendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!activeConversationId && session?.role === "empresa") {
      const contactId = searchParams.get("contactId")?.trim();
      const contactName = searchParams.get("contactName")?.trim();
      if (contactId && contactName) {
        await startConversation({ contactId, contactName }).catch(() => undefined);
      }
    }
    sendMessage();
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
      <section className="grid w-full gap-4 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-3xl border border-[#5d7932]/18 bg-white p-4">
          <h1 className="text-xl font-bold text-[#0c1117]">Conversaciones</h1>
          <ul className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
            {conversations.map((chat) => (
              <li
                key={chat.name}
                onClick={() => setActiveConversation(chat.id)}
                className={`min-w-[210px] cursor-pointer rounded-2xl border px-3 py-2.5 lg:min-w-0 ${
                  activeContactName === chat.name
                    ? "border-[#0c1117]/25 bg-[#edf4ea]"
                    : "border-[#5d7932]/18"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[#0c1117]">{chat.name}</p>
                  {chat.unread > 0 ? (
                    <span className="rounded-full bg-[#d8ff85] px-2 py-0.5 text-xs font-bold text-[#0c1117]">
                      {chat.unread}
                    </span>
                  ) : null}
                </div>
                <p className="mt-0.5 truncate text-xs text-[#0c1117]/70">{chat.last}</p>
              </li>
            ))}
          </ul>
        </aside>

        <article className="flex min-h-[430px] flex-col rounded-3xl border border-[#5d7932]/18 bg-white sm:min-h-[520px]">
          <div className="border-b border-[#5d7932]/18 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#0c1117]">
                  {activeContactName ?? searchParams.get("contactName") ?? "Selecciona una conversación"}
                </p>
                <p className="text-xs text-[#0c1117]/65">Negociacion activa</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  connected
                    ? "bg-[#42d87f]/22 text-[#5d7932]"
                    : "bg-[#d8ff85]/35 text-[#5d7932]"
                }`}
              >
                {connected ? "Socket conectado" : "Conectando..."}
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {chatThread.map((msg, index) => {
              const isCompany = msg.by === "empresa";
              return (
                <div
                  key={msg.text + index}
                  className={`flex items-end gap-2 ${isCompany ? "justify-start" : "justify-end"}`}
                >
                  {isCompany ? (
                    <Image
                      src={msg.senderProfileImage || "/avatars/company-example.svg"}
                      alt={`Avatar de ${msg.senderName}`}
                      width={30}
                      height={30}
                      className="h-7 w-7 rounded-full border border-[#5d7932]/18 object-cover"
                    />
                  ) : null}
                  <p
                    className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm sm:max-w-[72%] ${
                      isCompany
                        ? "bg-[#edf4ea] text-[#0c1117]"
                        : "bg-[#c0e2ff] text-[#0c1117]"
                    }`}
                  >
                    <span className="block text-[11px] font-semibold opacity-80">{msg.senderName}</span>
                    {msg.text}
                    <span className="mt-1 block text-[10px] opacity-70">{msg.at}</span>
                  </p>
                  {!isCompany ? (
                    <Image
                      src={msg.senderProfileImage || "/avatars/influencer-example.svg"}
                      alt={`Avatar de ${msg.senderName}`}
                      width={30}
                      height={30}
                      className="h-7 w-7 rounded-full border border-[#5d7932]/18 object-cover"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSendMessage} className="flex flex-col gap-2 border-t border-[#5d7932]/18 p-4 sm:flex-row">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              disabled={sending}
              className="flex-1 rounded-xl border border-[#5d7932]/24 px-3 py-2.5 text-sm outline-none ring-[#c0e2ff] focus:ring-2 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!message.trim() || sending}
              className="rounded-xl btn-primary px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50 sm:w-auto"
            >
              {sending ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}

export default function ChatPage() {
  return (
    <AuthenticatedRoute>
      <ChatPageContent />
    </AuthenticatedRoute>
  );
}
