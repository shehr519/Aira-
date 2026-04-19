import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ClipboardList, Plus, Users, CheckCircle2, Clock,
  BarChart2, Eye, Edit3, Copy, Trash2, ChevronRight, Zap,
} from "lucide-react";
import noApplicantsImg from "../../../assets/aira.png";

const TESTS = [
  { id: 1, title: "React.js & Hooks Assessment",  type: "MCQ",    job: "Frontend Developer",  assigned: 15, completed: 12, avg: 86, passing: 10, status: "active",   created: "Apr 10" },
  { id: 2, title: "Node.js Backend Challenge",     type: "Coding", job: "Backend Engineer",    assigned: 8,  completed: 6,  avg: 79, passing: 5,  status: "active",   created: "Apr 8"  },
  { id: 3, title: "UI/UX Design Thinking Test",   type: "Mixed",  job: "UI/UX Designer",      assigned: 9,  completed: 9,  avg: 83, passing: 7,  status: "completed",created: "Apr 5"  },
  { id: 4, title: "Python & ML Fundamentals",     type: "MCQ",    job: "Data Scientist",      assigned: 4,  completed: 2,  avg: 91, passing: 2,  status: "active",   created: "Apr 12" },
  { id: 5, title: "JavaScript Fundamentals",      type: "MCQ",    job: "Frontend Developer",  assigned: 20, completed: 18, avg: 75, passing: 14, status: "completed",created: "Apr 1"  },
  { id: 6, title: "DevOps & Cloud Basics",        type: "MCQ",    job: "DevOps Engineer",     assigned: 3,  completed: 1,  avg: 72, passing: 1,  status: "active",   created: "Apr 13" },
];

const TYPE_COLOR: Record<string, string> = {
  MCQ:    "text-blue-700 bg-blue-50 border-blue-200",
  Coding: "text-orange-700 bg-orange-50 border-orange-200",
  Mixed:  "text-purple-700 bg-purple-50 border-purple-200",
};

const TEMPLATES = [
  { name: "Frontend Developer (React)", skills: ["React.js","JavaScript","CSS","REST APIs"], qs: 25, duration: "45 min" },
  { name: "Backend Developer",          skills: ["Node.js","SQL","APIs","System Design"],    qs: 30, duration: "60 min" },
  { name: "Full Stack Engineer",        skills: ["React","Node.js","DB","Architecture"],     qs: 35, duration: "75 min" },
  { name: "UI/UX Designer",             skills: ["Design Systems","Figma","UX Research"],    qs: 20, duration: "40 min" },
];

export function TestsRecruiterPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"active" | "completed" | "templates">("active");

  const shown = tab === "templates" ? [] : TESTS.filter((t) => tab === "active" ? t.status === "active" : t.status === "completed");

  return (
    <div className="p-8 bg-[#fafafc] min-h-full space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-xl bg-amber-50 flex items-center justify-center">
            <ClipboardList size={16} className="text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black">Tests & Assessments</h1>
            <p className="text-sm text-gray-500">Manage skill tests and assign to shortlisted candidates</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/recruiter/tests/create")}
          className="flex items-center gap-2 bg-[#6750a4] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#5a4490] hover:shadow-lg hover:shadow-[#6750a4]/30 hover:-translate-y-0.5 transition-all duration-200 shrink-0 group"
        >
          <Plus size={15} className="group-hover:rotate-90 transition-transform duration-200" /> Create Test
        </button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Tests",     value: TESTS.filter(t=>t.status==="active").length,    color: "#6750a4", icon: ClipboardList },
          { label: "Total Assigned",   value: TESTS.reduce((a,t)=>a+t.assigned,0),            color: "#007DFC", icon: Users },
          { label: "Completed",        value: TESTS.reduce((a,t)=>a+t.completed,0),           color: "#17CF97", icon: CheckCircle2 },
          { label: "Avg. Score",       value: `${Math.round(TESTS.reduce((a,t)=>a+t.avg,0)/TESTS.length)}%`, color: "#f59e0b", icon: BarChart2 },
        ].map(({ label, value, color, icon: Icon }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="size-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: color + "18" }}>
              <Icon size={17} style={{ color }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-black leading-tight">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex bg-white border border-gray-200 rounded-2xl p-1 gap-1 w-fit">
        {(["active", "completed", "templates"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize transition-all duration-200 ${tab === t ? "bg-[#6750a4] text-white shadow-md" : "text-gray-500 hover:text-[#6750a4] hover:bg-[#6750a4]/6"}`}>
            {t === "active" ? `Active (${TESTS.filter(t=>t.status==="active").length})` : t === "completed" ? `Completed (${TESTS.filter(t=>t.status==="completed").length})` : "Templates"}
          </button>
        ))}
      </div>

      {/* ── Templates tab ── */}
      {tab === "templates" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {TEMPLATES.map((tpl) => (
            <div key={tpl.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-1 hover:border-[#6750a4]/20 transition-all duration-200 group cursor-pointer">
              <div className="size-10 rounded-xl bg-[#6750a4]/8 group-hover:bg-[#6750a4]/15 flex items-center justify-center mb-3 transition-colors">
                <Zap size={18} className="text-[#6750a4]" />
              </div>
              <h3 className="font-bold text-black text-sm mb-2 group-hover:text-[#6750a4] transition-colors">{tpl.name}</h3>
              <div className="flex flex-wrap gap-1 mb-3">
                {tpl.skills.map((s) => (
                  <span key={s} className="text-[9px] bg-[#6750a4]/6 text-[#6750a4] border border-[#6750a4]/12 px-1.5 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
              <div className="flex gap-3 text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1"><ClipboardList size={10} />{tpl.qs} questions</span>
                <span className="flex items-center gap-1"><Clock size={10} />{tpl.duration}</span>
              </div>
              <button className="w-full py-2 text-xs font-semibold text-[#6750a4] border border-[#6750a4]/30 rounded-xl hover:bg-[#6750a4]/8 transition-colors flex items-center justify-center gap-1.5">
                <Copy size={11} /> Use Template
              </button>
            </div>
          ))}
          {/* Create custom */}
          <button
            onClick={() => navigate("/recruiter/tests/create")}
            className="border-2 border-dashed border-[#6750a4]/25 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:border-[#6750a4]/50 hover:bg-[#6750a4]/3 transition-all duration-200 group"
          >
            <div className="size-10 rounded-xl bg-[#6750a4]/8 group-hover:bg-[#6750a4]/15 flex items-center justify-center transition-colors">
              <Plus size={18} className="text-[#6750a4] group-hover:rotate-90 transition-transform duration-300" />
            </div>
            <p className="font-bold text-[#6750a4] text-sm">Create Custom Test</p>
            <p className="text-xs text-gray-400 text-center">Build from scratch with AI assistance</p>
          </button>
        </div>
      )}

      {/* ── Active / Completed tests ── */}
      {tab !== "templates" && (
        shown.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 bg-white rounded-2xl border border-gray-100">
           <img src={noApplicantsImg} alt="No applicants" className="h-[120px] w-auto" /><div className="text-center">
              <p className="font-bold text-gray-700">No tests found</p>
              <p className="text-sm text-gray-400 mt-1">Create a new test or use a template to get started</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {shown.map((test) => (
              <div key={test.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#6750a4]/20 transition-all duration-200 p-5 group cursor-pointer"
                onClick={() => navigate(`/recruiter/tests/${test.id}`)}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="size-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                      <ClipboardList size={18} className="text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="font-bold text-black group-hover:text-[#6750a4] transition-colors">{test.title}</p>
                        <span className={`text-[10px] font-semibold border px-2 py-0.5 rounded-full ${TYPE_COLOR[test.type]}`}>{test.type}</span>
                        {test.status === "active"
                          ? <span className="text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full flex items-center gap-1"><span className="size-1 rounded-full bg-green-500" />Active</span>
                          : <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">Completed</span>
                        }
                      </div>
                      <p className="text-xs text-gray-400">For: {test.job} · Created {test.created}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 shrink-0">
                    {[
                      { label: "Assigned",  val: test.assigned,   color: "#007DFC" },
                      { label: "Completed", val: test.completed,  color: "#17CF97" },
                      { label: "Passing",   val: test.passing,    color: "#f59e0b" },
                      { label: "Avg Score", val: `${test.avg}%`,  color: "#6750a4" },
                    ].map(({ label, val, color }) => (
                      <div key={label} className="text-center hidden sm:block">
                        <p className="text-base font-bold" style={{ color }}>{val}</p>
                        <p className="text-[10px] text-gray-400">{label}</p>
                      </div>
                    ))}

                    {/* Completion bar */}
                    <div className="hidden md:block w-20">
                      <p className="text-[10px] text-gray-400 mb-1">Completion</p>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#17CF97] rounded-full" style={{ width: `${Math.round(test.completed/test.assigned*100)}%` }} />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">{Math.round(test.completed/test.assigned*100)}%</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.stopPropagation(); }} className="p-2 rounded-lg text-gray-400 hover:text-[#6750a4] hover:bg-[#6750a4]/8 transition-colors"><Eye size={14} /></button>
                      <button onClick={(e) => { e.stopPropagation(); }} className="p-2 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"><Edit3 size={14} /></button>
                      <button onClick={(e) => { e.stopPropagation(); }} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
