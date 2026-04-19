import { useState } from "react";
import { useNavigate } from "react-router";
import {
  TrendingUp, TrendingDown, Star, FileText, ClipboardList,
  Mic, ChevronRight, Lightbulb, AlertCircle, CheckCircle2, Minus,
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

// ── Custom SVG Radar Chart (no recharts — avoids duplicate-key bug) ──
function CustomRadar({ data }: { data: { subject: string; value: number }[] }) {
  const cx = 140, cy = 130, r = 100;
  const levels = 5;
  const total = data.length;
  const angle = (i: number) => (Math.PI * 2 * i) / total - Math.PI / 2;
  const point = (i: number, radius: number) => ({
    x: cx + radius * Math.cos(angle(i)),
    y: cy + radius * Math.sin(angle(i)),
  });

  // Grid polygons
  const gridPolygons = Array.from({ length: levels }, (_, lvl) => {
    const frac = ((lvl + 1) / levels) * r;
    return Array.from({ length: total }, (_, i) => point(i, frac))
      .map((p) => `${p.x},${p.y}`)
      .join(" ");
  });

  // Spoke lines
  const spokes = Array.from({ length: total }, (_, i) => {
    const p = point(i, r);
    return { x1: cx, y1: cy, x2: p.x, y2: p.y };
  });

  // Data polygon
  const dataPolygon = data
    .map((d, i) => point(i, (d.value / 100) * r))
    .map((p) => `${p.x},${p.y}`)
    .join(" ");

  // Labels
  const labels = data.map((d, i) => {
    const p = point(i, r + 20);
    return { ...p, label: d.subject, value: d.value };
  });

  return (
    <svg viewBox="0 0 280 260" className="w-full h-full">
      {/* Grid */}
      {gridPolygons.map((pts, lvl) => (
        <polygon key={`grid-${lvl}`} points={pts} fill="none" stroke="#e5e7eb" strokeWidth="1" />
      ))}
      {/* Spokes */}
      {spokes.map((s, i) => (
        <line key={`spoke-${i}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#e5e7eb" strokeWidth="1" />
      ))}
      {/* Data fill */}
      <polygon points={dataPolygon} fill="#6750a4" fillOpacity="0.2" stroke="#6750a4" strokeWidth="2" strokeLinejoin="round" />
      {/* Data dots */}
      {data.map((d, i) => {
        const p = point(i, (d.value / 100) * r);
        return <circle key={`dot-${i}`} cx={p.x} cy={p.y} r={4} fill="#6750a4" />;
      })}
      {/* Labels */}
      {labels.map((l, i) => (
        <text
          key={`label-${i}`}
          x={l.x}
          y={l.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill="#6b7280"
        >
          {l.label}
        </text>
      ))}
    </svg>
  );
}

// ── Score ring ────────────────────────────────────────────────────
function ScoreRing({ score, size = 120, strokeWidth = 10, color }: {
  score: number; size?: number; strokeWidth?: number; color: string;
}) {
  const r = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const cx = size / 2, cy = size / 2;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={cx} cy={cy} r={r} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={cx} cy={cy} r={r}
          stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={`${fill} ${circ - fill}`} strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold text-black" style={{ fontSize: size * 0.22 }}>{score}%</span>
      </div>
    </div>
  );
}

// ── Score card ────────────────────────────────────────────────────
function ScoreCard({
  icon: Icon, title, subtitle, score, color, trend, onClick,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string; subtitle: string; score: number; color: string;
  trend: "up" | "down" | "same"; onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-5 cursor-pointer hover:shadow-md transition-shadow group"
    >
      <div className="size-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}18` }}>
        <span style={{ color }}>
  <Icon size={22} />
</span>      
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-black">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
          </div>
          <span className="text-xs font-bold" style={{ color }}>{score}%</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        {trend === "up" && <TrendingUp size={16} className="text-green-500" />}
        {trend === "down" && <TrendingDown size={16} className="text-red-500" />}
        {trend === "same" && <Minus size={16} className="text-gray-400" />}
        <ChevronRight size={16} className="text-gray-300 group-hover:text-[#6750a4] transition-colors" />
      </div>
    </div>
  );
}

// ── Feedback tag ──────────────────────────────────────────────────
function Tag({ label, type }: { label: string; type: "strength" | "improve" | "neutral" }) {
  const styles = {
    strength: "bg-green-50 border-green-200 text-green-700",
    improve: "bg-amber-50 border-amber-200 text-amber-700",
    neutral: "bg-gray-50 border-gray-200 text-gray-600",
  };
  const icons = {
    strength: <CheckCircle2 size={12} />,
    improve: <AlertCircle size={12} />,
    neutral: <Minus size={12} />,
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs border px-3 py-1 rounded-full ${styles[type]}`}>
      {icons[type]} {label}
    </span>
  );
}

// ── Insight item ──────────────────────────────────────────────────
function InsightItem({ type, text }: { type: "strength" | "improve" | "tip"; text: string }) {
  const cfg = {
    strength: { icon: <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />, bg: "bg-green-50", border: "border-green-200" },
    improve: { icon: <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />, bg: "bg-amber-50", border: "border-amber-200" },
    tip: { icon: <Lightbulb size={16} className="text-[#6750a4] shrink-0 mt-0.5" />, bg: "bg-purple-50", border: "border-purple-200" },
  };
  const c = cfg[type];
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${c.bg} ${c.border}`}>
      {c.icon}
      <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}

// ── Tabs ──────────────────────────────────────────────────────────
const TABS = ["Overview", "Resume", "Tests", "Interviews"] as const;
type Tab = typeof TABS[number];

// ── Radar data ────────────────────────────────────────────────────
const radarData = [
  { subject: "React.js", value: 88 },
  { subject: "CSS/UI", value: 75 },
  { subject: "JavaScript", value: 82 },
  { subject: "Comms", value: 70 },
  { subject: "Problem\nSolving", value: 65 },
  { subject: "System\nDesign", value: 55 },
];

// ── Test bar data ─────────────────────────────────────────────────
const testBarData = [
  { name: "Frontend", label: "Frontend Assessment", score: 88, color: "#6750a4" },
  { name: "UI Design", label: "UI Design Test", score: 72, color: "#007DFC" },
  { name: "Full Stack", label: "Full Stack Aptitude", score: 65, color: "#17CF97" },
];

// ── Overview tab ──────────────────────────────────────────────────
function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Overall score + radar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Overall score card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center gap-3">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Overall AI Score</p>
          <ScoreRing score={78} size={140} color="#6750a4" />
          <p className="text-sm text-gray-600">
            You're performing <span className="font-semibold text-[#6750a4]">above average</span> across all assessments.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-1">
            <Tag label="Strong React Skills" type="strength" />
            <Tag label="System Design Needs Work" type="improve" />
            <Tag label="Communication Growing" type="neutral" />
          </div>
        </div>

        {/* Radar chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-bold text-black mb-2">Skill Radar</p>
          <div className="h-[220px]">
            <CustomRadar data={radarData} />
          </div>
        </div>
      </div>

      {/* Category score cards */}
      <div className="space-y-3">
        <ScoreCard icon={FileText} title="Resume Score" subtitle="Based on ATS scan & job match analysis" score={85} color="#17CF97" trend="up" />
        <ScoreCard icon={ClipboardList} title="Test Performance" subtitle="Average across 2 completed tests" score={80} color="#007DFC" trend="up" />
        <ScoreCard icon={Mic} title="Interview Performance" subtitle="AI voice interview analysis" score={70} color="#f59e0b" trend="same" />
        <ScoreCard icon={Star} title="Communication Score" subtitle="Clarity, tone & structure in answers" score={72} color="#6750a4" trend="up" />
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={18} className="text-[#6750a4]" />
          <h2 className="text-base font-bold text-black">AI Insights</h2>
        </div>
        <div className="space-y-2">
          <InsightItem type="strength" text="Your React.js knowledge is strong — you consistently score above 85% in component design and state management questions." />
          <InsightItem type="strength" text="Resume ATS match score of 85% indicates your CV is well-tailored to the Frontend Developer role." />
          <InsightItem type="improve" text="System Design fundamentals need attention. Consider reviewing concepts like API design, caching, and scalability patterns." />
          <InsightItem type="improve" text="Some written responses were brief. Try to expand your answers with concrete examples and code snippets." />
          <InsightItem type="tip" text="Tip: Practice mock interviews focused on behavioural questions to improve your communication score from 72% to 85%+." />
        </div>
      </div>
    </div>
  );
}

// ── Resume tab ────────────────────────────────────────────────────
function ResumeTab({ navigate }: { navigate: (p: string) => void }) {
  const sections = [
    { label: "ATS Compatibility", score: 90, color: "#17CF97", note: "Excellent — no formatting issues detected." },
    { label: "Job Match (Frontend Dev)", score: 87, color: "#6750a4", note: "Strong alignment with required skills." },
    { label: "Skills Section", score: 85, color: "#007DFC", note: "All core skills listed. Add TypeScript & testing tools." },
    { label: "Work Experience", score: 78, color: "#f59e0b", note: "Good. Add measurable outcomes (e.g. 'reduced load time by 30%')." },
    { label: "Education", score: 95, color: "#17CF97", note: "Degree and institution clearly presented." },
    { label: "Summary / Objective", score: 60, color: "#ef4444", note: "Too generic. Tailor it to the specific role you're applying for." },
  ];
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-6">
        <ScoreRing score={85} size={110} color="#17CF97" />
        <div>
          <p className="text-xl font-bold text-black">Resume Score: 85%</p>
          <p className="text-sm text-gray-500 mt-1">Based on ATS analysis, keyword matching, and formatting checks.</p>
          <button onClick={() => navigate("/resume")} className="mt-3 text-sm bg-[#6750a4] text-white px-5 py-1.5 rounded-full hover:bg-[#5a4490] transition-colors">
            Update Resume
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-bold text-black mb-4">Section-by-Section Analysis</h3>
        <div className="space-y-4">
          {sections.map(({ label, score, color, note }) => (
            <div key={label}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-700">{label}</span>
                <span className="text-sm font-bold" style={{ color }}>{score}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mb-1">
                <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
              </div>
              <p className="text-xs text-gray-500">{note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-bold text-black mb-3">Improvement Suggestions</h3>
        <div className="space-y-2">
          <InsightItem type="improve" text='Your career summary is too generic. Start with a strong hook like: "Results-driven Frontend Developer with 2 years experience building React applications..."' />
          <InsightItem type="improve" text="Add quantifiable results to each work experience entry. Numbers make a strong impression on ATS and recruiters alike." />
          <InsightItem type="tip" text="Include TypeScript, Jest, and React Testing Library in your skills — they appear in 80% of the job descriptions you've applied to." />
          <InsightItem type="strength" text="Your resume is clean, readable, and ATS-friendly. Keep using standard section headings and avoid tables or graphics." />
        </div>
      </div>
    </div>
  );
}

// ── Tests tab ─────────────────────────────────────────────────────
function TestsTab({ navigate }: { navigate: (p: string) => void }) {
  return (
    <div className="space-y-5">
      {/* Bar chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-bold text-black mb-4">Test Score History</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart key="test-bar" data={testBarData} barSize={36}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#6b7280" }} />
            <Tooltip formatter={(v) => [`${v}%`, "Score"]} />
            <Bar dataKey="score" radius={[6, 6, 0, 0]}>
              {testBarData.map((entry) => <Cell key={`cell-${entry.name}`} fill={entry.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Individual test breakdowns */}
      {[
        {
          name: "Frontend Developer Assessment", company: "Btab Group", score: 88,
          breakdown: [
            { label: "React.js", score: 92, color: "#6750a4" },
            { label: "JavaScript", score: 85, color: "#007DFC" },
            { label: "CSS/Flexbox", score: 90, color: "#17CF97" },
            { label: "Written Answers", score: 75, color: "#f59e0b" },
          ],
          insights: ["Excellent React fundamentals.", "Written responses could be more detailed."],
        },
        {
          name: "UI Design & Figma Skills Test", company: "TechCorp Pakistan", score: 72,
          breakdown: [
            { label: "Figma Proficiency", score: 80, color: "#6750a4" },
            { label: "UI Principles", score: 70, color: "#007DFC" },
            { label: "Prototyping", score: 65, color: "#17CF97" },
          ],
          insights: ["Good Figma knowledge.", "Review prototyping best practices."],
        },
      ].map(({ name, company, score, breakdown, insights }) => (
        <div key={name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-sm font-bold text-black">{name}</h3>
              <p className="text-xs text-gray-500">{company}</p>
            </div>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${score >= 70 ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-600"}`}>
              {score}% · {score >= 70 ? "Passed" : "Needs Improvement"}
            </span>
          </div>
          <div className="space-y-3 mb-4">
            {breakdown.map(({ label, score: s, color }) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{label}</span>
                  <span className="font-bold" style={{ color }}>{s}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div className="h-full rounded-full" style={{ width: `${s}%`, backgroundColor: color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {insights.map((ins, i) => (
              <Tag key={i} label={ins} type={i === 0 ? "strength" : "improve"} />
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={() => navigate("/tests")}
        className="w-full border border-[#6750a4] text-[#6750a4] text-sm py-2.5 rounded-full hover:bg-purple-50 transition-colors"
      >
        View All Tests
      </button>
    </div>
  );
}

// ── Interviews tab ────────────────────────────────────────────────
function InterviewsTab() {
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-6">
        <ScoreRing score={70} size={110} color="#f59e0b" />
        <div>
          <p className="text-xl font-bold text-black">Interview Score: 70%</p>
          <p className="text-sm text-gray-500 mt-1">AI analysis of your voice interview with Btab Group.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-bold text-black mb-4">Communication Dimensions</h3>
        <div className="space-y-4">
          {[
            { label: "Clarity of Speech", score: 78, color: "#6750a4" },
            { label: "Confidence Level", score: 65, color: "#f59e0b" },
            { label: "Answer Structure (STAR)", score: 60, color: "#ef4444" },
            { label: "Technical Accuracy", score: 82, color: "#17CF97" },
            { label: "Listening & Comprehension", score: 75, color: "#007DFC" },
            { label: "Pacing & Tone", score: 70, color: "#6750a4" },
          ].map(({ label, score, color }) => (
            <div key={label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{label}</span>
                <span className="font-bold" style={{ color }}>{score}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full">
                <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-bold text-black mb-3">AI Coach Feedback</h3>
        <div className="space-y-2">
          <InsightItem type="strength" text="Your technical answers are accurate and well-informed. You clearly know React.js and frontend concepts." />
          <InsightItem type="improve" text='Structure your answers using the STAR method (Situation → Task → Action → Result). Your responses currently jump straight to the action without context.' />
          <InsightItem type="improve" text="Confidence dropped noticeably during system design questions. Practise speaking about scalability and architecture at a high level." />
          <InsightItem type="tip" text="Try recording yourself answering common interview questions and play it back. Hearing your own pacing and filler words helps significantly." />
          <InsightItem type="tip" text='Prepare a 2-minute "tell me about yourself" pitch that covers your background, key skills, and what you are looking for in your next role.' />
        </div>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────
export function AIFeedbackPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div className="bg-[#fafafc] min-h-full">
      {/* Header */}
      <div className="px-8 pt-8 pb-0">
        <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
          <div>
            <h1 className="text-3xl font-bold text-black">AI Performance Report</h1>
            <p className="text-sm text-gray-500 mt-1">
              Generated on April 10, 2026 · Based on your resume, tests & interviews
            </p>
          </div>
          <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-full px-4 py-2">
            <Star size={15} className="text-[#6750a4]" />
            <span className="text-sm font-bold text-[#6750a4]">Overall: 78%</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-5 border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-[#6750a4] text-[#6750a4] font-bold"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 py-6">
        {activeTab === "Overview" && <OverviewTab />}
        {activeTab === "Resume" && <ResumeTab navigate={navigate} />}
        {activeTab === "Tests" && <TestsTab navigate={navigate} />}
        {activeTab === "Interviews" && <InterviewsTab />}
      </div>
    </div>
  );
}