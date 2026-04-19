import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Briefcase, Users, CheckCircle2, Video, Clock, Filter,
  Plus, ChevronRight, ArrowUpRight, BrainCircuit,
  Star, TrendingUp, Eye, MoreHorizontal, Zap,
  AlertCircle,
} from "lucide-react";
import woman from "../../../assets/woman.png";
import Aira from "../../../assets/aira.png";
import hello from "../../../assets/evening.png";

// ── Mock data ──────────────────────────────────────────────────────

const STATS = [
  { label: "Jobs Active",      value: "8",   sub: "12 total posted",   icon: Briefcase,    color: "#6750a4", bg: "bg-[#6750a4]/10", path: "/recruiter/jobs" },
  { label: "Total Applicants", value: "248", sub: "+32 this week",      icon: Users,        color: "#007DFC", bg: "bg-blue-50",      path: "/recruiter/applicants" },
  { label: "Shortlisted",      value: "47",  sub: "19% shortlist rate", icon: CheckCircle2, color: "#17CF97", bg: "bg-green-50",     path: "/recruiter/applicants" },
  { label: "Interviews Today", value: "5",   sub: "Next: 10:00 AM",     icon: Video,        color: "#FF630B", bg: "bg-orange-50",    path: "/recruiter/interviews" },
  { label: "Pending Review",   value: "18",  sub: "Action required",    icon: Clock,        color: "#f59e0b", bg: "bg-amber-50",     path: "/recruiter/applicants" },
];

const JOBS = [
  { id: 1, title: "Frontend Developer (React.js)",  applicants: 45, topMatch: 94, screened: 100, status: "open",   logoIdx: 0 },
  { id: 2, title: "Backend Engineer (Node.js)",     applicants: 32, topMatch: 87, screened: 78,  status: "open",   logoIdx: 1 },
  { id: 3, title: "UI/UX Designer (Figma)",         applicants: 28, topMatch: 91, screened: 85,  status: "open",   logoIdx: 2 },
  { id: 4, title: "Data Scientist (ML/Python)",     applicants: 18, topMatch: 83, screened: 60,  status: "review", logoIdx: 3 },
  { id: 5, title: "DevOps Engineer (AWS/Docker)",   applicants: 8,  topMatch: 76, screened: 40,  status: "open",   logoIdx: 0 },
];

const PIPELINE = [
  { stage: "Applied",     count: 248, color: "#6750a4", pct: 100 },
  { stage: "AI Screened", count: 248, color: "#007DFC", pct: 100 },
  { stage: "Shortlisted", count: 47,  color: "#17CF97", pct: 19 },
  { stage: "Testing",     count: 23,  color: "#f59e0b", pct: 9  },
  { stage: "Interviews",  count: 11,  color: "#FF630B", pct: 4  },
  { stage: "Finalists",   count: 3,   color: "#22c55e", pct: 1  },
];

const APPLICANTS = [
  { id: 1, name: "Ahmed Khan",    initials: "AK", job: "Frontend Developer",  aiScore: 94, status: "shortlisted",    statusColor: "text-green-700 bg-green-50 border-green-200",   date: "Today" },
  { id: 2, name: "Zara Malik",    initials: "ZM", job: "UI/UX Designer",      aiScore: 91, status: "test_assigned",  statusColor: "text-amber-700 bg-amber-50 border-amber-200",   date: "Today" },
  { id: 3, name: "Bilal Hassan",  initials: "BH", job: "Backend Engineer",    aiScore: 82, status: "shortlisted",    statusColor: "text-green-700 bg-green-50 border-green-200",   date: "Yesterday" },
  { id: 4, name: "Sarah Ali",     initials: "SA", job: "Frontend Developer",  aiScore: 87, status: "under_review",   statusColor: "text-blue-700 bg-blue-50 border-blue-200",      date: "Yesterday" },
  { id: 5, name: "Omar Farooq",   initials: "OF", job: "Data Scientist",      aiScore: 76, status: "under_review",   statusColor: "text-blue-700 bg-blue-50 border-blue-200",      date: "2 days ago" },
  { id: 6, name: "Hina Baig",     initials: "HB", job: "DevOps Engineer",     aiScore: 73, status: "under_review",   statusColor: "text-blue-700 bg-blue-50 border-blue-200",      date: "2 days ago" },
];

const STATUS_LABELS: Record<string, string> = {
  shortlisted:  "Shortlisted",
  test_assigned:"Test Assigned",
  under_review: "Under Review",
  rejected:     "Rejected",
};

const INTERVIEWS_TODAY = [
  { time: "10:00 AM", name: "Ahmed Khan",   job: "Frontend Dev",    round: "Technical Round",  color: "#6750a4" },
  { time: "11:30 AM", name: "Zara Malik",   job: "UI/UX Designer",  round: "HR Round",          color: "#17CF97" },
  { time: "02:00 PM", name: "Bilal Hassan", job: "Backend Engineer", round: "Coding Assessment", color: "#FF630B" },
  { time: "03:30 PM", name: "Sara Ali",     job: "Frontend Dev",    round: "Final Round",       color: "#007DFC" },
  { time: "05:00 PM", name: "Omar Farooq",  job: "Data Scientist",  round: "Technical Round",  color: "#f59e0b" },
];

// ── Logo SVGs (matching candidate side style) ─────────────────────
function LogoA() {
  return (
    <div className="size-9 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
      <svg viewBox="0 0 32 32" fill="none" className="size-5">
        <rect x="1" y="1" width="13" height="13" rx="2.5" fill="#17CF97" />
        <rect x="18" y="1" width="13" height="13" rx="2.5" fill="#17CF97" opacity="0.5" />
        <rect x="1" y="18" width="13" height="13" rx="2.5" fill="#17CF97" opacity="0.5" />
        <rect x="18" y="18" width="13" height="13" rx="2.5" fill="#17CF97" />
      </svg>
    </div>
  );
}
function LogoB() {
  return (
    <div className="size-9 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
      <svg viewBox="0 0 32 32" fill="none" className="size-5">
        <circle cx="16" cy="16" r="14" fill="#FF630B" opacity="0.15" />
        <circle cx="16" cy="16" r="8" fill="#FF630B" />
        <circle cx="16" cy="16" r="4" fill="white" />
      </svg>
    </div>
  );
}
function LogoC() {
  return (
    <div className="size-9 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
      <svg viewBox="0 0 32 32" fill="none" className="size-5">
        <circle cx="16" cy="16" r="14" fill="#007DFC" opacity="0.12" />
        <circle cx="16" cy="16" r="9" fill="#007DFC" />
        <circle cx="16" cy="16" r="4" fill="white" />
      </svg>
    </div>
  );
}
function LogoD() {
  return (
    <div className="size-9 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
      <svg viewBox="0 0 32 32" fill="none" className="size-5">
        <rect x="2" y="2" width="28" height="28" rx="5" fill="#6750a4" opacity="0.12" />
        <rect x="5" y="5" width="9" height="9" rx="2" fill="#6750a4" />
        <rect x="18" y="5" width="9" height="9" rx="2" fill="#6750a4" opacity="0.5" />
        <rect x="5" y="18" width="9" height="9" rx="2" fill="#6750a4" opacity="0.5" />
        <rect x="18" y="18" width="9" height="9" rx="2" fill="#6750a4" />
      </svg>
    </div>
  );
}
const LOGOS = [LogoA, LogoB, LogoC, LogoD];

// ── Sub-components ────────────────────────────────────────────────

function StatCard({ stat }: { stat: typeof STATS[0] }) {
  const navigate = useNavigate();
  const Icon = stat.icon;
  return (
    <div
      onClick={() => navigate(stat.path)}
      className="group bg-white rounded-2xl p-5 flex flex-col gap-3 border border-gray-100 shadow-sm cursor-pointer hover:shadow-md hover:shadow-[#6750a4]/8 hover:-translate-y-1 hover:border-[#6750a4]/20 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div className={`size-10 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
          <Icon size={20} style={{ color: stat.color }} />
        </div>
        <ArrowUpRight size={14} className="text-gray-300 group-hover:text-[#6750a4] transition-colors" />
      </div>
      <div>
        <p className="text-3xl font-bold text-black leading-tight">{stat.value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
      </div>
      <p className="text-xs text-gray-400">{stat.sub}</p>
    </div>
  );
}

function JobStatusBadge({ status }: { status: string }) {
  return status === "open"
    ? <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full flex items-center gap-1"><span className="size-1.5 rounded-full bg-green-500" />Open</span>
    : <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1"><span className="size-1.5 rounded-full bg-amber-500" />Review</span>;
}

function ScoreRing({ score, size = 38 }: { score: number; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 85 ? "#17CF97" : score >= 70 ? "#f59e0b" : "#FF630B";
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={5} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={5} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold" style={{ color }}>{score}%</span>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────
export function RecruiterDashboard() {
  const navigate = useNavigate();
  const [hoveredJob, setHoveredJob] = useState<number | null>(null);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-8 bg-[#fafafc] min-h-full space-y-7">

      {/* ── Welcome Banner ─────────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#6750a4] via-[#7c5fbb] to-[#9d7ed4] shadow-xl shadow-[#6750a4]/20">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-8 -left-8 size-40 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-12 left-1/3 size-48 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-0 right-48 size-32 rounded-full bg-white/8 blur-2xl" />
        </div>

        <div className="relative flex items-center justify-between px-8 py-7">
          {/* Text side */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1">
                <span className="size-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/80 text-xs font-medium">AI Active · 248 candidates in pipeline</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white leading-tight">
              {greeting}, Sarah! 👋
            </h1>
            <p className="text-white/70 mt-1 text-base">
              You have <span className="text-white font-semibold">18 candidates</span> pending review and{" "}
              <span className="text-white font-semibold">5 interviews</span> scheduled today.
            </p>

            {/* Quick stats chips */}
            <div className="flex flex-wrap gap-3 mt-4">
              {[
                { label: "AI Screening Complete", icon: BrainCircuit, val: "248/248" },
                { label: "Top Match Today",        icon: Star,          val: "94%" },
                { label: "Avg. Time to Hire",      icon: TrendingUp,    val: "12 days" },
              ].map(({ label, icon: Icon, val }) => (
                <div key={label} className="flex items-center gap-2 bg-white/12 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2">
                  <Icon size={14} className="text-white/70 shrink-0" />
                  <div>
                    <p className="text-[10px] text-white/60 leading-none">{label}</p>
                    <p className="text-sm font-bold text-white leading-tight">{val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => navigate("/recruiter/jobs/post")}
                className="flex items-center gap-2 bg-white text-[#6750a4] text-sm font-bold px-5 py-2.5 rounded-full hover:bg-white/90 hover:shadow-lg transition-all duration-200 group"
              >
                <Plus size={16} className="group-hover:rotate-90 transition-transform duration-200" />
                Post New Job
              </button>
              <button
                onClick={() => navigate("/recruiter/applicants")}
                className="flex items-center gap-2 bg-white/15 text-white text-sm font-medium px-5 py-2.5 rounded-full border border-white/25 hover:bg-white/25 transition-all duration-200"
              >
                Review Applicants <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Illustration side */}
          <div className="hidden lg:flex items-end justify-end shrink-0 relative">
            <img src={hello} alt="No applicants" className="w-auto h-[200px] object-contain " />
          </div>
        </div>
      </div>

      {/* ── Stats Row ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        {STATS.map((s) => <StatCard key={s.label} stat={s} />)}
      </div>

      {/* ── Main content row ───────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* ── LEFT: Active Jobs ── (3/5 width) */}
        <div className="xl:col-span-3 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="font-bold text-black">Active Job Postings</h2>
                <p className="text-xs text-gray-400 mt-0.5">8 open positions · AI screening active</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#6750a4] border border-gray-200 rounded-full px-3 py-1.5 hover:border-[#6750a4]/30 transition-colors">
                  <Filter size={12} /> Filter
                </button>
                <button
                  onClick={() => navigate("/recruiter/jobs/post")}
                  className="flex items-center gap-1.5 bg-[#6750a4] text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#5a4490] hover:shadow-md transition-all"
                >
                  <Plus size={12} /> Post Job
                </button>
              </div>
            </div>

            {/* Job rows */}
            <div className="divide-y divide-gray-50">
              {JOBS.map((job) => {
                const Logo = LOGOS[job.logoIdx % LOGOS.length];
                const isHovered = hoveredJob === job.id;
                return (
                  <div
                    key={job.id}
                    onMouseEnter={() => setHoveredJob(job.id)}
                    onMouseLeave={() => setHoveredJob(null)}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-[#6750a4]/3 transition-colors cursor-pointer group"
                    onClick={() => navigate(`/recruiter/jobs/${job.id}`)}
                  >
                    <Logo />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-black leading-tight group-hover:text-[#6750a4] transition-colors truncate">{job.title}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs text-gray-400">{job.applicants} applicants</span>
                        <span className="text-xs text-gray-300">·</span>
                        <div className="flex items-center gap-1.5 flex-1 min-w-0">
                          <div className="flex-1 h-1.5 rounded-full bg-gray-100 max-w-[80px]">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${job.screened}%`, backgroundColor: job.screened === 100 ? "#17CF97" : "#6750a4" }}
                            />
                          </div>
                          <span className="text-[10px] text-gray-400 shrink-0">
                            {job.screened}% screened
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <ScoreRing score={job.topMatch} />
                      <JobStatusBadge status={job.status} />
                      <div className={`flex gap-1 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                        <button
                          onClick={(e) => { e.stopPropagation(); navigate(`/recruiter/applicants`); }}
                          className="text-xs text-[#6750a4] font-semibold px-3 py-1.5 rounded-full border border-[#6750a4]/30 hover:bg-[#6750a4] hover:text-white transition-all"
                        >
                          Review
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); navigate(`/recruiter/jobs/${job.id}`); }}
                          className="p-1.5 rounded-full text-gray-400 hover:text-[#6750a4] hover:bg-[#6750a4]/8 transition-colors"
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-6 py-3 flex items-center justify-between">
              <p className="text-xs text-gray-400">Showing 5 of 8 active jobs</p>
              <button
                onClick={() => navigate("/recruiter/jobs")}
                className="text-xs text-[#6750a4] font-semibold hover:underline flex items-center gap-1"
              >
                View All Jobs <ChevronRight size={12} />
              </button>
            </div>
          </div>

          {/* ── Recent Applicants Table ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="font-bold text-black">Recent Applicants</h2>
                <p className="text-xs text-gray-400 mt-0.5">Latest candidates — AI scored and ranked</p>
              </div>
              <button
                onClick={() => navigate("/recruiter/applicants")}
                className="text-xs text-[#6750a4] font-semibold hover:underline flex items-center gap-1"
              >
                View All <ChevronRight size={12} />
              </button>
            </div>

            {/* Table head */}
            <div className="grid grid-cols-5 bg-gray-50 border-b border-gray-100 px-6 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <span className="col-span-2">Candidate</span>
              <span>AI Score</span>
              <span>Status</span>
              <span className="text-right">Actions</span>
            </div>

            {APPLICANTS.map((ap, i) => (
              <div
                key={ap.id}
                className={`grid grid-cols-5 items-center px-6 py-3.5 border-b border-gray-50 hover:bg-[#6750a4]/3 transition-colors cursor-pointer group ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                onClick={() => navigate(`/recruiter/applicants/${ap.id}`)}
              >
                {/* Name */}
                <div className="col-span-2 flex items-center gap-3 min-w-0">
                  <div className="size-8 rounded-full bg-gradient-to-br from-[#6750a4] to-[#a78bfa] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {ap.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-black leading-tight group-hover:text-[#6750a4] transition-colors truncate">{ap.name}</p>
                    <p className="text-xs text-gray-400 truncate">{ap.job}</p>
                  </div>
                </div>

                {/* AI Score */}
                <div className="flex items-center gap-2">
                  <ScoreRing score={ap.aiScore} size={34} />
                </div>

                {/* Status */}
                <div>
                  <span className={`text-xs font-medium border px-2.5 py-0.5 rounded-full ${ap.statusColor}`}>
                    {STATUS_LABELS[ap.status]}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/recruiter/applicants/${ap.id}`); }}
                    className="text-xs text-[#6750a4] font-semibold px-2.5 py-1 rounded-lg border border-[#6750a4]/30 hover:bg-[#6750a4] hover:text-white transition-all"
                  >
                    View
                  </button>
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                    <MoreHorizontal size={13} />
                  </button>
                </div>
              </div>
            ))}

            <div className="px-6 py-3 border-t border-gray-100 flex justify-between items-center">
              <p className="text-xs text-gray-400">Showing 6 of 248 applicants</p>
              <button
                onClick={() => navigate("/recruiter/applicants")}
                className="text-xs text-[#6750a4] font-semibold hover:underline flex items-center gap-1"
              >
                View All Applicants <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT: AI Pipeline + Interviews ── (2/5 width) */}
        <div className="xl:col-span-2 flex flex-col gap-6">

          {/* AI Screening Pipeline */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6750a4]/8 to-transparent border-b border-gray-100 px-5 py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <BrainCircuit size={16} className="text-[#6750a4]" />
                  <h2 className="font-bold text-black">AI Screening Pipeline</h2>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Real-time recruitment funnel</p>
              </div>
              <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-2.5 py-1">
                <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-green-700 font-medium">AI Active</span>
              </div>
            </div>

            {/* Illustration */}
            <div className="flex justify-center py-4 px-4 bg-gradient-to-b from-[#6750a4]/3 to-transparent">
              <img src={Aira} alt="No applicants" className="h-[120px] w-auto" />
            </div>

            {/* Funnel stages */}
            <div className="px-5 pb-4 space-y-2.5">
              {PIPELINE.map((p, i) => (
                <div key={p.stage} className="group">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 font-mono w-3">{String(i + 1)}</span>
                      <span className="text-xs font-semibold text-gray-700">{p.stage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold" style={{ color: p.color }}>{p.count}</span>
                      <span className="text-[10px] text-gray-400">({p.pct}%)</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${p.pct}%`, backgroundColor: p.color, opacity: 0.85 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* AI insight */}
            <div className="mx-5 mb-4 rounded-xl bg-[#6750a4]/6 border border-[#6750a4]/12 p-3 flex gap-2">
              <Zap size={14} className="text-[#6750a4] shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-semibold text-[#6750a4]">AI Insight:</span> Shortlist rate is 19% — above the 15% industry average. Top 3 finalists ready for your review.
              </p>
            </div>

            <div className="border-t border-gray-100 px-5 py-3">
              <button
                onClick={() => navigate("/recruiter/ai-screening")}
                className="w-full text-xs text-center text-[#6750a4] font-semibold hover:underline flex items-center justify-center gap-1"
              >
                View Full AI Report <ChevronRight size={12} />
              </button>
            </div>
          </div>

          {/* Today's Interviews */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header with illustration */}
            <div className="relative bg-gradient-to-r from-[#FF630B]/8 to-transparent border-b border-gray-100 px-5 py-4 overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Video size={16} className="text-[#FF630B]" />
                    <h2 className="font-bold text-black">Today's Interviews</h2>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{INTERVIEWS_TODAY.length} sessions scheduled</p>
                </div>
              <img src={woman} alt="No applicants" className="h-[80px] w-auto" />
              </div>
            </div>

            {/* Schedule list */}
            <div className="divide-y divide-gray-50 px-5">
              {INTERVIEWS_TODAY.map((iv) => (
                <div
                  key={iv.name}
                  className="py-3 flex items-center gap-3 group hover:bg-[#6750a4]/3 -mx-5 px-5 transition-colors cursor-pointer rounded-xl"
                  onClick={() => navigate("/recruiter/interviews")}
                >
                  {/* Time chip */}
                  <div className="w-16 shrink-0">
                    <div
                      className="text-center text-[10px] font-bold px-2 py-1.5 rounded-lg"
                      style={{ backgroundColor: iv.color + "18", color: iv.color }}
                    >
                      {iv.time}
                    </div>
                  </div>

                  {/* Left accent line */}
                  <div className="w-0.5 h-9 rounded-full shrink-0" style={{ backgroundColor: iv.color }} />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-black leading-tight group-hover:text-[#6750a4] transition-colors truncate">{iv.name}</p>
                    <p className="text-xs text-gray-400 leading-tight mt-0.5 truncate">{iv.job} · {iv.round}</p>
                  </div>

                  <ChevronRight size={13} className="text-gray-300 group-hover:text-[#6750a4] transition-colors shrink-0" />
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 px-5 py-3 mt-1">
              <button
                onClick={() => navigate("/recruiter/interviews")}
                className="w-full text-xs text-center text-[#6750a4] font-semibold hover:underline flex items-center justify-center gap-1"
              >
                View All Interviews <ChevronRight size={12} />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-bold text-black mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: "Post New Job",       icon: Plus,          color: "#6750a4", bg: "bg-[#6750a4]/8",  path: "/recruiter/jobs/post" },
                { label: "Review CVs",         icon: Eye,           color: "#007DFC", bg: "bg-blue-50",      path: "/recruiter/applicants" },
                { label: "AI Screening",       icon: BrainCircuit,  color: "#17CF97", bg: "bg-green-50",     path: "/recruiter/ai-screening" },
                { label: "Assign Test",        icon: AlertCircle,   color: "#f59e0b", bg: "bg-amber-50",     path: "/recruiter/tests" },
                { label: "Schedule Interview", icon: Video,         color: "#FF630B", bg: "bg-orange-50",    path: "/recruiter/interviews" },
                { label: "View Reports",       icon: TrendingUp,    color: "#6750a4", bg: "bg-[#6750a4]/8",  path: "/recruiter/reports" },
              ].map(({ label, icon: Icon, color, bg, path }) => (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className={`flex flex-col items-center gap-2 p-3.5 rounded-xl ${bg} hover:scale-105 hover:shadow-sm transition-all duration-200 text-center group`}
                >
                  <div className="size-8 rounded-xl bg-white/60 flex items-center justify-center group-hover:bg-white transition-colors shadow-sm">
                    <Icon size={16} style={{ color }} />
                  </div>
                  <span className="text-[11px] font-semibold leading-tight" style={{ color }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}