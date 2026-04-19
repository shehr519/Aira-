import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ChevronRight, Filter, ChevronDown, CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";
import {
  INTERVIEWS, LOGO_COMPONENTS, TYPE_LABELS,
  getUpcoming, getPrevious,
  type Interview, type InterviewStatus,
} from "./interviewData";

// ── Company logo wrapper ─────────────────────────────────────────
function Logo({ index, size = 44 }: { index: number; size?: number }) {
  const Cmp = LOGO_COMPONENTS[index % LOGO_COMPONENTS.length];
  return (
    <div
      className="rounded-xl bg-white border border-gray-100 shadow-sm shrink-0 flex items-center justify-center p-1.5"
      style={{ width: size, height: size }}
    >
      <Cmp />
    </div>
  );
}

// ── Status badge ─────────────────────────────────────────────────
function StatusBadge({ status }: { status: InterviewStatus }) {
  const map: Record<InterviewStatus, { label: string; cls: string; icon: React.ReactNode }> = {
    upcoming: { label: "Upcoming", cls: "bg-blue-50 text-blue-700 border-blue-200", icon: <Clock size={11} /> },
    live: { label: "Live Now", cls: "bg-green-50 text-green-700 border-green-200", icon: <span className="size-2 rounded-full bg-green-500 animate-pulse inline-block" /> },
    completed: { label: "Completed", cls: "bg-gray-100 text-gray-600 border-gray-200", icon: <CheckCircle2 size={11} /> },
    awaiting: { label: "Awaiting Invite", cls: "bg-amber-50 text-amber-700 border-amber-200", icon: <AlertCircle size={11} /> },
    cancelled: { label: "Cancelled", cls: "bg-red-50 text-red-600 border-red-200", icon: <XCircle size={11} /> },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1 text-xs border px-2.5 py-0.5 rounded-full ${s.cls}`}>
      {s.icon} {s.label}
    </span>
  );
}

// ── Action button ─────────────────────────────────────────────────
function ActionBtn({ interview, compact }: { interview: Interview; compact?: boolean }) {
  const navigate = useNavigate();
  const base = compact
    ? "text-[#6750a4] font-semibold text-sm hover:underline"
    : "text-sm px-5 py-1.5 rounded-full transition-colors";

  if (interview.status === "completed") {
    return (
      <button
        onClick={() => navigate(`/interviews/${interview.id}/report`)}
        className={compact ? base : `${base} border border-[#6750a4] text-[#6750a4] hover:bg-purple-50`}
      >
        View Report
      </button>
    );
  }
  if (interview.status === "awaiting") {
    return <span className="text-sm text-gray-400 italic">Awaiting Invite</span>;
  }
  if (interview.type === "coding") {
    return (
      <button
        onClick={() => navigate(`/interviews/${interview.id}/coding`)}
        className={compact ? base : `${base} bg-[#FF630B] text-white hover:bg-orange-600`}
      >
        Start Task
      </button>
    );
  }
  return (
    <button
        onClick={() => navigate(`/interviews/${interview.id}/join`)}
        className={compact ? base : `${base} bg-[#6750a4] text-white hover:bg-[#5a4490]`}
      >
        Join Interview
      </button>
  );
}

// ── Upcoming card (inside gradient panel) ────────────────────────
function UpcomingCard({ interview }: { interview: Interview }) {
  const navigate = useNavigate();
  const actionLabel = interview.type === "coding" ? "Start Task" : "View Details";
  const handleAction = () => {
    if (interview.type === "coding") navigate(`/interviews/${interview.id}/coding`);
    else navigate(`/interviews/${interview.id}`);
  };

  return (
    <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md hover:shadow-[#6750a4]/8 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
      onClick={handleAction}
    >
      <Logo index={interview.logoIndex} size={46} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-black leading-tight group-hover:text-[#6750a4] transition-colors">{interview.round ?? interview.company}</p>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{interview.description}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {interview.notes ?? `${interview.date} at ${interview.time}`}
        </p>
      </div>
      <button
        onClick={handleAction}
        className="shrink-0 flex items-center gap-1 text-xs text-[#6750a4] font-semibold hover:underline"
      >
        {actionLabel} <ChevronRight size={13} />
      </button>
    </div>
  );
}

// ── Previous interview card ───────────────────────────────────────
function PreviousCard({ interview }: { interview: Interview }) {
  const navigate = useNavigate();
  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4 items-start hover:shadow-md hover:shadow-[#6750a4]/8 hover:border-[#6750a4]/15 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
      onClick={() => navigate(`/interviews/${interview.id}/report`)}
    >
      <Logo index={interview.logoIndex} size={50} />
      <div className="flex-1 min-w-0">
        <p className="text-base font-bold text-black leading-tight">{interview.round ?? TYPE_LABELS[interview.type]}</p>
        <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{interview.description}</p>
        <p className="text-sm text-gray-500 mt-0.5">{interview.notes}</p>
        <button
          onClick={() => navigate(`/interviews/${interview.id}/report`)}
          className="mt-3 bg-[#FF630B] text-white text-xs px-5 py-1.5 rounded-full hover:bg-orange-600 transition-colors"
        >
          View Report
        </button>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────
const FILTER_OPTIONS = ["All Interviews", "Video Interview", "Coding Interview", "Technical Interview", "HR Interview"];
const STATUS_FILTERS = ["All", "Upcoming", "Completed", "Awaiting"];

export function InterviewsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialStatus = searchParams.get("tab") === "previous" ? "Completed" : "All";

  const [filter, setFilter] = useState("All Interviews");
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [dropOpen, setDropOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const upcoming = getUpcoming().slice(0, 3);
  const previous = getPrevious().slice(0, 3);

  const tableRows = INTERVIEWS.filter((iv) => {
    const matchType = filter === "All Interviews" || TYPE_LABELS[iv.type] === filter;
    const matchStatus = statusFilter === "All" ||
      (statusFilter === "Upcoming" && (iv.status === "upcoming" || iv.status === "live")) ||
      (statusFilter === "Completed" && iv.status === "completed") ||
      (statusFilter === "Awaiting" && iv.status === "awaiting");
    const matchSearch = search === "" ||
      iv.company.toLowerCase().includes(search.toLowerCase()) ||
      TYPE_LABELS[iv.type].toLowerCase().includes(search.toLowerCase()) ||
      (iv.role ?? "").toLowerCase().includes(search.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  return (
    <div className="p-8 bg-[#fafafc] min-h-full">
      {/* ── Page header — title only, no duplicate search/notif ── */}
      <div className="mb-7">
        <h1 className="text-3xl font-bold text-black">Interviews</h1>
        <p className="text-sm text-gray-500 mt-1">Access your scheduled interviews and complete assessments.</p>
      </div>

      {/* ── Top two-panel section ── */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10">

        {/* Upcoming Interviews gradient panel */}
        <div
          className="flex-1 rounded-2xl p-6 flex flex-col gap-4"
          style={{
            background: "linear-gradient(135deg, #c4b5f4 0%, #ddb8c6 50%, #a78bfa 100%)",
          }}
        >
          <h2 className="text-xl font-bold text-white drop-shadow">Upcoming Interviews</h2>
          <div className="flex flex-col gap-3">
            {upcoming.length === 0 && (
              <p className="text-white/80 text-sm text-center py-4">No upcoming interviews scheduled.</p>
            )}
            {upcoming.map((iv) => <UpcomingCard key={iv.id} interview={iv} />)}
          </div>
          <button
            onClick={() => navigate("/interviews/1")}
            className="self-center text-xs text-white/80 hover:text-white underline mt-1"
          >
            View All Upcoming →
          </button>
        </div>

        {/* Previous Interviews panel */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-black">Previous Interviews</h2>
            <button
              onClick={() => navigate("/interviews/previous")}
              className="text-sm text-[#6750a4] hover:underline flex items-center gap-1"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {previous.map((iv) => <PreviousCard key={iv.id} interview={iv} />)}
          </div>
        </div>
      </div>

      {/* ── Scheduled Interviews table ── */}
      <div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-xl font-bold text-black">Scheduled Interviews</h2>

          <div className="flex items-center gap-3">
            {/* Inline search for the table */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 shrink-0"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search interviews..."
                className="bg-transparent outline-none text-sm text-gray-600 w-36 placeholder:text-gray-400"
              />
            </div>

            {/* Status filter pills */}
            <div className="hidden sm:flex gap-1">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    statusFilter === f
                      ? "bg-[#6750a4] text-white border-[#6750a4]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#6750a4]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Filter button */}
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className="flex items-center gap-2 border border-gray-300 bg-white text-sm text-gray-700 px-4 py-1.5 rounded-full hover:bg-gray-50 transition-colors"
            >
              <Filter size={14} /> Filter
            </button>

            {/* Type dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="flex items-center gap-2 border border-gray-300 bg-white text-sm text-gray-700 px-4 py-1.5 rounded-full hover:bg-gray-50 transition-colors min-w-[150px] justify-between"
              >
                {filter} <ChevronDown size={14} />
              </button>
              {dropOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 min-w-[180px] overflow-hidden">
                  {FILTER_OPTIONS.map((o) => (
                    <button
                      key={o}
                      onClick={() => { setFilter(o); setDropOpen(false); }}
                      className={`w-full text-left text-sm px-4 py-2.5 hover:bg-purple-50 transition-colors ${
                        filter === o ? "text-[#6750a4] font-semibold bg-purple-50" : "text-gray-700"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white">
          <div className="grid grid-cols-5 bg-[#6750a4] text-white text-sm font-bold">
            {["Date", "Type", "Company", "Time", "Actions"].map((h) => (
              <div key={h} className="px-4 py-3">{h}</div>
            ))}
          </div>

          {tableRows.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">No interviews match your filters.</div>
          )}

          {tableRows.map((iv, i) => {
            const Logo = LOGO_COMPONENTS[iv.logoIndex % LOGO_COMPONENTS.length];
            return (
              <div
                key={iv.id}
                className={`grid grid-cols-5 text-sm border-t border-gray-100 hover:bg-purple-50/30 transition-colors ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                <div className="px-4 py-3 text-gray-700">{iv.date}</div>
                <div className="px-4 py-3 text-gray-700">{TYPE_LABELS[iv.type]}</div>
                <div className="px-4 py-3 flex items-center gap-2">
                  <div className="size-5 shrink-0"><Logo /></div>
                  <span className="text-gray-700">{iv.company}</span>
                </div>
                <div className="px-4 py-3 text-gray-500">{iv.time}, {iv.dayLabel}</div>
                <div className="px-4 py-3 flex items-center gap-2">
                  {iv.status === "completed" ? (
                    <button
                      onClick={() => navigate(`/interviews/${iv.id}/report`)}
                      className="text-gray-500 hover:underline text-sm"
                    >
                      View Report
                    </button>
                  ) : iv.status === "awaiting" ? (
                    <span className="text-gray-400 italic text-sm">Awaiting Invite</span>
                  ) : iv.type === "coding" ? (
                    <button
                      onClick={() => navigate(`/interviews/${iv.id}/coding`)}
                      className="text-[#FF630B] font-semibold hover:underline"
                    >
                      Start Task
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/interviews/${iv.id}/join`)}
                      className="text-[#6750a4] font-semibold hover:underline"
                    >
                      Join Interview
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/interviews/${iv.id}`)}
                    className="text-gray-400 hover:text-[#6750a4] transition-colors"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table footer */}
        <div className="flex justify-end mt-3">
          <span className="text-xs text-gray-400">{tableRows.length} interview{tableRows.length !== 1 ? "s" : ""} shown</span>
        </div>
      </div>
    </div>
  );
}