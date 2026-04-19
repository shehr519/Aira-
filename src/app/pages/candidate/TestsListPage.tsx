import { useNavigate } from "react-router";
import { Clock, CheckCircle2, Circle, AlertCircle, Calendar, BookOpen } from "lucide-react";

// ── Company logo variants ─────────────────────────────────────────
function LogoA() {
  return (
    <div className="size-12 rounded-xl overflow-hidden shrink-0 bg-white border border-gray-100 flex items-center justify-center shadow-sm">
      <svg viewBox="0 0 40 40" fill="none" className="size-8">
        <rect x="1" y="1" width="16" height="16" rx="3" fill="#17CF97" />
        <rect x="23" y="1" width="16" height="16" rx="3" fill="#17CF97" opacity="0.5" />
        <rect x="1" y="23" width="16" height="16" rx="3" fill="#17CF97" opacity="0.5" />
        <rect x="23" y="23" width="16" height="16" rx="3" fill="#17CF97" />
      </svg>
    </div>
  );
}
function LogoB() {
  return (
    <div className="size-12 rounded-xl overflow-hidden shrink-0 bg-white border border-gray-100 flex items-center justify-center shadow-sm">
      <svg viewBox="0 0 40 40" fill="none" className="size-8">
        <circle cx="20" cy="20" r="17" fill="#FF630B" opacity="0.15" />
        <circle cx="20" cy="20" r="10" fill="#FF630B" />
        <circle cx="20" cy="20" r="5" fill="white" />
      </svg>
    </div>
  );
}
function LogoC() {
  return (
    <div className="size-12 rounded-xl overflow-hidden shrink-0 bg-white border border-gray-100 flex items-center justify-center shadow-sm">
      <svg viewBox="0 0 40 40" fill="none" className="size-8">
        <circle cx="20" cy="20" r="17" fill="#007DFC" opacity="0.12" />
        <circle cx="20" cy="20" r="11" fill="#007DFC" />
        <circle cx="20" cy="20" r="5" fill="white" />
      </svg>
    </div>
  );
}
function LogoD() {
  return (
    <div className="size-12 rounded-xl overflow-hidden shrink-0 bg-white border border-gray-100 flex items-center justify-center shadow-sm">
      <svg viewBox="0 0 40 40" fill="none" className="size-8">
        <rect x="4" y="4" width="32" height="32" rx="6" fill="#6750a4" opacity="0.12" />
        <rect x="8" y="8" width="10" height="10" rx="2" fill="#6750a4" />
        <rect x="22" y="8" width="10" height="10" rx="2" fill="#6750a4" opacity="0.5" />
        <rect x="8" y="22" width="10" height="10" rx="2" fill="#6750a4" opacity="0.5" />
        <rect x="22" y="22" width="10" height="10" rx="2" fill="#6750a4" />
      </svg>
    </div>
  );
}

const LOGOS = [LogoA, LogoB, LogoC, LogoD];

// ── Test data ─────────────────────────────────────────────────────
type TestStatus = "pending" | "completed" | "expired";

interface Test {
  id: number;
  company: string;
  role: string;
  testName: string;
  duration: number; // minutes
  questions: number;
  deadline: string;
  status: TestStatus;
  score?: number;
  logoIndex: number;
  topics: string[];
}

const TESTS: Test[] = [
  {
    id: 1,
    company: "Btab Group",
    role: "Frontend Developer (React.js)",
    testName: "Frontend Developer Assessment",
    duration: 30,
    questions: 20,
    deadline: "Apr 18, 2026",
    status: "pending",
    logoIndex: 0,
    topics: ["React.js", "JavaScript", "CSS"],
  },
  {
    id: 2,
    company: "TechCorp Pakistan",
    role: "UI/UX Developer",
    testName: "UI Design & Figma Skills Test",
    duration: 45,
    questions: 15,
    deadline: "Apr 20, 2026",
    status: "pending",
    logoIndex: 1,
    topics: ["Figma", "UI/UX", "Prototyping"],
  },
  {
    id: 3,
    company: "DevNation Ltd.",
    role: "Full Stack Developer",
    testName: "Full Stack Aptitude Assessment",
    duration: 60,
    questions: 30,
    deadline: "Apr 15, 2026",
    status: "completed",
    score: 88,
    logoIndex: 2,
    topics: ["React", "Node.js", "SQL"],
  },
  {
    id: 4,
    company: "Netsol Technologies",
    role: "Software Engineer",
    testName: "General Programming Test",
    duration: 40,
    questions: 25,
    deadline: "Apr 10, 2026",
    status: "expired",
    logoIndex: 3,
    topics: ["Algorithms", "Data Structures", "OOP"],
  },
];

// ── Status badge ──────────────────────────────────────────────────
function StatusBadge({ status, score }: { status: TestStatus; score?: number }) {
  if (status === "completed")
    return (
      <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs px-3 py-1 rounded-full">
        <CheckCircle2 size={12} /> Completed · {score}%
      </div>
    );
  if (status === "expired")
    return (
      <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-1 rounded-full">
        <AlertCircle size={12} /> Expired
      </div>
    );
  return (
    <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 text-[#6750a4] text-xs px-3 py-1 rounded-full">
      <Circle size={12} /> Pending
    </div>
  );
}

// ── Topic chip ────────────────────────────────────────────────────
function TopicChip({ label }: { label: string }) {
  return (
    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full border border-gray-200">
      {label}
    </span>
  );
}

// ── Test Card ─────────────────────────────────────────────────────
function TestCard({ test }: { test: Test }) {
  const navigate = useNavigate();
  const Logo = LOGOS[test.logoIndex % LOGOS.length];

  const handleAction = () => {
    if (test.status === "pending") navigate(`/tests/${test.id}`);
    else if (test.status === "completed") navigate(`/tests/${test.id}/result`);
  };

  return (
    <div
      className={`group bg-white rounded-2xl shadow-sm border p-5 flex flex-col gap-4 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#6750a4]/8 ${
        test.status === "pending"
          ? "border-gray-100 hover:border-[#6750a4]/20"
          : test.status === "completed"
          ? "border-green-100/60 hover:border-green-200"
          : "border-red-100/50 hover:border-red-200"
      }`}
      onClick={handleAction}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="transition-transform duration-200 group-hover:scale-105">
          <Logo />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <h3 className="text-base font-bold text-black leading-tight">{test.testName}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{test.company}</p>
              <p className="text-xs text-gray-400">{test.role}</p>
            </div>
            <StatusBadge status={test.status} score={test.score} />
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="flex flex-wrap gap-1.5">
        {test.topics.map((t) => <TopicChip key={t} label={t} />)}
      </div>

      {/* Meta */}
      <div className="flex items-center gap-5 text-sm text-gray-500">
        <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#6750a4]" />{test.duration} min</span>
        <span className="flex items-center gap-1.5"><BookOpen size={14} className="text-[#6750a4]" />{test.questions} questions</span>
        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#6750a4]" />Due {test.deadline}</span>
      </div>

      {/* Action */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        {test.status === "expired" ? (
          <p className="text-xs text-red-400 italic">This test is no longer available.</p>
        ) : (
          <p className="text-xs text-gray-400 italic">
            {test.status === "completed" ? "You completed this test." : "You haven't attempted this test yet."}
          </p>
        )}
        {test.status !== "expired" && (
          <button
            onClick={handleAction}
            className={`text-sm px-5 py-1.5 rounded-full transition-colors ${
              test.status === "completed"
                ? "border border-[#6750a4] text-[#6750a4] hover:bg-purple-50"
                : "bg-[#6750a4] text-white hover:bg-[#5a4490]"
            }`}
          >
            {test.status === "completed" ? "View Result" : "Start Test"}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Summary stats ────────────────────────────────────────────────
function StatBox({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 px-5 py-3 flex flex-col gap-0.5 shadow-sm">
      <span className="text-2xl font-bold" style={{ color }}>{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────
export function TestsListPage() {
  return (
    <div className="p-8 bg-[#fafafc] min-h-full">
      {/* Header */}
      <h1 className="text-3xl font-bold text-black mb-1">Your Tests</h1>
      <p className="text-base text-gray-500 mb-6">
        Complete the assessments sent by companies you have applied to.
      </p>

      {/* Summary stats */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <StatBox label="Total Tests" value={4} color="#6750a4" />
        <StatBox label="Pending" value={2} color="#f59e0b" />
        <StatBox label="Completed" value={1} color="#22c55e" />
        <StatBox label="Expired" value={1} color="#ef4444" />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {TESTS.map((t) => <TestCard key={t.id} test={t} />)}
      </div>
    </div>
  );
}