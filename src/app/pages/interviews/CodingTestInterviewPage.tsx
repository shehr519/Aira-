import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { Clock, Play, ChevronRight, Check, AlertTriangle, ChevronDown, Send, RotateCcw, BookOpen } from "lucide-react";
import { getInterview } from "./interviewData";

// ── Problem data ──────────────────────────────────────────────────
const PROBLEMS = [
  {
    id: 1,
    title: "Flatten Nested Array",
    difficulty: "Medium",
    tags: ["Arrays", "Recursion"],
    description: `Given a deeply nested array of integers, write a function that flattens it into a single-level array.

You must implement this without using Array.prototype.flat().`,
    examples: [
      { input: "[1, [2, [3, [4]], 5]]", output: "[1, 2, 3, 4, 5]" },
      { input: "[[1, 2], [3, [4, 5]]]", output: "[1, 2, 3, 4, 5]" },
    ],
    constraints: [
      "The input array can be arbitrarily deeply nested.",
      "All leaf values are integers.",
      "Do not use Array.prototype.flat().",
    ],
    starterCode: `/**
 * @param {Array} arr - A deeply nested array
 * @returns {number[]} - A flattened array
 */
function flattenArray(arr) {
  // Write your solution here
  
}

// Test your solution
console.log(flattenArray([1, [2, [3, [4]], 5]]));
console.log(flattenArray([[1, 2], [3, [4, 5]]]));
`,
    solution: `function flattenArray(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), 
  []);
}`,
  },
  {
    id: 2,
    title: "Debounce Function",
    difficulty: "Hard",
    tags: ["JavaScript", "Closures"],
    description: `Implement a debounce function that delays invoking the provided function until after a specified number of milliseconds have elapsed since the last time it was invoked.`,
    examples: [
      { input: "debounce(fn, 300)", output: "Returns a new function that delays fn by 300ms" },
    ],
    constraints: [
      "Must return a new function.",
      "The returned function should clear previous timer on each call.",
      "The function should be called with the correct context and arguments.",
    ],
    starterCode: `/**
 * @param {Function} fn
 * @param {number} delay - milliseconds
 * @returns {Function}
 */
function debounce(fn, delay) {
  // Write your solution here
  
}

// Example usage:
const debouncedFn = debounce(() => console.log("Fired!"), 300);
`,
    solution: `function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
  },
];

// ── Test case result ──────────────────────────────────────────────
interface TestResult { input: string; expected: string; got: string; passed: boolean; }

function runTests(code: string, prob: typeof PROBLEMS[0]): TestResult[] {
  // Simulate test results based on code length / content heuristic
  const hasReturn = code.includes("return");
  const hasLogic = code.length > prob.starterCode.length + 30;
  return prob.examples.map((ex, i) => ({
    input: ex.input,
    expected: ex.output,
    got: hasReturn && hasLogic ? ex.output : "undefined",
    passed: hasReturn && hasLogic,
  }));
}

// ── Timer ─────────────────────────────────────────────────────────
const TOTAL = 90 * 60;
function Timer({ secs }: { secs: number }) {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  const critical = secs < 600;
  return (
    <div className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full ${critical ? "bg-red-100 text-red-600 animate-pulse" : "bg-gray-100 text-gray-700"}`}>
      <Clock size={14} /> {m}:{s}
    </div>
  );
}

// ── Difficulty badge ──────────────────────────────────────────────
function DiffBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    Easy: "bg-green-50 text-green-700 border-green-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    Hard: "bg-red-50 text-red-700 border-red-200",
  };
  return <span className={`text-xs border px-2.5 py-0.5 rounded-full ${map[level] ?? map.Medium}`}>{level}</span>;
}

// ── Line numbers + code editor ────────────────────────────────────
function CodeEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const lines = value.split("\n");
  return (
    <div className="flex flex-1 overflow-auto bg-[#1e1e2e] rounded-xl font-mono text-sm">
      {/* Line numbers */}
      <div className="select-none text-right text-gray-600 px-3 py-4 border-r border-gray-700 min-w-[48px]">
        {lines.map((_, i) => (
          <div key={i} className="leading-6 text-xs">{i + 1}</div>
        ))}
      </div>
      {/* Editable area */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent text-[#cdd6f4] caret-white outline-none resize-none px-4 py-4 leading-6 overflow-auto"
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
      />
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────
export function CodingTestInterviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const interview = getInterview(Number(id));

  const [timeLeft, setTimeLeft] = useState(TOTAL);
  const [probIdx, setProbIdx] = useState(0);
  const [code, setCode] = useState(PROBLEMS[0].starterCode);
  const [output, setOutput] = useState<TestResult[] | null>(null);
  const [tab, setTab] = useState<"problem" | "output">("problem");
  const [submitted, setSubmitted] = useState(false);
  const [lang, setLang] = useState("JavaScript");
  const [langOpen, setLangOpen] = useState(false);

  const problem = PROBLEMS[probIdx];

  // Switch problem → reset code
  useEffect(() => { setCode(PROBLEMS[probIdx].starterCode); setOutput(null); setTab("problem"); }, [probIdx]);

  // Countdown
  useEffect(() => {
    if (submitted || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [submitted, timeLeft]);

  const handleRun = useCallback(() => {
    const results = runTests(code, problem);
    setOutput(results);
    setTab("output");
  }, [code, problem]);

  const handleSubmit = () => setSubmitted(true);
  const handleReset = () => { setCode(problem.starterCode); setOutput(null); };

  if (submitted) {
    const allPassed = output?.every((r) => r.passed);
    return (
      <div className="bg-[#fafafc] min-h-full flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className={`size-20 rounded-full mx-auto mb-5 flex items-center justify-center ${allPassed ? "bg-green-100" : "bg-amber-100"}`}>
            {allPassed ? <Check size={36} className="text-green-500" /> : <AlertTriangle size={36} className="text-amber-500" />}
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">
            {allPassed ? "Solution Submitted! 🎉" : "Submitted with Issues"}
          </h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            {allPassed
              ? "All test cases passed. Your solution has been recorded and sent to the company for review."
              : "Some test cases failed. Your current solution has been saved and the company will review it."}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
            <div className="bg-gray-50 rounded-xl py-3">
              <p className="font-bold text-black">{PROBLEMS.length}</p>
              <p className="text-gray-500 text-xs">Problems</p>
            </div>
            <div className="bg-gray-50 rounded-xl py-3">
              <p className={`font-bold ${allPassed ? "text-green-600" : "text-amber-600"}`}>
                {output?.filter((r) => r.passed).length ?? 0}/{output?.length ?? 0}
              </p>
              <p className="text-gray-500 text-xs">Tests Passed</p>
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
      <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between shrink-0">
        <div>
          <p className="text-xs text-gray-500">{interview?.company ?? "Coding Interview"}</p>
          <p className="text-sm font-bold text-black">{interview?.round ?? "Coding Assessment"}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Problem switcher */}
          <div className="hidden sm:flex gap-1">
            {PROBLEMS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setProbIdx(i)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  probIdx === i ? "bg-[#6750a4] text-white border-[#6750a4]" : "bg-white text-gray-600 border-gray-200 hover:border-[#6750a4]"
                }`}
              >
                Problem {i + 1}
              </button>
            ))}
          </div>
          <Timer secs={timeLeft} />
          <button onClick={handleSubmit} className="bg-[#6750a4] text-white text-xs px-4 py-2 rounded-full hover:bg-[#5a4490] transition-colors flex items-center gap-1.5">
            <Send size={13} /> Submit
          </button>
        </div>
      </div>

      {/* ── Split pane ── */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Left: problem description */}
        <div className="w-[380px] shrink-0 bg-white border-r border-gray-200 overflow-y-auto flex flex-col">
          <div className="flex border-b border-gray-100">
            {(["problem", "output"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-sm capitalize transition-colors border-b-2 -mb-px ${
                  tab === t ? "border-[#6750a4] text-[#6750a4] font-semibold" : "border-transparent text-gray-500"
                }`}
              >
                {t === "output" ? "Test Results" : "Problem"}
              </button>
            ))}
          </div>

          {tab === "problem" ? (
            <div className="p-5 space-y-5">
              {/* Problem header */}
              <div>
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <h2 className="text-base font-bold text-black">{problem.id}. {problem.title}</h2>
                  <DiffBadge level={problem.difficulty} />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {problem.tags.map((t) => (
                    <span key={t} className="text-xs bg-purple-50 text-[#6750a4] border border-purple-100 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{problem.description}</p>
              </div>

              {/* Examples */}
              <div>
                <p className="text-sm font-bold text-black mb-2 flex items-center gap-1.5"><BookOpen size={14} className="text-[#6750a4]" /> Examples</p>
                {problem.examples.map((ex, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3 mb-2 font-mono text-xs space-y-1">
                    <p><span className="text-gray-500">Input: </span><span className="text-gray-800">{ex.input}</span></p>
                    <p><span className="text-gray-500">Output: </span><span className="text-green-700 font-semibold">{ex.output}</span></p>
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div>
                <p className="text-sm font-bold text-black mb-2">Constraints</p>
                <ul className="space-y-1.5">
                  {problem.constraints.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <ChevronRight size={12} className="text-[#6750a4] mt-0.5 shrink-0" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-5">
              {!output ? (
                <div className="text-center py-10">
                  <p className="text-gray-400 text-sm">Run your code to see test results</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm font-bold text-black mb-3">
                    {output.filter((r) => r.passed).length}/{output.length} test cases passed
                  </p>
                  {output.map((res, i) => (
                    <div key={i} className={`rounded-xl border p-3 ${res.passed ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {res.passed
                          ? <Check size={14} className="text-green-600" />
                          : <AlertTriangle size={14} className="text-red-500" />}
                        <span className={`text-xs font-semibold ${res.passed ? "text-green-700" : "text-red-600"}`}>
                          Test {i + 1}: {res.passed ? "Passed" : "Failed"}
                        </span>
                      </div>
                      <div className="font-mono text-xs space-y-1">
                        <p><span className="text-gray-500">Input: </span>{res.input}</p>
                        <p><span className="text-gray-500">Expected: </span><span className="text-green-700">{res.expected}</span></p>
                        {!res.passed && <p><span className="text-gray-500">Got: </span><span className="text-red-600">{res.got}</span></p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: code editor */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Editor toolbar */}
          <div className="bg-[#1e1e2e] border-b border-gray-700 px-4 py-2 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              {/* Language selector */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 bg-gray-700 text-gray-300 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {lang} <ChevronDown size={12} />
                </button>
                {langOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-10 overflow-hidden">
                    {["JavaScript", "TypeScript", "Python"].map((l) => (
                      <button key={l} onClick={() => { setLang(l); setLangOpen(false); }}
                        className={`w-full text-left text-xs px-4 py-2.5 hover:bg-gray-700 transition-colors ${lang === l ? "text-[#6750a4]" : "text-gray-300"}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleReset} className="flex items-center gap-1 text-gray-400 hover:text-white text-xs transition-colors">
                <RotateCcw size={12} /> Reset
              </button>
              <button
                onClick={handleRun}
                className="flex items-center gap-1.5 bg-[#17CF97] text-gray-900 text-xs px-4 py-1.5 rounded-lg hover:bg-green-400 transition-colors font-semibold"
              >
                <Play size={13} /> Run Code
              </button>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <CodeEditor value={code} onChange={setCode} />
          </div>
        </div>
      </div>
    </div>
  );
}
