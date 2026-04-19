import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

// ── Company logo SVG ─────────────────────────────────────────────
function GreenQuadLogo() {
  return (
    <div className="size-[72px] shrink-0 rounded-2xl overflow-hidden bg-white border border-gray-100 flex items-center justify-center shadow-sm">
      <svg viewBox="0 0 40 40" fill="none" className="size-9">
        <rect x="1" y="1" width="16" height="16" rx="3" fill="#17CF97" />
        <rect x="23" y="1" width="16" height="16" rx="3" fill="#17CF97" opacity="0.5" />
        <rect x="1" y="23" width="16" height="16" rx="3" fill="#17CF97" opacity="0.5" />
        <rect x="23" y="23" width="16" height="16" rx="3" fill="#17CF97" />
      </svg>
    </div>
  );
}

// ── Meta pill ───────────────────────────────────────────────────
function MetaPill({ icon: Icon, label }: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string }) {
  return (
    <div className="flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-full px-4 py-1.5">
      <Icon size={14} className="text-[#6750a4]" />
      <span className="text-sm text-[#6750a4]">{label}</span>
    </div>
  );
}

// ── Accordion section ───────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-4"
      >
        <span className="text-xl font-bold text-[#6750a4]">{title}</span>
        {open ? <ChevronUp size={20} className="text-[#6750a4]" /> : <ChevronDown size={20} className="text-[#6750a4]" />}
      </button>
      {open && children}
    </div>
  );
}

// ── Bullet list ─────────────────────────────────────────────────
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-base text-gray-700 leading-relaxed">
          <div className="size-2 rounded-full bg-[#6750a4] shrink-0 mt-2" />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Skill chip ──────────────────────────────────────────────────
function SkillChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center bg-purple-50 border border-purple-200 text-[#6750a4] text-sm px-3 py-1 rounded-full">
      {label}
    </span>
  );
}

// ── Job data ────────────────────────────────────────────────────
const JOB_DATA: Record<string, typeof BASE_JOB> = {};

const BASE_JOB = {
  id: "1",
  title: "Frontend Developer (React.js)",
  company: "Btab Group",
  location: "Pakistan (Remote)",
  jobType: "Full-time · Remote",
  posted: "Posted 2 days ago",
  aiMatch: "AI Match: 89% — Strong Fit",
  salary: "Rs. 100,000 – 150,000 / month",
  experience: "1–3 Years Experience",
  about:
    "Btab Group is a fast-growing technology company specialising in enterprise web solutions. We are looking for a talented Frontend Developer to join our engineering team and help us build next-generation web applications used by thousands of users daily.",
  overview:
    "As a Frontend Developer at Btab Group, you will work closely with our design and backend teams to create highly responsive, user-friendly interfaces using React.js. You will own features end-to-end — from translating Figma designs into pixel-perfect components to integrating RESTful APIs and optimising performance.",
  responsibilities: [
    "Develop, test, and maintain scalable React.js web applications.",
    "Translate Figma/UI designs into clean, reusable components.",
    "Integrate RESTful APIs and manage application state efficiently.",
    "Collaborate with UI/UX designers to ensure design consistency.",
    "Write unit and integration tests to ensure code reliability.",
    "Optimise applications for maximum speed and scalability.",
    "Participate in code reviews and mentor junior developers.",
    "Communicate progress and blockers in daily stand-ups.",
  ],
  requirements: [
    "1–3 years of professional experience with React.js.",
    "Strong proficiency in JavaScript (ES6+) and TypeScript.",
    "Hands-on experience with Tailwind CSS or similar CSS frameworks.",
    "Familiarity with REST APIs, Git, and Agile workflows.",
    "Experience with state management tools (Redux, Zustand, or Context API).",
    "Good understanding of web performance optimisation techniques.",
    "Strong problem-solving skills and attention to detail.",
  ],
  skills: ["React.js", "TypeScript", "JavaScript", "Tailwind CSS", "REST APIs", "Redux", "Git", "Figma", "HTML5", "CSS3"],
  benefits: [
    "Competitive salary (Rs. 100,000–150,000/month based on experience).",
    "100% remote work — work from anywhere in Pakistan.",
    "Flexible working hours to support work-life balance.",
    "Health & medical insurance for you and your dependents.",
    "Annual performance bonus and salary reviews.",
    "Access to online learning platforms and training budget.",
    "Friendly, collaborative team culture with regular team events.",
  ],
};

for (let i = 1; i <= 6; i++) JOB_DATA[String(i)] = { ...BASE_JOB, id: String(i) };

export function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);

  const job = JOB_DATA[id ?? "1"] ?? BASE_JOB;

  return (
    <div className="bg-[#fafafc] min-h-full">
      {/* ── Top bar ── */}
      <div className="px-8 pt-6 pb-0">
        <button
          onClick={() => navigate("/jobs")}
          className="flex items-center gap-2 text-[#6750a4] mb-6 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">Back to Jobs</span>
        </button>
      </div>

      <div className="px-8 pb-10 flex flex-col lg:flex-row gap-8">
        {/* ── LEFT COLUMN ── */}
        <div className="flex-1 min-w-0">
          {/* Header card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-start gap-5 mb-5">
              <GreenQuadLogo />
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-black mb-1 leading-tight">{job.title}</h1>
                <p className="text-base text-gray-600 mb-3">{job.company}</p>
                <div className="flex flex-wrap gap-2">
                  <MetaPill icon={MapPin} label={job.location} />
                  <MetaPill icon={Briefcase} label={job.jobType} />
                  <MetaPill icon={Clock} label={job.posted} />
                  <MetaPill icon={DollarSign} label={job.salary} />
                </div>
              </div>
            </div>

            {/* AI match banner */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl px-4 py-3 mb-5 flex items-center gap-3">
              <CheckCircle2 size={18} className="text-[#6750a4] shrink-0" />
              <p className="text-sm italic text-[#6750a4]">
                <span className="font-semibold">AI Match: 89%</span> — This role strongly matches your skills and experience profile!
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => navigate(`/jobs/${job.id}/apply`)}
                className="bg-[#6750a4] text-white text-sm px-7 py-2.5 rounded-full hover:bg-[#5a4490] transition-colors"
              >
                Apply Now
              </button>
              <button
                onClick={() => setSaved(!saved)}
                className={`flex items-center gap-2 text-sm px-5 py-2.5 rounded-full border transition-colors ${
                  saved
                    ? "bg-[#6750a4] text-white border-[#6750a4]"
                    : "bg-white text-[#6750a4] border-[#6750a4] hover:bg-purple-50"
                }`}
              >
                {saved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
                {saved ? "Saved" : "Save Job"}
              </button>
            </div>
          </div>

          {/* Content sections */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            {/* About the Company */}
            <Section title="About the Company">
              <p className="text-base text-gray-700 leading-relaxed">{job.about}</p>
            </Section>

            {/* Job Overview */}
            <Section title="Job Overview">
              <p className="text-base text-gray-700 leading-relaxed">
                {showFullOverview ? job.overview : job.overview.slice(0, 200) + "..."}
              </p>
              <button
                onClick={() => setShowFullOverview(!showFullOverview)}
                className="text-sm text-[#6750a4] mt-2 hover:underline"
              >
                {showFullOverview ? "See less" : "See more"}
              </button>
            </Section>

            {/* Responsibilities */}
            <Section title="Key Responsibilities">
              <BulletList items={job.responsibilities} />
            </Section>

            {/* Requirements */}
            <Section title="Requirements & Qualifications">
              <BulletList items={job.requirements} />
            </Section>

            {/* Skills */}
            <Section title="Required Skills">
              <div className="flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <SkillChip key={s} label={s} />
                ))}
              </div>
            </Section>

            {/* Benefits */}
            <Section title="Benefits & Perks">
              <BulletList items={job.benefits} />
            </Section>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="w-full lg:w-[260px] shrink-0 space-y-4">
          {/* Quick info card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-bold text-black mb-4">Job Info</h3>
            <div className="space-y-3">
              {[
                { label: "Salary", value: "Rs. 100k–150k / mo" },
                { label: "Experience", value: "1–3 Years" },
                { label: "Job Type", value: "Full-time" },
                { label: "Work Mode", value: "Remote" },
                { label: "Location", value: "Pakistan" },
                { label: "Openings", value: "3 Positions" },
                { label: "Deadline", value: "30 Apr 2026" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                  <span className="text-gray-500">{label}</span>
                  <span className="text-black font-medium text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Similar jobs nudge */}
          <div className="bg-purple-50 border border-purple-200 rounded-3xl p-5 text-center">
            <p className="text-sm text-[#6750a4] mb-3">
              Found <span className="font-bold">5 more</span> similar roles matching your profile
            </p>
            <button
              onClick={() => navigate("/jobs")}
              className="text-sm border border-[#6750a4] text-[#6750a4] px-4 py-1.5 rounded-full hover:bg-purple-100 transition-colors"
            >
              View All Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
