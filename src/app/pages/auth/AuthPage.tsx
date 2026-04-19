import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Check, ChevronRight, ArrowLeft, User, Building2, ShieldCheck, Upload, Briefcase, Mail, Lock } from "lucide-react";

// ── Slideshow images — all figma:asset (guaranteed to load) ──────
import imgRobot    from "../../../assets/aira.png";
import imgResume   from "../../../assets/resume.png";
import imgHiring   from "../../../assets/resumecheck.png";
import imgInterview from "../../../assets/interview.png";

const SLIDES: { src: string; title: string; subtitle: string }[] = [
  { src: imgRobot,     title: "Meet AIRA",               subtitle: "Your AI-powered interview & recruitment assistant" },
  { src: imgResume,    title: "Smart Career Guidance",    subtitle: "Your AI assistant provides personalised feedback every step" },
  { src: imgHiring,    title: "Connect with Top Talent",  subtitle: "Streamlined hiring process for recruiters and candidates" },
  { src: imgInterview, title: "Interview Ready",          subtitle: "Prepare, practise, and land your dream job with AIRA" },
];

// ── Types ───────────────────────────────────────────────────────
type Role = "candidate" | "recruiter" | "admin";
type View =
  | "login"
  | "role-select"
  | "candidate-step1"
  | "candidate-step2"
  | "recruiter-step1"
  | "recruiter-step2"
  | "success";

// ── Left panel slideshow ──────────────────────────────────────────
function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % SLIDES.length);
        setFading(false);
      }, 400);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <div className="hidden lg:flex flex-col relative overflow-hidden w-[46%] shrink-0 h-screen sticky top-0">
      {/* Current slide image */}
      <img
        key={current}
        src={slide.src}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 brightness-[1.05] contrast-[1.02]"
        style={{ opacity: fading ? 0 : 1 }}
      />
      

      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a1e]/70 via-[#1a1035]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a1e]/90 via-transparent to-[#0c0a1e]/30" />

      {/* Brand */}
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <div className="size-8 bg-[#7c5cbf] rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="size-5">
            <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h4v4h-4zM19 13h2v2h-2zM13 19h2v2h-2zM17 19h6v6h-6z"
              fill="white" />
          </svg>
        </div>
        <span className="text-white font-bold text-lg tracking-wide">AIRA</span>
      </div>

      {/* Slide caption */}
      <div
        className="absolute bottom-14 left-8 right-8 transition-opacity duration-500"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <p className="text-white/50 text-xs uppercase tracking-[0.25em] mb-1">AI Interview Platform</p>
        <h2 className="text-white text-2xl font-bold leading-snug mb-1">{slide.title}</h2>
        <p className="text-white/50 text-sm leading-relaxed">{slide.subtitle}</p>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-8 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setFading(true); setTimeout(() => { setCurrent(i); setFading(false); }, 300); }}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2 bg-[#a78bfa]" : "size-2 bg-white/25 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Step progress indicator ───────────────────────────────────────
function StepBar({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`size-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i < current
                ? "bg-[#7c5cbf] text-white"
                : i === current
                ? "bg-[#a78bfa] text-white ring-2 ring-[#a78bfa]/30"
                : "bg-white/10 text-white/40"
            }`}
          >
            {i < current ? <Check size={13} /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`h-0.5 w-10 rounded-full transition-all ${i < current ? "bg-[#7c5cbf]" : "bg-white/10"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Input field ─────────────��────────────────────────────────────
function AuthInput({
  label, type = "text", placeholder, value, onChange, icon: Icon, right,
}: {
  label: string; type?: string; placeholder?: string; value: string;
  onChange: (v: string) => void;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/50 uppercase tracking-widest">{label}</label>
      <div className="relative flex items-center">
        {Icon && <Icon size={15} className="absolute left-3.5 text-white/25" />}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-white/5 border border-white/10 rounded-xl py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#a78bfa]/60 focus:bg-white/8 transition-all ${Icon ? "pl-10 pr-4" : "px-4"}`}
        />
        {right && <div className="absolute right-3">{right}</div>}
      </div>
    </div>
  );
}

// ── Password input ────────────────────────────────────────────────
function PasswordInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [show, setShow] = useState(false);
  return (
    <AuthInput
      label={label} type={show ? "text" : "password"} placeholder="••••••••"
      value={value} onChange={onChange} icon={Lock}
      right={
        <button type="button" onClick={() => setShow(!show)} className="text-white/30 hover:text-white/60 transition-colors">
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      }
    />
  );
}

// ── Password strength bar ─────────────────────────────────────────
function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const strength = password.length < 4 ? 1 : password.length < 7 ? 2 : password.length < 10 ? 3 : 4;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-green-400"];
  return (
    <div className="mt-1">
      <div className="flex gap-1.5 mb-1">
        {[1,2,3,4].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? colors[strength] : "bg-white/10"}`} />
        ))}
      </div>
      <p className="text-xs text-white/30">{labels[strength]} password</p>
    </div>
  );
}

// ── Role card ─────────────────────────────────────────────────────
function RoleCard({ role, selected, onSelect, icon: Icon, title, description }: {
  role: Role; selected: boolean; onSelect: () => void;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string; description: string;
}) {
  return (
    <button onClick={onSelect}
      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4 group ${
        selected ? "border-[#a78bfa] bg-[#a78bfa]/15 shadow-lg shadow-[#a78bfa]/10"
        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
      }`}
    >
      <div className={`size-11 rounded-xl flex items-center justify-center shrink-0 transition-all ${
        selected ? "bg-[#a78bfa] text-white" : "bg-white/10 text-white/50 group-hover:bg-white/15"
      }`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold tracking-wide transition-colors ${selected ? "text-white" : "text-white/70"}`}>{title}</p>
        <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{description}</p>
      </div>
      <div className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all mt-0.5 ${
        selected ? "border-[#a78bfa] bg-[#a78bfa]" : "border-white/20"
      }`}>
        {selected && <Check size={11} className="text-white" />}
      </div>
    </button>
  );
}

// ── Login role tabs ───────────────────────────────────────────────
function LoginRoleTabs({ active, onChange }: { active: Role; onChange: (r: Role) => void }) {
  const roles: { id: Role; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: "admin",     label: "Admin",     icon: ShieldCheck },
    { id: "recruiter", label: "Recruiter", icon: Briefcase },
    { id: "candidate", label: "Candidate", icon: User },
  ];
  return (
    <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-xl border border-white/10">
      {roles.map(({ id, label, icon: Icon }) => (
        <button key={id} onClick={() => onChange(id)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
            active === id ? "bg-[#a78bfa] text-white shadow-md" : "text-white/40 hover:text-white/70"
          }`}
        >
          <Icon size={13} /> {label}
        </button>
      ))}
    </div>
  );
}

// ���─ Auth tabs (Login / Sign Up) ───────────────────────────────────
function AuthTabs({ active, onChange }: { active: "login" | "signup"; onChange: (t: "login" | "signup") => void }) {
  return (
    <div className="flex gap-12 mb-8 border-b border-white/10">
      {(["login", "signup"] as const).map((t) => (
        <button key={t} onClick={() => onChange(t)}
          className={`pb-3 text-sm font-semibold capitalize tracking-wide transition-colors border-b-2 -mb-px ${
            active === t ? "border-[#a78bfa] text-white" : "border-transparent text-white/30 hover:text-white/60"
          }`}
        >
          {t === "login" ? "Login" : "Sign Up"}
        </button>
      ))}
    </div>
  );
}

// ── CTA button ────────────────────────────────────────────────────
function PrimaryBtn({ children, onClick, disabled = false, className = "" }: {
  children: React.ReactNode; onClick?: () => void; disabled?: boolean; className?: string;
}) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={`w-full py-3.5 bg-[#7c5cbf] hover:bg-[#6d4fb0] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-[#7c5cbf]/30 hover:shadow-[#7c5cbf]/50 active:scale-[0.98] flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────
export function AuthPage() {
  const navigate = useNavigate();
  const [view, setView]           = useState<View>("login");
  const [loginRole, setLoginRole] = useState<Role>("candidate");
  const [signupRole, setSignupRole] = useState<Role | null>(null);

  // Candidate fields
  const [cFullName, setCFullName]   = useState("");
  const [cUsername, setCUsername]   = useState("");
  const [cEmail, setCEmail]         = useState("");
  const [cPassword, setCPassword]   = useState("");
  const [cConfirm, setCConfirm]     = useState("");

  // Recruiter fields
  const [rCompany, setRCompany] = useState("");
  const [rName, setRName]       = useState("");
  const [rTitle, setRTitle]     = useState("");
  const [rEmail, setREmail]     = useState("");
  const [rPassword, setRPassword] = useState("");
  const [rConfirm, setRConfirm]   = useState("");

  // Login fields
  const [lEmail, setLEmail]       = useState("");
  const [lPassword, setLPassword] = useState("");

  const resetAll = () => {
    setCFullName(""); setCUsername(""); setCEmail(""); setCPassword(""); setCConfirm("");
    setRCompany(""); setRName(""); setRTitle(""); setREmail(""); setRPassword(""); setRConfirm("");
  };

  const handleRoleNext = () => {
    if (signupRole === "candidate") setView("candidate-step1");
    else if (signupRole === "recruiter") setView("recruiter-step1");
  };

  // ── Views ──────────────────────────────────────────────────────

  const renderLogin = () => (
    <>
      <AuthTabs active="login" onChange={(t) => { if (t === "signup") setView("role-select"); }} />
      <h1 className="text-2xl font-bold text-white mt-7 mb-2">Welcome Back</h1>
      <p className="text-sm text-white/40 mb-8">Sign in to your AIRA account</p>

      <p className="text-xs text-white/50 uppercase tracking-widest mb-3">Sign in as</p>
      <LoginRoleTabs active={loginRole} onChange={setLoginRole} />

      <div className="space-y-4 mb-5">
        <AuthInput label="Email Address" type="email" placeholder="you@email.com" value={lEmail} onChange={setLEmail} icon={Mail} />
        <PasswordInput label="Password" value={lPassword} onChange={setLPassword} />
      </div>

      <div className="flex items-center justify-between mb-7">
        <label className="flex items-center gap-2 cursor-pointer">
          <div className="size-4 rounded border border-white/20 bg-[#a78bfa]/20 flex items-center justify-center">
            <Check size={10} className="text-[#a78bfa]" />
          </div>
          <span className="text-xs text-white/40">Remember me</span>
        </label>
        <button className="text-xs text-[#a78bfa] hover:text-white transition-colors">Forgot password?</button>
      </div>

      <PrimaryBtn onClick={() => {
        sessionStorage.setItem("aira_auth", "1");
        navigate(loginRole === "recruiter" ? "/recruiter" : "/");
      }}>
        Sign In as {loginRole.charAt(0).toUpperCase() + loginRole.slice(1)}
      </PrimaryBtn>

      <p className="text-center text-xs text-white/30 mt-6">
        Don't have an account?{" "}
        <button onClick={() => setView("role-select")} className="text-[#a78bfa] hover:text-white transition-colors">Create one</button>
      </p>
    </>
  );

  const renderRoleSelect = () => (
    <>
      <AuthTabs active="signup" onChange={(t) => { if (t === "login") setView("login"); }} />
      <h1 className="text-2xl font-bold text-white mt-7 mb-2">Create your account</h1>
      <p className="text-sm text-white/40 mb-7">Select your role to get started</p>
      <p className="text-xs text-white/50 uppercase tracking-widest mb-4">Select Role:</p>
      <div className="space-y-3 mb-8">
        <RoleCard role="candidate" selected={signupRole === "candidate"} onSelect={() => setSignupRole("candidate")}
          icon={User} title="CANDIDATE" description="Looking for jobs, attending interviews, and building your career." />
        <RoleCard role="recruiter" selected={signupRole === "recruiter"} onSelect={() => setSignupRole("recruiter")}
          icon={Building2} title="RECRUITER" description="Posting jobs, reviewing candidates, and conducting interviews." />
      </div>
      <PrimaryBtn onClick={handleRoleNext} disabled={!signupRole}>Continue <ChevronRight size={16} /></PrimaryBtn>
      <p className="text-center text-xs text-white/30 mt-6">
        Already have an account?{" "}
        <button onClick={() => setView("login")} className="text-[#a78bfa] hover:text-white transition-colors">Sign in</button>
      </p>
    </>
  );

  const renderCandidateStep1 = () => (
    <>
      <AuthTabs active="signup" onChange={(t) => { if (t === "login") setView("login"); }} />
      <StepBar total={2} current={0} />
      <button onClick={() => setView("role-select")} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 mb-5 -mt-2 transition-colors">
        <ArrowLeft size={13} /> Back
      </button>
      <h1 className="text-2xl font-bold text-white mb-1">Personal Details</h1>
      <p className="text-sm text-white/40 mb-6">Tell us a bit about yourself</p>

      <div className="flex items-center gap-4 mb-5">
        <div className="size-16 rounded-2xl bg-white/5 border-2 border-dashed border-white/15 flex items-center justify-center shrink-0">
          <User size={24} className="text-white/20" />
        </div>
        <div>
          <button className="flex items-center gap-2 text-xs text-[#a78bfa] border border-[#a78bfa]/30 px-3 py-1.5 rounded-lg hover:bg-[#a78bfa]/10 transition-colors">
            <Upload size={12} /> Upload Photo
          </button>
          <p className="text-xs text-white/20 mt-1">PNG, JPG up to 2MB</p>
        </div>
      </div>

      <div className="space-y-4 mb-7">
        <AuthInput label="Full Name" placeholder="John Doe" value={cFullName} onChange={setCFullName} icon={User} />
        <AuthInput label="Username / AI Tag" placeholder="@johndoe" value={cUsername} onChange={setCUsername} icon={User} />
        <AuthInput label="Email Address" type="email" placeholder="john@email.com" value={cEmail} onChange={setCEmail} icon={Mail} />
      </div>

      <PrimaryBtn onClick={() => setView("candidate-step2")} disabled={!cFullName || !cEmail}>
        Next <ChevronRight size={16} />
      </PrimaryBtn>
    </>
  );

  const renderCandidateStep2 = () => (
    <>
      <AuthTabs active="signup" onChange={(t) => { if (t === "login") setView("login"); }} />
      <StepBar total={2} current={1} />
      <button onClick={() => setView("candidate-step1")} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 mb-5 -mt-2 transition-colors">
        <ArrowLeft size={13} /> Back
      </button>
      <h1 className="text-2xl font-bold text-white mb-1">Secure your account</h1>
      <p className="text-sm text-white/40 mb-6">Set a strong password to protect your account</p>

      <div className="space-y-4 mb-2">
        <PasswordInput label="Enter Password" value={cPassword} onChange={setCPassword} />
        <PasswordStrength password={cPassword} />
        <PasswordInput label="Confirm Password" value={cConfirm} onChange={setCConfirm} />
      </div>
      {cPassword && cConfirm && cPassword !== cConfirm && (
        <p className="text-xs text-red-400 mt-2">Passwords do not match</p>
      )}

      <div className="flex items-start gap-2 my-6">
        <div className="size-4 rounded border border-white/20 bg-[#a78bfa]/20 flex items-center justify-center mt-0.5 shrink-0">
          <Check size={10} className="text-[#a78bfa]" />
        </div>
        <p className="text-xs text-white/30 leading-relaxed">
          I agree to the <span className="text-[#a78bfa]">Terms of Service</span> and <span className="text-[#a78bfa]">Privacy Policy</span>
        </p>
      </div>

      <div className="flex gap-3">
        <button onClick={() => setView("candidate-step1")}
          className="flex-1 py-3 border border-white/15 text-white/60 text-sm font-semibold rounded-xl hover:border-white/30 hover:text-white/80 transition-all">
          Back
        </button>
        <button onClick={() => setView("success")} disabled={!cPassword || cPassword !== cConfirm}
          className="flex-1 py-3 bg-[#7c5cbf] hover:bg-[#6d4fb0] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-[#7c5cbf]/30">
          Sign Up
        </button>
      </div>
    </>
  );

  const renderRecruiterStep1 = () => (
    <>
      <AuthTabs active="signup" onChange={(t) => { if (t === "login") setView("login"); }} />
      <StepBar total={2} current={0} />
      <button onClick={() => setView("role-select")} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 mb-5 -mt-2 transition-colors">
        <ArrowLeft size={13} /> Back
      </button>
      <div className="flex items-center gap-3 mb-5">
        <div className="size-10 rounded-xl bg-[#a78bfa]/20 flex items-center justify-center">
          <Building2 size={18} className="text-[#a78bfa]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Recruiter Details</h1>
          <p className="text-xs text-white/40">Company & professional info</p>
        </div>
      </div>

      <div className="space-y-4 mb-7">
        <AuthInput label="Company Name" placeholder="e.g. TechHive Solutions" value={rCompany} onChange={setRCompany} icon={Building2} />
        <AuthInput label="Your Full Name" placeholder="Jane Smith" value={rName} onChange={setRName} icon={User} />
        <AuthInput label="Job Title / Position" placeholder="e.g. HR Manager" value={rTitle} onChange={setRTitle} icon={Briefcase} />
        <AuthInput label="Work Email" type="email" placeholder="jane@company.com" value={rEmail} onChange={setREmail} icon={Mail} />
      </div>

      <PrimaryBtn onClick={() => setView("recruiter-step2")} disabled={!rCompany || !rName || !rEmail}>
        Next <ChevronRight size={16} />
      </PrimaryBtn>
    </>
  );

  const renderRecruiterStep2 = () => (
    <>
      <AuthTabs active="signup" onChange={(t) => { if (t === "login") setView("login"); }} />
      <StepBar total={2} current={1} />
      <button onClick={() => setView("recruiter-step1")} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 mb-5 -mt-2 transition-colors">
        <ArrowLeft size={13} /> Back
      </button>
      <h1 className="text-2xl font-bold text-white mb-1">Secure your account</h1>
      <p className="text-sm text-white/40 mb-6">Create a password for your recruiter account</p>

      <div className="space-y-4 mb-2">
        <PasswordInput label="Enter Password" value={rPassword} onChange={setRPassword} />
        <PasswordStrength password={rPassword} />
        <PasswordInput label="Confirm Password" value={rConfirm} onChange={setRConfirm} />
      </div>
      {rPassword && rConfirm && rPassword !== rConfirm && (
        <p className="text-xs text-red-400 mt-2">Passwords do not match</p>
      )}

      <div className="flex items-start gap-2 my-6">
        <div className="size-4 rounded border border-white/20 bg-[#a78bfa]/20 flex items-center justify-center mt-0.5 shrink-0">
          <Check size={10} className="text-[#a78bfa]" />
        </div>
        <p className="text-xs text-white/30 leading-relaxed">
          I agree to the <span className="text-[#a78bfa]">Terms of Service</span> and <span className="text-[#a78bfa]">Privacy Policy</span>
        </p>
      </div>

      <div className="flex gap-3">
        <button onClick={() => setView("recruiter-step1")}
          className="flex-1 py-3 border border-white/15 text-white/60 text-sm font-semibold rounded-xl hover:border-white/30 hover:text-white/80 transition-all">
          Back
        </button>
        <button onClick={() => setView("success")} disabled={!rPassword || rPassword !== rConfirm}
          className="flex-1 py-3 bg-[#7c5cbf] hover:bg-[#6d4fb0] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-[#7c5cbf]/30">
          Sign Up
        </button>
      </div>
    </>
  );

  const renderSuccess = () => (
    <div className="text-center">
      {/* Glow ring */}
      <div className="flex justify-center mb-7">
        <div className="relative">
          <div className="size-24 rounded-full bg-[#a78bfa]/15 flex items-center justify-center ring-[14px] ring-[#a78bfa]/5">
            <div className="size-16 rounded-full bg-[#7c5cbf]/40 flex items-center justify-center">
              <Check size={36} className="text-white" strokeWidth={3} />
            </div>
          </div>
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <div key={deg} className="absolute size-2 rounded-full bg-[#a78bfa]/50"
              style={{ top: "50%", left: "50%",
                transform: `rotate(${deg}deg) translate(52px) rotate(-${deg}deg) translate(-50%, -50%)` }} />
          ))}
        </div>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Account Created Successfully</h1>
      <p className="text-sm text-white/40 mb-10 leading-relaxed">
        Welcome aboard! Your account is ready.<br />You can now access the AIRA platform.
      </p>
      <div className="space-y-3">
        <PrimaryBtn onClick={() => { sessionStorage.setItem("aira_auth", "1"); navigate(signupRole === "recruiter" ? "/recruiter" : "/"); }}>
          Continue To Dashboard <ChevronRight size={16} />
        </PrimaryBtn>
        <button onClick={() => { resetAll(); setView("login"); }}
          className="w-full py-3 text-sm text-white/40 hover:text-white/70 transition-colors">
          Go to Login instead
        </button>
      </div>
    </div>
  );

  const viewMap: Record<View, React.ReactNode> = {
    "login":            renderLogin(),
    "role-select":      renderRoleSelect(),
    "candidate-step1":  renderCandidateStep1(),
    "candidate-step2":  renderCandidateStep2(),
    "recruiter-step1":  renderRecruiterStep1(),
    "recruiter-step2":  renderRecruiterStep2(),
    "success":          renderSuccess(),
  };

  return (
    <div className="min-h-screen flex bg-[#0c0a1e] overflow-hidden">
      {/* Left: auto-rotating slideshow */}
      <HeroSlideshow />

      {/* Right: form panel */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute -top-40 -right-40 size-[500px] rounded-full bg-[#6750a4]/8 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 size-[300px] rounded-full bg-[#a78bfa]/5 blur-3xl pointer-events-none" />

        {/* Scrollable form */}
        <div className="flex-1 overflow-y-auto flex items-center justify-center relative z-10 py-8 pl-2 pr-6">
          <div className="w-full max-w-[420px]">
            {viewMap[view]}
          </div>
        </div>
      </div>
    </div>
  );
}