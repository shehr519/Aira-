import { useEffect, useRef } from "react";
import { Outlet, Navigate, useLocation } from "react-router";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { AiraAssistant } from "./AiraAssistant";

export function Layout() {
  const isLoggedIn = sessionStorage.getItem("aira_auth") === "1";
  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }
  return <AppShell />;
}

function AppShell() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  // Fire on EVERY navigation — location.key changes even for same-route clicks
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [location.key]);

  return (
    // h-screen + overflow-hidden constrains the layout so <main> owns its scroll
    <div className="flex h-screen overflow-hidden bg-[#fafafc]">
      <Sidebar />
      {/* Right column must also be height-constrained so flex-1 on <main> works */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar />
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <AiraAssistant />
    </div>
  );
}
