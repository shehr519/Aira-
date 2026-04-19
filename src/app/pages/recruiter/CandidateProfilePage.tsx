import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronLeft, Mail, Phone, MapPin, Star, CheckCircle2,
  XCircle, ClipboardList, Video, Download, Briefcase,
  GraduationCap, BrainCircuit, MessageSquare, FileText,
  Calendar, Clock, Zap, Award, TrendingUp,
} from "lucide-react";
import mega from "../../../assets/megaphone .png";

// ── Mock candidate data ───────────────────────────────────────────
const CANDIDATE = {
  name:     "Ahmed Khan",
  initials: "AK",
  job:      "Frontend Developer (React.js)",
  email:    "ahmed.khan@email.com",
  phone:    "+92 300 1234567",
  location: "Lahore, Pakistan",
  applied:  "Apr 13, 2026",
  aiScore:    94,
  resumeScore:91,
  testScore:  88,
  interviewScore: 87,
  overall:    90,
  status: "shortlisted",
  skills: [
    { name: "React.js",   score: 95 },
    { name: "TypeScript", score: 88 },
    { name: "Node.js",    score: 74 },
    { name: "CSS/Tailwind",score: 92 },
    { name: "Git",        score: 85 },
    { name: "REST APIs",  score: 80 },
  ],
  experience: [
    { role: "Frontend Developer", company: "Digital Agency XYZ", duration: "2023 – Present", desc: "Built responsive web apps using React and TypeScript." },
    { role: "Junior Developer",   company: "Startup ABC",        duration: "2021 – 2023",    desc: "Worked on Vue.js and REST API integrations." },
  ],
  education: [
    { degree: "BSc Computer Science", institute: "LUMS University", year: "2021" },
  ],
  aiInsights: [
    { label: "Skill Match",      value: "94%",  note: "Strong match for React.js role" },
    { label: "Communication",    value: "88%",  note: "Clear, concise responses in AI interview" },
    { label: "Problem Solving",  value: "91%",  note: "Solved 4/5 coding challenges correctly" },
    { label: "Culture Fit",      value: "85%",  note: "Team-oriented attitude detected" },
  ],
};

type Tab = "overview" | "resume" | "tests" | "interview" | "ai_report";

function ScoreRing({ score, size = 56 }: { score: number; size?: number }) {
  const r = (size - 7) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 85 ? "#17CF97" : score >= 70 ? "#f59e0b" : "#ef4444";
  return (
    <div className="relative shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={6} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={6}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <span className="absolute text-sm font-bold" style={{ color }}>{score}%</span>
    </div>
  );
}

function SkillBar({ name, score }: { name: string; score: number }) {
  const color = score >= 85 ? "#17CF97" : score >= 70 ? "#6750a4" : "#f59e0b";
  return (
    <div className="group">
      <div className="flex justify-between mb-1.5">
        <span className="text-xs font-semibold text-gray-700">{name}</span>
        <span className="text-xs font-bold" style={{ color }}>{score}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export function CandidateProfilePage() {
  const navigate = useNavigate();
  const [tab, setTab]           = useState<Tab>("overview");
  const [action, setAction]     = useState<string | null>(null);

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview",   label: "Overview",    icon: <Briefcase size={14} /> },
    { id: "resume",     label: "Resume",      icon: <FileText size={14} /> },
    { id: "tests",      label: "Tests",       icon: <ClipboardList size={14} /> },
    { id: "interview",  label: "Interview",   icon: <Video size={14} /> },
    { id: "ai_report",  label: "AI Report",   icon: <BrainCircuit size={14} /> },
  ];

  return (
    <div className="p-8 bg-[#fafafc] min-h-full space-y-6">
      {/* Back */}
      <button onClick={() => navigate("/recruiter/applicants")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#6750a4] transition-colors group">
        <ChevronLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />Back to Applicants
      </button>

      {/* ── Hero card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-[#6750a4] via-[#a78bfa] to-[#17CF97]" />
        <div className="flex flex-col lg:flex-row gap-6 p-6">
          {/* Left: profile */}
          <div className="flex flex-col items-center gap-3 text-center lg:w-48 shrink-0">
            <div className="relative">
              <div className="size-20 rounded-2xl bg-gradient-to-br from-[#6750a4] to-[#a78bfa] flex items-center justify-center ring-4 ring-[#6750a4]/10">
                <span className="text-2xl font-bold text-white">{CANDIDATE.initials}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-green-400 border-2 border-white flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">✓</span>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-black text-lg">{CANDIDATE.name}</h2>
              <p className="text-xs text-gray-500">{CANDIDATE.job}</p>
            </div>
            <div className="flex flex-col gap-1.5 text-xs text-gray-500 w-full">
              <span className="flex items-center gap-1.5 justify-center"><Mail size={11} />{CANDIDATE.email}</span>
              <span className="flex items-center gap-1.5 justify-center"><Phone size={11} />{CANDIDATE.phone}</span>
              <span className="flex items-center gap-1.5 justify-center"><MapPin size={11} />{CANDIDATE.location}</span>
              <span className="flex items-center gap-1.5 justify-center"><Calendar size={11} />Applied: {CANDIDATE.applied}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-gray-100" />

          {/* Score rings */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
              {[
                { label: "Overall Score",    score: CANDIDATE.overall,        color: "#6750a4" },
                { label: "AI Match",         score: CANDIDATE.aiScore,        color: "#17CF97" },
                { label: "Resume Score",     score: CANDIDATE.resumeScore,    color: "#007DFC" },
                { label: "Test Score",       score: CANDIDATE.testScore,      color: "#f59e0b" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50/80 hover:bg-[#6750a4]/4 transition-colors">
                  <ScoreRing score={s.score} />
                  <p className="text-xs font-semibold text-gray-600 text-center">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Status + illustration */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-sm font-bold text-green-700">Shortlisted</span>
              </div>
             <img src={mega} alt="No applicants" className="h-[120px] w-auto" />
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-gray-100" />

          {/* Action buttons */}
          <div className="flex flex-col gap-2.5 lg:w-40">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</p>
            {[
              { label: "Shortlist",       icon: Star,          style: "bg-[#6750a4] text-white hover:bg-[#5a4490]" },
              { label: "Assign Test",     icon: ClipboardList, style: "bg-white text-[#6750a4] border border-[#6750a4]/30 hover:bg-[#6750a4]/8" },
              { label: "Schedule Interview", icon: Video,       style: "bg-white text-[#6750a4] border border-[#6750a4]/30 hover:bg-[#6750a4]/8" },
              { label: "Send Message",    icon: MessageSquare, style: "bg-white text-gray-600 border border-gray-200 hover:border-[#6750a4]/30" },
              { label: "Reject",          icon: XCircle,       style: "bg-white text-red-500 border border-red-200 hover:bg-red-50" },
            ].map(({ label, icon: Icon, style }) => (
              <button
                key={label}
                onClick={() => setAction(label)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 ${style} ${action === label ? "ring-2 ring-[#6750a4]/30" : ""}`}
              >
                <Icon size={13} />{label}
              </button>
            ))}
            <button className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 hover:border-[#6750a4]/30 transition-all">
              <Download size={13} /> Download CV
            </button>
          </div>
        </div>
      </div>

      {/* ── Tab nav ── */}
      <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1.5 shadow-sm overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
              tab === t.id
                ? "bg-[#6750a4] text-white shadow-md"
                : "text-gray-500 hover:text-[#6750a4] hover:bg-[#6750a4]/6"
            }`}
          >
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">

          {tab === "overview" && (
            <>
              {/* Skills */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-black mb-4 flex items-center gap-2"><BrainCircuit size={16} className="text-[#6750a4]" />Skill Match</h3>
                <div className="space-y-3.5">
                  {CANDIDATE.skills.map((s) => <SkillBar key={s.name} name={s.name} score={s.score} />)}
                </div>
              </div>

              {/* Experience */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-black mb-4 flex items-center gap-2"><Briefcase size={16} className="text-[#6750a4]" />Experience</h3>
                <div className="space-y-4">
                  {CANDIDATE.experience.map((e, i) => (
                    <div key={i} className="relative pl-5 border-l-2 border-[#6750a4]/20 pb-4 last:pb-0">
                      <div className="absolute -left-[5px] top-0 size-2.5 rounded-full bg-[#6750a4]" />
                      <p className="font-bold text-black text-sm">{e.role}</p>
                      <p className="text-xs text-[#6750a4] font-semibold">{e.company}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{e.duration}</p>
                      <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{e.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {tab === "resume" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-black flex items-center gap-2"><FileText size={16} className="text-[#6750a4]" />Resume / CV</h3>
                <button className="flex items-center gap-1.5 text-xs text-[#6750a4] border border-[#6750a4]/30 px-3 py-1.5 rounded-lg hover:bg-[#6750a4]/8 transition-colors"><Download size={12} />Download</button>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center border border-dashed border-gray-200 space-y-3">
                <img src={mega} alt="No applicants" className="h-[120px] w-auto" />
                <p className="text-sm font-semibold text-gray-700">Ahmed_Khan_Resume.pdf</p>
                <p className="text-xs text-gray-400">AI Resume Score: <span className="text-[#17CF97] font-bold">91%</span> match</p>
                <p className="text-xs text-gray-400">Keywords matched: React.js, TypeScript, REST APIs, Git, Agile</p>
              </div>
            </div>
          )}

          {tab === "tests" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-black mb-4 flex items-center gap-2"><ClipboardList size={16} className="text-[#6750a4]" />Test Results</h3>
              {[
                { name: "React.js & Hooks Assessment", score: 88, time: "45 min", date: "Apr 12, 2026", status: "completed" },
                { name: "JavaScript Fundamentals",     score: 91, time: "30 min", date: "Apr 11, 2026", status: "completed" },
              ].map((t) => (
                <div key={t.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-3">
                  <div className="size-12 rounded-xl bg-[#6750a4]/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-[#6750a4]">{t.score}%</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-black text-sm truncate">{t.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock size={10} />{t.time}</span>
                      <span className="flex items-center gap-1"><Calendar size={10} />{t.date}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">Completed</span>
                </div>
              ))}
            </div>
          )}

          {tab === "interview" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-black mb-4 flex items-center gap-2"><Video size={16} className="text-[#6750a4]" />Interview Summary</h3>
              <div className="bg-[#6750a4]/4 rounded-xl p-4 mb-4">
                <p className="text-xs text-gray-500 mb-1">AI Interview Score</p>
                <p className="text-3xl font-bold text-[#6750a4]">87%</p>
                <p className="text-xs text-gray-400 mt-0.5">Completed Apr 13, 2026 · 22 mins</p>
              </div>
              {["Communication: Clear and structured answers", "Technical knowledge: Strong React.js expertise", "Problem-solving: Methodical approach", "Attitude: Positive and team-oriented"].map((note) => (
                <div key={note} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                  <CheckCircle2 size={13} className="text-green-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-gray-700">{note}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "ai_report" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-black flex items-center gap-2"><BrainCircuit size={16} className="text-[#6750a4]" />AIRA AI Report</h3>
                <button className="flex items-center gap-1.5 text-xs text-[#6750a4] border border-[#6750a4]/30 px-3 py-1.5 rounded-lg hover:bg-[#6750a4]/8 transition-colors"><Download size={12} />Export PDF</button>
              </div>
              <div className="bg-[#6750a4]/4 border border-[#6750a4]/12 rounded-xl p-4 flex gap-3">
                <Zap size={16} className="text-[#6750a4] mt-0.5 shrink-0" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-bold text-[#6750a4]">AIRA Recommendation: STRONG HIRE</span><br />
                  Ahmed scores in the top 5% of all Frontend Developer applicants. His React.js expertise (95%) combined with strong communication (88%) and problem-solving skills (91%) make him an excellent fit for this role.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {CANDIDATE.aiInsights.map((ins) => (
                  <div key={ins.label} className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-gray-500">{ins.label}</p>
                      <span className="text-sm font-bold text-[#6750a4]">{ins.value}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-relaxed">{ins.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Education */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-black mb-3 flex items-center gap-2 text-sm"><GraduationCap size={14} className="text-[#6750a4]" />Education</h3>
            {CANDIDATE.education.map((e, i) => (
              <div key={i} className="flex gap-3">
                <div className="size-9 rounded-xl bg-[#6750a4]/10 flex items-center justify-center shrink-0">
                  <GraduationCap size={15} className="text-[#6750a4]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">{e.degree}</p>
                  <p className="text-xs text-gray-500">{e.institute}</p>
                  <p className="text-xs text-gray-400">{e.year}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Overall score card */}
          <div className="bg-gradient-to-br from-[#6750a4] to-[#8b6bc4] rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute -bottom-4 -right-4 size-20 rounded-full bg-white/10 blur-2xl" />
            <p className="text-white/70 text-xs mb-3 font-semibold uppercase tracking-wide">Overall Score</p>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-4xl font-bold text-white">90%</span>
              <div className="flex items-center gap-1 text-green-400 text-xs font-semibold mb-1">
                <TrendingUp size={12} /> Top 5%
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[["AI Match","94%"], ["Resume","91%"], ["Test","88%"], ["Interview","87%"]].map(([l,v]) => (
                <div key={l} className="bg-white/10 rounded-xl p-2 text-center">
                  <p className="text-white font-bold text-sm">{v}</p>
                  <p className="text-white/60 text-[9px]">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick notes */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-black mb-3 flex items-center gap-2 text-sm"><MessageSquare size={14} className="text-[#6750a4]" />Recruiter Notes</h3>
            <textarea
              rows={4}
              placeholder="Add your notes about this candidate..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-600 outline-none focus:border-[#6750a4]/50 resize-none placeholder:text-gray-400 transition-colors"
            />
            <button className="mt-2 w-full bg-[#6750a4]/8 text-[#6750a4] text-xs font-semibold py-2 rounded-xl hover:bg-[#6750a4]/15 transition-colors border border-[#6750a4]/20">
              Save Note
            </button>
          </div>

          <div className="flex justify-center">
           <img src={mega} alt="No applicants" className="h-[120px] w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
