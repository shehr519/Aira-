import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  ClipboardList,
  Video,
  Settings,
  Headphones,
  LogOut,
  BrainCircuit,
} from "lucide-react";

const navItems = [
  { label: "Dashboard",      icon: LayoutDashboard, path: "/" },
  { label: "Jobs",           icon: Briefcase,        path: "/jobs" },
  { label: "Resume",         icon: FileText,         path: "/resume" },
  { label: "Tests",          icon: ClipboardList,    path: "/tests" },
  { label: "Interviews",     icon: Video,            path: "/interviews" },
  { label: "AI Feedback",    icon: BrainCircuit,     path: "/ai-feedback" },
  { label: "Settings",       icon: Settings,         path: "/settings" },
  { label: "Help & Support", icon: Headphones,       path: "/help" },
];

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("aira_auth");
  };

  return (
    <aside className="w-[270px] h-screen sticky top-0 flex flex-col shrink-0 bg-[rgba(131,177,185,0.25)] overflow-hidden">
      {/* ── Logo Header ── */}
      <div className="bg-[#6750a4] h-[100px] flex items-center justify-center gap-3 px-4 shrink-0 relative overflow-hidden">
        {/* AI glow effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b6bc4]/40 to-transparent pointer-events-none" />
        <div className="absolute -bottom-4 -right-4 size-20 rounded-full bg-white/5 blur-xl" />
        <div className="relative flex items-center gap-3">
          <div className="size-8 bg-white/20 rounded-xl flex items-center justify-center ring-2 ring-white/20 shrink-0">
            <svg viewBox="0 0 27 27" fill="none" className="size-5">
              <path d="M3 3h9v9H3zM15 3h9v9h-9zM3 15h9v9H3zM15 15h4v4h-4zM21 15h3v3h-3zM15 21h3v3h-3zM19 21h5v5h-5z" fill="white" />
            </svg>
          </div>
          <div>
            <span className="text-white text-2xl font-bold tracking-wider">AIRA</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="size-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/50 text-[10px] tracking-widest uppercase">AI Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Nav Links — evenly spaced, no scroll ─ */}
      <div className="bg-[#dce8eb] flex-1 px-4 py-3 flex flex-col justify-between overflow-hidden">
        <nav className="flex flex-col gap-0.5">
          {navItems.map(({ label, icon: Icon, path }) => {
            const active = isActive(path);
            return (
              <Link
                key={path}
                to={path}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-[#6750a4]/12 text-[#6750a4] shadow-[inset_0px_2px_4px_rgba(103,80,164,0.12)]"
                    : "text-black hover:bg-[#6750a4]/8 hover:text-[#6750a4]"
                }`}
              >
                {/* Left accent bar */}
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full bg-[#6750a4]" />
                )}
                <Icon
                  size={20}
                  className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    active ? "text-[#6750a4]" : "text-gray-600 group-hover:text-[#6750a4]"
                  }`}
                />
                <span className={`text-sm transition-colors duration-200 ${active ? "font-semibold text-[#6750a4]" : "font-normal text-gray-700"}`}>
                  {label}
                </span>
                {/* AI pulse dot for AI Feedback when active */}
                {active && label === "AI Feedback" && (
                  <span className="ml-auto size-2 rounded-full bg-[#6750a4] animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Logout ── */}
        <div className="pt-2 border-t border-black/10">
          <Link
            to="/auth"
            onClick={handleLogout}
            className="group flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
          >
            <LogOut size={20} className="transition-transform duration-200 group-hover:-translate-x-0.5 shrink-0" />
            <span className="text-sm">Log Out</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}