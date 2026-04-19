import { useState } from "react";
import { X, Sparkles, Send, ChevronDown } from "lucide-react";

const QUICK_PROMPTS = [
  "How is my resume scoring?",
  "Show my upcoming interviews",
  "Which tests are due?",
  "Give me job recommendations",
];

const AIRA_RESPONSES: Record<string, string> = {
  "How is my resume scoring?":
    "Your resume is at 85% match score! 🎯 I found a few improvements: add more action verbs in your experience section and include keywords like 'React', 'TypeScript', and 'API integration' to boost your ATS score.",
  "Show my upcoming interviews":
    "You have 3 upcoming interviews:\n• Apr 14 — Voice Interview at TechHive (Live!)\n• Apr 18 — Technical Discussion at NovaSoft\n• Apr 22 — HR Interview at CreativeBase",
  "Which tests are due?":
    "2 tests need your attention:\n• JavaScript Fundamentals (Due Apr 13 — Urgent! ⚠️)\n• React & Hooks Assessment (Due Apr 16)\nStart the urgent one first to stay on track!",
  "Give me job recommendations":
    "Based on your 87% skill match, I recommend:\n• Frontend Developer at TechHive Solutions\n• React Engineer at NovaSoft Inc.\n• UI/UX Developer at CreativeBase\nWant me to prepare your application for any of these?",
};

interface Message {
  role: "ai" | "user";
  text: string;
}

export function AiraAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hi! I'm AIRA 👋 Your AI recruitment assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply =
        AIRA_RESPONSES[text] ||
        "Great question! I'm analysing your profile and will have insights ready shortly. In the meantime, check your Dashboard for a full overview of your job search progress.";
      setMessages((m) => [...m, { role: "ai", text: reply }]);
      setTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div className="w-80 bg-white rounded-2xl shadow-2xl border border-[#6750a4]/20 overflow-hidden flex flex-col"
          style={{ height: 420 }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-[#6750a4] to-[#8b6bc4] px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="relative size-8 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles size={15} className="text-white" />
              <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-green-400 border border-white animate-pulse" />
            </div>
            <div>
              <p className="text-white text-sm font-bold">AIRA Assistant</p>
              <p className="text-white/60 text-[10px]">AI-powered · Always available</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-white/60 hover:text-white transition-colors"
            >
              <ChevronDown size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-[#fafafc]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "ai" && (
                  <div className="size-6 rounded-full bg-gradient-to-br from-[#6750a4] to-[#a78bfa] flex items-center justify-center shrink-0 mr-2 mt-0.5">
                    <Sparkles size={10} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                    m.role === "user"
                      ? "bg-[#6750a4] text-white rounded-br-sm"
                      : "bg-white border border-gray-100 text-gray-700 rounded-bl-sm shadow-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-gradient-to-br from-[#6750a4] to-[#a78bfa] flex items-center justify-center shrink-0">
                  <Sparkles size={10} className="text-white" />
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-3 py-2 shadow-sm flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="size-1.5 rounded-full bg-[#6750a4]/40 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick prompts */}
          <div className="px-3 py-2 border-t border-gray-100 flex gap-1.5 overflow-x-auto shrink-0 bg-white">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="text-[10px] whitespace-nowrap px-2.5 py-1 bg-[#6750a4]/8 text-[#6750a4] rounded-full hover:bg-[#6750a4]/15 transition-colors border border-[#6750a4]/15 shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-gray-100 flex items-center gap-2 bg-white shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Ask AIRA anything..."
              className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-full px-3 py-2 outline-none focus:border-[#6750a4]/50 placeholder:text-gray-400"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="size-8 rounded-full bg-[#6750a4] flex items-center justify-center hover:bg-[#5a4490] transition-colors disabled:opacity-40"
            >
              <Send size={13} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="group relative size-14 rounded-full bg-gradient-to-br from-[#6750a4] to-[#8b6bc4] shadow-xl shadow-[#6750a4]/40 flex items-center justify-center hover:shadow-2xl hover:shadow-[#6750a4]/50 hover:scale-105 transition-all duration-200"
      >
        {/* Ripple ring */}
        <span className="absolute inset-0 rounded-full bg-[#6750a4]/30 animate-ping" />
        {open ? (
          <X size={22} className="text-white relative z-10" />
        ) : (
          <Sparkles size={22} className="text-white relative z-10 group-hover:animate-pulse" />
        )}
        {/* Unread indicator */}
        {!open && (
          <span className="absolute top-0.5 right-0.5 size-4 rounded-full bg-green-400 border-2 border-white text-[8px] font-bold text-white flex items-center justify-center">
            AI
          </span>
        )}
      </button>
    </div>
  );
}
