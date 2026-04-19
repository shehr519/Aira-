import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, X, MapPin, Briefcase, Clock, CheckCircle2, AlertCircle, FileText, Sparkles } from "lucide-react";
import imgJobResume from "../../../assets/resume.png";
import imgHiringAnEmployee from "../../../assets/resumecheck.png";
import imgCalendarWithNotesAndReminders from "../../../assets/check.png";
import imgGptRobotWithSpeechBubble from "../../../assets/aira.png";
import imgRecruiterDesk from "../../../assets/interview.png";

// ── Mock active applications data ─────────────────────────────────
const ACTIVE_APPS = [
  { id: "1", title: "Frontend Developer", company: "TechHive Solutions", location: "Remote", status: "Under Review", statusColor: "#f59e0b", appliedDate: "Apr 5, 2026" },
  { id: "2", title: "React Engineer",     company: "NovaSoft Inc.",      location: "Lahore, PK", status: "Shortlisted",          statusColor: "#17CF97", appliedDate: "Apr 3, 2026" },
  { id: "3", title: "UI/UX Developer",   company: "CreativeBase",        location: "Karachi, PK", status: "Interview Scheduled", statusColor: "#6750a4", appliedDate: "Mar 29, 2026" },
];

// ── Mock test data ────────────────────────────────────────────────
const DUE_TESTS = [
  { id: "1", title: "JavaScript Fundamentals", company: "TechHive Solutions", deadline: "Apr 13, 2026", duration: "45 min", urgent: true },
  { id: "2", title: "React & Hooks Assessment", company: "NovaSoft Inc.", deadline: "Apr 16, 2026", duration: "30 min", urgent: false },
];
const LAST_REPORT = { title: "Problem Solving Basics", score: 78, date: "Apr 1, 2026", grade: "B+" };

// ── Schedule data with IDs ─────────────────────────────────────────
const scheduleData = [
  { id: "3", date: "Apr 14, 2026", type: "Voice Interview (AI-based)", time: "10:00 AM – 11:00 AM", isLive: true },
  { id: "4", date: "Apr 18, 2026", type: "Technical Discussion",       time: "03:00 PM – 04:00 PM", isLive: false },
  { id: "5", date: "Apr 22, 2026", type: "HR Interview (AI-based)",    time: "11:00 AM – 12:00 PM", isLive: false },
];

// ── Stat Card ─────────────────────────────────────────────────────
interface StatCardProps {
  bgColor: string;
  dotColor: string;
  image: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  onClick?: () => void;
  active?: boolean;
}

function StatCard({ bgColor, dotColor, image, imageAlt, title, subtitle, buttonLabel, onClick, active }: StatCardProps) {
  return (
    <div
      className={`relative rounded-xl flex-1 p-5 flex items-center gap-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.01] ${active ? "ring-2 ring-[#6750a4]/40 shadow-md shadow-[#6750a4]/10" : ""}`}
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      <div className="absolute top-4 left-4 size-3 rounded-full shrink-0" style={{ backgroundColor: dotColor }} />
      <div className="shrink-0 w-[90px] h-[90px] flex items-end justify-center">
        <img src={image} alt={imageAlt} className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105" />
      </div>
      <div className="flex flex-col gap-2 min-w-0">
        <h3 className="text-lg font-bold text-black leading-tight">{title}</h3>
        <p className="text-sm text-black leading-snug break-words">{subtitle}</p>
        <button
          onClick={(e) => { e.stopPropagation(); onClick?.(); }}
          className="mt-1 self-start bg-[#6750a4] text-white text-xs px-4 py-1.5 rounded-full hover:bg-[#5a4490] hover:shadow-md hover:shadow-[#6750a4]/30 transition-all duration-200 whitespace-nowrap"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

// ── Active Applications Drawer ────────────────────────────────────
function ActiveJobsDrawer({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="mt-3 bg-white rounded-2xl border border-[#6750a4]/20 shadow-xl overflow-hidden transition-all duration-200">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gradient-to-r from-[#f8f5ff] to-transparent">
        <div className="flex items-center gap-2">
          <Briefcase size={15} className="text-[#6750a4]" />
          <span className="text-sm font-bold text-[#6750a4]">Active Applications</span>
          <span className="bg-[#6750a4] text-white text-xs px-2 py-0.5 rounded-full">{ACTIVE_APPS.length}</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors hover:rotate-90 duration-200">
          <X size={15} />
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {ACTIVE_APPS.map((app) => (
          <div
            key={app.id}
            className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer group"
            onClick={() => navigate(`/jobs/${app.id}`)}
          >
            <div className="size-9 rounded-xl bg-[#6750a4]/10 flex items-center justify-center shrink-0 group-hover:bg-[#6750a4]/20 transition-colors">
              <Briefcase size={15} className="text-[#6750a4]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-black truncate">{app.title}</p>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-xs text-gray-500">{app.company}</span>
                <span className="flex items-center gap-1 text-xs text-gray-400"><MapPin size={10} /> {app.location}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${app.statusColor}18`, color: app.statusColor }}>
                {app.status}
              </span>
              <p className="text-xs text-gray-400 mt-1">{app.appliedDate}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t border-gray-100 flex justify-end">
        <button onClick={() => navigate("/jobs")} className="flex items-center gap-1.5 text-xs text-[#6750a4] font-semibold hover:underline">
          Browse all jobs <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

// ── Tests Drawer ──────────────────────────────────────────────────
function TestsDrawer({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="mt-3 bg-white rounded-2xl border border-[#17CF97]/30 shadow-xl overflow-hidden transition-all duration-200">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gradient-to-r from-[#f0fdf9] to-transparent">
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-[#17CF97]" />
          <span className="text-sm font-bold text-[#059669]">Due Tests &amp; Last Report</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={15} /></button>
      </div>

      <div className="px-5 pt-4 pb-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <AlertCircle size={11} /> Pending Tests
        </p>
        <div className="space-y-2.5">
          {DUE_TESTS.map((test) => (
            <div
              key={test.id}
              onClick={() => navigate(`/tests/${test.id}`)}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:shadow-sm transition-all duration-200 ${test.urgent ? "border-red-100 bg-red-50/50 hover:border-red-200" : "border-gray-100 bg-gray-50/50 hover:border-gray-200"}`}
            >
              <div className={`size-9 rounded-xl flex items-center justify-center shrink-0 ${test.urgent ? "bg-red-100" : "bg-gray-100"}`}>
                <FileText size={14} className={test.urgent ? "text-red-500" : "text-gray-500"} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-black truncate">{test.title}</p>
                <p className="text-xs text-gray-500">{test.company}</p>
              </div>
              <div className="text-right shrink-0">
                {test.urgent && <p className="text-xs text-red-500 font-semibold">Due soon</p>}
                <p className={`text-xs ${test.urgent ? "text-red-400" : "text-gray-400"}`}>{test.deadline}</p>
                <p className="text-xs text-gray-400">{test.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pt-3 pb-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <CheckCircle2 size={11} /> Last Report
        </p>
        <div className="flex items-center gap-4 p-3 rounded-xl border border-[#17CF97]/20 bg-[#f0fdf9]">
          <div className="size-12 rounded-xl bg-[#17CF97]/20 flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-[#059669]">{LAST_REPORT.grade}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-black">{LAST_REPORT.title}</p>
            <p className="text-xs text-gray-500 mt-0.5">Scored {LAST_REPORT.score}/100 · {LAST_REPORT.date}</p>
          </div>
          <button onClick={() => navigate("/tests/1/result")} className="text-xs text-[#059669] font-semibold hover:underline shrink-0 flex items-center gap-1">
            View <ChevronRight size={12} />
          </button>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-gray-100 flex justify-end">
        <button onClick={() => navigate("/tests")} className="flex items-center gap-1.5 text-xs text-[#059669] font-semibold hover:underline">
          Go to all tests <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

// ── Recommended Card ──────────────────────────────────────────────
function RecommendedCard({ onClick }: { onClick?: () => void }) {
  return (
    <div className="bg-[#c8d6d9] rounded-xl p-5 flex flex-col items-center justify-center gap-3 w-full h-full min-h-[200px] hover:shadow-lg transition-all duration-200 group">
      <div className="size-8 rounded-full bg-[#6750a4]/20 flex items-center justify-center">
        <Sparkles size={16} className="text-[#6750a4] group-hover:animate-pulse" />
      </div>
      <h3 className="text-base font-bold text-black text-center">Recommended for You:</h3>
      <p className="text-sm italic text-black text-center">Frontend Developer</p>
      <p className="text-sm font-semibold text-[#6750a4] text-center">87% Skill Match</p>
      <button
        onClick={onClick}
        className="bg-[#6750a4] text-white text-xs px-5 py-1.5 rounded-full hover:bg-[#5a4490] hover:shadow-md hover:shadow-[#6750a4]/30 transition-all duration-200 mt-1"
      >
        Apply Now
      </button>
    </div>
  );
}

// ── Schedule Table ─────────────────────────────────────────────────
function ScheduleTable() {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      <div className="grid grid-cols-4 bg-[#ddd6f3] text-sm font-bold text-black">
        {["Date ⇅", "Type ⇅", "Time ⇅", "Action ⇅"].map((h) => (
          <div key={h} className="px-4 py-3">{h}</div>
        ))}
      </div>
      {scheduleData.map((row, i) => (
        <div key={i} className="grid grid-cols-4 border-t border-gray-200 bg-white text-sm hover:bg-purple-50/20 transition-colors">
          <div className="px-4 py-3 text-black">{row.date}</div>
          <div className="px-4 py-3 text-black">{row.type}</div>
          <div className={`px-4 py-3 font-medium ${row.isLive ? "text-green-600" : "text-gray-600"}`}>{row.time}</div>
          <div className="px-4 py-3">
            {row.isLive ? (
              <button
                onClick={() => navigate(`/interviews/${row.id}/join`)}
                className="flex items-center gap-1.5 text-[#6750a4] font-medium hover:underline text-sm group"
              >
                <span className="size-2 rounded-full bg-green-500 animate-pulse" />
                Join Interview
              </button>
            ) : (
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs italic">Not Started</span>
                <span className="text-gray-400 text-xs">{row.date}</span>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="flex justify-end px-4 py-3 bg-white border-t border-gray-200">
        <button
          onClick={() => navigate("/tests")}
          className="bg-[#4a4a6a] text-white text-xs px-5 py-1.5 rounded-full hover:bg-[#3a3a5a] hover:shadow-md transition-all duration-200"
        >
          See More
        </button>
      </div>
    </div>
  );
}

// ── AI Pulse Widget ───────────────────────────────────────────────
function AIInsightBanner() {
  return (
    <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#6750a4] via-[#7c5cbf] to-[#a78bfa] p-4 flex items-center gap-4 relative overflow-hidden shadow-lg shadow-[#6750a4]/20">
      {/* Decorative glow */}
      <div className="absolute -right-8 -top-8 size-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute right-16 bottom-0 size-16 rounded-full bg-white/5 blur-xl pointer-events-none" />
      <div className="relative size-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
        <Sparkles size={22} className="text-white" />
        <span className="absolute -top-1 -right-1 size-3 rounded-full bg-green-400 border-2 border-white animate-pulse" />
      </div>
      <div className="relative flex-1 min-w-0">
        <p className="text-white text-sm font-bold">AIRA Intelligence Active</p>
        <p className="text-white/70 text-xs mt-0.5">Your profile is 85% complete · Resume score improved by 10% this week</p>
      </div>
      <div className="relative flex gap-1.5 shrink-0">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1 rounded-full bg-white/60 animate-pulse"
            style={{ height: `${12 + i * 6}px`, animationDelay: `${i * 0.2}s` }}
          />
        ))}
        {[2, 1, 0].map((i) => (
          <span
            key={`r${i}`}
            className="w-1 rounded-full bg-white/60 animate-pulse"
            style={{ height: `${12 + i * 6}px`, animationDelay: `${(3 + i) * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────
export function DashboardPage() {
  const navigate = useNavigate();
  const [showJobs, setShowJobs]   = useState(false);
  const [showTests, setShowTests] = useState(false);

  return (
    <div className="p-8 bg-[#fafafc] min-h-full">
      <h1 className="text-4xl font-bold text-black mb-2">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">Welcome back, Antor! Here's your career snapshot.</p>

      {/* AI insight banner */}
      <AIInsightBanner />

      {/* Cards Grid + Recommended */}
      <div className="flex gap-5 items-stretch">
        {/* 2×2 cards */}
        <div className="flex flex-col gap-5 flex-1 min-w-0">
          <div className="flex gap-5">
            <StatCard
              bgColor="#D7E1DE"
              dotColor="#60887A"
              image={imgJobResume}
              imageAlt="Resume"
              title="Resume Status"
              subtitle="Analysed — 85% Match Score"
              buttonLabel="View Resume"
              onClick={() => navigate("/resume")}
            />
            <StatCard
              bgColor="rgba(221,184,198,0.55)"
              dotColor="#DDB8C6"
              image={imgHiringAnEmployee}
              imageAlt="Jobs"
              title="Jobs Applied"
              subtitle="3 Active Applications"
              buttonLabel="View Applications"
              active={showJobs}
              onClick={() => { setShowTests(false); setShowJobs((v) => !v); }}
            />
          </div>

          {/* Jobs inline drawer */}
          {showJobs && <ActiveJobsDrawer onClose={() => setShowJobs(false)} />}

          <div className="flex gap-5">
            <StatCard
              bgColor="rgba(221,184,198,0.55)"
              dotColor="#DDB8C6"
              image={imgCalendarWithNotesAndReminders}
              imageAlt="Tests"
              title="Tests Completed"
              subtitle="2 / 3 Tests Done · 1 Due"
              buttonLabel="View Tests & Report"
              active={showTests}
              onClick={() => { setShowJobs(false); setShowTests((v) => !v); }}
            />
            <StatCard
              bgColor="#D7E1DE"
              dotColor="#60887A"
              image={imgGptRobotWithSpeechBubble}
              imageAlt="AI Feedback"
              title="AI Feedback"
              subtitle="Communication score improved 10%"
              buttonLabel="View Report"
              onClick={() => navigate("/ai-feedback")}
            />
          </div>

          {/* Tests inline drawer */}
          {showTests && <TestsDrawer onClose={() => setShowTests(false)} />}
        </div>

        {/* Recommended sidebar */}
        <div className="w-[200px] shrink-0">
          <RecommendedCard onClick={() => navigate("/jobs/1/apply")} />
        </div>
      </div>

      {/* Upcoming Schedule */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-black mb-4">Upcoming Schedule</h2>
        <div className="flex gap-8 items-start">
          <div className="shrink-0 w-[160px] hidden lg:block">
            <img src={imgRecruiterDesk} alt="Schedule illustration" className="w-full object-contain opacity-80" />
          </div>
          <div className="flex-1 min-w-0">
            <ScheduleTable />
          </div>
        </div>
      </div>
    </div>
  );
}