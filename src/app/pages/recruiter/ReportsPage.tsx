import { useState } from "react";
import {
  BarChart2, Download, TrendingUp, Users, Clock, CheckCircle2,
  ChevronRight, Filter, Calendar,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, FunnelChart,
  Funnel, LabelList,
} from "recharts";
import Bresume from "../../../assets/blue resume.png";

// ── Mock chart data ───────────────────────────────────────────────
const APPS_OVER_TIME = [
  { month: "Nov", apps: 28, shortlisted: 5 },
  { month: "Dec", apps: 35, shortlisted: 7 },
  { month: "Jan", apps: 52, shortlisted: 10 },
  { month: "Feb", apps: 41, shortlisted: 8 },
  { month: "Mar", apps: 68, shortlisted: 13 },
  { month: "Apr", apps: 87, shortlisted: 17 },
];

const PIPELINE_DATA = [
  { name: "Applied",     value: 248, fill: "#6750a4" },
  { name: "AI Screened", value: 248, fill: "#007DFC" },
  { name: "Shortlisted", value: 47,  fill: "#17CF97" },
  { name: "Testing",     value: 23,  fill: "#f59e0b" },
  { name: "Interviews",  value: 11,  fill: "#FF630B" },
  { name: "Finalists",   value: 3,   fill: "#22c55e" },
];

const SKILLS_DIST = [
  { skill: "React.js",   count: 89 },
  { skill: "Node.js",    count: 62 },
  { skill: "Python",     count: 48 },
  { skill: "TypeScript", count: 71 },
  { skill: "Figma",      count: 38 },
  { skill: "AWS",        count: 29 },
];

const JOB_PERF = [
  { title: "Frontend Developer",  apps: 45, shortlisted: 12, hired: 0, avgScore: 86, timeToHire: 14 },
  { title: "Backend Engineer",    apps: 32, shortlisted: 8,  hired: 0, avgScore: 82, timeToHire: 18 },
  { title: "UI/UX Designer",      apps: 28, shortlisted: 9,  hired: 0, avgScore: 88, timeToHire: 12 },
  { title: "Data Scientist",      apps: 18, shortlisted: 4,  hired: 0, avgScore: 83, timeToHire: 21 },
  { title: "DevOps Engineer",     apps: 8,  shortlisted: 2,  hired: 0, avgScore: 74, timeToHire: 16 },
];

const PIE_DATA = [
  { name: "Remote",  value: 58, fill: "#6750a4" },
  { name: "Hybrid",  value: 31, fill: "#17CF97" },
  { name: "Onsite",  value: 11, fill: "#f59e0b" },
];

const KPI_CARDS = [
  { label: "Avg. Time to Hire",    value: "12 days", sub: "↓ 3 days vs last month", good: true,  color: "#17CF97", icon: Clock },
  { label: "Offer Accept Rate",    value: "87%",     sub: "↑ 5% vs last month",     good: true,  color: "#6750a4", icon: CheckCircle2 },
  { label: "AI Screening Accuracy",value: "97.2%",   sub: "Human review confirmed",  good: true,  color: "#007DFC", icon: TrendingUp },
  { label: "Cost per Hire",        value: "₨ 2,400", sub: "↓ ₨800 vs manual process",good: true, color: "#f59e0b", icon: BarChart2 },
];

export function ReportsPage() {
  const [period, setPeriod] = useState("6m");

  return (
    <div className="p-8 bg-[#fafafc] min-h-full space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-xl bg-[#6750a4]/10 flex items-center justify-center">
            <BarChart2 size={16} className="text-[#6750a4]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black">Reports & Analytics</h1>
            <p className="text-sm text-gray-500">Recruitment performance insights powered by AIRA</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Period selector */}
          <div className="flex bg-white border border-gray-200 rounded-xl p-1 gap-1">
            {["1m", "3m", "6m", "1y"].map((p) => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${period === p ? "bg-[#6750a4] text-white" : "text-gray-500 hover:text-[#6750a4]"}`}>
                {p}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 bg-[#6750a4] text-white text-sm font-bold px-4 py-2.5 rounded-full hover:bg-[#5a4490] hover:shadow-lg transition-all group">
            <Download size={14} /> Export PDF
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI_CARDS.map(({ label, value, sub, good, color, icon: Icon }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
            <div className="flex items-center justify-between mb-3">
              <div className="size-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + "18" }}>
                <Icon size={16} style={{ color }} />
              </div>
              <ChevronRight size={13} className="text-gray-300 group-hover:text-[#6750a4] transition-colors" />
            </div>
            <p className="text-2xl font-bold text-black leading-tight">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            <p className={`text-[10px] mt-1.5 font-medium ${good ? "text-green-600" : "text-red-500"}`}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Applications over time */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-black">Applications Over Time</h2>
              <p className="text-xs text-gray-400 mt-0.5">Total applications vs shortlisted candidates</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[#6750a4]" /><span className="text-gray-500">Applications</span></div>
              <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[#17CF97]" /><span className="text-gray-500">Shortlisted</span></div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={APPS_OVER_TIME} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} />
              <Area type="monotone" dataKey="apps" stroke="#6750a4" strokeWidth={2} fill="#6750a4" fillOpacity={0.1} />
              <Area type="monotone" dataKey="shortlisted" stroke="#17CF97" strokeWidth={2} fill="#17CF97" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Job type distribution */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="mb-5">
            <h2 className="font-bold text-black">Job Type Distribution</h2>
            <p className="text-xs text-gray-400 mt-0.5">Remote vs Hybrid vs Onsite applications</p>
          </div>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={PIE_DATA} cx="50%" cy="50%" outerRadius={70} innerRadius={40} dataKey="value" strokeWidth={2} stroke="#fff">
                  {PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {PIE_DATA.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><span className="size-2.5 rounded-full" style={{ backgroundColor: d.fill }} /><span className="text-gray-600">{d.name}</span></div>
                <span className="font-bold" style={{ color: d.fill }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Skills demand */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-black">Top Skills in Demand</h2>
              <p className="text-xs text-gray-400 mt-0.5">Skills most frequently required across active jobs</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={SKILLS_DIST} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="skill" tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {SKILLS_DIST.map((_, i) => (
                  <Cell key={i} fill={i % 2 === 0 ? "#6750a4" : "#a78bfa"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Illustration + quick tips */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-row gap-5 items-center">
  {/* Text content on the left */}
  <div className="flex-1 space-y-3">
    <p className="text-xs font-bold text-[#6750a4] uppercase tracking-wide">AI Recommendations</p>
    {[
      "Frontend Developer role has highest AI accuracy (94%) — consider raising shortlist threshold",
      "Average time to hire improved by 3 days vs last month due to AI screening",
      "React.js candidates score 8% higher on average — strong talent pool",
    ].map((tip, i) => (
      <div key={i} className="flex gap-2">
        <span className="size-5 rounded-full bg-[#6750a4]/10 text-[#6750a4] text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
        <p className="text-xs text-gray-600 leading-relaxed">{tip}</p>
      </div>
    ))}
  </div>

  {/* Image on the right */}
  <div className="shrink-0">
    <img src={Bresume} alt="AI illustration" className="h-[100px] w-auto" />
  </div>
 </div>

      {/* Job performance table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-black">Job Performance Breakdown</h2>
            <p className="text-xs text-gray-400 mt-0.5">Applications, shortlists, and AI scores per job</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="text-left px-6 py-3">Job Title</th>
                <th className="text-center px-4 py-3">Applications</th>
                <th className="text-center px-4 py-3">Shortlisted</th>
                <th className="text-center px-4 py-3">Shortlist %</th>
                <th className="text-center px-4 py-3">Avg AI Score</th>
                <th className="text-center px-4 py-3">Time to Hire</th>
              </tr>
            </thead>
            <tbody>
              {JOB_PERF.map((j, i) => (
                <tr key={j.title} className={`border-b border-gray-50 hover:bg-[#6750a4]/3 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                  <td className="px-6 py-4 text-sm font-semibold text-black">{j.title}</td>
                  <td className="text-center px-4 py-4 text-sm text-gray-700">{j.apps}</td>
                  <td className="text-center px-4 py-4 text-sm text-gray-700">{j.shortlisted}</td>
                  <td className="text-center px-4 py-4">
                    <span className={`text-xs font-bold ${Math.round(j.shortlisted/j.apps*100) >= 20 ? "text-green-600" : "text-amber-600"}`}>
                      {Math.round(j.shortlisted/j.apps*100)}%
                    </span>
                  </td>
                  <td className="text-center px-4 py-4">
                    <span className="text-xs font-bold text-[#6750a4]">{j.avgScore}%</span>
                  </td>
                  <td className="text-center px-4 py-4 text-xs text-gray-600">{j.timeToHire} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
} 
