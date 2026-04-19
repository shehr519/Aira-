import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { Clock, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle2, BookOpen, Flag } from "lucide-react";

// ── Question data ────────────────────────────────────────────────
interface Question {
  id: number;
  type: "mcq" | "text";
  text: string;
  options?: string[];
  hint?: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1, type: "mcq",
    text: "Which hook is used to manage side effects in a React functional component?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
  },
  {
    id: 2, type: "mcq",
    text: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "JavaScript Extension",
      "Java Syntax Extension",
      "JSON XML Syntax",
    ],
  },
  {
    id: 3, type: "mcq",
    text: "Which of the following is NOT a valid CSS display value?",
    options: ["inline-block", "flex", "grid", "block-flex"],
  },
  {
    id: 4, type: "text",
    text: "Explain the difference between controlled and uncontrolled components in React. Give an example of each.",
    hint: "Think about how form data is managed — through React state vs. the DOM itself.",
  },
  {
    id: 5, type: "mcq",
    text: "Which method is used to update state in a React class component?",
    options: ["this.updateState()", "this.setState()", "this.changeState()", "this.state.set()"],
  },
  {
    id: 6, type: "mcq",
    text: "What is the virtual DOM in React?",
    options: [
      "A copy of the real DOM that React uses to calculate efficient updates",
      "The actual HTML DOM rendered in the browser",
      "A CSS rendering engine",
      "A JavaScript engine built into React",
    ],
  },
  {
    id: 7, type: "text",
    text: "What is the purpose of the `key` prop in React lists? Why is it important?",
    hint: "Consider how React tracks elements in a list across re-renders.",
  },
  {
    id: 8, type: "mcq",
    text: "In CSS Flexbox, which property controls the alignment of items along the cross axis?",
    options: ["justify-content", "align-items", "flex-direction", "align-self"],
  },
  {
    id: 9, type: "mcq",
    text: "What does `React.memo()` do?",
    options: [
      "Memoizes the result of an expensive computation",
      "Prevents a functional component from re-rendering if props haven't changed",
      "Caches API response data",
      "Creates a memoized selector",
    ],
  },
  {
    id: 10, type: "text",
    text: "Describe the concept of 'lifting state up' in React. When and why would you use it?",
    hint: "Think about sharing state between sibling components.",
  },
];

const TOTAL_SECONDS = 30 * 60; // 30 minutes

// ── Timer ────────────────────────────────────────────────────────
function Timer({ seconds, onExpire }: { seconds: number; onExpire: () => void }) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  const critical = seconds < 180;

  useEffect(() => { if (seconds === 0) onExpire(); }, [seconds, onExpire]);

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
      critical ? "bg-red-100 text-red-600 animate-pulse" : "bg-purple-100 text-[#6750a4]"
    }`}>
      <Clock size={15} />
      {mins}:{secs}
    </div>
  );
}

// ── Progress dots ─────────────────────────────────────────────────
function ProgressDots({ total, current, answered }: { total: number; current: number; answered: Set<number> }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: total }, (_, i) => {
        const done = answered.has(i);
        const active = i === current;
        return (
          <div
            key={i}
            className={`size-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              active
                ? "bg-[#6750a4] text-white"
                : done
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {i + 1}
          </div>
        );
      })}
    </div>
  );
}

// ── MCQ Question ─────────────────────────────────────────────────
function MCQQuestion({
  question, answer, onAnswer,
}: { question: Question; answer: string | undefined; onAnswer: (v: string) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-base text-gray-800 leading-relaxed">{question.text}</p>
      <div className="space-y-3 mt-4">
        {question.options!.map((opt, i) => {
          const letter = ["A", "B", "C", "D"][i];
          const selected = answer === opt;
          return (
            <label
              key={i}
              className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selected
                  ? "border-[#6750a4] bg-purple-50"
                  : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50"
              }`}
            >
              <input
                type="radio"
                name={`q${question.id}`}
                className="hidden"
                checked={selected}
                onChange={() => onAnswer(opt)}
              />
              <div
                className={`size-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  selected ? "border-[#6750a4] bg-[#6750a4] text-white" : "border-gray-300 text-gray-500"
                }`}
              >
                {letter}
              </div>
              <span className={`text-sm leading-relaxed ${selected ? "text-[#6750a4] font-medium" : "text-gray-700"}`}>
                {opt}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

// ── Text Question ─────────────────────────────────────────────────
function TextQuestion({
  question, answer, onAnswer,
}: { question: Question; answer: string | undefined; onAnswer: (v: string) => void }) {
  const words = answer?.trim() ? answer.trim().split(/\s+/).length : 0;
  return (
    <div className="space-y-4">
      <p className="text-base text-gray-800 leading-relaxed">{question.text}</p>
      {question.hint && (
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed"><span className="font-semibold">Hint:</span> {question.hint}</p>
        </div>
      )}
      <textarea
        rows={7}
        placeholder="Write your answer here..."
        value={answer ?? ""}
        onChange={(e) => onAnswer(e.target.value)}
        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#6750a4] focus:ring-2 focus:ring-purple-100 resize-none bg-white placeholder:text-gray-400 transition leading-relaxed"
      />
      <p className="text-xs text-gray-400 text-right">{words} words</p>
    </div>
  );
}

// ── Submit confirm modal ──────────────────────────────────────────
function SubmitModal({
  unanswered, onConfirm, onCancel, timeUp,
}: { unanswered: number; onConfirm: () => void; onCancel: () => void; timeUp: boolean }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-sm w-full p-7 flex flex-col items-center text-center gap-4">
        <div className={`size-16 rounded-full flex items-center justify-center ${timeUp ? "bg-red-100" : "bg-amber-100"}`}>
          {timeUp
            ? <Clock size={30} className="text-red-500" />
            : <AlertTriangle size={30} className="text-amber-500" />}
        </div>
        <h2 className="text-lg font-bold text-black">
          {timeUp ? "Time's Up!" : "Submit Test?"}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {timeUp
            ? "Your time has expired. Your test will be submitted automatically with your current answers."
            : unanswered > 0
            ? `You have ${unanswered} unanswered question${unanswered > 1 ? "s" : ""}. Are you sure you want to submit?`
            : "You've answered all questions. Ready to submit your test?"}
        </p>
        {!timeUp && (
          <div className="flex gap-3 w-full mt-1">
            <button
              onClick={onCancel}
              className="flex-1 border border-gray-300 text-gray-700 text-sm py-2.5 rounded-full hover:bg-gray-50 transition-colors"
            >
              Continue Test
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-[#6750a4] text-white text-sm py-2.5 rounded-full hover:bg-[#5a4490] transition-colors"
            >
              Submit Now
            </button>
          </div>
        )}
        {timeUp && (
          <button
            onClick={onConfirm}
            className="w-full bg-[#6750a4] text-white text-sm py-2.5 rounded-full hover:bg-[#5a4490] transition-colors"
          >
            View Result
          </button>
        )}
      </div>
    </div>
  );
}

// ── Instructions screen ───────────────────────────────────────────
function InstructionsScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="p-8 bg-[#fafafc] min-h-full flex items-start justify-center">
      <div className="max-w-[560px] w-full">
        {/* Company + test name */}
        <div className="flex items-center gap-3 mb-6">
          <div className="size-12 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
            <svg viewBox="0 0 40 40" fill="none" className="size-8">
              <rect x="1" y="1" width="16" height="16" rx="3" fill="#17CF97" />
              <rect x="23" y="1" width="16" height="16" rx="3" fill="#17CF97" opacity="0.5" />
              <rect x="1" y="23" width="16" height="16" rx="3" fill="#17CF97" opacity="0.5" />
              <rect x="23" y="23" width="16" height="16" rx="3" fill="#17CF97" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-500">Btab Group</p>
            <h1 className="text-xl font-bold text-black leading-tight">Frontend Developer Assessment</h1>
          </div>
        </div>

        {/* Info pills */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-100 text-[#6750a4] text-sm px-4 py-1.5 rounded-full">
            <Clock size={14} /> 30 Minutes
          </div>
          <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-100 text-[#6750a4] text-sm px-4 py-1.5 rounded-full">
            <BookOpen size={14} /> {QUESTIONS.length} Questions
          </div>
          <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-1.5 rounded-full">
            <CheckCircle2 size={14} /> Passing Score: 70%
          </div>
        </div>

        {/* Instructions card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-base font-bold text-black mb-4">Test Instructions</h2>
          <ul className="space-y-3">
            {[
              "Read each question carefully before selecting your answer.",
              "The test consists of multiple-choice and short-answer questions.",
              "You have 30 minutes to complete all questions. The timer starts when you click Start Test.",
              "You can navigate between questions using the Previous / Next buttons.",
              "Unanswered questions will be marked as 0. Try to answer all questions.",
              "Once you submit, you cannot change your answers.",
              "Do not refresh or close the browser tab during the test.",
            ].map((inst, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                <div className="size-5 rounded-full bg-[#6750a4] text-white flex items-center justify-center text-xs shrink-0 mt-0.5">{i + 1}</div>
                {inst}
              </li>
            ))}
          </ul>
        </div>

        {/* Topics */}
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 mb-6">
          <p className="text-sm font-semibold text-[#6750a4] mb-2">Topics Covered:</p>
          <div className="flex flex-wrap gap-2">
            {["React.js", "JavaScript (ES6+)", "CSS / Flexbox", "Component Design", "State Management"].map((t) => (
              <span key={t} className="text-xs bg-white text-[#6750a4] border border-purple-200 px-3 py-0.5 rounded-full">{t}</span>
            ))}
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-[#6750a4] text-white text-sm py-3 rounded-full hover:bg-[#5a4490] transition-colors"
        >
          Start Test →
        </button>
      </div>
    </div>
  );
}

// ── Main test page ────────────────────────────────────────────────
export function TestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [showSubmit, setShowSubmit] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [flagged, setFlagged] = useState<Set<number>>(new Set());

  // Countdown
  useEffect(() => {
    if (!started || showSubmit) return;
    if (timeLeft <= 0) { setTimeUp(true); setShowSubmit(true); return; }
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [started, timeLeft, showSubmit]);

  const handleExpire = useCallback(() => { setTimeUp(true); setShowSubmit(true); }, []);

  const answered = new Set(Object.keys(answers).map(Number));
  const unanswered = QUESTIONS.length - answered.size;

  const handleAnswer = (val: string) => {
    setAnswers((prev) => ({ ...prev, [current]: val }));
  };

  const handleSubmit = () => {
    navigate(`/tests/${id}/result`, {
      state: { answers, timeSpent: TOTAL_SECONDS - timeLeft, questions: QUESTIONS },
    });
  };

  const toggleFlag = () => {
    setFlagged((prev) => {
      const n = new Set(prev);
      n.has(current) ? n.delete(current) : n.add(current);
      return n;
    });
  };

  if (!started) return <InstructionsScreen onStart={() => setStarted(true)} />;

  const q = QUESTIONS[current];

  return (
    <div className="bg-[#fafafc] min-h-full flex flex-col">
      {/* ── Top bar ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
        <div>
          <p className="text-xs text-gray-500">Btab Group</p>
          <p className="text-sm font-bold text-black">Frontend Developer Assessment</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">{answered.size}/{QUESTIONS.length} answered</span>
          <Timer seconds={timeLeft} onExpire={handleExpire} />
          <button
            onClick={() => setShowSubmit(true)}
            className="bg-[#6750a4] text-white text-xs px-4 py-2 rounded-full hover:bg-[#5a4490] transition-colors"
          >
            Submit Test
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Left sidebar: question navigator ── */}
        <div className="w-[200px] shrink-0 bg-white border-r border-gray-100 p-4 overflow-y-auto hidden md:block">
          <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">Questions</p>
          <div className="grid grid-cols-4 gap-1.5">
            {QUESTIONS.map((_, i) => {
              const done = answered.has(i);
              const active = i === current;
              const isFlagged = flagged.has(i);
              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`size-9 rounded-lg flex items-center justify-center text-xs font-bold transition-colors relative ${
                    active
                      ? "bg-[#6750a4] text-white"
                      : done
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500 hover:bg-purple-100"
                  }`}
                >
                  {i + 1}
                  {isFlagged && <span className="absolute top-0.5 right-0.5 size-1.5 rounded-full bg-amber-400" />}
                </button>
              );
            })}
          </div>
          <div className="mt-4 space-y-1.5 text-xs text-gray-500">
            <div className="flex items-center gap-2"><div className="size-3 rounded bg-[#6750a4]" /><span>Current</span></div>
            <div className="flex items-center gap-2"><div className="size-3 rounded bg-green-100 border border-green-300" /><span>Answered</span></div>
            <div className="flex items-center gap-2"><div className="size-3 rounded bg-gray-100 border border-gray-300" /><span>Unanswered</span></div>
          </div>
        </div>

        {/* ── Main question area ── */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-gray-200 rounded-full mb-6">
            <div
              className="h-full bg-[#6750a4] rounded-full transition-all"
              style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#6750a4] bg-purple-50 border border-purple-200 px-3 py-0.5 rounded-full">
                Question {current + 1} / {QUESTIONS.length}
              </span>
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-0.5 rounded-full">
                {q.type === "mcq" ? "Multiple Choice" : "Short Answer"}
              </span>
            </div>
            <button
              onClick={toggleFlag}
              className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border transition-colors ${
                flagged.has(current)
                  ? "bg-amber-50 border-amber-300 text-amber-600"
                  : "border-gray-200 text-gray-400 hover:border-amber-300 hover:text-amber-500"
              }`}
            >
              <Flag size={12} />
              {flagged.has(current) ? "Flagged" : "Flag"}
            </button>
          </div>

          {/* Question body */}
          <div className="flex-1 max-w-[640px]">
            {q.type === "mcq"
              ? <MCQQuestion question={q} answer={answers[current]} onAnswer={handleAnswer} />
              : <TextQuestion question={q} answer={answers[current]} onAnswer={handleAnswer} />}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="flex items-center gap-2 text-sm text-gray-600 disabled:opacity-30 hover:text-[#6750a4] transition-colors"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <div className="md:hidden">
              <ProgressDots total={QUESTIONS.length} current={current} answered={answered} />
            </div>
            {current < QUESTIONS.length - 1 ? (
              <button
                onClick={() => setCurrent((c) => Math.min(QUESTIONS.length - 1, c + 1))}
                className="flex items-center gap-2 bg-[#6750a4] text-white text-sm px-5 py-2 rounded-full hover:bg-[#5a4490] transition-colors"
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => setShowSubmit(true)}
                className="flex items-center gap-2 bg-green-600 text-white text-sm px-5 py-2 rounded-full hover:bg-green-700 transition-colors"
              >
                <CheckCircle2 size={15} /> Finish & Submit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Submit modal */}
      {showSubmit && (
        <SubmitModal
          unanswered={unanswered}
          onConfirm={handleSubmit}
          onCancel={() => setShowSubmit(false)}
          timeUp={timeUp}
        />
      )}
    </div>
  );
}
