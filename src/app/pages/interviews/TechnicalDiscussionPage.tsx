import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ChevronLeft, Send, Lightbulb, ChevronRight,
  MessageSquare, Clock, Cpu, Users, CheckCircle2, Mic, MicOff
} from "lucide-react";
import { getInterview } from "./interviewData";

// ── Question bank ─────────────────────────────────────────────────
const TECH_QUESTIONS = [
  {
    q: "Can you walk me through the architecture of the most complex system you've built or worked on?",
    followUp: "How would you scale it to 10x the current load?",
    category: "System Design",
  },
  {
    q: "Explain the difference between SQL and NoSQL databases. When would you choose one over the other?",
    followUp: "In a high-read application with semi-structured data, which would you recommend and why?",
    category: "Databases",
  },
  {
    q: "What is the Virtual DOM in React, and how does the reconciliation process work?",
    followUp: "How do keys help React during reconciliation?",
    category: "React.js",
  },
  {
    q: "Describe how you would implement rate limiting on a public REST API.",
    followUp: "What happens when the rate limit is exceeded — how should the client handle it?",
    category: "API Design",
  },
  {
    q: "What is the event loop in JavaScript? How does it relate to the call stack and callback queue?",
    followUp: "How do Promises and async/await interact with the event loop?",
    category: "JavaScript",
  },
];

// ── Evaluation rubric ─────────────────────────────────────────────
const RUBRIC = [
  { label: "Technical Accuracy", weight: "30%" },
  { label: "Communication Clarity", weight: "25%" },
  { label: "Problem-Solving Approach", weight: "25%" },
  { label: "Depth of Knowledge", weight: "20%" },
];

// ── Message type ──────────────────────────────────────────────────
interface Msg {
  id: number;
  sender: "interviewer" | "you";
  text: string;
  time: string;
  isQuestion?: boolean;
  category?: string;
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const INITIAL_MSGS: Msg[] = [
  {
    id: 1, sender: "interviewer",
    text: "Hello! Welcome to your Technical Discussion round. I'm a senior engineer at DataCore. Today we'll cover system design, databases, and JavaScript fundamentals. Ready to begin?",
    time: "10:00 AM",
  },
];

// ── Timer ─────────────────────────────────────────────────────────
function ElapsedTimer({ started }: { started: boolean }) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    if (!started) return;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [started]);
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return <span className="font-mono text-sm text-gray-600">{m}:{s}</span>;
}

// ── Category badge ────────────────────────────────────────────────
function CatBadge({ cat }: { cat?: string }) {
  if (!cat) return null;
  return (
    <span className="text-xs bg-purple-50 border border-purple-100 text-[#6750a4] px-2 py-0.5 rounded-full mb-1 inline-block">
      {cat}
    </span>
  );
}

// ── Main page ─────────────────────────────────────────────────────
export function TechnicalDiscussionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const interview = getInterview(Number(id));

  const [started, setStarted] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL_MSGS);
  const [draft, setDraft] = useState("");
  const [qIdx, setQIdx] = useState(0);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [ended, setEnded] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [showRubric, setShowRubric] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const askQuestion = (text: string, cat?: string, isFollowUp = false) => {
    setTimeout(() => {
      setMsgs((prev) => [...prev, {
        id: Date.now(), sender: "interviewer",
        text, time: now(), isQuestion: !isFollowUp, category: cat,
      }]);
    }, 800);
  };

  const handleStart = () => {
    setStarted(true);
    askQuestion(TECH_QUESTIONS[0].q, TECH_QUESTIONS[0].category, false);
  };

  const handleSend = () => {
    if (!draft.trim()) return;
    const userMsg: Msg = { id: Date.now(), sender: "you", text: draft, time: now() };
    setMsgs((prev) => [...prev, userMsg]);
    setDraft("");

    const cur = TECH_QUESTIONS[qIdx];
    if (!showFollowUp) {
      // Ask follow-up
      setShowFollowUp(true);
      askQuestion(cur.followUp, cur.category, true);
    } else {
      // Move to next question
      setShowFollowUp(false);
      const nextIdx = qIdx + 1;
      if (nextIdx < TECH_QUESTIONS.length) {
        setQIdx(nextIdx);
        askQuestion(TECH_QUESTIONS[nextIdx].q, TECH_QUESTIONS[nextIdx].category);
      } else {
        // End of questions
        setTimeout(() => {
          setMsgs((prev) => [...prev, {
            id: Date.now(), sender: "interviewer",
            text: "That concludes our technical discussion today. Thank you for your time and thoughtful answers. You'll receive feedback shortly. Best of luck!",
            time: now(),
          }]);
          setEnded(true);
        }, 1000);
      }
    }
  };

  if (ended) {
    return (
      <div className="bg-[#fafafc] min-h-full flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="size-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={36} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Discussion Complete!</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Your technical discussion with {interview?.company ?? "the company"} has been completed.
            The interviewer's evaluation has been recorded.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-6 text-sm">
            <div className="bg-gray-50 rounded-xl py-3">
              <p className="font-bold text-black">{TECH_QUESTIONS.length}</p>
              <p className="text-gray-500 text-xs">Questions</p>
            </div>
            <div className="bg-gray-50 rounded-xl py-3">
              <p className="font-bold text-[#6750a4]">{msgs.filter((m) => m.sender === "you").length}</p>
              <p className="text-gray-500 text-xs">Responses</p>
            </div>
            <div className="bg-gray-50 rounded-xl py-3">
              <p className="font-bold text-green-600">45 min</p>
              <p className="text-gray-500 text-xs">Duration</p>
            </div>
          </div>
          <div className="space-y-3">
            <button onClick={() => navigate(`/interviews/${id}/report`)} className="w-full bg-[#6750a4] text-white text-sm py-2.5 rounded-full hover:bg-[#5a4490] transition-colors">
              View Report
            </button>
            <button onClick={() => navigate("/interviews")} className="w-full border border-gray-300 text-gray-700 text-sm py-2.5 rounded-full hover:bg-gray-50 transition-colors">
              Back to Interviews
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafc] min-h-full flex flex-col">
      {/* ── Top bar ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(`/interviews/${id}`)} className="text-gray-400 hover:text-gray-700 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div>
            <p className="text-xs text-gray-500">{interview?.company ?? "Company"}</p>
            <p className="text-sm font-bold text-black">Technical Discussion</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {started && (
            <div className="flex items-center gap-1.5 text-gray-600 bg-gray-100 rounded-full px-3 py-1">
              <Clock size={13} />
              <ElapsedTimer started={started && !ended} />
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs px-3 py-1 rounded-full">
            <Users size={12} /> Company Interview
          </div>
          {started && (
            <button
              onClick={() => setMicOn(!micOn)}
              className={`p-2 rounded-full transition-colors ${micOn ? "bg-gray-100 text-gray-600" : "bg-red-100 text-red-500"}`}
            >
              {micOn ? <Mic size={16} /> : <MicOff size={16} />}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* ── Chat area ── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Progress bar */}
          {started && (
            <div className="px-6 py-2 bg-white border-b border-gray-100 shrink-0">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Question {Math.min(qIdx + 1, TECH_QUESTIONS.length)} of {TECH_QUESTIONS.length}</span>
                <span>{Math.round((qIdx / TECH_QUESTIONS.length) * 100)}% complete</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-[#6750a4] rounded-full transition-all"
                  style={{ width: `${(qIdx / TECH_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
            {msgs.map((m) => (
              <div key={m.id} className={`flex ${m.sender === "you" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[520px] ${m.sender === "you" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  {m.sender === "interviewer" && <CatBadge cat={m.category} />}
                  <div
                    className={`px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                      m.sender === "you"
                        ? "bg-[#6750a4] text-white rounded-br-none"
                        : m.isQuestion
                        ? "bg-white border-2 border-[#6750a4]/20 text-gray-800 rounded-bl-none shadow-sm"
                        : "bg-white border border-gray-200 text-gray-700 rounded-bl-none shadow-sm"
                    }`}
                  >
                    {m.isQuestion && (
                      <div className="flex items-center gap-1.5 text-[#6750a4] text-xs font-bold mb-2">
                        <MessageSquare size={12} /> Question
                      </div>
                    )}
                    {m.text}
                  </div>
                  <p className="text-xs text-gray-400">
                    {m.sender === "you" ? "You" : "Interviewer"} · {m.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input / Start */}
          <div className="px-6 py-4 bg-white border-t border-gray-100 shrink-0">
            {!started ? (
              <button
                onClick={handleStart}
                className="w-full bg-[#6750a4] text-white text-sm py-3 rounded-full hover:bg-[#5a4490] transition-colors font-semibold"
              >
                Begin Technical Discussion →
              </button>
            ) : ended ? (
              <p className="text-center text-sm text-gray-400 italic">Discussion has ended.</p>
            ) : (
              <div className="flex gap-3 items-end">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  rows={2}
                  placeholder="Type your answer... (Enter to send, Shift+Enter for new line)"
                  className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#6750a4] resize-none placeholder:text-gray-400 transition"
                />
                <button
                  onClick={handleSend}
                  disabled={!draft.trim()}
                  className="p-3 bg-[#6750a4] text-white rounded-xl hover:bg-[#5a4490] transition-colors disabled:opacity-40"
                >
                  <Send size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Right sidebar: rubric + tips ── */}
        <div className="w-72 shrink-0 bg-white border-l border-gray-100 overflow-y-auto hidden lg:flex flex-col">
          {/* Evaluation rubric */}
          <div className="p-5 border-b border-gray-100">
            <button
              onClick={() => setShowRubric(!showRubric)}
              className="flex items-center justify-between w-full text-sm font-bold text-black mb-1"
            >
              Evaluation Rubric
              <ChevronRight size={16} className={`text-gray-400 transition-transform ${showRubric ? "rotate-90" : ""}`} />
            </button>
            {showRubric && (
              <div className="mt-3 space-y-2">
                {RUBRIC.map(({ label, weight }) => (
                  <div key={label} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{label}</span>
                    <span className="font-bold text-[#6750a4]">{weight}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Question tracker */}
          <div className="p-5 border-b border-gray-100">
            <p className="text-sm font-bold text-black mb-3">Question Tracker</p>
            <div className="space-y-2">
              {TECH_QUESTIONS.map((tq, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs transition-colors ${
                    i < qIdx
                      ? "bg-green-50 border border-green-200"
                      : i === qIdx
                      ? "bg-purple-50 border border-purple-200"
                      : "bg-gray-50 border border-gray-100"
                  }`}
                >
                  <div className={`size-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    i < qIdx ? "bg-green-500 text-white" : i === qIdx ? "bg-[#6750a4] text-white" : "bg-gray-300 text-gray-600"
                  }`}>
                    {i < qIdx ? "✓" : i + 1}
                  </div>
                  <span className={i < qIdx ? "text-green-700" : i === qIdx ? "text-[#6750a4] font-semibold" : "text-gray-500"}>
                    {tq.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={15} className="text-[#6750a4]" />
              <p className="text-sm font-bold text-black">Answer Tips</p>
            </div>
            <ul className="space-y-2 text-xs text-gray-600">
              {[
                "Structure answers: Context → Problem → Solution → Result",
                "Use real examples from your experience when possible",
                "It's okay to ask for clarification before answering",
                "Show your thought process, not just the final answer",
                "Keep answers concise — 2-3 minutes per question",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <ChevronRight size={11} className="text-[#6750a4] mt-0.5 shrink-0" /> {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
