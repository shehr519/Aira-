import { useEffect, useRef, useState } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router";
import { RecruiterSidebar } from "./RecruiterSidebar";
import { RecruiterAiraAssistant } from "./RecruiterAiraAssistant";
import {
  Search, Bell, User, X, CheckCircle2, Clock,
  AlertCircle, Settings, HelpCircle, LogOut,
  ChevronDown, Shield, Mail, Phone, Briefcase,
} from "lucide-react";

// ── Recruiter profile data ─────────────────────────────────────────
const RECRUITER = {
  name:     "Sarah Ahmed",
  username: "@sarah.ahmed",
  email:    "sarah.ahmed@techhive.com",
  phone:    "+92 321 9876543",
  company:  "TechHive Solutions",
  role:     "HR Manager",
  stats: [
    { label: "Jobs Open",   value: "8"  },
    { label: "Applicants",  value: "248" },
    { label: "Shortlisted", value: "47" },
  ],
};

const NOTIFS = [
  { id: 1, text: "Ahmed Khan accepted interview invite", time: "5 min ago", unread: true,  type: "invite" },
  { id: 2, text: "AI completed screening for Frontend Dev (32 new profiles)", time: "22 min ago", unread: true,  type: "ai" },
  { id: 3, text: "Zara Malik scored 91% on UI/UX skills test", time: "2 hr ago", unread: true,  type: "result" },
  { id: 4, text: "Backend Developer job posting expires in 3 days", time: "1 day ago", unread: false, type: "reminder" },
];

function NotifDot({ type }: { type: string }) {
  const map: Record<string, string> = {
    invite:   "bg-[#6750a4]/15 text-[#6750a4]",
    ai:       "bg-green-100 text-green-600",
    result:   "bg-amber-100 text-amber-600",
    reminder: "bg-blue-100 text-blue-600",
  };
  const Icon = type === "ai" ? CheckCircle2 : type === "result" ? AlertCircle : type === "reminder" ? Clock : Bell;
  return (
    <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${map[type] ?? map.invite}`}>
      <Icon size={14} />
    </div>
  );
}

// ── Recruiter Navbar ───────────────────────────────────────────────
function RecruiterNavbar() {
  const navigate = useNavigate();
  const [showNotif,   setShowNotif]   = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifs,      setNotifs]      = useState(NOTIFS);
  const notifRef   = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unread = notifs.filter((n) => n.unread).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current   && !notifRef.current.contains(e.target as Node))   setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    sessionStorage.removeItem("aira_auth");
    navigate("/auth");
  };

  return (
    <header className="h-[64px] flex items-center justify-between px-6 bg-white border-b border-gray-100 shrink-0 z-40 relative">
      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 w-[280px] hover:border-[#6750a4]/40 transition-colors focus-within:border-[#6750a4]/60 focus-within:bg-white">
        <Search size={15} className="text-gray-400 shrink-0" />
        <input type="text" placeholder="Search candidates, jobs..." className="bg-transparent outline-none text-sm text-gray-600 w-full placeholder:text-gray-400" />
      </div>

      <div className="flex items-center gap-1">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotif(v => !v); setShowProfile(false); }}
            className="relative p-2 rounded-full hover:bg-[#6750a4]/8 transition-colors group"
          >
            <Bell size={20} className="text-gray-600 group-hover:text-[#6750a4] transition-colors" />
            {unread > 0 && (
              <span className="absolute top-1 right-1 size-4 rounded-full bg-[#6750a4] text-white text-[9px] font-bold flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>
          {showNotif && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-[#6750a4]/5 to-transparent">
                <div className="flex items-center gap-2">
                  <Bell size={14} className="text-[#6750a4]" />
                  <p className="text-sm font-bold text-gray-800">Notifications</p>
                  {unread > 0 && <span className="bg-[#6750a4] text-white text-xs px-1.5 py-0.5 rounded-full">{unread}</span>}
                </div>
                <button onClick={() => setNotifs(p => p.map(n => ({ ...n, unread: false })))} className="text-xs text-[#6750a4] hover:underline">Mark all read</button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifs.map(n => (
                  <div key={n.id} className={`flex gap-3 px-4 py-3 border-b border-gray-50 group hover:bg-gray-50 transition-colors ${n.unread ? "bg-[#6750a4]/3" : ""}`}>
                    <NotifDot type={n.type} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-800 leading-relaxed">{n.text}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {n.unread && <span className="size-2 rounded-full bg-[#6750a4]" />}
                      <button onClick={() => setNotifs(p => p.filter(x => x.id !== n.id))} className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all"><X size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center py-2.5 border-t border-gray-100">
                <button onClick={() => setShowNotif(false)} className="text-xs text-[#6750a4] hover:underline">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative ml-1" ref={profileRef}>
          <button
            onClick={() => { setShowProfile(v => !v); setShowNotif(false); }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 transition-colors group"
          >
            <div className="size-9 rounded-full bg-gradient-to-br from-[#6750a4] to-[#a78bfa] flex items-center justify-center ring-2 ring-[#6750a4]/20 group-hover:ring-[#6750a4]/50 transition-all shrink-0">
              <User size={17} className="text-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-700 leading-tight">{RECRUITER.name}</p>
              <p className="text-[10px] text-gray-400 leading-tight">{RECRUITER.role}</p>
            </div>
            <ChevronDown size={14} className={`text-gray-400 hidden md:block transition-transform duration-200 ${showProfile ? "rotate-180" : ""}`} />
          </button>

          {showProfile && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
              {/* Profile header */}
              <div className="relative bg-gradient-to-br from-[#6750a4] to-[#8b6bc4] px-5 py-4">
                <div className="absolute -top-4 -right-4 size-20 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                <div className="flex items-center gap-3 relative">
                  <div className="size-12 rounded-full bg-white/25 ring-2 ring-white/40 flex items-center justify-center shrink-0">
                    <User size={22} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-bold leading-tight truncate">{RECRUITER.name}</p>
                    <p className="text-white/60 text-xs truncate">{RECRUITER.username}</p>
                    <span className="inline-flex items-center gap-1 mt-1 bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">
                      <Shield size={8} /> {RECRUITER.role}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  {RECRUITER.stats.map(s => (
                    <div key={s.label} className="flex-1 bg-white/15 rounded-xl px-2 py-1.5 text-center">
                      <p className="text-white font-bold text-sm leading-tight">{s.value}</p>
                      <p className="text-white/60 text-[9px] leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Contact */}
              <div className="px-4 py-3 border-b border-gray-100 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-gray-500"><Mail size={12} className="text-gray-400 shrink-0" /><span className="truncate">{RECRUITER.email}</span></div>
                <div className="flex items-center gap-2 text-xs text-gray-500"><Phone size={12} className="text-gray-400 shrink-0" />{RECRUITER.phone}</div>
              </div>
              {/* Links */}
              <div className="py-1.5">
                {[
                  { icon: User,       label: "View Profile",    path: "/recruiter/settings" },
                  { icon: Briefcase,  label: "My Job Postings", path: "/recruiter/jobs" },
                  { icon: Settings,   label: "Settings",        path: "/recruiter/settings" },
                  { icon: HelpCircle, label: "Help & Support",  path: "/recruiter/help" },
                ].map(({ icon: Icon, label, path }) => (
                  <button key={label} onClick={() => { navigate(path); setShowProfile(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#6750a4]/6 hover:text-[#6750a4] transition-colors group text-left">
                    <div className="size-7 rounded-lg bg-gray-100 group-hover:bg-[#6750a4]/10 flex items-center justify-center transition-colors shrink-0">
                      <Icon size={14} className="text-gray-500 group-hover:text-[#6750a4] transition-colors" />
                    </div>
                    {label}
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-100 py-1.5">
                <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors group text-left">
                  <div className="size-7 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center shrink-0">
                    <LogOut size={14} className="text-red-400" />
                  </div>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ── Layout ─────────────────────────────────────────────────────────
export function RecruiterLayout() {
  const isLoggedIn = sessionStorage.getItem("aira_auth") === "1";
  if (!isLoggedIn) return <Navigate to="/auth" replace />;
  return <RecruiterShell />;
}

function RecruiterShell() {
  const location = useLocation();
  const mainRef  = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [location.key]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#fafafc]">
      <RecruiterSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <RecruiterNavbar />
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <RecruiterAiraAssistant />
    </div>
  );
}