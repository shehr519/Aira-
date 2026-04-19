import { useState } from "react";
import {
  LayoutDashboard, Briefcase, Users, FileText, ClipboardList, Video,
  BrainCircuit, Settings, ChevronDown, ChevronUp, Search,
  PlayCircle, CheckCircle2, ArrowRight, BookOpen, Lightbulb,
  HelpCircle, Zap, MessageSquare, Star, Clock, AlertCircle,
  Building2, Calendar, Filter, Award,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────
interface GuideSection {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  color: string;
  summary: string;
  steps: { title: string; description: string }[];
  tips?: string[];
}

// ── Recruiter‑focused guide content ──────────────────────────────
const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    title: "Recruiter Dashboard",
    color: "#6750a4",
    summary: "Your central hub for monitoring jobs, candidates, and AI insights at a glance.",
    steps: [
      { title: "View key metrics", description: "Top cards show active jobs, total applicants, pending reviews, and interviews scheduled." },
      { title: "Review AI‑screened candidates", description: "The 'AI Screening Complete' section lists candidates ready for your review, sorted by match score." },
      { title: "Quick actions", description: "Use the sidebar or shortcut buttons to post a new job, view reports, or start an AI interview." },
    ],
    tips: ["Check the dashboard first thing in the morning to prioritise urgent tasks.", "Use the date filter to see activity over any period."],
  },
  {
    id: "post-job",
    icon: Briefcase,
    title: "Post a Job",
    color: "#007DFC",
    summary: "Create job listings with AI‑powered screening criteria and skill weights.",
    steps: [
      { title: "Fill in basic info", description: "Job title, location, type (remote/hybrid/onsite), salary range, and description." },
      { title: "Define screening criteria", description: "Add required skills, experience level, and education. The AI will use these to rank candidates." },
      { title: "Set up assessments", description: "Optionally attach a skills test or AI interview that candidates must complete before shortlisting." },
      { title: "Publish", description: "Review your job and click 'Post'. It will appear on the candidate jobs board immediately." },
    ],
    tips: ["Add 5‑7 key skills for the best AI match accuracy.", "Enable 'Auto‑shortlist' to save time – the AI will move top candidates directly to the next stage."],
  },
  {
    id: "candidate-screening",
    icon: Users,
    title: "AI Candidate Screening",
    color: "#FF630B",
    summary: "Let AIRA automatically score and rank applicants based on your job criteria.",
    steps: [
      { title: "Go to Applicants", description: "From the job detail page, click the 'Applicants' tab to see everyone who applied." },
      { title: "View AI scores", description: "Each candidate shows a match percentage (0‑100%) calculated from resume vs. job requirements." },
      { title: "Filter & sort", description: "Use filters (score, location, experience) to focus on top candidates. Click any name to see a full report." },
      { title: "Move to next stage", description: "Select candidates and choose 'Shortlist', 'Request Test', or 'Invite to Interview'." },
    ],
    tips: ["Review the AI’s reasoning by clicking the score – it highlights which skills matched or were missing.", "Adjust job criteria if you see many low‑quality matches."],
  },
  {
    id: "tests-assign",
    icon: ClipboardList,
    title: "Assign & Review Tests",
    color: "#17CF97",
    summary: "Send customised skill assessments to shortlisted candidates and track results.",
    steps: [
      { title: "Create a test", description: "Go to 'Tests' → 'Create New'. Add a title, time limit, and questions (multiple‑choice or coding)." },
      { title: "Assign to candidates", description: "From the candidate list, select 'Assign Test', pick a test, and set a deadline. The candidate receives an email." },
      { title: "Monitor progress", description: "The Tests dashboard shows who has started, completed, or missed the deadline." },
      { title: "Review results", description: "Open any completed test to see the score, time taken, and a breakdown by question." },
    ],
    tips: ["Use the question bank to reuse effective questions across multiple tests.", "Set a reminder email to be sent 24 hours before the deadline."],
  },
  {
    id: "interviews",
    icon: Video,
    title: "AI & Manual Interviews",
    color: "#c084fc",
    summary: "Conduct live video interviews or let AIRA interview candidates automatically.",
    steps: [
      { title: "Schedule an interview", description: "From a candidate profile, click 'Schedule Interview'. Choose AI‑based (automated) or manual (you join)." },
      { title: "Configure AI interview", description: "Select question topics (technical, behavioural) and difficulty. The AI will ask and evaluate answers." },
      { title: "Join a live interview", description: "For manual interviews, click the 'Join' link from your dashboard. The session is recorded for review." },
      { title: "View interview reports", description: "After completion, both AI and manual interviews generate a report with scores, transcript, and feedback." },
    ],
    tips: ["Test your camera and microphone before a manual interview.", "For AI interviews, review the sample questions first to ensure they match your expectations."],
  },
  {
    id: "reports",
    icon: BrainCircuit,
    title: "Recruitment Analytics",
    color: "#f59e0b",
    summary: "Track time‑to‑hire, source effectiveness, and AI accuracy across all your jobs.",
    steps: [
      { title: "Open Reports", description: "Click 'Reports' in the sidebar to see the full analytics dashboard." },
      { title: "Filter by period", description: "Use the date selector to see trends over 1 month, 3 months, or a custom range." },
      { title: "Key metrics", description: "Average time to hire, offer acceptance rate, AI screening accuracy, and cost per hire are displayed as cards." },
      { title: "Export data", description: "Click 'Export PDF' to generate a professional report for stakeholders." },
    ],
    tips: ["Use the 'Skills in Demand' chart to identify which technical skills are most common in your candidate pool.", "Share weekly reports with your team to align on hiring progress."],
  },
  {
    id: "settings",
    icon: Settings,
    title: "Recruiter Settings",
    color: "#64748b",
    summary: "Manage your company profile, team members, notification preferences, and security.",
    steps: [
      { title: "Profile & company", description: "Update your name, job title, company logo, and contact details." },
      { title: "Team management", description: "Add or remove team members, assign roles (Admin, Recruiter, Viewer)." },
      { title: "Notification preferences", description: "Choose which email alerts you receive (new applicants, test completions, etc.)." },
      { title: "Billing & subscription", description: "View your plan, upgrade, or update payment methods." },
    ],
  },
];

// ── Recruiter FAQs ────────────────────────────────────────────────
const FAQS = [
  { q: "How does AIRA calculate the match score?", a: "AIRA uses NLP to compare the candidate's resume against your job description. It looks for exact skill matches, semantic similarity, years of experience, and education. The final score is weighted: 70% hard skills, 20% soft skills, 10% formatting quality." },
  { q: "Can I customise the AI screening thresholds?", a: "Yes. When posting a job, you can set a minimum match score (e.g., 70%) and enable 'auto‑shortlist' for candidates above that threshold. You can also adjust skill weights manually." },
  { q: "What happens if a candidate loses internet during an AI interview?", a: "The interview pauses and the candidate can rejoin within 5 minutes using the same link. Their answers up to that point are saved automatically." },
  { q: "How long are candidate reports stored?", a: "All candidate data, including reports and interview recordings, are stored for 12 months after the job is closed. You can export them before deletion." },
  { q: "Can I try AIRA for free?", a: "Yes, we offer a 14‑day free trial with full access to all features. No credit card required." },
  { q: "How do I invite other recruiters to my team?", a: "Go to Settings → Team → Invite Member. Enter their email and choose a role. They'll receive an invitation link." },
  { q: "Is candidate data GDPR compliant?", a: "Absolutely. We follow GDPR, CCPA, and other regional privacy laws. Candidates can request deletion of their data at any time." },
  { q: "How do I contact support?", a: "Use the 'Contact Us' tab below. Our support team typically responds within 2 hours during business days." },
];

// ── Reusable components (same as candidate HelpPage) ──────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${open ? "border-[#6750a4]/30 bg-purple-50/40" : "border-gray-200 bg-white"}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left gap-3">
        <div className="flex items-center gap-3">
          <HelpCircle size={16} className={`shrink-0 transition-colors ${open ? "text-[#6750a4]" : "text-gray-400"}`} />
          <span className={`text-sm font-semibold transition-colors ${open ? "text-[#6750a4]" : "text-gray-800"}`}>{q}</span>
        </div>
        {open ? <ChevronUp size={16} className="text-[#6750a4] shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-purple-100">
          <p className="mt-3">{a}</p>
        </div>
      )}
    </div>
  );
}

function SectionCard({ section, onExpand, expanded }: { section: GuideSection; onExpand: () => void; expanded: boolean }) {
  const Icon = section.icon;
  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${expanded ? "border-[#6750a4]/30 shadow-md" : "border-gray-200 shadow-sm bg-white"}`}>
      <button onClick={onExpand} className="w-full flex items-start gap-4 p-5 text-left hover:bg-gray-50/50 transition-colors">
        <div className="size-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${section.color}18` }}>
          <span style={{ color: section.color }}>
  <Icon size={20} />
</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-black leading-tight">{section.title}</p>
          <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{section.summary}</p>
        </div>
        <div className="shrink-0 mt-1">
          {expanded ? <ChevronUp size={18} style={{ color: section.color }} /> : <ChevronDown size={18} className="text-gray-400" />}
        </div>
      </button>
      {expanded && (
        <div className="border-t border-gray-100 px-5 pt-5 pb-6 bg-white">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <PlayCircle size={12} /> How to use
          </p>
          <ol className="space-y-4 mb-5">
            {section.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="size-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5" style={{ backgroundColor: section.color }}>
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">{step.title}</p>
                  <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          {section.tips && (
            <div className="rounded-xl p-4" style={{ backgroundColor: `${section.color}0d`, border: `1px solid ${section.color}25` }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5" style={{ color: section.color }}>
                <Lightbulb size={12} /> Pro Tips
              </p>
              <ul className="space-y-2">
                {section.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: section.color }} />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Recruiter Help Page ──────────────────────────────────────
export function RecruiterHelpPage() {
  const [expanded, setExpanded] = useState<string | null>("dashboard");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"guide" | "faq" | "contact">("guide");

  const filteredSections = GUIDE_SECTIONS.filter(
    (s) => search === "" || s.title.toLowerCase().includes(search.toLowerCase()) || s.summary.toLowerCase().includes(search.toLowerCase())
  );
  const filteredFAQs = FAQS.filter(
    (f) => search === "" || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-full bg-[#fafafc]">
      {/* Hero banner (identical style to candidate) */}
      <div className="bg-gradient-to-br from-[#6750a4] via-[#7c5cbf] to-[#4a3880] px-8 pt-10 pb-16 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 size-48 rounded-full bg-white/5" />
        <div className="absolute top-6 right-32 size-24 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 left-20 size-32 rounded-full bg-white/5" />

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-8 bg-white/20 rounded-lg flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="text-white/70 text-sm uppercase tracking-widest">Recruiter Help Centre</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">How to use AIRA for Recruiters</h1>
          <p className="text-white/60 text-base leading-relaxed">
            From posting jobs to analysing candidates – this guide covers everything you need to hire faster with AIRA.
          </p>
        </div>

        <div className="relative z-10 max-w-lg mt-7">
          <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-lg">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guides and FAQs…"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600 text-xs">Clear</button>
            )}
          </div>
        </div>
      </div>

      <div className="px-8 mt-6 pb-12 max-w-4xl mx-auto">
        {/* Quick stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen,   label: "Guides",     value: "7 sections",  color: "#6750a4" },
            { icon: HelpCircle, label: "FAQs",       value: "8 questions", color: "#007DFC" },
            { icon: Clock,      label: "Read time",  value: "~10 minutes", color: "#FF630B" },
            { icon: Star,       label: "Rating",     value: "Helpful?",    color: "#f59e0b" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
              <div className="size-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
                <Icon size={16} style={{ color }} />
              </div>
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-bold text-black">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs (Guide / FAQ / Contact) */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-7 shadow-sm">
          {([
            { id: "guide",   label: "User Guide",   icon: BookOpen },
            { id: "faq",     label: "FAQ",          icon: HelpCircle },
            { id: "contact", label: "Contact Us",   icon: MessageSquare },
          ] as const).map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === id ? "bg-[#6750a4] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {/* Guide tab */}
        {activeTab === "guide" && (
          <div className="space-y-4">
            {search === "" && (
              <div className="flex flex-wrap gap-2 mb-2">
                {GUIDE_SECTIONS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button key={s.id} onClick={() => setExpanded(s.id)}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
                        expanded === s.id ? "border-[#6750a4] bg-[#6750a4] text-white" : "border-gray-200 bg-white text-gray-600 hover:border-[#6750a4]"
                      }`}
                    >
                      <Icon size={11} /> {s.title}
                    </button>
                  );
                })}
              </div>
            )}

            {filteredSections.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                <AlertCircle size={32} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No guides match "{search}"</p>
              </div>
            )}

            {filteredSections.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                expanded={expanded === section.id}
                onExpand={() => setExpanded(expanded === section.id ? null : section.id)}
              />
            ))}
          </div>
        )}

        {/* FAQ tab */}
        {activeTab === "faq" && (
          <div className="space-y-3">
            <div className="bg-purple-50 border border-purple-100 rounded-2xl px-5 py-4 flex items-start gap-3 mb-5">
              <Zap size={16} className="text-[#6750a4] shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 leading-relaxed">
                Can't find an answer? Scroll down to contact our support team — we typically respond within 2 hours on business days.
              </p>
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                <HelpCircle size={32} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No FAQs match "{search}"</p>
              </div>
            )}

            {filteredFAQs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        )}

        {/* Contact tab */}
        {activeTab === "contact" && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: MessageSquare, title: "Live Chat", desc: "Chat with our support team in real time during business hours.", action: "Start Chat", color: "#6750a4" },
                { icon: FileText, title: "Email Support", desc: "Send us a detailed message and we'll get back to you within 24 hours.", action: "Send Email", color: "#007DFC" },
                { icon: BookOpen, title: "Documentation", desc: "Explore our full technical documentation and developer guides.", action: "View Docs", color: "#FF630B" },
                { icon: Video, title: "Video Tutorials", desc: "Watch step-by-step video walkthroughs of all major features.", action: "Watch Now", color: "#17CF97" },
              ].map(({ icon: Icon, title, desc, action, color }) => (
                <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="size-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${color}15` }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <h3 className="text-sm font-bold text-black mb-1">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{desc}</p>
                  <button className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline" style={{ color }}>
                    {action} <ArrowRight size={13} />
                  </button>
                </div>
              ))}
            </div>

            {/* Feedback form (identical to candidate) */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-base font-bold text-black mb-1">Send us a message</h3>
              <p className="text-sm text-gray-500 mb-5">Describe your issue and we'll help you as quickly as possible.</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Your Name</label>
                    <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#6750a4] transition-colors" placeholder="Sarah Ahmed" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Email</label>
                    <input type="email" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#6750a4] transition-colors" placeholder="sarah@techhive.com" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Subject</label>
                  <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#6750a4] transition-colors bg-white">
                    <option>I need help with AI screening</option>
                    <option>How to assign tests to candidates</option>
                    <option>Billing or subscription issue</option>
                    <option>Technical problem with the platform</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Message</label>
                  <textarea rows={4} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#6750a4] transition-colors resize-none" placeholder="Describe your issue in detail…" />
                </div>
                <button className="bg-[#6750a4] text-white text-sm px-6 py-2.5 rounded-full hover:bg-[#5a4490] transition-colors font-semibold">
                  Send Message
                </button>
              </div>
            </div>

            {/* Response stats */}
            <div className="flex flex-col sm:flex-row gap-3">
              {[
                { label: "Average response time", value: "< 2 hours", icon: Clock, color: "#6750a4" },
                { label: "Support hours", value: "Mon–Fri, 9 AM – 6 PM", icon: Star, color: "#f59e0b" },
                { label: "Satisfaction rate", value: "96% resolved", icon: CheckCircle2, color: "#17CF97" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
                  <Icon size={18} style={{ color }} className="shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="text-sm font-bold text-black">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA banner */}
        <div className="mt-10 bg-gradient-to-r from-[#6750a4] to-[#4a3880] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-base">Still need help?</p>
            <p className="text-white/60 text-sm mt-0.5">Our support team is here to help you succeed with AIRA.</p>
          </div>
          <button
            onClick={() => setActiveTab("contact")}
            className="bg-white text-[#6750a4] text-sm font-bold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors shrink-0"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}