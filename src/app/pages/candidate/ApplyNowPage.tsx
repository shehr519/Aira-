import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Upload, CheckCircle2, ChevronRight, ChevronLeft, FileText, X } from "lucide-react";

// ── Types ───────────────────────────────────────────────────────
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  coverLetter: string;
  resumeFile: File | null;
  useExistingResume: boolean;
  availableFrom: string;
  expectedSalary: string;
  whyApply: string;
  noticePeriod: string;
}

const STEPS = ["Personal Info", "Resume", "Cover Letter", "Review"];

// ── Step indicator ───────────────────────────────────────────────
function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`size-8 rounded-full flex items-center justify-center text-sm transition-colors ${
                  done
                    ? "bg-[#6750a4] text-white"
                    : active
                    ? "border-2 border-[#6750a4] text-[#6750a4] bg-white"
                    : "border-2 border-gray-200 text-gray-400 bg-white"
                }`}
              >
                {done ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold">{i + 1}</span>}
              </div>
              <span
                className={`text-xs mt-1 whitespace-nowrap ${
                  active ? "text-[#6750a4] font-medium" : done ? "text-[#6750a4]" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 mb-4 transition-colors ${i < current ? "bg-[#6750a4]" : "bg-gray-200"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Labeled input ────────────────────────────────────────────────
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#6750a4] focus:ring-2 focus:ring-purple-100 bg-white placeholder:text-gray-400 transition";

// ── Step components ──────────────────────────────────────────────
function Step1({ data, setData }: { data: FormData; setData: (d: FormData) => void }) {
  const u = (field: keyof FormData, val: string) => setData({ ...data, [field]: val });
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="First Name" required>
          <input className={inputClass} placeholder="Ali" value={data.firstName} onChange={(e) => u("firstName", e.target.value)} />
        </Field>
        <Field label="Last Name" required>
          <input className={inputClass} placeholder="Ahmed" value={data.lastName} onChange={(e) => u("lastName", e.target.value)} />
        </Field>
      </div>
      <Field label="Email Address" required>
        <input type="email" className={inputClass} placeholder="ali@gmail.com" value={data.email} onChange={(e) => u("email", e.target.value)} />
      </Field>
      <Field label="Phone Number" required>
        <input type="tel" className={inputClass} placeholder="+92 300 0000000" value={data.phone} onChange={(e) => u("phone", e.target.value)} />
      </Field>
      <Field label="LinkedIn Profile URL">
        <input className={inputClass} placeholder="https://linkedin.com/in/ali-ahmed" value={data.linkedin} onChange={(e) => u("linkedin", e.target.value)} />
      </Field>
      <Field label="Portfolio / GitHub URL">
        <input className={inputClass} placeholder="https://github.com/ali-ahmed" value={data.portfolio} onChange={(e) => u("portfolio", e.target.value)} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Available From">
          <input type="date" className={inputClass} value={data.availableFrom} onChange={(e) => u("availableFrom", e.target.value)} />
        </Field>
        <Field label="Expected Salary (PKR/month)">
          <input className={inputClass} placeholder="e.g. 120,000" value={data.expectedSalary} onChange={(e) => u("expectedSalary", e.target.value)} />
        </Field>
      </div>
      <Field label="Notice Period">
        <select className={inputClass} value={data.noticePeriod} onChange={(e) => u("noticePeriod", e.target.value)}>
          <option value="">Select notice period</option>
          <option>Immediately Available</option>
          <option>1 Week</option>
          <option>2 Weeks</option>
          <option>1 Month</option>
          <option>More than 1 Month</option>
        </select>
      </Field>
    </div>
  );
}

function Step2({ data, setData }: { data: FormData; setData: (d: FormData) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setData({ ...data, resumeFile: f, useExistingResume: false });
  };

  const removeFile = () => setData({ ...data, resumeFile: null });

  return (
    <div className="space-y-6">
      {/* Use existing resume option */}
      <div
        className={`border-2 rounded-2xl p-4 cursor-pointer transition-colors ${
          data.useExistingResume ? "border-[#6750a4] bg-purple-50" : "border-gray-200 hover:border-purple-300"
        }`}
        onClick={() => setData({ ...data, useExistingResume: true, resumeFile: null })}
      >
        <div className="flex items-center gap-3">
          <div
            className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
              data.useExistingResume ? "border-[#6750a4]" : "border-gray-300"
            }`}
          >
            {data.useExistingResume && <div className="size-2.5 rounded-full bg-[#6750a4]" />}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">Use resume from my profile</p>
            <p className="text-xs text-gray-500 mt-0.5">Ali_Resume.pdf · 14 Mb · Uploaded 11 Nov 2023</p>
          </div>
          <FileText size={20} className="ml-auto text-[#6750a4]" />
        </div>
      </div>

      <p className="text-center text-sm text-gray-400">— or upload a new one —</p>

      {/* Upload zone */}
      {data.resumeFile ? (
        <div className="border-2 border-[#6750a4] bg-purple-50 rounded-2xl p-5 flex items-center gap-4">
          <FileText size={28} className="text-[#6750a4] shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{data.resumeFile.name}</p>
            <p className="text-xs text-gray-500">{(data.resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button onClick={removeFile} className="text-gray-400 hover:text-red-500 transition-colors">
            <X size={18} />
          </button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center gap-3 cursor-pointer hover:border-[#6750a4] hover:bg-purple-50 transition-colors"
          onClick={() => !data.useExistingResume && fileRef.current?.click()}
        >
          <div className="size-14 rounded-2xl bg-purple-100 flex items-center justify-center">
            <Upload size={24} className="text-[#6750a4]" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">Click here to upload your file or drag</p>
            <p className="text-xs text-gray-400 mt-1">Supported formats: PDF, DOC, DOCX · Max 10MB</p>
          </div>
          <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} />
        </div>
      )}
    </div>
  );
}

function Step3({ data, setData }: { data: FormData; setData: (d: FormData) => void }) {
  const wordCount = data.coverLetter.trim() ? data.coverLetter.trim().split(/\s+/).length : 0;
  return (
    <div className="space-y-5">
      <div className="bg-purple-50 border border-purple-100 rounded-xl px-4 py-3">
        <p className="text-sm text-[#6750a4]">
          <span className="font-semibold">Tip:</span> A strong cover letter explains why you're a great fit for this specific role.
          Aim for 150–250 words.
        </p>
      </div>

      <Field label="Why do you want to work at Btab Group?" required>
        <textarea
          rows={4}
          className={inputClass + " resize-none"}
          placeholder="Describe your motivation for applying to this company..."
          value={data.whyApply}
          onChange={(e) => setData({ ...data, whyApply: e.target.value })}
        />
      </Field>

      <Field label="Cover Letter" required>
        <textarea
          rows={8}
          className={inputClass + " resize-none"}
          placeholder={`Dear Hiring Manager,\n\nI am writing to express my interest in the Frontend Developer position at Btab Group...\n\nRegards,\nAli Ahmed`}
          value={data.coverLetter}
          onChange={(e) => setData({ ...data, coverLetter: e.target.value })}
        />
        <p className={`text-xs text-right mt-1 ${wordCount > 250 ? "text-amber-500" : "text-gray-400"}`}>
          {wordCount} words
        </p>
      </Field>
    </div>
  );
}

function Step4({ data }: { data: FormData }) {
  return (
    <div className="space-y-5">
      <div className="bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 flex items-center gap-2 mb-2">
        <CheckCircle2 size={16} className="text-[#6750a4]" />
        <p className="text-sm text-[#6750a4]">Please review your application before submitting.</p>
      </div>

      {/* Personal */}
      <ReviewSection title="Personal Information">
        <ReviewRow label="Full Name" value={`${data.firstName} ${data.lastName}`} />
        <ReviewRow label="Email" value={data.email} />
        <ReviewRow label="Phone" value={data.phone} />
        {data.linkedin && <ReviewRow label="LinkedIn" value={data.linkedin} />}
        {data.portfolio && <ReviewRow label="Portfolio" value={data.portfolio} />}
        {data.availableFrom && <ReviewRow label="Available From" value={data.availableFrom} />}
        {data.expectedSalary && <ReviewRow label="Expected Salary" value={`Rs. ${data.expectedSalary}/mo`} />}
        {data.noticePeriod && <ReviewRow label="Notice Period" value={data.noticePeriod} />}
      </ReviewSection>

      {/* Resume */}
      <ReviewSection title="Resume">
        <ReviewRow
          label="Selected"
          value={
            data.useExistingResume
              ? "Profile resume (Ali_Resume.pdf)"
              : data.resumeFile
              ? data.resumeFile.name
              : "None selected"
          }
        />
      </ReviewSection>

      {/* Cover letter preview */}
      <ReviewSection title="Cover Letter">
        {data.coverLetter ? (
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed line-clamp-6">
            {data.coverLetter}
          </p>
        ) : (
          <p className="text-sm text-gray-400 italic">No cover letter provided.</p>
        )}
      </ReviewSection>
    </div>
  );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <div className="bg-gray-50 px-5 py-2.5 border-b border-gray-100">
        <span className="text-sm font-bold text-gray-700">{title}</span>
      </div>
      <div className="px-5 py-4 space-y-2">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 text-sm">
      <span className="text-gray-500 w-[140px] shrink-0">{label}</span>
      <span className="text-gray-800 break-all">{value || "—"}</span>
    </div>
  );
}

// ── Success screen ───────────────────────────────────────────────
function SuccessScreen({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="size-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <CheckCircle2 size={40} className="text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-black mb-2">Application Submitted!</h2>
      <p className="text-gray-500 text-base max-w-sm mb-8">
        Your application for{" "}
        <span className="text-[#6750a4] font-medium">Frontend Developer (React.js)</span> at{" "}
        <span className="font-medium">Btab Group</span> has been sent successfully. We'll notify you of any updates.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/jobs")}
          className="bg-[#6750a4] text-white text-sm px-6 py-2.5 rounded-full hover:bg-[#5a4490] transition-colors"
        >
          Browse More Jobs
        </button>
        <button
          onClick={() => navigate("/")}
          className="border border-[#6750a4] text-[#6750a4] text-sm px-6 py-2.5 rounded-full hover:bg-purple-50 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────
export function ApplyNowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "Ali",
    lastName: "Ahmed",
    email: "ali@gmail.com",
    phone: "",
    linkedin: "",
    portfolio: "",
    coverLetter: "",
    resumeFile: null,
    useExistingResume: false,
    availableFrom: "",
    expectedSalary: "",
    whyApply: "",
    noticePeriod: "",
  });

  const canProceed = () => {
    if (step === 0) return formData.firstName && formData.lastName && formData.email && formData.phone;
    if (step === 1) return formData.useExistingResume || formData.resumeFile !== null;
    if (step === 2) return formData.coverLetter.trim().length > 0;
    return true;
  };

  if (submitted) return (
    <div className="p-8 bg-[#fafafc] min-h-full">
      <SuccessScreen navigate={navigate} />
    </div>
  );

  return (
    <div className="p-8 bg-[#fafafc] min-h-full">
      {/* Back */}
      <button
        onClick={() => (step > 0 ? setStep(step - 1) : navigate(`/jobs/${id}`))}
        className="flex items-center gap-2 text-[#6750a4] mb-6 hover:opacity-70 transition-opacity"
      >
        <ArrowLeft size={16} />
        <span className="text-sm">{step > 0 ? "Previous Step" : "Back to Job"}</span>
      </button>

      <div className="max-w-[640px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-black">Apply for Position</h1>
          <p className="text-base text-gray-500 mt-1">Frontend Developer (React.js) · Btab Group</p>
        </div>

        {/* Steps */}
        <StepBar current={step} />

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-[#6750a4] mb-5">{STEPS[step]}</h2>

          {step === 0 && <Step1 data={formData} setData={setFormData} />}
          {step === 1 && <Step2 data={formData} setData={setFormData} />}
          {step === 2 && <Step3 data={formData} setData={setFormData} />}
          {step === 3 && <Step4 data={formData} />}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
            className="flex items-center gap-2 text-sm text-gray-500 disabled:opacity-30 hover:text-[#6750a4] transition-colors"
          >
            <ChevronLeft size={16} /> Previous
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-2 bg-[#6750a4] text-white text-sm px-6 py-2.5 rounded-full hover:bg-[#5a4490] disabled:opacity-40 transition-colors"
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              className="flex items-center gap-2 bg-[#6750a4] text-white text-sm px-7 py-2.5 rounded-full hover:bg-[#5a4490] transition-colors"
            >
              <CheckCircle2 size={16} /> Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
