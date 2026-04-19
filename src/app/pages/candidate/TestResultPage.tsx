import { useNavigate, useLocation } from "react-router";
import { CheckCircle2, XCircle, Clock, BookOpen, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

// ── Circular score ring ───────────────────────────────────────────
function ScoreRing({ score }: { score: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const color = score >= 70 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative size-36 mx-auto">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90">
        <circle cx="60" cy="60" r={r} stroke="#e5e7eb" strokeWidth="10" fill="none" />
        <circle
          cx="60" cy="60" r={r}
          stroke={color} strokeWidth="10" fill="none"
          strokeDasharray={`${fill} ${circ - fill}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>{score}%</span>
        <span className="text-xs text-gray-500">Score</span>
      </div>
    </div>
  );
}

// ── Stat box ──────────────────────────────────────────────────────
function ResultStat({ label, value, icon: Icon, color }: {
  label: string; value: string; icon: React.ComponentType<{ size?: number; className?: string }>; color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
      <div className="size-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}18` }}>
        <span style={{ color }}>
  <Icon size={18} />
</span>
      </div>
      <div>
        <p className="text-base font-bold text-black">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}

// ── Answer review item ────────────────────────────────────────────
const CORRECT_ANSWERS: Record<number, string> = {
  0: "useEffect",
  1: "JavaScript XML",
  2: "block-flex",
  4: "this.setState()",
  5: "A copy of the real DOM that React uses to calculate efficient updates",
  7: "align-items",
  8: "Prevents a functional component from re-rendering if props haven't changed",
};

const QUESTIONS_PREVIEW = [
  { id: 0, text: "Which hook is used to manage side effects in a React functional component?", type: "mcq" },
  { id: 1, text: "What does JSX stand for?", type: "mcq" },
  { id: 2, text: "Which of the following is NOT a valid CSS display value?", type: "mcq" },
  { id: 3, text: "Explain the difference between controlled and uncontrolled components in React.", type: "text" },
  { id: 4, text: "Which method is used to update state in a React class component?", type: "mcq" },
];

function ReviewItem({ qIndex, userAnswer, expanded, onToggle }: {
  qIndex: number; userAnswer: string | undefined; expanded: boolean; onToggle: () => void;
}) {
  const q = QUESTIONS_PREVIEW[qIndex];
  if (!q) return null;
  const correct = CORRECT_ANSWERS[qIndex];
  const isCorrect = q.type === "text" ? !!userAnswer && userAnswer.length > 20 : userAnswer === correct;

  return (
    <div className={`border rounded-xl overflow-hidden ${isCorrect ? "border-green-200" : "border-red-200"}`}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-3 text-left ${isCorrect ? "bg-green-50" : "bg-red-50"}`}
      >
        <div className="flex items-center gap-3">
          {isCorrect
            ? <CheckCircle2 size={16} className="text-green-600 shrink-0" />
            : <XCircle size={16} className="text-red-500 shrink-0" />}
          <span className="text-sm text-gray-800 leading-snug line-clamp-1">{q.text}</span>
        </div>
        {expanded ? <ChevronUp size={16} className="shrink-0 text-gray-400" /> : <ChevronDown size={16} className="shrink-0 text-gray-400" />}
      </button>
      {expanded && (
        <div className="px-4 py-3 bg-white space-y-2 text-sm">
          <div>
            <span className="text-gray-500">Your answer: </span>
            <span className={userAnswer ? (isCorrect ? "text-green-700 font-medium" : "text-red-600") : "text-gray-400 italic"}>
              {userAnswer ?? "Not answered"}
            </span>
          </div>
          {!isCorrect && correct && (
            <div>
              <span className="text-gray-500">Correct answer: </span>
              <span className="text-green-700 font-medium">{correct}</span>
            </div>
          )}
          {q.type === "text" && !userAnswer && (
            <p className="text-gray-400 italic text-xs">No answer provided for this question.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main result page ──────────────────────────────────────────────
export function TestResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  const { answers = {}, timeSpent = 1320 } = (location.state as any) ?? {};

  // Calculate mock score based on MCQ answers
  const mcqCorrect = [0, 1, 2, 4, 5, 7, 8].filter(
    (i) => answers[i] === CORRECT_ANSWERS[i]
  ).length;
  const textAnswered = [3, 6, 9].filter((i) => answers[i] && answers[i].length > 20).length;
  const totalCorrect = mcqCorrect + textAnswered;
  const score = Math.round((totalCorrect / 10) * 100);
  const passed = score >= 70;
  const mins = Math.floor(timeSpent / 60);
  const secs = timeSpent % 60;

  return (
    <div className="p-8 bg-[#fafafc] min-h-full">
      <div className="max-w-[640px] mx-auto">
        {/* Result hero */}
        <div className={`rounded-3xl p-7 mb-7 text-center ${passed ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          <div className={`size-20 rounded-full mx-auto mb-4 flex items-center justify-center ${passed ? "bg-green-100" : "bg-red-100"}`}>
            {passed
              ? <CheckCircle2 size={40} className="text-green-500" />
              : <XCircle size={40} className="text-red-500" />}
          </div>
          <h1 className="text-2xl font-bold text-black mb-1">
            {passed ? "Test Passed! 🎉" : "Test Completed"}
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            {passed
              ? "Great job! Your result has been shared with Btab Group."
              : "Don't worry. Your progress has been recorded. Check the AI Feedback for tips to improve."}
          </p>
          <ScoreRing score={score} />
          <p className="text-sm text-gray-500 mt-3">
            Passing score: <span className="font-semibold">70%</span>
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-7">
          <ResultStat label="Correct Answers" value={`${totalCorrect} / 10`} icon={CheckCircle2} color="#22c55e" />
          <ResultStat label="Time Spent" value={`${mins}m ${secs}s`} icon={Clock} color="#6750a4" />
          <ResultStat label="Questions" value="10 Total" icon={BookOpen} color="#007DFC" />
        </div>

        {/* Performance breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-7">
          <h2 className="text-base font-bold text-black mb-4">Performance Breakdown</h2>
          <div className="space-y-3">
            {[
              { label: "React.js Concepts", pct: mcqCorrect > 3 ? 80 : 50, color: "#6750a4" },
              { label: "JavaScript", pct: mcqCorrect > 2 ? 75 : 40, color: "#007DFC" },
              { label: "CSS / Flexbox", pct: answers[7] === "align-items" ? 100 : 30, color: "#17CF97" },
              { label: "Written Responses", pct: textAnswered > 0 ? 70 : 0, color: "#f59e0b" },
            ].map(({ label, pct, color }) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{label}</span>
                  <span className="font-medium" style={{ color }}>{pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Question review */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-7">
          <h2 className="text-base font-bold text-black mb-4">Answer Review</h2>
          <div className="space-y-2">
            {QUESTIONS_PREVIEW.map((_, i) => (
              <ReviewItem
                key={i}
                qIndex={i}
                userAnswer={answers[i]}
                expanded={expandedQ === i}
                onToggle={() => setExpandedQ(expandedQ === i ? null : i)}
              />
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/ai-feedback")}
            className="flex-1 flex items-center justify-center gap-2 bg-[#6750a4] text-white text-sm py-2.5 rounded-full hover:bg-[#5a4490] transition-colors"
          >
            <TrendingUp size={15} /> View AI Feedback
          </button>
          <button
            onClick={() => navigate("/tests")}
            className="flex-1 border border-[#6750a4] text-[#6750a4] text-sm py-2.5 rounded-full hover:bg-purple-50 transition-colors"
          >
            Back to Tests
          </button>
          <button
            onClick={() => navigate("/jobs")}
            className="flex-1 border border-gray-300 text-gray-700 text-sm py-2.5 rounded-full hover:bg-gray-50 transition-colors"
          >
            Browse Jobs
          </button>
        </div>
      </div>
    </div>
  );
}
