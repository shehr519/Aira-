import { useState } from "react";
import {
  LayoutDashboard, Briefcase, FileText, ClipboardList, Video,
  BrainCircuit, Settings, ChevronDown, ChevronUp, Search,
  PlayCircle, CheckCircle2, ArrowRight, BookOpen, Lightbulb,
  UserCircle, HelpCircle, Zap, MessageSquare, Star, Clock,
  AlertCircle,
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

// ── Guide content ─────────────────────────────────────────────────
const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    title: "Dashboard",
    color: "#6750a4",
    summary: "Your personalised command centre. See everything at a glance the moment you log in.",
    steps: [
      { title: "View your stats", description: "The top cards show your current application count, upcoming tests, scheduled interviews, and resume completion percentage — all updating in real time." },
      { title: "Track recent activity", description: "The activity feed shows your latest applications, test submissions, and interview results so you always know where you stand." },
      { title: "Quick navigation", description: "Use the shortcut cards at the bottom to jump straight into the most common actions: Browse Jobs, Practice Tests, or View Interviews." },
    ],
    tips: ["Check your dashboard every morning to stay on top of deadlines.", "A fully completed profile improves your visibility to recruiters."],
  },
  {
    id: "jobs",
    icon: Briefcase,
    title: "Jobs",
    color: "#007DFC",
    summary: "Browse and apply to curated job listings matched to your profile and skills.",
    steps: [
      { title: "Browse listings", description: "Go to the Jobs page to see all available positions. Use the search bar and filters (location, type, salary) to narrow results." },
      { title: "View job details", description: "Click any job card to see the full description, requirements, company info, and salary range." },
      { title: "Apply Now", description: "Click 'Apply Now' on the job detail page. You'll see a multi-step form: submit your resume, add a cover letter, and confirm your details." },
      { title: "Track your applications", description: "Applied jobs are tracked in your Dashboard under Recent Applications with their current status." },
    ],
    tips: ["Tailor your cover letter for each role — it significantly increases your callback rate.", "Apply early; many companies close applications before the listed deadline."],
  },
  {
    id: "resume",
    icon: FileText,
    title: "Resume",
    color: "#FF630B",
    summary: "Build, manage, and optimise your AI-enhanced resume directly in the platform.",
    steps: [
      { title: "Build your resume", description: "Go to the Resume page and fill in your education, work experience, skills, and certifications. The platform builds a formatted resume automatically." },
      { title: "AI suggestions", description: "AIRA analyses your resume and highlights weak spots, missing keywords, and sections that could be improved to pass ATS filters." },
      { title: "Download or share", description: "Export your resume as a PDF or share a direct link with recruiters. The link is always up-to-date." },
    ],
    tips: ["Use action verbs like 'Built', 'Led', 'Improved' to make your experience pop.", "Keep your resume to one page unless you have 10+ years of experience."],
  },
  {
    id: "tests",
    icon: ClipboardList,
    title: "Tests / Assessments",
    color: "#17CF97",
    summary: "Complete skill assessments assigned by companies before your interview rounds.",
    steps: [
      { title: "View assigned tests", description: "On the Tests page you'll see all assessments assigned to you, with their deadline, duration, and the company they're from." },
      { title: "Start a test", description: "Click 'Start Test' on any listing. Read the instructions carefully before starting — the timer begins as soon as you enter." },
      { title: "Answer questions", description: "Questions may be multiple-choice, true/false, or short answer. You can navigate between questions and flag ones to review later." },
      { title: "Submit and review results", description: "After submission, your score appears instantly with a breakdown of correct vs incorrect answers and explanations." },
    ],
    tips: ["Don't rush — read every question twice before answering.", "Flagged questions are highlighted in the question navigator — always go back to them before submitting."],
  },
  {
    id: "interviews",
    icon: Video,
    title: "Interviews",
    color: "#c084fc",
    summary: "Manage all your scheduled interviews — video calls, coding tasks, and technical discussions.",
    steps: [
      { title: "View upcoming interviews", description: "The Interviews page shows a colour-coded list of upcoming, previous, and scheduled interviews with their date, type, and company." },
      { title: "Join a video interview", description: "Click 'Join Interview' to enter the lobby. Test your camera and microphone, then click 'Join Now'. The AI or recruiter will begin the session." },
      { title: "Complete a coding test", description: "For coding interviews, click 'Start Task'. A split-pane editor opens with the problem on the left and your code editor on the right. Run code to test it, then submit." },
      { title: "Technical discussion", description: "For technical rounds, an interviewer (or AI) will ask structured questions. Type your answers in the chat-style interface. Take your time — quality matters over speed." },
      { title: "View your report", description: "After each interview, a detailed report is generated with your score, performance breakdown by category, and AI feedback." },
    ],
    tips: ["Test your internet connection 15 minutes before a video interview.", "For coding tests, write a brute-force solution first, then optimise — don't wait for perfection."],
  },
  {
    id: "ai-feedback",
    icon: BrainCircuit,
    title: "AI Feedback",
    color: "#f59e0b",
    summary: "Get personalised AI-powered insights across your resume, tests, and interviews.",
    steps: [
      { title: "Overview tab", description: "See your overall performance score as a radar chart covering Resume Quality, Technical Skills, Communication, and more — all in one glance." },
      { title: "Resume analysis", description: "The Resume tab shows a line-by-line AI review: ATS score, keyword gaps, formatting issues, and specific improvement suggestions." },
      { title: "Test performance", description: "The Tests tab lists all your assessments with scores, time taken, and a breakdown of which topic areas need more practice." },
      { title: "Interview analysis", description: "The Interviews tab shows per-interview ratings, spoken confidence analysis (for video interviews), and answer quality scores per question." },
    ],
    tips: ["Check AI Feedback after every interview — the insights compound over time.", "Focus on the 'Needs Improvement' items first; small changes have big impact."],
  },
  {
    id: "settings",
    icon: Settings,
    title: "Settings",
    color: "#64748b",
    summary: "Manage your profile, experience, job history, and account preferences.",
    steps: [
      { title: "Profile tab", description: "Update your name, photo, bio, location, and contact details. Keep this up to date — recruiters often view your profile before your resume." },
      { title: "Experience tab", description: "Add or edit your work experience entries including company, role, duration, and description. These feed directly into your resume." },
      { title: "Job History tab", description: "View and manage the positions you've applied to through the platform, along with their current status." },
      { title: "Account tab", description: "Change your password, manage notification preferences, link your LinkedIn profile, or delete your account." },
    ],
  },
];

// ── FAQ data ──────────────────────────────────────────────────────
const FAQS = [
  { q: "Can I use AIRA on mobile?", a: "Yes — AIRA is fully responsive. However, for coding interviews and video sessions, we recommend using a desktop or laptop for the best experience." },
  { q: "Are my interviews recorded?", a: "Video interviews may be recorded for company review purposes. You will always be notified before recording begins. AI-conducted interviews are analysed in real time and then stored as a report." },
  { q: "What if I lose internet during an interview?", a: "For video interviews, you can rejoin using the same link within 2 minutes. For coding tests, your code is auto-saved every 30 seconds, so no progress is lost on reconnection." },
  { q: "How is my coding test scored?", a: "Your code is run against hidden and visible test cases. Each test case has equal weight. Partial credit is given if some test cases pass. Code quality (comments, naming) is noted but doesn't affect the numerical score." },
  { q: "Who sees my AI Feedback?", a: "Your AI Feedback is private by default. Some companies may request access to your performance summary as part of the interview process — you'll be asked to approve this first." },
  { q: "How do I prepare for an AI interview?", a: "Treat it exactly like a real human interview. Dress professionally, find a quiet space, and answer questions clearly and concisely. The AI evaluates tone, content, and structure — not appearance." },
  { q: "Can I retake a test?", a: "Whether a test can be retaken depends on the company's settings. If retakes are allowed, you'll see a 'Retake' button on the test result page after the cooldown period." },
  { q: "How do I delete my account?", a: "Go to Settings → Account → Danger Zone and click 'Delete Account'. This is permanent and removes all your data from the platform." },
];

// ── Components ─────────────────────────────────────────────────────

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
      {/* Header */}
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
          {expanded
            ? <ChevronUp size={18} style={{ color: section.color }} />
            : <ChevronDown size={18} className="text-gray-400" />}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-gray-100 px-5 pt-5 pb-6 bg-white">
          {/* Steps */}
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <PlayCircle size={12} /> How to use
          </p>
          <ol className="space-y-4 mb-5">
            {section.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="size-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
                  style={{ backgroundColor: section.color }}>
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">{step.title}</p>
                  <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Tips */}
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

// ── Main page ─────────────────────────────────────────────────────
export function HelpPage() {
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
      {/* ── Hero banner ── */}
      <div className="bg-gradient-to-br from-[#6750a4] via-[#7c5cbf] to-[#4a3880] px-8 pt-10 pb-16 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 size-48 rounded-full bg-white/5" />
        <div className="absolute top-6 right-32 size-24 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 left-20 size-32 rounded-full bg-white/5" />

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-8 bg-white/20 rounded-lg flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="text-white/70 text-sm uppercase tracking-widest">Help Centre</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">How to use AIRA</h1>
          <p className="text-white/60 text-base leading-relaxed">
            AIRA (AI Interview & Recruitment Assistant) helps candidates prepare, apply, and succeed.
            This guide covers everything you need to know.
          </p>
        </div>

        {/* Search */}
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
        {/* ── Quick stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen,     label: "Guides",   value: "7 sections",    color: "#6750a4" },
            { icon: HelpCircle,   label: "FAQs",     value: "8 questions",   color: "#007DFC" },
            { icon: Clock,        label: "Read time", value: "~8 minutes",   color: "#FF630B" },
            { icon: Star,         label: "Rating",   value: "Helpful?",      color: "#f59e0b" },
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

        {/* ── Tabs ── */}
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

        {/* ── Guide tab ── */}
        {activeTab === "guide" && (
          <div className="space-y-4">
            {/* Quick nav pills */}
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

        {/* ── FAQ tab ── */}
        {activeTab === "faq" && (
          <div className="space-y-3">
            <div className="bg-purple-50 border border-purple-100 rounded-2xl px-5 py-4 flex items-start gap-3 mb-5">
              <Zap size={16} className="text-[#6750a4] shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 leading-relaxed">
                Can't find an answer? Scroll down to contact our support team — we typically respond within 24 hours.
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

        {/* ── Contact tab ── */}
        {activeTab === "contact" && (
          <div className="space-y-5">
            {/* Contact cards */}
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

            {/* Feedback form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-base font-bold text-black mb-1">Send us a message</h3>
              <p className="text-sm text-gray-500 mb-5">Describe your issue and we'll help you as quickly as possible.</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Your Name</label>
                    <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#6750a4] transition-colors" placeholder="Antor Paul" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Email</label>
                    <input type="email" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#6750a4] transition-colors" placeholder="you@email.com" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Subject</label>
                  <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#6750a4] transition-colors bg-white">
                    <option>I can't join my interview</option>
                    <option>Technical issue with coding test</option>
                    <option>Problem with my resume</option>
                    <option>Account or login issue</option>
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

            {/* Response info */}
            <div className="flex flex-col sm:flex-row gap-3">
              {[
                { label: "Average response time", value: "< 24 hours", icon: Clock, color: "#6750a4" },
                { label: "Support hours", value: "Mon–Fri, 9 AM – 6 PM", icon: Star, color: "#f59e0b" },
                { label: "Satisfaction rate", value: "97% resolved", icon: CheckCircle2, color: "#17CF97" },
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

        {/* ── Bottom banner ── */}
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