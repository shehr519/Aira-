import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Search, Bell, User, X, CheckCircle2, Clock, AlertCircle,
  Settings, HelpCircle, LogOut, ChevronDown, Briefcase,
  FileText, Star, Shield, Mail, Phone,
} from "lucide-react";

// ── Notification data ─────────────────────────────────────────────
const NOTIFICATIONS = [
  { id: 1, text: "New interview invite from TechHive Solutions", time: "2 min ago", unread: true,  type: "invite" },
  { id: 2, text: "Reminder: Coding Interview tomorrow at 11:00 AM", time: "1 hr ago", unread: true,  type: "reminder" },
  { id: 3, text: "Your Initial Screening result is available",       time: "2 days ago", unread: false, type: "result" },
  { id: 4, text: "Resume analysed — 85% match score achieved!",      time: "3 days ago", unread: false, type: "resume" },
];

function NotifIcon({ type }: { type: string }) {
  if (type === "invite")   return <div className="size-8 rounded-full bg-[#6750a4]/15 flex items-center justify-center shrink-0"><Bell size={14} className="text-[#6750a4]" /></div>;
  if (type === "reminder") return <div className="size-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0"><Clock size={14} className="text-amber-600" /></div>;
  if (type === "result")   return <div className="size-8 rounded-full bg-green-100 flex items-center justify-center shrink-0"><CheckCircle2 size={14} className="text-green-600" /></div>;
  return <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0"><AlertCircle size={14} className="text-blue-600" /></div>;
}

// ── Candidate profile data ────────────────────────────────────────
const PROFILE = {
  name:     "Antor Paul",
  username: "@antor.paul",
  email:    "antor.paul@email.com",
  phone:    "+92 300 1234567",
  role:     "Candidate",
  location: "Lahore, Pakistan",
  stats: [
    { label: "Applications", value: "3",   icon: Briefcase,  color: "#6750a4" },
    { label: "Tests Done",   value: "2/3", icon: FileText,   color: "#17CF97" },
    { label: "Match Score",  value: "85%", icon: Star,       color: "#f59e0b" },
  ],
};

// ── Profile dropdown ─────────────────────────────────────────────
function ProfileDropdown({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  const go = (path: string) => { navigate(path); onClose(); };
  const logout = () => {
    sessionStorage.removeItem("aira_auth");
    navigate("/auth");
    onClose();
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
      {/* ── Profile header ── */}
      <div className="relative bg-gradient-to-br from-[#6750a4] to-[#8b6bc4] px-5 py-4">
        {/* Glow blob */}
        <div className="absolute -top-4 -right-4 size-20 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="flex items-center gap-3 relative">
          <div className="size-12 rounded-full bg-white/25 ring-2 ring-white/40 flex items-center justify-center shrink-0">
            <User size={22} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold leading-tight truncate">{PROFILE.name}</p>
            <p className="text-white/60 text-xs truncate">{PROFILE.username}</p>
            <span className="inline-flex items-center gap-1 mt-1 bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">
              <Shield size={8} /> {PROFILE.role}
            </span>
          </div>
        </div>
        {/* Stats row */}
        <div className="flex gap-2 mt-3">
          {PROFILE.stats.map((s) => (
            <div key={s.label} className="flex-1 bg-white/15 rounded-xl px-2 py-1.5 text-center">
              <p className="text-white font-bold text-sm leading-tight">{s.value}</p>
              <p className="text-white/60 text-[9px] leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Contact info ── */}
      <div className="px-4 py-3 border-b border-gray-100 space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Mail size={12} className="text-gray-400 shrink-0" />
          <span className="truncate">{PROFILE.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Phone size={12} className="text-gray-400 shrink-0" />
          <span>{PROFILE.phone}</span>
        </div>
      </div>

      {/* ── Menu links ── */}
      <div className="py-1.5">
        {[
          { icon: User,       label: "View Profile",    path: "/settings" },
          { icon: Briefcase,  label: "My Applications", path: "/jobs" },
          { icon: FileText,   label: "My Resume",       path: "/resume" },
          { icon: Settings,   label: "Settings",        path: "/settings" },
          { icon: HelpCircle, label: "Help & Support",  path: "/help" },
        ].map(({ icon: Icon, label, path }) => (
          <button
            key={label}
            onClick={() => go(path)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#6750a4]/6 hover:text-[#6750a4] transition-colors text-left group"
          >
            <div className="size-7 rounded-lg bg-gray-100 group-hover:bg-[#6750a4]/10 flex items-center justify-center transition-colors shrink-0">
              <Icon size={14} className="text-gray-500 group-hover:text-[#6750a4] transition-colors" />
            </div>
            {label}
          </button>
        ))}
      </div>

      {/* ── Logout ── */}
      <div className="border-t border-gray-100 py-1.5">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left group"
        >
          <div className="size-7 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center shrink-0">
            <LogOut size={14} className="text-red-400" />
          </div>
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────
export function Navbar() {
  const [showNotif,   setShowNotif]   = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifs,      setNotifs]      = useState(NOTIFICATIONS);

  const notifRef   = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter((n) => n.unread).length;

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (notifRef.current   && !notifRef.current.contains(e.target as Node))   setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  const dismiss     = (id: number) => setNotifs((prev) => prev.filter((n) => n.id !== id));

  return (
    <header className="h-[64px] flex items-center justify-between px-6 bg-white border-b border-gray-100 shrink-0 z-40 relative">
      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 w-[280px] hover:border-[#6750a4]/40 transition-colors focus-within:border-[#6750a4]/60 focus-within:bg-white">
        <Search size={15} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search Here..."
          className="bg-transparent outline-none text-sm text-gray-600 w-full placeholder:text-gray-400"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1">

        {/* ── Notification bell ── */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotif((v) => !v); setShowProfile(false); }}
            className="relative p-2 rounded-full hover:bg-[#6750a4]/8 transition-colors group"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-gray-600 group-hover:text-[#6750a4] transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 size-4 rounded-full bg-[#6750a4] text-white text-[9px] font-bold flex items-center justify-center leading-none">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotif && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-[#6750a4]/5 to-transparent">
                <div className="flex items-center gap-2">
                  <Bell size={14} className="text-[#6750a4]" />
                  <p className="text-sm font-bold text-gray-800">Notifications</p>
                  {unreadCount > 0 && (
                    <span className="bg-[#6750a4] text-white text-xs px-1.5 py-0.5 rounded-full leading-none">{unreadCount}</span>
                  )}
                </div>
                <button onClick={markAllRead} className="text-xs text-[#6750a4] hover:underline font-medium">Mark all read</button>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifs.length === 0 && <div className="py-8 text-center text-gray-400 text-sm">All caught up! 🎉</div>}
                {notifs.map((n) => (
                  <div key={n.id} className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 group hover:bg-gray-50/80 transition-colors ${n.unread ? "bg-[#6750a4]/4" : "bg-white"}`}>
                    <NotifIcon type={n.type} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-800 leading-relaxed">{n.text}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {n.unread && <span className="size-2 rounded-full bg-[#6750a4]" />}
                      <button onClick={() => dismiss(n.id)} className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all">
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center py-2.5 border-t border-gray-100">
                <button onClick={() => setShowNotif(false)} className="text-xs text-[#6750a4] hover:underline font-medium">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* ── Profile avatar + dropdown ── */}
        <div className="relative ml-1" ref={profileRef}>
          <button
            onClick={() => { setShowProfile((v) => !v); setShowNotif(false); }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
            aria-label="Profile menu"
          >
            <div className="size-9 rounded-full bg-gradient-to-br from-[#6750a4] to-[#a78bfa] flex items-center justify-center ring-2 ring-[#6750a4]/20 group-hover:ring-[#6750a4]/50 transition-all shrink-0">
              <User size={17} className="text-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-700 leading-tight">Antor Paul</p>
              <p className="text-[10px] text-gray-400 leading-tight">Candidate</p>
            </div>
            <ChevronDown
              size={14}
              className={`text-gray-400 hidden md:block transition-transform duration-200 ${showProfile ? "rotate-180" : ""}`}
            />
          </button>

          {showProfile && (
            <ProfileDropdown onClose={() => setShowProfile(false)} />
          )}
        </div>
      </div>
    </header>
  );
}
