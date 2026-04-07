import { activeChat, chatThread, conversations } from "@/shared/lib/mock-data";

export default function ChatPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
      <section className="grid w-full gap-4 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-3xl border border-black/10 bg-white p-4">
          <h1 className="text-xl font-bold text-[#0d0c15]">Conversaciones</h1>
          <ul className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
            {conversations.map((chat) => (
              <li
                key={chat.name}
                className="min-w-[210px] rounded-2xl border border-black/10 px-3 py-2.5 hover:bg-[#f4f4f4] lg:min-w-0"
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
            <p className="text-sm font-semibold text-[#0d0c15]">{activeChat.contactName}</p>
            <p className="text-xs text-[#0d0c15]/65">{activeChat.state}</p>
          </div>

          <div className="flex-1 space-y-3 px-5 py-4">
            {chatThread.map((message, index) => {
              const isCompany = message.by === "empresa";
              return (
                <div
                  key={message.text + index}
                  className={`flex ${isCompany ? "justify-start" : "justify-end"}`}
                >
                  <p
                    className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm sm:max-w-[72%] ${
                      isCompany
                        ? "bg-[#f4f4f4] text-[#0d0c15]"
                        : "bg-[#c1b8ff] text-[#0d0c15]"
                    }`}
                  >
                    {message.text}
                    <span className="mt-1 block text-[10px] opacity-70">{message.at}</span>
                  </p>
                </div>
              );
            })}
          </div>

          <form className="flex flex-col gap-2 border-t border-black/10 p-4 sm:flex-row">
            <input
              placeholder="Escribe tu mensaje..."
              className="flex-1 rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none ring-[#c1b8ff] focus:ring-2"
            />
            <button
              type="button"
              className="rounded-xl bg-[#0d0c15] px-4 py-2.5 text-sm font-semibold text-white sm:w-auto"
            >
              Enviar
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}
