import { useNavigate, useParams } from "react-router";
import {
  Calendar, Clock, Building2, ChevronLeft, Video, Code2, MessageSquare,
  Users, Cpu, CheckCircle2, AlertCircle, BookOpen, Wifi
} from "lucide-react";
import { INTERVIEWS, LOGO_COMPONENTS, TYPE_LABELS, getInterview } from "./interviewData";

// ── Logo wrapper ──────────────────────────────────────────────────
function Logo({ index, size = 60 }: { index: number; size?: number }) {
  const Cmp = LOGO_COMPONENTS[index % LOGO_COMPONENTS.length];
  return (
    <div
      className="rounded-2xl bg-white border border-gray-100 shadow-sm shrink-0 flex items-center justify-center p-2"
      style={{ width: size, height: size }}
    >
      <Cmp />
    </div>
  );
}

// ── Type icon ─────────────────────────────────────────────────────
function TypeIcon({ type, size = 20 }: { type: string; size?: number }) {
  if (type === "video" || type === "hr") return <Video size={size} className="text-[#6750a4]" />;
  if (type === "coding") return <Code2 size={size} className="text-[#FF630B]" />;
  return <MessageSquare size={size} className="text-[#007DFC]" />;
}

// ── Info pill ─────────────────────────────────────────────────────
function InfoPill({ icon: Icon, label, value, color = "#6750a4" }: {
  icon: React.ComponentType<{ size?: number }>; label: string; value: string; color?: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3">
      <div className="size-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}18` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-black">{value}</p>
      </div>
    </div>
  );
}

// ── Preparation checklist ─────────────────────────────────────────
const PREP_ITEMS: Record<string, string[]> = {
  video: [
    "Test your camera and microphone 15 minutes before",
    "Ensure a stable internet connection (minimum 5 Mbps)",
    "Choose a quiet, well-lit room",
    "Close all unnecessary browser tabs and apps",
    "Have a glass of water nearby",
    "Dress professionally from head to toe",
  ],
  coding: [
    "Review the job description and required tech stack",
    "Practise common algorithm problems on LeetCode/HackerRank",
    "Ensure your development environment is ready",
    "Review your preferred language's syntax",
    "Read the problem statement fully before writing any code",
    "Test edge cases before submitting",
  ],
  technical: [
    "Review system design fundamentals (scalability, caching, DBs)",
    "Be ready to whiteboard solutions verbally",
    "Prepare examples from your past projects",
    "Review common data structures and complexity analysis",
    "Prepare questions to ask the senior engineer",
    "Brush up on the tech stack mentioned in the job description",
  ],
  hr: [
    "Research the company culture, mission and recent news",
    "Prepare a clear 2-minute 'tell me about yourself' pitch",
    "Know your salary expectations and negotiation range",
    "Prepare questions about growth and team structure",
    "Review your CV — expect questions on any point",
  ],
};

export function InterviewDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const interview = getInterview(Number(id));

  if (!interview) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Interview not found.</p>
        <button onClick={() => navigate("/interviews")} className="mt-4 text-[#6750a4] hover:underline">
          Back to Interviews
        </button>
      </div>
    );
  }

  const prepItems = PREP_ITEMS[interview.type] ?? PREP_ITEMS.video;
  const isUpcoming = interview.status === "upcoming" || interview.status === "live";

  const handlePrimaryAction = () => {
    if (interview.type === "coding") navigate(`/interviews/${interview.id}/coding`);
    else if (interview.type === "technical") navigate(`/interviews/${interview.id}/technical`);
    else navigate(`/interviews/${interview.id}/join`);
  };

  const typeColors: Record<string, string> = {
    video: "#6750a4",
    coding: "#FF630B",
    technical: "#007DFC",
    hr: "#17CF97",
  };
  const color = typeColors[interview.type] ?? "#6750a4";

  return (
    <div className="p-8 bg-[#fafafc] min-h-full">
      {/* Back */}
      <button
        onClick={() => navigate("/interviews")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#6750a4] transition-colors mb-6"
      >
        <ChevronLeft size={16} /> Back to Interviews
      </button>

      {/* Hero card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <Logo index={interview.logoIndex} size={68} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
              <div>
                <h1 className="text-2xl font-bold text-black leading-tight">{interview.round ?? TYPE_LABELS[interview.type]}</h1>
                <p className="text-base text-gray-500 mt-0.5">{interview.company} · {interview.role}</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: `${color}15`, color }}>
                <TypeIcon type={interview.type} size={15} />
                {TYPE_LABELS[interview.type]}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{interview.description}</p>

            {/* Conducted by badge */}
            <div className="flex items-center gap-2 mt-3">
              {interview.conductedBy === "ai" ? (
                <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 text-[#6750a4] text-xs px-3 py-1 rounded-full">
                  <Cpu size={12} /> AI-Conducted Interview
                </div>
              ) : (
                <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs px-3 py-1 rounded-full">
                  <Users size={12} /> Conducted by Company
                </div>
              )}
              {interview.status === "live" && (
                <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs px-3 py-1 rounded-full">
                  <span className="size-1.5 rounded-full bg-green-500 animate-pulse inline-block" /> Live Now
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <InfoPill icon={Calendar} label="Date" value={interview.date} color={color} />
          <InfoPill icon={Clock} label="Time" value={`${interview.time} (${interview.dayLabel})`} color={color} />
          <InfoPill icon={Clock} label="Duration" value={`${interview.duration} minutes`} color={color} />
          <InfoPill icon={Building2} label="Company" value={interview.company} color={color} />
        </div>

        {/* CTA buttons */}
        {isUpcoming && (
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-5 border-t border-gray-100">
            <button
              onClick={handlePrimaryAction}
              className="flex-1 text-sm py-3 rounded-full text-white font-semibold transition-colors"
              style={{ backgroundColor: color }}
            >
              {interview.type === "coding"
                ? "Start Coding Task"
                : interview.type === "technical"
                ? "Enter Technical Discussion"
                : "Join Interview Now"}
            </button>
            <button
              onClick={() => navigate("/interviews")}
              className="flex-1 text-sm py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to Interviews
            </button>
          </div>
        )}
        {interview.status === "completed" && (
          <div className="flex gap-3 mt-6 pt-5 border-t border-gray-100">
            <button
              onClick={() => navigate(`/interviews/${interview.id}/report`)}
              className="flex-1 text-sm py-3 rounded-full bg-[#6750a4] text-white hover:bg-[#5a4490] transition-colors"
            >
              View Interview Report
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Instructions */}
        {interview.instructions && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={18} style={{ color }} />
              <h2 className="text-base font-bold text-black">Instructions</h2>
            </div>
            <ul className="space-y-3">
              {interview.instructions.map((inst, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                  <div
                    className="size-5 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
                    style={{ backgroundColor: color }}
                  >
                    {i + 1}
                  </div>
                  {inst}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Preparation Checklist */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={18} style={{ color }} />
            <h2 className="text-base font-bold text-black">Preparation Checklist</h2>
          </div>
          <ul className="space-y-2">
            {prepItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                <CheckCircle2 size={15} className="text-green-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Requirements (for video/ai interviews) */}
        {(interview.type === "video" || interview.conductedBy === "ai") && (
          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Wifi size={18} className="text-[#6750a4]" />
              <h2 className="text-base font-bold text-black">Technical Requirements</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Internet Speed", value: "Minimum 5 Mbps", ok: true },
                { label: "Browser", value: "Chrome / Edge recommended", ok: true },
                { label: "Camera", value: "Required for video interview", ok: true },
                { label: "Microphone", value: "Clear audio essential", ok: true },
              ].map(({ label, value, ok }) => (
                <div key={label} className="flex items-start gap-2">
                  {ok
                    ? <CheckCircle2 size={15} className="text-green-500 shrink-0 mt-0.5" />
                    : <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />}
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{label}</p>
                    <p className="text-xs text-gray-500">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Interview note */}
        {interview.conductedBy === "ai" && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Cpu size={18} className="text-[#6750a4]" />
              <h2 className="text-base font-bold text-black">About AI Interviews</h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              This interview is conducted by an AI agent on behalf of {interview.company}. 
              The AI will ask you structured questions, analyse your responses, and generate a performance report automatically.
            </p>
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-green-500" /> Real-time response analysis</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-green-500" /> Instant feedback after completion</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-green-500" /> Results shared with company automatically</li>
            </ul>
          </div>
        )}
      </div>

      {/* Related interviews */}
      <div className="mt-8">
        <h2 className="text-base font-bold text-black mb-4">Other Interviews from {interview.company}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {INTERVIEWS.filter((iv) => iv.company === interview.company && iv.id !== interview.id).map((iv) => (
            <button
              key={iv.id}
              onClick={() => navigate(`/interviews/${iv.id}`)}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 hover:border-[#6750a4] hover:shadow-md transition-all text-left"
            >
              <Logo index={iv.logoIndex} size={40} />
              <div className="min-w-0">
                <p className="text-sm font-bold text-black">{iv.round ?? TYPE_LABELS[iv.type]}</p>
                <p className="text-xs text-gray-500">{iv.date} · {iv.time}</p>
              </div>
            </button>
          ))}
          {INTERVIEWS.filter((iv) => iv.company === interview.company && iv.id !== interview.id).length === 0 && (
            <p className="text-sm text-gray-400 italic">No other interviews from this company.</p>
          )}
        </div>
      </div>
    </div>
  );
}
