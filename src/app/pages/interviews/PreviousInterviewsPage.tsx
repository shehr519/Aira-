import { useNavigate } from "react-router";
import { ChevronRight, ArrowLeft, CheckCircle2, Star, Clock, Award } from "lucide-react";
import { INTERVIEWS, LOGO_COMPONENTS, TYPE_LABELS } from "./interviewData";

function Logo({ index, size = 50 }: { index: number; size?: number }) {
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

function ScoreBadge({ score }: { score?: number }) {
  if (score === undefined) return null;
  const color = score >= 80 ? "text-green-600 bg-green-50 border-green-200"
    : score >= 60 ? "text-amber-600 bg-amber-50 border-amber-200"
    : "text-red-600 bg-red-50 border-red-200";
  return (
    <span className={`inline-flex items-center gap-1 text-xs border px-2.5 py-0.5 rounded-full font-semibold ${color}`}>
      <Star size={10} /> {score}%
    </span>
  );
}

const PREV = INTERVIEWS.filter((iv) => iv.status === "completed");

export function PreviousInterviewsPage() {
  const navigate = useNavigate();

  const avgScore = Math.round(
    PREV.filter((iv) => iv.score !== undefined).reduce((s, iv) => s + (iv.score ?? 0), 0) /
      (PREV.filter((iv) => iv.score !== undefined).length || 1)
  );

  return (
    <div className="p-8 bg-[#fafafc] min-h-full">
      {/* ── Header ── */}
      <button
        onClick={() => navigate("/interviews")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#6750a4] transition-colors mb-6 group"
      >
        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to Interviews
      </button>

      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">All Previous Interviews</h1>
          <p className="text-sm text-gray-500 mt-1">
            Complete history of your past interview sessions and performance reports.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border border-gray-100 rounded-2xl px-5 py-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-[#6750a4]">{PREV.length}</p>
            <p className="text-xs text-gray-500 mt-0.5">Completed</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl px-5 py-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-green-600">{avgScore}%</p>
            <p className="text-xs text-gray-500 mt-0.5">Avg Score</p>
          </div>
        </div>
      </div>

      {/* ── Summary banner ── */}
      <div className="mb-7 rounded-2xl bg-gradient-to-r from-[#6750a4] to-[#a78bfa] p-5 flex items-center gap-4 relative overflow-hidden shadow-lg shadow-[#6750a4]/20">
        <div className="absolute -right-6 -top-6 size-28 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="size-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
          <Award size={22} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold">Interview Performance Overview</p>
          <p className="text-white/70 text-xs mt-0.5">
            You've completed {PREV.length} interviews. Your average score of {avgScore}% shows consistent improvement!
          </p>
        </div>
        <div className="hidden sm:flex flex-col gap-1 shrink-0 text-right">
          <p className="text-white/60 text-xs">Best performance</p>
          <p className="text-white font-bold">
            {Math.max(...PREV.filter((iv) => iv.score !== undefined).map((iv) => iv.score ?? 0))}%
          </p>
        </div>
      </div>

      {/* ── Interview list ── */}
      {PREV.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <CheckCircle2 size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No completed interviews yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {PREV.map((iv, i) => (
            <div
              key={iv.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:shadow-[#6750a4]/8 hover:border-[#6750a4]/20 hover:-translate-y-0.5 transition-all duration-200 p-5 flex gap-4 items-start cursor-pointer"
              onClick={() => navigate(`/interviews/${iv.id}/report`)}
            >
              {/* Rank */}
              <div className="w-6 text-center shrink-0 mt-1">
                <span className="text-xs text-gray-300 font-bold">{String(i + 1).padStart(2, "0")}</span>
              </div>

              <Logo index={iv.logoIndex} />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p className="font-bold text-black leading-tight">
                      {iv.round ?? TYPE_LABELS[iv.type]}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">{iv.company} · {iv.role ?? "Role"}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <ScoreBadge score={iv.score} />
                    <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-500 border border-gray-200 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 size={10} /> Completed
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 flex-wrap">
                  <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock size={11} /> {iv.date} at {iv.time}
                  </span>
                  <span className="text-xs text-gray-300">|</span>
                  <span className="text-xs text-gray-400">{TYPE_LABELS[iv.type]}</span>
                  {iv.notes && (
                    <>
                      <span className="text-xs text-gray-300">|</span>
                      <span className="text-xs text-gray-400 italic">{iv.notes}</span>
                    </>
                  )}
                </div>

                {/* Score bar */}
                {iv.score !== undefined && (
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${iv.score}%`,
                          backgroundColor: iv.score >= 80 ? "#22c55e" : iv.score >= 60 ? "#f59e0b" : "#ef4444",
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">{iv.score}%</span>
                  </div>
                )}
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/interviews/${iv.id}/report`); }}
                className="shrink-0 flex items-center gap-1 text-xs text-[#6750a4] font-semibold group-hover:underline mt-1"
              >
                View Report <ChevronRight size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
