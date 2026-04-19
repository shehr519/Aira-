import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Plus, Search, Filter, Briefcase, Users, Eye, Edit3,
  Trash2, ChevronRight, MapPin, Clock, MoreHorizontal,
  TrendingUp, CheckCircle2, AlertCircle, Globe, Building,
} from "lucide-react";
import noApplicantsImg from "../../../assets/aira.png";

// ── Mock data ─────────────────────────────────────────────────────
const JOBS = [
  { id: 1, title: "Frontend Developer (React.js)", dept: "Engineering", type: "Remote",  loc: "Lahore, PK",  posted: "3 days ago", deadline: "Apr 30", applicants: 45, screened: 100, topMatch: 94, status: "open",   salary: "80k–120k", shortlisted: 12 },
  { id: 2, title: "Backend Engineer (Node.js)",    dept: "Engineering", type: "Hybrid",  loc: "Karachi, PK", posted: "5 days ago", deadline: "May 5",  applicants: 32, screened: 78,  topMatch: 87, status: "open",   salary: "90k–130k", shortlisted: 8 },
  { id: 3, title: "UI/UX Designer (Figma)",        dept: "Design",      type: "Remote",  loc: "Remote",      posted: "1 week ago", deadline: "May 2",  applicants: 28, screened: 85,  topMatch: 91, status: "open",   salary: "70k–100k", shortlisted: 9 },
  { id: 4, title: "Data Scientist (ML/Python)",    dept: "Data",        type: "Onsite",  loc: "Islamabad",   posted: "2 weeks ago",deadline: "Apr 28", applicants: 18, screened: 60,  topMatch: 83, status: "review", salary: "100k–150k",shortlisted: 4 },
  { id: 5, title: "DevOps Engineer (AWS/Docker)",  dept: "Infra",       type: "Remote",  loc: "Remote",      posted: "2 weeks ago",deadline: "May 10", applicants: 8,  screened: 40,  topMatch: 76, status: "open",   salary: "95k–140k", shortlisted: 2 },
  { id: 6, title: "Product Manager",               dept: "Product",     type: "Hybrid",  loc: "Lahore, PK",  posted: "3 weeks ago",deadline: "May 15", applicants: 22, screened: 90,  topMatch: 88, status: "open",   salary: "110k–160k",shortlisted: 6 },
  { id: 7, title: "QA Engineer (Automation)",      dept: "Engineering", type: "Remote",  loc: "Remote",      posted: "1 month ago",deadline: "Closed", applicants: 31, screened: 100, topMatch: 82, status: "closed", salary: "60k–90k",  shortlisted: 10 },
  { id: 8, title: "Mobile Developer (Flutter)",    dept: "Engineering", type: "Hybrid",  loc: "Karachi, PK", posted: "1 month ago",deadline: "Closed", applicants: 19, screened: 100, topMatch: 79, status: "closed", salary: "80k–120k", shortlisted: 5 },
];

const TYPE_COLOR: Record<string, string> = {
  Remote: "text-green-700 bg-green-50 border-green-200",
  Hybrid: "text-blue-700 bg-blue-50 border-blue-200",
  Onsite: "text-orange-700 bg-orange-50 border-orange-200",
};

function ScoreRing({ score, size = 42 }: { score: number; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 85 ? "#17CF97" : score >= 70 ? "#f59e0b" : "#FF630B";
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={5} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={5}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold" style={{ color }}>{score}%</span>
    </div>
  );
}

export function JobPostingsPage() {
  const navigate = useNavigate();
  const [tab, setTab]         = useState<"all" | "open" | "closed" | "draft">("all");
  const [search, setSearch]   = useState("");
  const [hoverId, setHoverId] = useState<number | null>(null);

  const filtered = JOBS.filter((j) => {
    if (tab === "open"   && j.status !== "open")   return false;
    if (tab === "closed" && j.status !== "closed") return false;
    if (search && !j.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = [
    { label: "Total Posted",       value: "12",  color: "#6750a4", sub: "All time" },
    { label: "Active",             value: "8",   color: "#17CF97", sub: "Accepting apps" },
    { label: "Total Applications", value: "248", color: "#007DFC", sub: "Across all jobs" },
    { label: "Avg. Shortlist Rate",value: "19%", color: "#f59e0b", sub: "Industry: 15%" },
  ];

  return (
    <div className="p-8 bg-[#fafafc] min-h-full space-y-6">

      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="size-8 rounded-xl bg-[#6750a4]/10 flex items-center justify-center">
              <Briefcase size={16} className="text-[#6750a4]" />
            </div>
            <h1 className="text-2xl font-bold text-black">Job Postings</h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">Manage all your open positions and hiring pipelines</p>
        </div>
        <button
          onClick={() => navigate("/recruiter/jobs/post")}
          className="flex items-center gap-2 bg-[#6750a4] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#5a4490] hover:shadow-lg hover:shadow-[#6750a4]/30 hover:-translate-y-0.5 transition-all duration-200 shrink-0 group"
        >
          <Plus size={16} className="group-hover:rotate-90 transition-transform duration-200" />
          Post New Job
        </button>
      </div>

      {/* ── Stats strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="size-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: s.color + "18" }}>
              <TrendingUp size={18} style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-black leading-tight">{s.value}</p>
              <p className="text-xs text-gray-500 leading-tight">{s.label}</p>
              <p className="text-[10px] text-gray-400">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tabs + Search ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Tabs */}
        <div className="flex bg-white border border-gray-200 rounded-2xl p-1 gap-1">
          {(["all", "open", "closed", "draft"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all duration-200 ${
                tab === t
                  ? "bg-[#6750a4] text-white shadow-md"
                  : "text-gray-500 hover:text-[#6750a4] hover:bg-[#6750a4]/6"
              }`}
            >
              {t}
              {t === "all"    && <span className="ml-1.5 text-[10px] opacity-70">({JOBS.length})</span>}
              {t === "open"   && <span className="ml-1.5 text-[10px] opacity-70">({JOBS.filter(j=>j.status==="open").length})</span>}
              {t === "closed" && <span className="ml-1.5 text-[10px] opacity-70">({JOBS.filter(j=>j.status==="closed").length})</span>}
            </button>
          ))}
        </div>

        {/* Search + filter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 w-64 focus-within:border-[#6750a4]/50 transition-colors">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search jobs..." className="bg-transparent outline-none text-sm text-gray-600 w-full placeholder:text-gray-400" />
          </div>
          <button className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 text-sm px-4 py-2.5 rounded-full hover:border-[#6750a4]/40 hover:text-[#6750a4] transition-colors">
            <Filter size={14} /> Filter
          </button>
        </div>
      </div>

      {/* ── Job cards grid ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
         <img src={noApplicantsImg} alt="No applicants" className="h-[120px] w-auto" />
          <div className="text-center">
            <p className="font-bold text-gray-700 text-lg">No jobs found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or post a new job</p>
            <button onClick={() => navigate("/recruiter/jobs/post")} className="mt-4 bg-[#6750a4] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#5a4490] transition-colors">
              Post New Job
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((job) => (
            <div
              key={job.id}
              onMouseEnter={() => setHoverId(job.id)}
              onMouseLeave={() => setHoverId(null)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-[#6750a4]/8 hover:-translate-y-1 hover:border-[#6750a4]/20 transition-all duration-250 overflow-hidden cursor-pointer group"
              onClick={() => navigate(`/recruiter/jobs/${job.id}`)}
            >
              {/* Card top accent */}
              <div className="h-1 w-full bg-gradient-to-r from-[#6750a4] to-[#a78bfa] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

              <div className="p-5">
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="size-10 rounded-xl bg-[#6750a4]/8 flex items-center justify-center shrink-0 group-hover:bg-[#6750a4]/15 transition-colors">
                    <Briefcase size={18} className="text-[#6750a4]" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {job.status === "open"
                      ? <span className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full"><span className="size-1.5 rounded-full bg-green-500" />Open</span>
                      : job.status === "review"
                      ? <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full"><span className="size-1.5 rounded-full bg-amber-500" />Review</span>
                      : <span className="flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded-full"><span className="size-1.5 rounded-full bg-gray-400" />Closed</span>
                    }
                    <button onClick={(e) => e.stopPropagation()} className="p-1 rounded-lg text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-black text-base leading-snug group-hover:text-[#6750a4] transition-colors mb-2">{job.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{job.dept} · {job.salary}/mo</p>

                {/* Meta chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className={`flex items-center gap-1 text-xs font-medium border px-2 py-0.5 rounded-full ${TYPE_COLOR[job.type]}`}>
                    {job.type === "Remote" ? <Globe size={10} /> : <Building size={10} />}{job.type}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
                    <MapPin size={10} />{job.loc}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
                    <Clock size={10} />Deadline: {job.deadline}
                  </span>
                </div>

                {/* Stats row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Users size={13} className="text-gray-400" />
                      <span className="text-sm font-bold text-black">{job.applicants}</span>
                      <span className="text-xs text-gray-400">apps</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-green-500" />
                      <span className="text-sm font-bold text-black">{job.shortlisted}</span>
                      <span className="text-xs text-gray-400">shortlisted</span>
                    </div>
                  </div>
                  <ScoreRing score={job.topMatch} size={40} />
                </div>

                {/* AI Screening bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wide">AI Screening</span>
                    <span className="text-[10px] font-semibold" style={{ color: job.screened === 100 ? "#17CF97" : "#6750a4" }}>{job.screened}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${job.screened}%`, backgroundColor: job.screened === 100 ? "#17CF97" : "#6750a4" }}
                    />
                  </div>
                </div>

                {/* Actions — slide up on hover */}
                <div className={`flex gap-2 transition-all duration-200 ${hoverId === job.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate("/recruiter/applicants"); }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#6750a4] text-white text-xs font-semibold rounded-xl hover:bg-[#5a4490] transition-colors"
                  >
                    <Users size={12} /> Review Applicants
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/recruiter/jobs/${job.id}`); }}
                    className="flex items-center justify-center gap-1 px-3 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl hover:border-[#6750a4]/40 hover:text-[#6750a4] transition-colors"
                  >
                    <Eye size={12} />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center gap-1 px-3 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl hover:border-[#6750a4]/40 hover:text-[#6750a4] transition-colors"
                  >
                    <Edit3 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Post new job card */}
          <button
            onClick={() => navigate("/recruiter/jobs/post")}
            className="border-2 border-dashed border-[#6750a4]/25 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 text-center hover:border-[#6750a4]/50 hover:bg-[#6750a4]/3 transition-all duration-200 group min-h-[280px]"
          >
            <div className="size-12 rounded-2xl bg-[#6750a4]/8 group-hover:bg-[#6750a4]/15 flex items-center justify-center transition-colors">
              <Plus size={22} className="text-[#6750a4] group-hover:rotate-90 transition-transform duration-300" />
            </div>
            <div>
              <p className="font-bold text-[#6750a4]">Post New Job</p>
              <p className="text-xs text-gray-400 mt-1">Attract top talent with AI-powered screening</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
