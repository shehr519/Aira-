import { useState } from "react";
import { useNavigate } from "react-router";
import {
  BrainCircuit, Zap, Star, TrendingUp, Users, ChevronRight,
  CheckCircle2, AlertCircle, Eye, RefreshCw, Sparkles,
} from "lucide-react";
import screeningrobot from "../../../assets/screening.png";
// ── Mock data ─────────────────────────────────────────────────────
const PIPELINE = [
  { stage: "Applied",     count: 248, color: "#6750a4", pct: 100, icon: Users },
  { stage: "AI Screened", count: 248, color: "#007DFC", pct: 100, icon: BrainCircuit },
  { stage: "Shortlisted", count: 47,  color: "#17CF97", pct: 19,  icon: CheckCircle2 },
  { stage: "Testing",     count: 23,  color: "#f59e0b", pct: 9,   icon: AlertCircle },
  { stage: "Interviews",  count: 11,  color: "#FF630B", pct: 4,   icon: Users },
  { stage: "Finalists",   count: 3,   color: "#22c55e", pct: 1,   icon: Star },
];

const TOP_CANDIDATES = [
  { id: 1, name: "Ahmed Khan",   initials: "AK", job: "Frontend Dev",    score: 94, resumeScore: 91, testScore: 88, skills: ["React.js","TypeScript","Node.js"],      rank: 1, color: "#6750a4" },
  { id: 2, name: "Zara Malik",   initials: "ZM", job: "UI/UX Designer",  score: 91, resumeScore: 88, testScore: 90, skills: ["Figma","Adobe XD","User Research"],      rank: 2, color: "#17CF97" },
  { id: 3, name: "Sara Ali",     initials: "SA", job: "Frontend Dev",    score: 87, resumeScore: 84, testScore: 85, skills: ["React.js","CSS","REST API"],             rank: 3, color: "#007DFC" },
  { id: 4, name: "Usman Tariq",  initials: "UT", job: "Product Manager", score: 88, resumeScore: 85, testScore: null, skills: ["Roadmap","Agile","Stakeholders"],      rank: 4, color: "#f59e0b" },
  { id: 5, name: "Bilal Hassan", initials: "BH", job: "Backend Eng.",    score: 82, resumeScore: 79, testScore: 80, skills: ["Node.js","PostgreSQL","Docker"],         rank: 5, color: "#FF630B" },
];

const AI_INSIGHTS = [
  { title: "Top Skill Cluster",   value: "React.js + TypeScript",      note: "Most common combination in shortlisted candidates",                             icon: BrainCircuit, color: "#6750a4" },
  { title: "Screening Accuracy",  value: "97.2%",                       note: "AI decisions validated against manual reviews over past 30 days",               icon: CheckCircle2, color: "#17CF97" },
  { title: "Avg. Screening Time", value: "< 2 seconds",                 note: "Per resume — down from 4 hrs manual average",                                   icon: Zap,          color: "#FF630B" },
  { title: "Bias Score",          value: "0.02 (Excellent)",            note: "Near-zero gender/age/location bias detected in current screening round",         icon: Star,         color: "#007DFC" },
];

const SUGGESTED = [
  { id: 10, name: "Rania Qureshi", initials: "RQ", job: "DevOps Engineer", matchScore: 89, lastActive: "2 days ago",  color: "#e879f9", reason: "Strong AWS + Docker + Kubernetes skill set from previous screening" },
  { id: 11, name: "Kamran Aziz",   initials: "KA", job: "Data Scientist",  matchScore: 86, lastActive: "1 week ago",  color: "#06b6d4", reason: "Matched 8/10 criteria for open ML role, previously screened for similar position" },
  { id: 12, name: "Aisha Kamal",   initials: "AK", job: "UI/UX Designer",  matchScore: 84, lastActive: "3 days ago",  color: "#f43f5e", reason: "Portfolio reviewed by AI — strong Figma + prototyping skills" },
];

function ScoreRing({ score, size = 44 }: { score: number; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 85 ? "#17CF97" : score >= 70 ? "#f59e0b" : "#FF630B";
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={5} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold" style={{ color }}>{score}%</span>
    </div>
  );
}

export function AIScreeningPage() {
  const navigate = useNavigate();
  const [activeJob, setActiveJob] = useState("all");

  return (
    <div className="p-8 bg-[#fafafc] min-h-full space-y-7">

      {/* ── Page header ── */}
      <div className="relative bg-gradient-to-r from-[#6750a4] via-[#7c5fbb] to-[#9d7ed4] rounded-3xl px-8 py-7 overflow-hidden shadow-xl shadow-[#6750a4]/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-10 size-40 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-0 right-60 size-32 rounded-full bg-white/8 blur-2xl" />
        </div>
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1">
                <span className="size-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/80 text-xs font-medium">AI Engine Active · Processing 248 candidates</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-1">AI Screening Intelligence</h1>
            <p className="text-white/70">AIRA is automatically screening, scoring, and ranking every applicant</p>
            <div className="flex gap-3 mt-4">
              {[
                { label: "Screened", val: "248" },
                { label: "Shortlisted", val: "47" },
                { label: "Accuracy", val: "97%" },
              ].map(({ label, val }) => (
                <div key={label} className="bg-white/12 border border-white/20 rounded-xl px-4 py-2">
                  <p className="text-xl font-bold text-white">{val}</p>
                  <p className="text-white/60 text-[10px]">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <img src={screeningrobot} alt="No applicants" className="h-[180px] w-auto" />
        </div>
      </div>

      {/* ── AI Insights strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {AI_INSIGHTS.map((ins) => {
          const Icon = ins.icon;
          return (
            <div key={ins.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
              <div className="flex items-start justify-between mb-3">
                <div className="size-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: ins.color + "18" }}>
                  <Icon size={17} style={{ color: ins.color }} />
                </div>
                <ChevronRight size={14} className="text-gray-300 group-hover:text-[#6750a4] transition-colors" />
              </div>
              <p className="text-lg font-bold text-black leading-tight mb-0.5">{ins.value}</p>
              <p className="text-xs font-semibold text-gray-600 mb-1">{ins.title}</p>
              <p className="text-[10px] text-gray-400 leading-relaxed">{ins.note}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* ── Left: Top Ranked Candidates ── */}
        <div className="xl:col-span-3 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#6750a4]/5 to-transparent">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-[#6750a4]" />
                <h2 className="font-bold text-black">AI-Ranked Top Candidates</h2>
                <span className="text-xs text-[#6750a4] bg-[#6750a4]/8 border border-[#6750a4]/15 rounded-full px-2 py-0.5">Sorted by Score</span>
              </div>
              <button onClick={() => navigate("/recruiter/applicants")} className="text-xs text-[#6750a4] font-semibold hover:underline flex items-center gap-1">
                View All <ChevronRight size={12} />
              </button>
            </div>

            {/* Job filter */}
            <div className="flex gap-1.5 px-6 py-3 border-b border-gray-50 overflow-x-auto">
              {["all", "Frontend Dev", "UI/UX Designer", "Backend Eng.", "Product Manager"].map((j) => (
                <button key={j} onClick={() => setActiveJob(j)}
                  className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${activeJob === j ? "bg-[#6750a4] text-white" : "bg-gray-100 text-gray-500 hover:bg-[#6750a4]/8 hover:text-[#6750a4]"}`}>
                  {j === "all" ? "All Jobs" : j}
                </button>
              ))}
            </div>

            {TOP_CANDIDATES.map((c, i) => (
              <div key={c.id} className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 hover:bg-[#6750a4]/3 transition-colors cursor-pointer group"
                onClick={() => navigate(`/recruiter/applicants/${c.id}`)}>
                {/* Rank */}
                <div className={`size-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  i === 0 ? "bg-amber-400 text-white" : i === 1 ? "bg-gray-300 text-white" : i === 2 ? "bg-orange-400 text-white" : "bg-gray-100 text-gray-500"
                }`}>{c.rank}</div>

                {/* Avatar */}
                <div className="size-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: `linear-gradient(135deg,${c.color},${c.color}99)` }}>{c.initials}</div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-black group-hover:text-[#6750a4] transition-colors">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.job}</p>
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {c.skills.slice(0,3).map((s) => (
                      <span key={s} className="text-[9px] bg-[#6750a4]/6 text-[#6750a4] border border-[#6750a4]/12 px-1.5 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Scores */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-center hidden sm:block">
                    <p className="text-[10px] text-gray-400">Resume</p>
                    <p className="text-xs font-bold text-gray-700">{c.resumeScore}%</p>
                  </div>
                  <div className="text-center hidden sm:block">
                    <p className="text-[10px] text-gray-400">Test</p>
                    <p className="text-xs font-bold text-gray-700">{c.testScore ?? "N/A"}</p>
                  </div>
                  <ScoreRing score={c.score} />
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/recruiter/applicants/${c.id}`); }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[#6750a4] font-semibold border border-[#6750a4]/30 px-2.5 py-1 rounded-lg hover:bg-[#6750a4]/8"
                  >
                    <Eye size={12} />
                  </button>
                </div>
              </div>
            ))}

            <div className="px-6 py-3 border-t border-gray-100">
              <button onClick={() => navigate("/recruiter/applicants")} className="w-full text-xs text-center text-[#6750a4] font-semibold hover:underline flex items-center justify-center gap-1">
                View All 47 Shortlisted Candidates <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Right: Pipeline + Suggestions ── */}
        <div className="xl:col-span-2 space-y-5">

          {/* AI Pipeline Funnel */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp size={15} className="text-[#6750a4]" />
                <h2 className="font-bold text-black">Recruitment Funnel</h2>
              </div>
              <button className="size-7 rounded-lg text-gray-400 hover:text-[#6750a4] hover:bg-[#6750a4]/8 transition-colors flex items-center justify-center">
                <RefreshCw size={13} />
              </button>
            </div>
            <div className="px-5 py-4 space-y-3">
              {PIPELINE.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.stage} className="group">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="size-5 rounded-full flex items-center justify-center" style={{ backgroundColor: p.color + "22" }}>
                          <Icon size={10} style={{ color: p.color }} />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{p.stage}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold" style={{ color: p.color }}>{p.count}</span>
                        <span className="text-[10px] text-gray-400 w-9 text-right">({p.pct}%)</span>
                      </div>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700 group-hover:brightness-110" style={{ width: `${p.pct}%`, backgroundColor: p.color, opacity: 0.85 }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mx-4 mb-4 p-3 bg-[#6750a4]/5 border border-[#6750a4]/12 rounded-xl flex gap-2">
              <Zap size={13} className="text-[#6750a4] shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-600 leading-relaxed"><span className="font-semibold text-[#6750a4]">AI Insight:</span> Shortlist rate at 19% exceeds the 15% industry benchmark. 3 finalists ready for offer discussion.</p>
            </div>
          </div>

          {/* AI Suggested Candidates */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-transparent">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-green-600" />
                <h2 className="font-bold text-black">AI Suggested Candidates</h2>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">From existing talent pool — proactively matched</p>
            </div>
            <div className="divide-y divide-gray-50 px-5">
              {SUGGESTED.map((s) => (
                <div key={s.id} className="py-4 group cursor-pointer hover:bg-[#6750a4]/3 -mx-5 px-5 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: `linear-gradient(135deg,${s.color},${s.color}99)` }}>{s.initials}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-black group-hover:text-[#6750a4] transition-colors">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.job} · Active {s.lastActive}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-[#17CF97]">{s.matchScore}%</p>
                      <p className="text-[10px] text-gray-400">match</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed bg-green-50/60 rounded-lg px-2.5 py-1.5 border border-green-100">{s.reason}</p>
                  <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex-1 text-xs text-[#6750a4] font-semibold py-1.5 border border-[#6750a4]/30 rounded-lg hover:bg-[#6750a4]/8 transition-colors">Invite to Apply</button>
                    <button onClick={() => navigate(`/recruiter/applicants/${s.id}`)} className="flex-1 text-xs text-gray-600 font-semibold py-1.5 border border-gray-200 rounded-lg hover:border-[#6750a4]/30 transition-colors">View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
