"use client";

import { FormEvent } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AuthenticatedRoute } from "@/shared/components/auth/authenticated-route";
import { useChatStore } from "@/shared/stores/chat-store";
import { useAuthStore } from "@/shared/stores/auth-store";

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
  const startConversation = useChatStore((state) => state.startConversation);
  const setMessage = useChatStore((state) => state.setMessage);
  const setActiveConversation = useChatStore((state) => state.setActiveConversation);
  const sendMessage = useChatStore((state) => state.sendMessage);
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
    const contactId = searchParams.get("contactId")?.trim();
    const contactName = searchParams.get("contactName")?.trim();
    if (!session || !contactId || !contactName) return;

    startConversation({ contactId, contactName }).catch(() => undefined);
  }, [searchParams, session, startConversation]);

  function handleSendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
      <section className="grid w-full gap-4 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-3xl border border-black/10 bg-white p-4">
          <h1 className="text-xl font-bold text-[#0d0c15]">Conversaciones</h1>
          {conversations.length === 0 ? (
            <p className="mt-4 rounded-2xl border border-dashed border-black/15 px-3 py-4 text-sm text-[#0d0c15]/65">
              Aun no tienes conversaciones. Inicia una desde un perfil para comenzar a chatear.
            </p>
          ) : null}
          <ul className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
            {conversations.map((chat) => (
              <li
                key={chat.id}
                onClick={() => setActiveConversation(chat.id)}
                className={`min-w-[210px] cursor-pointer rounded-2xl border px-3 py-2.5 lg:min-w-0 ${
                  activeConversationId === chat.id
                    ? "border-[#0d0c15]/25 bg-[#f4f4f4]"
                    : "border-black/10 hover:bg-[#f4f4f4]"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[#0d0c15]">{chat.name}</p>
                  {chat.unread > 0 ? (
                    <span className="rounded-full bg-[#fed97b] px-2 py-0.5 text-xs font-bold text-[#0d0c15]">
                      {chat.unread}
                    </span>
                  ) : null}
                </div>
                <p className="mt-0.5 truncate text-xs text-[#0d0c15]/70">{chat.last}</p>
              </li>
            ))}
          </ul>
        </aside>

        <article className="flex min-h-[430px] flex-col rounded-3xl border border-black/10 bg-white sm:min-h-[520px]">
          <div className="border-b border-black/10 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#0d0c15]">{activeContactName ?? "Sin conversacion activa"}</p>
                <p className="text-xs text-[#0d0c15]/65">Negociacion activa</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  connected
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {connected ? "Socket conectado" : "Conectando..."}
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {chatThread.length === 0 ? (
              <p className="text-sm text-[#0d0c15]/60">No hay mensajes en esta conversacion.</p>
            ) : null}
            {chatThread.map((msg, index) => {
              const isCompany = msg.by === "empresa";
              return (
                <div
                  key={msg.text + index}
                  className={`flex ${isCompany ? "justify-start" : "justify-end"}`}
                >
                  <p
                    className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm sm:max-w-[72%] ${
                      isCompany
                        ? "bg-[#f4f4f4] text-[#0d0c15]"
                        : "bg-[#c1b8ff] text-[#0d0c15]"
                    }`}
                  >
                    {msg.text}
                    <span className="mt-1 block text-[10px] opacity-70">{msg.at}</span>
                  </p>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSendMessage} className="flex flex-col gap-2 border-t border-black/10 p-4 sm:flex-row">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              disabled={sending || !activeContactName}
              className="flex-1 rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none ring-[#c1b8ff] focus:ring-2 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!activeContactName || !message.trim() || sending}
              className="rounded-xl bg-[#0d0c15] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1f1c30] disabled:opacity-50 sm:w-auto"
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
