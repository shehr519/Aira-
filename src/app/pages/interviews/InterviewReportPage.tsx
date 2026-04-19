import { useNavigate, useParams } from "react-router";
import {
  ChevronLeft, CheckCircle2, XCircle, TrendingUp, TrendingDown,
  Lightbulb, AlertCircle, Star, Clock, Cpu, Users, MessageSquare, ChevronDown, ChevronUp
} from "lucide-react";
import { useState } from "react";
import { getInterview, LOGO_COMPONENTS, TYPE_LABELS } from "./interviewData";

// ── Score ring (pure SVG, no recharts) ───────────────────────────
function ScoreRing({ score, size = 120, color }: { score: number; size?: number; color: string }) {
  const sw = 10, r = (size - sw * 2) / 2;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const cx = size / 2;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={cx} cy={cx} r={r} stroke="#e5e7eb" strokeWidth={sw} fill="none" />
        <circle cx={cx} cy={cx} r={r} stroke={color} strokeWidth={sw} fill="none"
          strokeDasharray={`${fill} ${circ - fill}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold text-black" style={{ fontSize: size * 0.2 }}>{score}%</span>
        <span className="text-gray-400" style={{ fontSize: size * 0.09 }}>Score</span>
      </div>
    </div>
  );
}

// ── Progress bar row ──────────────────────────────────────────────
function ProgressRow({ label, value, color, max = 100 }: { label: string; value: number; color: string; max?: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-gray-700">{label}</span>
        <span className="font-bold" style={{ color }}>{value}{max === 100 ? "%" : ""}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${(value / max) * 100}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

// ── Insight item ──────────────────────────────────────────────────
function InsightItem({ type, text }: { type: "strength" | "improve" | "tip"; text: string }) {
  const cfg = {
    strength: { icon: <CheckCircle2 size={15} className="text-green-500 shrink-0 mt-0.5" />, bg: "bg-green-50", border: "border-green-200" },
    improve: { icon: <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />, bg: "bg-amber-50", border: "border-amber-200" },
    tip: { icon: <Lightbulb size={15} className="text-[#6750a4] shrink-0 mt-0.5" />, bg: "bg-purple-50", border: "border-purple-200" },
  }[type];
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${cfg.bg} ${cfg.border}`}>
      {cfg.icon}
      <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}

// ── Q&A accordion ────────────────────────────────────────────────
interface QAItem { question: string; answer: string; score: number; feedback: string; }

function QAAccordion({ item, idx, open, onToggle }: { item: QAItem; idx: number; open: boolean; onToggle: () => void }) {
  const color = item.score >= 80 ? "#22c55e" : item.score >= 60 ? "#f59e0b" : "#ef4444";
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${item.score >= 70 ? "border-green-200" : "border-amber-200"}`}>
      <button onClick={onToggle} className={`w-full flex items-center justify-between px-4 py-3 text-left ${item.score >= 70 ? "bg-green-50" : "bg-amber-50"}`}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="size-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: color }}>
            {idx + 1}
          </div>
          <span className="text-sm text-gray-800 leading-snug line-clamp-1">{item.question}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span className="text-xs font-bold" style={{ color }}>{item.score}%</span>
          {open ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
        </div>
      </button>
      {open && (
        <div className="px-4 py-4 bg-white space-y-3 text-sm">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1">Your Answer:</p>
            <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-lg px-3 py-2">{item.answer}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1">Interviewer Feedback:</p>
            <p className="text-gray-700 leading-relaxed">{item.feedback}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Per-interview report data ──────────────────────────────────────
const REPORT_DATA: Record<number, {
  overallScore: number;
  result: "passed" | "failed";
  dimensions: { label: string; score: number; color: string }[];
  strengths: string[];
  improvements: string[];
  tips: string[];
  qa: QAItem[];
}> = {
  // Interview 5 — Initial Screening (video/AI)
  5: {
    overallScore: 82, result: "passed",
    dimensions: [
      { label: "Communication Clarity", score: 85, color: "#6750a4" },
      { label: "Technical Knowledge", score: 80, color: "#007DFC" },
      { label: "Confidence Level", score: 78, color: "#f59e0b" },
      { label: "Answer Structure", score: 84, color: "#17CF97" },
      { label: "Listening Skills", score: 82, color: "#FF630B" },
    ],
    strengths: [
      "Clear and articulate communication throughout the session.",
      "Strong demonstration of React.js and state management knowledge.",
      "Good use of real-world examples to illustrate points.",
    ],
    improvements: [
      "Answers on system design were brief — try to elaborate more on architectural decisions.",
      "Occasional filler words ('um', 'like') detected — practise pausing instead.",
    ],
    tips: [
      "Use the STAR method (Situation → Task → Action → Result) to structure behavioural answers.",
      "Slow down slightly — you tend to speak faster when nervous.",
    ],
    qa: [
      { question: "Tell me about yourself and your experience.", score: 88, answer: "I'm a frontend developer with 2 years experience...", feedback: "Good introduction. Clear and concise. Could mention specific impact metrics." },
      { question: "What is your strongest technical skill?", score: 82, answer: "React.js and building scalable component architectures.", feedback: "Well answered. Provide a concrete example next time." },
      { question: "Describe a challenging project you've overcome.", score: 78, answer: "I worked on a real-time dashboard with complex state...", feedback: "Good story but the resolution was vague. What specifically resolved the challenge?" },
      { question: "Where do you see yourself in 5 years?", score: 80, answer: "I'd like to move into a senior or lead engineering role.", feedback: "Reasonable answer. Align it more with the company's growth areas." },
    ],
  },
  // Interview 6 — Coding
  6: {
    overallScore: 74, result: "passed",
    dimensions: [
      { label: "Code Correctness", score: 80, color: "#17CF97" },
      { label: "Code Quality", score: 72, color: "#6750a4" },
      { label: "Problem-Solving", score: 75, color: "#007DFC" },
      { label: "Time Management", score: 65, color: "#f59e0b" },
      { label: "Edge Case Handling", score: 60, color: "#FF630B" },
    ],
    strengths: [
      "Correct solution for Problem 1 with efficient recursion.",
      "Clean variable naming and code structure.",
      "Passed all visible test cases for both problems.",
    ],
    improvements: [
      "Time management needs work — you spent 70% of your time on Problem 1.",
      "Edge cases (empty array, null values) were not handled in Problem 2.",
      "Add comments to explain complex logic sections.",
    ],
    tips: [
      "Start with a brute force solution first, then optimise — don't try to perfect immediately.",
      "Always test with empty input, single element, and maximum size inputs.",
    ],
    qa: [
      { question: "Flatten Nested Array", score: 82, answer: "Recursive reduce-based solution implemented.", feedback: "Correct and clean. Minor: could handle non-array leaf values more robustly." },
      { question: "Debounce Function", score: 66, answer: "Used setTimeout with clearTimeout in closure.", feedback: "Correct approach. Missing: did not handle 'this' context with .apply(). Edge case: leading call option not considered." },
    ],
  },
  // Interview 7 — Technical Round
  7: {
    overallScore: 85, result: "passed",
    dimensions: [
      { label: "Technical Accuracy", score: 90, color: "#17CF97" },
      { label: "System Design", score: 80, color: "#6750a4" },
      { label: "Communication", score: 85, color: "#007DFC" },
      { label: "Depth of Knowledge", score: 88, color: "#f59e0b" },
      { label: "Problem-Solving", score: 82, color: "#FF630B" },
    ],
    strengths: [
      "Excellent technical accuracy across React.js and JavaScript topics.",
      "Clear and structured communication throughout.",
      "Good understanding of event loop and async patterns.",
    ],
    improvements: [
      "System design answer for the rate limiting question lacked detail on distributed systems.",
      "SQL vs NoSQL answer was solid but could have included more real-world examples.",
    ],
    tips: [
      "Study distributed systems concepts like consistent hashing, CAP theorem, and message queues.",
      "When given a design problem, always start by clarifying requirements before jumping into solutions.",
    ],
    qa: [
      { question: "Walk me through the architecture of your most complex system.", score: 88, answer: "I built a React dashboard with real-time updates using WebSockets, Redux for state, and a Node.js backend...", feedback: "Excellent response. Clearly structured. Bonus: mentioned monitoring and scaling considerations." },
      { question: "SQL vs NoSQL — when would you choose each?", score: 82, answer: "SQL for structured, relational data with ACID requirements. NoSQL for flexibility and scale.", feedback: "Correct. Next time, add a concrete example for each choice to make it memorable." },
      { question: "What is the Virtual DOM in React?", score: 90, answer: "A lightweight JS representation of the real DOM. React diffs it to minimise actual DOM mutations.", feedback: "Perfect answer. Also mentioned reconciliation correctly." },
      { question: "How would you implement rate limiting on a REST API?", score: 80, answer: "Use a token bucket or sliding window algorithm, backed by Redis for distributed tracking.", feedback: "Good knowledge of algorithms. Missing: how to handle edge cases like burst traffic or multi-region." },
    ],
  },
};

// Default report for interviews without specific data
const DEFAULT_REPORT = REPORT_DATA[5];

// ── Main page ─────────────────────────────────────────────────────
export function InterviewReportPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const interview = getInterview(Number(id));
  const report = REPORT_DATA[Number(id)] ?? DEFAULT_REPORT;
  const [openQA, setOpenQA] = useState<number | null>(null);

  const Logo = LOGO_COMPONENTS[(interview?.logoIndex ?? 0) % LOGO_COMPONENTS.length];
  const passed = report.result === "passed";
  const color = passed ? "#22c55e" : "#ef4444";
  const typeColor: Record<string, string> = { video: "#6750a4", coding: "#FF630B", technical: "#007DFC", hr: "#17CF97", ai: "#6750a4" };
  const tc = typeColor[interview?.type ?? "video"];

  return (
    <div className="p-8 bg-[#fafafc] min-h-full">
      {/* Back */}
      <button onClick={() => navigate("/interviews")} className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#6750a4] transition-colors mb-6">
        <ChevronLeft size={16} /> Back to Interviews
      </button>

      <div className="max-w-[700px] mx-auto space-y-5">
        {/* ── Hero card ── */}
        <div className={`rounded-3xl p-7 border ${passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
          <div className="flex items-start gap-5 flex-wrap">
            <div className="size-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center p-1.5 shrink-0">
              <Logo />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-black leading-tight">{interview?.round ?? "Interview"} — Report</h1>
              <p className="text-sm text-gray-500 mt-0.5">{interview?.company} · {interview?.role}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs px-3 py-0.5 rounded-full border flex items-center gap-1.5"
                  style={{ backgroundColor: `${tc}15`, borderColor: `${tc}40`, color: tc }}>
                  {interview?.conductedBy === "ai"
                    ? <><Cpu size={11} /> AI Interview</>
                    : <><Users size={11} /> Company Interview</>}
                </span>
                <span className="text-xs text-gray-500">{interview?.date}</span>
              </div>
            </div>
            <div className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full ${passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
              {passed ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
              {passed ? "Passed" : "Failed"}
            </div>
          </div>

          {/* Score + stats */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-6 pt-5 border-t border-white/50">
            <ScoreRing score={report.overallScore} size={130} color={color} />
            <div className="flex-1 grid grid-cols-2 gap-3">
              {[
                { label: "Interview Type", value: TYPE_LABELS[interview?.type ?? "video"], icon: <MessageSquare size={14} /> },
                { label: "Duration", value: `${interview?.duration ?? 45} minutes`, icon: <Clock size={14} /> },
                { label: "Questions", value: `${report.qa.length} asked`, icon: <MessageSquare size={14} /> },
                { label: "Status", value: passed ? "Moved to next round" : "Evaluation complete", icon: passed ? <TrendingUp size={14} /> : <TrendingDown size={14} /> },
              ].map(({ label, value, icon }) => (
                <div key={label} className="bg-white/70 rounded-xl px-3 py-2.5">
                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-0.5">{icon} {label}</p>
                  <p className="text-sm font-semibold text-black">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Performance dimensions ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Star size={17} className="text-[#6750a4]" />
            <h2 className="text-base font-bold text-black">Performance Breakdown</h2>
          </div>
          <div className="space-y-4">
            {report.dimensions.map(({ label, score, color: c }) => (
              <ProgressRow key={label} label={label} value={score} color={c} />
            ))}
          </div>
        </div>

        {/* ── AI Insights ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={17} className="text-[#6750a4]" />
            <h2 className="text-base font-bold text-black">AI Feedback</h2>
          </div>
          <div className="space-y-2">
            {report.strengths.map((s, i) => <InsightItem key={`s-${i}`} type="strength" text={s} />)}
            {report.improvements.map((s, i) => <InsightItem key={`i-${i}`} type="improve" text={s} />)}
            {report.tips.map((s, i) => <InsightItem key={`t-${i}`} type="tip" text={s} />)}
          </div>
        </div>

        {/* ── Q&A Review ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-bold text-black mb-4">Question-by-Question Review</h2>
          <div className="space-y-2">
            {report.qa.map((item, i) => (
              <QAAccordion
                key={i} item={item} idx={i}
                open={openQA === i}
                onToggle={() => setOpenQA(openQA === i ? null : i)}
              />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => navigate("/ai-feedback")} className="flex-1 flex items-center justify-center gap-2 bg-[#6750a4] text-white text-sm py-2.5 rounded-full hover:bg-[#5a4490] transition-colors">
            <TrendingUp size={15} /> View Full AI Report
          </button>
          <button onClick={() => navigate("/interviews")} className="flex-1 border border-gray-300 text-gray-700 text-sm py-2.5 rounded-full hover:bg-gray-50 transition-colors">
            Back to Interviews
          </button>
          <button onClick={() => navigate("/jobs")} className="flex-1 border border-gray-300 text-gray-700 text-sm py-2.5 rounded-full hover:bg-gray-50 transition-colors">
            Browse Jobs
          </button>
        </div>
      </div>
    </div>
  );
}
