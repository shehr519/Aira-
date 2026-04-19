import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Video, Calendar, Clock, Plus, ChevronRight, CheckCircle2,
  AlertCircle, Users, Grid, List, LayoutList,
} from "lucide-react";
//import noApplicantsImg from "../../../assets/aira.png";

const INTERVIEWS = [
  { id: 1,  name: "Ahmed Khan",   initials: "AK", job: "Frontend Developer",  time: "10:00 AM", date: "Apr 15, 2026", round: "Technical Round",  type: "ai",     status: "confirmed", color: "#6750a4" },
  { id: 2,  name: "Zara Malik",   initials: "ZM", job: "UI/UX Designer",       time: "11:30 AM", date: "Apr 15, 2026", round: "HR Round",         type: "manual", status: "confirmed", color: "#17CF97" },
  { id: 3,  name: "Bilal Hassan", initials: "BH", job: "Backend Engineer",     time: "02:00 PM", date: "Apr 15, 2026", round: "Coding Test",      type: "ai",     status: "confirmed", color: "#FF630B" },
  { id: 4,  name: "Sara Ali",     initials: "SA", job: "Frontend Developer",  time: "03:30 PM", date: "Apr 15, 2026", round: "Final Round",      type: "manual", status: "pending",   color: "#007DFC" },
  { id: 5,  name: "Omar Farooq",  initials: "OF", job: "Data Scientist",       time: "05:00 PM", date: "Apr 15, 2026", round: "Technical Round",  type: "ai",     status: "confirmed", color: "#f59e0b" },
  { id: 6,  name: "Usman Tariq",  initials: "UT", job: "Product Manager",      time: "10:00 AM", date: "Apr 16, 2026", round: "Case Study",       type: "manual", status: "confirmed", color: "#e879f9" },
  { id: 7,  name: "Maryam Rizvi", initials: "MR", job: "UI/UX Designer",       time: "02:00 PM", date: "Apr 16, 2026", round: "Portfolio Review", type: "manual", status: "pending",   color: "#06b6d4" },
  { id: 8,  name: "Hassan Mirza", initials: "HM", job: "Data Scientist",       time: "11:00 AM", date: "Apr 17, 2026", round: "Technical Round",  type: "ai",     status: "confirmed", color: "#22c55e" },
];

const TODAY    = INTERVIEWS.filter((i) => i.date === "Apr 15, 2026");
const UPCOMING = INTERVIEWS.filter((i) => i.date !== "Apr 15, 2026");

const STATS = [
  { label: "Today",        value: TODAY.length,    color: "#6750a4", sub: "Scheduled"      },
  { label: "This Week",    value: INTERVIEWS.length, color: "#007DFC", sub: "Total sessions" },
  { label: "Pending",      value: INTERVIEWS.filter(i=>i.status==="pending").length, color: "#f59e0b", sub: "Awaiting confirm" },
  { label: "Completed",    value: "24",            color: "#17CF97", sub: "This month"      },
];

function TypeBadge({ type }: { type: string }) {
  return type === "ai"
    ? <span className="flex items-center gap-1 text-[10px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full"><span className="size-1 rounded-full bg-purple-500" />AI Interview</span>
    : <span className="flex items-center gap-1 text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full"><span className="size-1 rounded-full bg-blue-500" />Manual</span>;
}

function StatusBadge({ status }: { status: string }) {
  return status === "confirmed"
    ? <span className="flex items-center gap-1 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full"><CheckCircle2 size={9} />Confirmed</span>
    : <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full"><AlertCircle size={9} />Pending</span>;
}

function InterviewCard({ iv }: { iv: typeof INTERVIEWS[0] }) {
  const navigate = useNavigate();
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#6750a4]/20 transition-all duration-200 overflow-hidden cursor-pointer"
      onClick={() => navigate(`/recruiter/interviews/${iv.id}`)}>
      <div className="h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(to right, ${iv.color}, ${iv.color}88)` }} />
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: `linear-gradient(135deg,${iv.color},${iv.color}88)` }}>{iv.initials}</div>
            <div>
              <p className="font-bold text-black text-sm group-hover:text-[#6750a4] transition-colors">{iv.name}</p>
              <p className="text-xs text-gray-400">{iv.job}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-black">{iv.time}</p>
            <p className="text-xs text-gray-400">{iv.date}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 flex-wrap">
            <TypeBadge type={iv.type} />
            <StatusBadge status={iv.status} />
          </div>
          <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">{iv.round}</span>
        </div>
        {/* Join button - slides up on hover */}
        <button
          onClick={(e) => { e.stopPropagation(); }}
          className="w-full mt-3 py-2 bg-[#6750a4] text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 hover:bg-[#5a4490]"
        >
          <Video size={12} className="inline mr-1.5" />Join Interview
        </button>
      </div>
    </div>
  );
}

export function InterviewsRecruiterPage() {
  const navigate  = useNavigate();
  const [view, setView] = useState<"list" | "grid">("list");
  const [tab, setTab]   = useState<"today" | "upcoming" | "all">("today");

  const shown = tab === "today" ? TODAY : tab === "upcoming" ? UPCOMING : INTERVIEWS;

  return (
    <div className="p-8 bg-[#fafafc] min-h-full space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-xl bg-orange-50 flex items-center justify-center">
            <Video size={16} className="text-[#FF630B]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black">Interviews</h1>
            <p className="text-sm text-gray-500">Manage and schedule all candidate interviews</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/recruiter/interviews/schedule")}
          className="flex items-center gap-2 bg-[#6750a4] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#5a4490] hover:shadow-lg hover:shadow-[#6750a4]/30 hover:-translate-y-0.5 transition-all duration-200 shrink-0 group"
        >
          <Plus size={15} className="group-hover:rotate-90 transition-transform duration-200" />Schedule Interview
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="size-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: s.color + "18" }}>
              <Video size={17} style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-black leading-tight">{s.value}</p>
              <p className="text-xs text-gray-500 leading-tight">{s.label}</p>
              <p className="text-[10px] text-gray-400">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs + View toggle */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex bg-white border border-gray-200 rounded-2xl p-1 gap-1">
          {(["today", "upcoming", "all"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all duration-200 ${tab === t ? "bg-[#6750a4] text-white shadow-md" : "text-gray-500 hover:text-[#6750a4] hover:bg-[#6750a4]/6"}`}>
              {t === "today" ? `Today (${TODAY.length})` : t === "upcoming" ? `Upcoming (${UPCOMING.length})` : `All (${INTERVIEWS.length})`}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
          <button onClick={() => setView("list")} className={`size-8 rounded-lg flex items-center justify-center transition-colors ${view === "list" ? "bg-[#6750a4] text-white" : "text-gray-400 hover:text-[#6750a4]"}`}>
            <LayoutList size={15} />
          </button>
          <button onClick={() => setView("grid")} className={`size-8 rounded-lg flex items-center justify-center transition-colors ${view === "grid" ? "bg-[#6750a4] text-white" : "text-gray-400 hover:text-[#6750a4]"}`}>
            <Grid size={15} />
          </button>
        </div>
      </div>

      {/* ── Interview listing ── */}
      {shown.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16">
         <img src={noApplicantsImg} alt="No applicants" className="h-[120px] w-auto" />
          <div className="text-center">
            <p className="font-bold text-gray-700">No interviews scheduled</p>
            <p className="text-sm text-gray-400 mt-1">Schedule an interview to get started</p>
          </div>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {shown.map((iv) => <InterviewCard key={iv.id} iv={iv} />)}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-100 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span className="col-span-3">Candidate</span>
            <span className="col-span-2">Position</span>
            <span className="col-span-2">Round</span>
            <span className="col-span-2">Date & Time</span>
            <span className="col-span-1">Type</span>
            <span className="col-span-1">Status</span>
            <span className="col-span-1 text-right">Action</span>
          </div>

          {shown.map((iv, i) => (
            <div key={iv.id}
              className={`grid grid-cols-12 items-center px-6 py-4 border-b border-gray-50 hover:bg-[#6750a4]/3 transition-colors cursor-pointer group ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
              onClick={() => navigate(`/recruiter/interviews/${iv.id}`)}>
              <div className="col-span-3 flex items-center gap-3 min-w-0">
                <div className="size-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: `linear-gradient(135deg,${iv.color},${iv.color}99)` }}>{iv.initials}</div>
                <span className="text-sm font-semibold text-black group-hover:text-[#6750a4] transition-colors truncate">{iv.name}</span>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-600 truncate">{iv.job}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-medium text-gray-700 truncate">{iv.round}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-bold text-black">{iv.time}</p>
                <p className="text-[10px] text-gray-400">{iv.date}</p>
              </div>
              <div className="col-span-1"><TypeBadge type={iv.type} /></div>
              <div className="col-span-1"><StatusBadge status={iv.status} /></div>
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className="flex items-center gap-1 text-xs font-semibold text-[#6750a4] opacity-0 group-hover:opacity-100 transition-opacity border border-[#6750a4]/30 px-2.5 py-1 rounded-lg hover:bg-[#6750a4]/8"
                >
                  <Video size={11} /> Join
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
