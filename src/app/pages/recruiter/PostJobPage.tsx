import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Briefcase, MapPin, DollarSign, AlignLeft, Tag,
  Star, ChevronRight, ChevronLeft, Check, Sparkles,
  Building, Globe, Clock, CheckCircle2, Video, ClipboardList,
  Users, ArrowRight, Plus, X,
} from "lucide-react";
import megaphoneImg from "../../../assets/aira.png";
import profileSearchImg from "../../../assets/aira.png";
import cvBriefcaseImg from "../../../assets/aira.png";
import cvScreeningImg from "../../../assets/aira.png";

// ── Types ─────────────────────────────────────────────────────────
type Step = 0 | 1 | 2 | 3;

const STEPS = ["Job Info", "Requirements", "Evaluation", "Review & Publish"];

const SKILL_OPTS = ["React.js", "Node.js", "TypeScript", "Python", "Figma", "AWS", "Docker", "SQL", "MongoDB", "Java", "Flutter", "GraphQL"];

// ── Field wrapper ─────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

function InputBox({ placeholder, value, onChange, type = "text" }: {
  placeholder?: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#6750a4]/60 focus:bg-white transition-all placeholder:text-gray-400"
    />
  );
}

function SelectBox({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#6750a4]/60 focus:bg-white transition-all"
    >
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}

function RadioGroup({ options, value, onChange }: { options: { id: string; label: string; icon: React.ReactNode; sub: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-3 flex-wrap">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={`flex-1 min-w-[100px] flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
            value === o.id
              ? "border-[#6750a4] bg-[#6750a4]/6 shadow-md shadow-[#6750a4]/10"
              : "border-gray-200 bg-gray-50 hover:border-[#6750a4]/40 hover:bg-[#6750a4]/3"
          }`}
        >
          <div className={`size-8 rounded-lg flex items-center justify-center transition-colors ${value === o.id ? "bg-[#6750a4]/15 text-[#6750a4]" : "bg-gray-200 text-gray-500"}`}>
            {o.icon}
          </div>
          <p className={`text-xs font-bold transition-colors ${value === o.id ? "text-[#6750a4]" : "text-gray-600"}`}>{o.label}</p>
          <p className="text-[10px] text-gray-400 text-center leading-tight">{o.sub}</p>
        </button>
      ))}
    </div>
  );
}

export function PostJobPage() {
  const navigate  = useNavigate();
  const [step, setStep] = useState<Step>(0);
  const [published, setPublished] = useState(false);

  // Step 1
  const [title,   setTitle]   = useState("");
  const [dept,    setDept]    = useState("Engineering");
  const [type,    setType]    = useState("Remote");
  const [location,setLocation]= useState("");
  const [salMin,  setSalMin]  = useState("");
  const [salMax,  setSalMax]  = useState("");
  const [desc,    setDesc]    = useState("");

  // Step 2
  const [skills,  setSkills]  = useState<string[]>([]);
  const [exp,     setExp]     = useState("1-3 years");
  const [edu,     setEdu]     = useState("Bachelor's Degree");
  const [deadline,setDeadline]= useState("");

  // Step 3
  const [testType, setTestType]       = useState("none");
  const [interviewType, setInterviewType] = useState("ai");
  const [evalNotes, setEvalNotes]     = useState("");

  const toggleSkill = (s: string) =>
    setSkills((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const aiGenerateDesc = () => {
    setDesc(`We are looking for a talented and passionate ${title || "professional"} to join our growing team at TechHive Solutions.

As a ${title || "team member"}, you will be responsible for designing, building, and maintaining high-quality software solutions that directly impact our users.

Key Responsibilities:
• Design and implement scalable, maintainable code
• Collaborate with cross-functional teams on product features
• Participate in code reviews and technical discussions
• Contribute to architectural decisions and technical roadmaps

We offer a collaborative environment, competitive compensation, and meaningful work that makes a difference.`);
  };

  if (published) {
    return (
      <div className="min-h-full bg-[#fafafc] flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="size-24 rounded-full bg-green-100 flex items-center justify-center ring-8 ring-green-50">
                <CheckCircle2 size={44} className="text-green-500" />
              </div>
              {[0, 60, 120, 180, 240, 300].map((d) => (
                <div key={d} className="absolute size-2 rounded-full bg-green-400"
                  style={{ top: "50%", left: "50%", transform: `rotate(${d}deg) translate(52px) rotate(-${d}deg) translate(-50%,-50%)` }} />
              ))}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Job Published Successfully! 🎉</h2>
          <p className="text-sm text-gray-500 mb-2"><span className="font-semibold text-[#6750a4]">{title || "Your new job"}</span> is now live and visible to candidates.</p>
          <p className="text-xs text-gray-400 mb-8">AI screening will automatically begin as applications come in.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate("/recruiter/jobs")} className="px-6 py-3 bg-[#6750a4] text-white text-sm font-bold rounded-full hover:bg-[#5a4490] transition-colors">
              View All Jobs
            </button>
            <button onClick={() => { setPublished(false); setStep(0); setTitle(""); setDesc(""); setSkills([]); }} className="px-6 py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-full hover:border-[#6750a4]/40 transition-colors">
              Post Another Job
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#fafafc] min-h-full">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-7">
        <button onClick={() => navigate("/recruiter/jobs")} className="size-9 rounded-xl border border-gray-200 flex items-center justify-center hover:border-[#6750a4]/40 hover:text-[#6750a4] transition-colors">
          <ChevronLeft size={18} className="text-gray-500" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-black">Post New Job</h1>
          <p className="text-sm text-gray-500">Fill in the details and let AI help you find the best match</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* ── Stepper ── */}
        <div className="flex items-center gap-0 mb-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div
                onClick={() => i < step && setStep(i as Step)}
                className={`flex items-center gap-2.5 group ${i < step ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className={`size-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-200 ${
                  i < step  ? "bg-[#6750a4] text-white" :
                  i === step ? "bg-[#6750a4] text-white ring-4 ring-[#6750a4]/20" :
                  "bg-gray-100 text-gray-400"
                }`}>
                  {i < step ? <Check size={16} /> : <span>{i + 1}</span>}
                </div>
                <span className={`text-xs font-semibold hidden sm:block transition-colors ${i === step ? "text-[#6750a4]" : i < step ? "text-gray-600" : "text-gray-400"}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 rounded-full transition-colors ${i < step ? "bg-[#6750a4]" : "bg-gray-100"}`} />
              )}
            </div>
          ))}
        </div>

        {/* ── Form card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          {/* Card header */}
          <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-[#6750a4]/5 to-transparent">
            <div className="size-10 rounded-xl bg-[#6750a4]/10 flex items-center justify-center">
              {step === 0 ? <Briefcase size={18} className="text-[#6750a4]" /> :
               step === 1 ? <Tag size={18} className="text-[#6750a4]" /> :
               step === 2 ? <Star size={18} className="text-[#6750a4]" /> :
               <CheckCircle2 size={18} className="text-[#6750a4]" />}
            </div>
            <div>
              <p className="font-bold text-black">Step {step + 1}: {STEPS[step]}</p>
              <p className="text-xs text-gray-400">
                {step === 0 ? "Basic job details and description" :
                 step === 1 ? "Required skills and experience" :
                 step === 2 ? "Test & interview configuration" :
                 "Preview and publish your job"}
              </p>
            </div>
            <div className="ml-auto">
  <img 
    src={step === 0 ? megaphoneImg : step === 1 ? profileSearchImg : step === 2 ? cvBriefcaseImg : cvScreeningImg}
    alt="Step illustration" 
    className="h-[60px] w-auto" 
  />
</div>
          </div>

          <div className="p-6 space-y-5">
            {/* ── STEP 0: Job Info ── */}
            {step === 0 && (
              <>
                <Field label="Job Title *">
                  <InputBox value={title} onChange={setTitle} placeholder="e.g. Senior Frontend Developer" />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Department">
                    <SelectBox value={dept} onChange={setDept} options={["Engineering", "Design", "Product", "Data", "Marketing", "HR", "Operations"]} />
                  </Field>
                  <Field label="Job Type">
                    <SelectBox value={type} onChange={setType} options={["Remote", "Hybrid", "Onsite"]} />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Location">
                    <InputBox value={location} onChange={setLocation} placeholder="e.g. Lahore, Pakistan" />
                  </Field>
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Salary Min (PKR)">
                      <InputBox value={salMin} onChange={setSalMin} placeholder="80,000" />
                    </Field>
                    <Field label="Salary Max (PKR)">
                      <InputBox value={salMax} onChange={setSalMax} placeholder="120,000" />
                    </Field>
                  </div>
                </div>

                <Field label="Job Description">
                  <div className="relative">
                    <textarea
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      rows={6}
                      placeholder="Describe the role, responsibilities, and what you're looking for..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#6750a4]/60 focus:bg-white resize-none transition-all placeholder:text-gray-400"
                    />
                    <button
                      onClick={aiGenerateDesc}
                      className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#6750a4] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#5a4490] transition-colors"
                    >
                      <Sparkles size={11} /> AI Generate
                    </button>
                  </div>
                </Field>
              </>
            )}

            {/* ── STEP 1: Requirements ── */}
            {step === 1 && (
              <>
                <Field label="Required Skills *">
                  <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border border-gray-200 rounded-xl min-h-[80px]">
                    {skills.map((s) => (
                      <span key={s} className="flex items-center gap-1 bg-[#6750a4] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        {s}
                        <button onClick={() => toggleSkill(s)} className="text-white/70 hover:text-white transition-colors"><X size={10} /></button>
                      </span>
                    ))}
                    {skills.length === 0 && <p className="text-xs text-gray-400 m-auto">Click skills below to add them</p>}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {SKILL_OPTS.filter((o) => !skills.includes(o)).map((s) => (
                      <button key={s} onClick={() => toggleSkill(s)}
                        className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full hover:bg-[#6750a4]/8 hover:border-[#6750a4]/30 hover:text-[#6750a4] transition-colors">
                        <Plus size={10} />{s}
                      </button>
                    ))}
                  </div>
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Experience Level">
                    <SelectBox value={exp} onChange={setExp} options={["Fresh Graduate", "1-3 years", "3-5 years", "5-8 years", "8+ years"]} />
                  </Field>
                  <Field label="Education">
                    <SelectBox value={edu} onChange={setEdu} options={["High School", "Associate Degree", "Bachelor's Degree", "Master's Degree", "PhD"]} />
                  </Field>
                </div>

                <Field label="Application Deadline">
                  <InputBox value={deadline} onChange={setDeadline} type="date" />
                </Field>
              </>
            )}

            {/* ── STEP 2: Evaluation ── */}
            {step === 2 && (
              <>
                <Field label="Assessment Type">
                  <RadioGroup
                    value={testType}
                    onChange={setTestType}
                    options={[
                      { id: "none",   label: "No Test",       icon: <X size={14} />,            sub: "Skip assessment" },
                      { id: "mcq",    label: "MCQ Test",      icon: <ClipboardList size={14} />, sub: "Multiple choice" },
                      { id: "coding", label: "Coding Test",   icon: <AlignLeft size={14} />,     sub: "Code editor" },
                    ]}
                  />
                </Field>

                <Field label="Interview Type">
                  <RadioGroup
                    value={interviewType}
                    onChange={setInterviewType}
                    options={[
                      { id: "none",   label: "No Interview", icon: <X size={14} />,     sub: "Skip interview" },
                      { id: "ai",     label: "AI Interview", icon: <Sparkles size={14} />, sub: "Automated AI" },
                      { id: "manual", label: "Manual",       icon: <Video size={14} />,  sub: "Human-led" },
                    ]}
                  />
                </Field>

                <Field label="Evaluation Notes (Optional)">
                  <textarea
                    value={evalNotes}
                    onChange={(e) => setEvalNotes(e.target.value)}
                    rows={3}
                    placeholder="Any specific evaluation criteria for this role..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#6750a4]/60 focus:bg-white resize-none transition-all placeholder:text-gray-400"
                  />
                </Field>
              </>
            )}

            {/* ── STEP 3: Review ── */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-[#6750a4]/4 border border-[#6750a4]/15 rounded-2xl p-5">
                  <h3 className="font-bold text-[#6750a4] mb-3 flex items-center gap-2"><Briefcase size={16} /> Job Summary</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-gray-400 text-xs">Title</p><p className="font-semibold text-black">{title || "—"}</p></div>
                    <div><p className="text-gray-400 text-xs">Department</p><p className="font-semibold text-black">{dept}</p></div>
                    <div><p className="text-gray-400 text-xs">Type</p><p className="font-semibold text-black">{type}</p></div>
                    <div><p className="text-gray-400 text-xs">Location</p><p className="font-semibold text-black">{location || "—"}</p></div>
                    <div><p className="text-gray-400 text-xs">Salary Range</p><p className="font-semibold text-black">{salMin && salMax ? `${salMin} – ${salMax} PKR` : "—"}</p></div>
                    <div><p className="text-gray-400 text-xs">Deadline</p><p className="font-semibold text-black">{deadline || "—"}</p></div>
                    <div><p className="text-gray-400 text-xs">Experience</p><p className="font-semibold text-black">{exp}</p></div>
                    <div><p className="text-gray-400 text-xs">Test Type</p><p className="font-semibold text-black capitalize">{testType}</p></div>
                  </div>
                  {skills.length > 0 && (
                    <div className="mt-3">
                      <p className="text-gray-400 text-xs mb-1.5">Required Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.map((s) => <span key={s} className="bg-[#6750a4]/10 text-[#6750a4] text-xs font-medium px-2.5 py-0.5 rounded-full">{s}</span>)}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3">
                  <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">Ready to Publish</p>
                    <p className="text-xs text-green-600 mt-0.5">Your job will be visible to candidates immediately. AI screening will start automatically.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-between px-6 pb-6">
            <button
              onClick={() => step > 0 ? setStep((step - 1) as Step) : navigate("/recruiter/jobs")}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl hover:border-gray-300 transition-colors"
            >
              <ChevronLeft size={15} /> {step === 0 ? "Cancel" : "Back"}
            </button>

            {step < 3 ? (
              <button
                onClick={() => setStep((step + 1) as Step)}
                disabled={step === 0 && !title.trim()}
                className="flex items-center gap-2 bg-[#6750a4] text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-[#5a4490] disabled:opacity-40 transition-colors group"
              >
                Continue <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              <button
                onClick={() => setPublished(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#6750a4] to-[#8b6bc4] text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#6750a4]/30 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <Sparkles size={15} /> Publish Job <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
