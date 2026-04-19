import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Search, Filter, Users, ChevronRight, MoreHorizontal,
  CheckCircle2, XCircle, ClipboardList, Video, Eye,
  Download, SlidersHorizontal, ArrowUpDown,
} from "lucide-react";
import mega from "../../../assets/megaphone .png";

// ── Mock data ─────────────────────────────────────────────────────
const ALL_APPLICANTS = [
  { id: 1,  name: "Ahmed Khan",     initials: "AK", job: "Frontend Developer",   aiScore: 94, resumeScore: 91, status: "shortlisted",  date: "Today",     color: "#6750a4" },
  { id: 2,  name: "Zara Malik",     initials: "ZM", job: "UI/UX Designer",       aiScore: 91, resumeScore: 88, status: "test_assigned", date: "Today",     color: "#17CF97" },
  { id: 3,  name: "Bilal Hassan",   initials: "BH", job: "Backend Engineer",     aiScore: 82, resumeScore: 79, status: "shortlisted",  date: "Yesterday", color: "#007DFC" },
  { id: 4,  name: "Sara Ali",       initials: "SA", job: "Frontend Developer",   aiScore: 87, resumeScore: 84, status: "under_review", date: "Yesterday", color: "#FF630B" },
  { id: 5,  name: "Omar Farooq",    initials: "OF", job: "Data Scientist",       aiScore: 76, resumeScore: 72, status: "under_review", date: "2 days ago",color: "#f59e0b" },
  { id: 6,  name: "Hina Baig",      initials: "HB", job: "DevOps Engineer",      aiScore: 73, resumeScore: 70, status: "under_review", date: "2 days ago",color: "#e879f9" },
  { id: 7,  name: "Usman Tariq",    initials: "UT", job: "Product Manager",      aiScore: 88, resumeScore: 85, status: "shortlisted",  date: "3 days ago",color: "#6750a4" },
  { id: 8,  name: "Ayesha Khan",    initials: "AK", job: "Frontend Developer",   aiScore: 71, resumeScore: 68, status: "rejected",     date: "3 days ago",color: "#ef4444" },
  { id: 9,  name: "Fahad Iqbal",    initials: "FI", job: "Backend Engineer",     aiScore: 65, resumeScore: 60, status: "rejected",     date: "4 days ago",color: "#ef4444" },
  { id: 10, name: "Maryam Rizvi",   initials: "MR", job: "UI/UX Designer",       aiScore: 90, resumeScore: 87, status: "test_assigned", date: "4 days ago",color: "#17CF97" },
  { id: 11, name: "Hassan Mirza",   initials: "HM", job: "Data Scientist",       aiScore: 83, resumeScore: 80, status: "shortlisted",  date: "5 days ago",color: "#007DFC" },
  { id: 12, name: "Sadia Noor",     initials: "SN", job: "DevOps Engineer",      aiScore: 79, resumeScore: 76, status: "under_review", date: "5 days ago",color: "#f59e0b" },
];

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  shortlisted:  { label: "Shortlisted",   color: "text-green-700 bg-green-50 border-green-200"  },
  test_assigned:{ label: "Test Assigned", color: "text-amber-700 bg-amber-50 border-amber-200"  },
  under_review: { label: "Under Review",  color: "text-blue-700 bg-blue-50 border-blue-200"     },
  rejected:     { label: "Rejected",      color: "text-red-600 bg-red-50 border-red-200"         },
};

const FILTER_TABS = [
  { id: "all",          label: "All Applicants" },
  { id: "shortlisted",  label: "Shortlisted"    },
  { id: "under_review", label: "Under Review"   },
  { id: "test_assigned",label: "Test Assigned"  },
  { id: "rejected",     label: "Rejected"       },
];

function ScoreBar({ score }: { score: number }) {
  const color = score >= 85 ? "#17CF97" : score >= 70 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold" style={{ color }}>{score}%</span>
    </div>
  );
}

export function ApplicantsPage() {
  const navigate = useNavigate();
  const [tab,     setTab]     = useState("all");
  const [search,  setSearch]  = useState("");
  const [sortKey, setSortKey] = useState<"aiScore" | "date" | "name">("aiScore");
  const [selected,setSelected]= useState<number[]>([]);

  const filtered = ALL_APPLICANTS
    .filter((a) => tab === "all" || a.status === tab)
    .filter((a) => !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.job.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortKey === "aiScore" ? b.aiScore - a.aiScore : sortKey === "name" ? a.name.localeCompare(b.name) : 0);

  const toggleSelect = (id: number) =>
    setSelected((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const allSelected = filtered.length > 0 && filtered.every((a) => selected.includes(a.id));
  const toggleAll   = () => setSelected(allSelected ? [] : filtered.map((a) => a.id));

  const counts = {
    all:           ALL_APPLICANTS.length,
    shortlisted:   ALL_APPLICANTS.filter(a=>a.status==="shortlisted").length,
    under_review:  ALL_APPLICANTS.filter(a=>a.status==="under_review").length,
    test_assigned: ALL_APPLICANTS.filter(a=>a.status==="test_assigned").length,
    rejected:      ALL_APPLICANTS.filter(a=>a.status==="rejected").length,
  };

  return (
    <div className="p-8 bg-[#fafafc] min-h-full space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-xl bg-blue-50 flex items-center justify-center">
            <Users size={16} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black">Applicants</h1>
            <p className="text-sm text-gray-500">{ALL_APPLICANTS.length} total candidates across all job postings</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm px-4 py-2.5 rounded-full hover:border-[#6750a4]/40 hover:text-[#6750a4] transition-colors">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {FILTER_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
              tab === t.id
                ? "bg-[#6750a4] text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-500 hover:border-[#6750a4]/40 hover:text-[#6750a4]"
            }`}
          >
            {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
              {counts[t.id as keyof typeof counts] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Search + Sort bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 flex-1 min-w-[200px] max-w-[360px] focus-within:border-[#6750a4]/50 transition-colors">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or job..." className="bg-transparent outline-none text-sm text-gray-600 w-full placeholder:text-gray-400" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Sort by:</span>
          {(["aiScore", "name", "date"] as const).map((k) => (
            <button key={k} onClick={() => setSortKey(k)}
              className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-colors ${sortKey === k ? "bg-[#6750a4]/8 border-[#6750a4]/30 text-[#6750a4]" : "border-gray-200 text-gray-500 hover:border-[#6750a4]/30"}`}>
              <ArrowUpDown size={10} />
              {k === "aiScore" ? "AI Score" : k.charAt(0).toUpperCase() + k.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ── Bulk action bar ── */}
      {selected.length > 0 && (
        <div className="bg-[#6750a4] text-white rounded-2xl px-5 py-3 flex items-center gap-4">
          <span className="text-sm font-semibold">{selected.length} selected</span>
          <div className="flex gap-2 ml-auto">
            {[
              { label: "Shortlist",    icon: CheckCircle2 },
              { label: "Assign Test",  icon: ClipboardList },
              { label: "Schedule",     icon: Video },
              { label: "Reject",       icon: XCircle },
            ].map(({ label, icon: Icon }) => (
              <button key={label} onClick={() => setSelected([])}
                className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                <Icon size={12} />{label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-100 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <div className="col-span-1 flex items-center">
            <input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded border-gray-300 text-[#6750a4] focus:ring-[#6750a4]/30" />
          </div>
          <span className="col-span-3">Candidate</span>
          <span className="col-span-2">Applied For</span>
          <span className="col-span-2">AI Score</span>
          <span className="col-span-2">Resume Score</span>
          <span className="col-span-1">Status</span>
          <span className="col-span-1 text-right">Actions</span>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16">
            <img src={mega} alt="No applicants" className="h-[120px] w-auto" />
            <div className="text-center">
              <p className="font-bold text-gray-700">No applicants found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search query</p>
            </div>
          </div>
        ) : (
          filtered.map((ap, i) => (
            <div
              key={ap.id}
              className={`grid grid-cols-12 items-center px-6 py-4 border-b border-gray-50 hover:bg-[#6750a4]/3 transition-colors cursor-pointer group ${selected.includes(ap.id) ? "bg-[#6750a4]/4" : i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
              onClick={() => navigate(`/recruiter/applicants/${ap.id}`)}
            >
              <div className="col-span-1" onClick={(e) => e.stopPropagation()}>
                <input type="checkbox" checked={selected.includes(ap.id)} onChange={() => toggleSelect(ap.id)} className="rounded border-gray-300 text-[#6750a4] focus:ring-[#6750a4]/30" />
              </div>
              <div className="col-span-3 flex items-center gap-3 min-w-0">
                <div className="size-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: `linear-gradient(135deg, ${ap.color}, ${ap.color}99)` }}>
                  {ap.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-black leading-tight group-hover:text-[#6750a4] transition-colors truncate">{ap.name}</p>
                  <p className="text-xs text-gray-400">{ap.date}</p>
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-medium text-gray-700 truncate">{ap.job}</p>
              </div>
              <div className="col-span-2">
                <ScoreBar score={ap.aiScore} />
              </div>
              <div className="col-span-2">
                <ScoreBar score={ap.resumeScore} />
              </div>
              <div className="col-span-1">
                <span className={`text-xs font-medium border px-2 py-0.5 rounded-full ${STATUS_MAP[ap.status].color}`}>
                  {STATUS_MAP[ap.status].label}
                </span>
              </div>
              <div className="col-span-1 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={(e) => { e.stopPropagation(); navigate(`/recruiter/applicants/${ap.id}`); }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-[#6750a4] hover:bg-[#6750a4]/8 transition-colors">
                  <Eye size={13} />
                </button>
                <button onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                  <MoreHorizontal size={13} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Showing {filtered.length} of {ALL_APPLICANTS.length} applicants</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((p) => (
            <button key={p} className={`size-8 rounded-lg flex items-center justify-center font-semibold transition-colors ${p === 1 ? "bg-[#6750a4] text-white" : "text-gray-500 hover:bg-gray-100"}`}>{p}</button>
          ))}
          <button className="size-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
