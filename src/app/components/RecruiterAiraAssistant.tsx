import { useState, useRef, useEffect } from "react";
import { X, Sparkles, Send, ChevronDown, BrainCircuit, Users, Briefcase, BarChart2 } from "lucide-react";

// ── Recruiter-specific quick prompts ──────────────────────────────
const QUICK_PROMPTS = [
  "Rank top candidates",
  "Write a job description",
  "Screen resumes for me",
  "Today's interview schedule",
];

// ── Smart responses (recruiter context) ───────────────────────────
const AIRA_RESPONSES: Record<string, string> = {
  "Rank top candidates":
    "🏆 Top 3 candidates across all active jobs:\n\n1. Ahmed Khan — 94% match (Frontend Dev)\n2. Zara Malik — 91% match (UI/UX Designer)\n3. Sara Ali — 87% match (Frontend Dev)\n\nAll three passed AI screening. Want me to shortlist them and send assessment invitations?",

  "Write a job description":
    "📝 Sure! What role should I write for? Just tell me:\n• Job title\n• Key skills required\n• Experience level\n\nI'll generate a full JD with responsibilities, requirements, and a compelling intro optimised for ATS and candidate engagement.",

  "Screen resumes for me":
    "🤖 AI Screening Summary for active jobs:\n\n• Frontend Dev: 45 resumes → 12 shortlisted (94% avg match)\n• Backend Engineer: 32 resumes → 8 shortlisted (87% avg)\n• UI/UX Designer: 28 resumes → 9 shortlisted (91% avg)\n\nAll screened using NLP skill extraction. Ready to review the shortlist?",

  "Today's interview schedule":
    "📅 Today's Interview Schedule:\n\n• 10:00 AM — Ahmed Khan (Technical Round)\n• 11:30 AM — Zara Malik (HR Round)\n• 02:00 PM — Bilal Hassan (Coding Assessment)\n• 03:30 PM — Sara Ali (Final Round)\n• 05:00 PM — Omar Farooq (Technical Round)\n\nAll sessions confirmed. Need to reschedule any?",
};

// ── Context chips ─────────────────────────────────────────────────
const CONTEXT_CHIPS = [
  { icon: Briefcase,    label: "8 Open Jobs",     color: "text-[#6750a4]",  bg: "bg-[#6750a4]/8"  },
  { icon: Users,        label: "248 Applicants",  color: "text-blue-600",   bg: "bg-blue-50"       },
  { icon: BrainCircuit, label: "AI Screening On", color: "text-green-600",  bg: "bg-green-50"      },
  { icon: BarChart2,    label: "47 Shortlisted",  color: "text-amber-600",  bg: "bg-amber-50"      },
];

interface Message { role: "ai" | "user"; text: string; }

export function RecruiterAiraAssistant() {
  const [open,    setOpen]    = useState(false);
  const [input,   setInput]   = useState("");
  const [typing,  setTyping]  = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hi Sarah! 👋 I'm AIRA, your AI recruitment co-pilot.\n\nI can help you screen resumes, rank candidates, draft job descriptions, and manage your hiring pipeline. What would you like to do?",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply =
        AIRA_RESPONSES[text] ||
        `I'm analysing your recruitment data for "${text}".\n\nBased on your current pipeline (248 applicants, 8 open roles), I recommend focusing on the 18 candidates in the "Pending Review" stage first. Want me to generate a prioritised action list?`;
      setMessages((m) => [...m, { role: "ai", text: reply }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* ── Chat Panel ── */}
      {open && (
        <div
          className="w-[340px] bg-white rounded-2xl shadow-2xl border border-[#6750a4]/20 overflow-hidden flex flex-col"
          style={{ height: 480 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#6750a4] via-[#7c5fbb] to-[#8b6bc4] px-4 py-3 flex items-center gap-3 shrink-0 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 size-16 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="relative size-9 rounded-full bg-white/20 ring-2 ring-white/30 flex items-center justify-center shrink-0">
              <Sparkles size={15} className="text-white" />
              <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-green-400 border border-white animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold leading-tight">AIRA Recruiter</p>
              <p className="text-white/60 text-[10px]">AI Co-pilot · Hiring Intelligence</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white transition-colors">
              <ChevronDown size={18} />
            </button>
          </div>

          {/* Pipeline context chips */}
          <div className="px-3 pt-2.5 pb-1.5 flex gap-1.5 overflow-x-auto shrink-0 bg-[#fafafc] border-b border-gray-100">
            {CONTEXT_CHIPS.map(({ icon: Icon, label, color, bg }) => (
              <div key={label} className={`flex items-center gap-1 px-2 py-1 rounded-full ${bg} shrink-0`}>
                <Icon size={10} className={color} />
                <span className={`text-[9px] font-semibold ${color}`}>{label}</span>
              </div>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-[#fafafc]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                {m.role === "ai" && (
                  <div className="size-6 rounded-full bg-gradient-to-br from-[#6750a4] to-[#a78bfa] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles size={10} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[88%] px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
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
                    <span key={i} className="size-1.5 rounded-full bg-[#6750a4]/40 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          <div className="px-3 py-2 border-t border-gray-100 flex gap-1.5 overflow-x-auto shrink-0 bg-white">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                className="text-[10px] whitespace-nowrap px-2.5 py-1 bg-[#6750a4]/8 text-[#6750a4] rounded-full hover:bg-[#6750a4]/16 transition-colors border border-[#6750a4]/15 shrink-0"
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
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask AIRA about your pipeline..."
              className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-full px-3 py-2 outline-none focus:border-[#6750a4]/50 placeholder:text-gray-400"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="size-8 rounded-full bg-[#6750a4] flex items-center justify-center hover:bg-[#5a4490] transition-colors disabled:opacity-40"
            >
              <Send size={13} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* ── Floating FAB ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="group relative size-14 rounded-full bg-gradient-to-br from-[#6750a4] to-[#8b6bc4] shadow-xl shadow-[#6750a4]/40 flex items-center justify-center hover:shadow-2xl hover:shadow-[#6750a4]/50 hover:scale-105 transition-all duration-200"
      >
        <span className="absolute inset-0 rounded-full bg-[#6750a4]/30 animate-ping" />
        {open ? <X size={22} className="text-white relative z-10" /> : <Sparkles size={22} className="text-white relative z-10 group-hover:animate-pulse" />}
        {!open && (
          <span className="absolute top-0.5 right-0.5 size-4 rounded-full bg-green-400 border-2 border-white text-[8px] font-bold text-white flex items-center justify-center">
            AI
          </span>
        )}
      </button>
    </div>
  );
}
