import { useState } from "react";
import {
  User, Building2, Bell, Shield, Camera, Check,
  Mail, Phone, Globe, Lock, Eye, EyeOff, Save,
} from "lucide-react";
import Chatbot from "../../../assets/Pchatbot.png";

type Tab = "profile" | "company" | "notifications" | "security";

// Tabs without icons (to match the first image's style)
const TABS: { id: Tab; label: string }[] = [
  { id: "profile",       label: "Profile" },
  { id: "company",       label: "Company" },
  { id: "notifications", label: "Notifications" },
  { id: "security",      label: "Security" },
];

// (all helper components: Field, Input, Toggle – unchanged)
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}
function Input({ value, onChange, placeholder, type = "text", right }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string; right?: React.ReactNode;
}) {
  return (
    <div className="relative flex items-center">
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#6750a4]/60 focus:bg-white transition-all placeholder:text-gray-400 pr-10" />
      {right && <div className="absolute right-3">{right}</div>}
    </div>
  );
}
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${checked ? "bg-[#6750a4]" : "bg-gray-200"}`}>
      <span className={`inline-block size-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

export function RecruiterSettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");
  const [saved, setSaved] = useState(false);

  // Profile state
  const [name,     setName]     = useState("Sarah Ahmed");
  const [title,    setTitle]    = useState("HR Manager");
  const [email,    setEmail]    = useState("sarah.ahmed@techhive.com");
  const [phone,    setPhone]    = useState("+92 321 9876543");
  const [bio,      setBio]      = useState("Experienced HR professional with 6+ years in tech recruitment.");

  // Company state
  const [company,  setCompany]  = useState("TechHive Solutions");
  const [website,  setWebsite]  = useState("https://techhive.com");
  const [industry, setIndustry] = useState("Information Technology");
  const [size,     setSize]     = useState("100-500 employees");

  // Notifications
  const [notifs, setNotifs] = useState({
    newApplication: true, aiScreeningDone: true, interviewReminder: true,
    testCompleted: true, weeklyReport: false, systemUpdates: false,
  });

  // Security
  const [showCur, setShowCur]   = useState(false);
  const [curPw,   setCurPw]     = useState("");
  const [newPw,   setNewPw]     = useState("");
  const [confPw,  setConfPw]    = useState("");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-8 bg-[#fafafc] min-h-full space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-xl bg-[#6750a4]/10 flex items-center justify-center">
          <Shield size={16} className="text-[#6750a4]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-black">Settings</h1>
          <p className="text-sm text-gray-500">Manage your recruiter profile and preferences</p>
        </div>
      </div>

      {/* Profile card (same as before, but now above the tabs) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-row items-center justify-between gap-3">
        <div className="flex flex-row items-center gap-3">
          <div className="relative shrink-0">
            <div className="size-16 rounded-2xl bg-gradient-to-br from-[#6750a4] to-[#a78bfa] flex items-center justify-center ring-4 ring-[#6750a4]/10">
              <span className="text-2xl font-bold text-white">SA</span>
            </div>
            <button className="absolute -bottom-1 -right-1 size-7 rounded-full bg-[#6750a4] text-white flex items-center justify-center hover:bg-[#5a4490] transition-colors shadow-md">
              <Camera size={12} />
            </button>
          </div>
          <div>
            <p className="font-bold text-black leading-tight">Sarah Ahmed</p>
            <p className="text-xs text-gray-500 leading-tight">HR Manager</p>
            <p className="text-xs text-gray-400 leading-tight">Health Solutions</p>
          </div>
        </div>
        <div className="shrink-0">
          <img src={Chatbot} alt="Profile illustration" className="h-[100px] w-auto" />
        </div>
      </div>

      {/* Horizontal segmented tabs (exactly as in the first image) */}
      <div className="flex border border-[rgba(76,76,76,0.25)] rounded-md overflow-hidden shadow-sm w-fit">
        {TABS.map((t, i) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-6 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#6750a4] text-white shadow-[inset_0px_3px_3px_rgba(0,0,0,0.2)]"
                  : "bg-white/5 text-[#4c4c4c] hover:bg-gray-100"
              } ${i !== 0 ? "border-l border-[#e6e6e6]" : ""}`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Main form (unchanged, just wrapped in a card) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-[#6750a4]/5 to-transparent flex items-center gap-3">
          <div className="size-8 rounded-xl bg-[#6750a4]/10 flex items-center justify-center">
            {/* Show an icon based on active tab – optional, but keeps original feel */}
            {tab === "profile" && <User size={15} className="text-[#6750a4]" />}
            {tab === "company" && <Building2 size={15} className="text-[#6750a4]" />}
            {tab === "notifications" && <Bell size={15} className="text-[#6750a4]" />}
            {tab === "security" && <Shield size={15} className="text-[#6750a4]" />}
          </div>
          <div>
            <p className="font-bold text-black">{TABS.find(t => t.id === tab)?.label} Settings</p>
            <p className="text-xs text-gray-400">Manage your {tab} preferences</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Profile */}
          {tab === "profile" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Full Name"><Input value={name} onChange={setName} placeholder="Sarah Ahmed" /></Field>
                <Field label="Job Title"><Input value={title} onChange={setTitle} placeholder="HR Manager" /></Field>
              </div>
              <Field label="Email Address">
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={email} onChange={(e)=>setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm text-gray-700 outline-none focus:border-[#6750a4]/60 focus:bg-white transition-all" />
                </div>
              </Field>
              <Field label="Phone Number">
                <div className="relative">
                  <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={phone} onChange={(e)=>setPhone(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm text-gray-700 outline-none focus:border-[#6750a4]/60 focus:bg-white transition-all" />
                </div>
              </Field>
              <Field label="Bio">
                <textarea value={bio} onChange={(e)=>setBio(e.target.value)} rows={3}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#6750a4]/60 focus:bg-white resize-none transition-all" />
              </Field>
            </>
          )}

          {/* Company */}
          {tab === "company" && (
            <>
              <Field label="Company Name"><Input value={company} onChange={setCompany} /></Field>
              <Field label="Industry"><Input value={industry} onChange={setIndustry} /></Field>
              <Field label="Company Size">
                <select value={size} onChange={(e)=>setSize(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#6750a4]/60 transition-all">
                  {["1-10 employees","10-50 employees","50-100 employees","100-500 employees","500+ employees"].map(o=><option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Website">
                <div className="relative">
                  <Globe size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={website} onChange={(e)=>setWebsite(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm text-gray-700 outline-none focus:border-[#6750a4]/60 focus:bg-white transition-all" />
                </div>
              </Field>
            </>
          )}

          {/* Notifications */}
          {tab === "notifications" && (
            <div className="space-y-4">
              {[
                { key: "newApplication",    label: "New Application Received",    sub: "Get notified when a candidate applies" },
                { key: "aiScreeningDone",   label: "AI Screening Complete",        sub: "When AI finishes screening a job batch" },
                { key: "interviewReminder", label: "Interview Reminders",          sub: "15 min before scheduled interviews" },
                { key: "testCompleted",     label: "Test Completed by Candidate",  sub: "When a candidate submits a test" },
                { key: "weeklyReport",      label: "Weekly Analytics Report",      sub: "Summary of recruitment activity" },
                { key: "systemUpdates",     label: "System & Feature Updates",     sub: "AIRA platform announcements" },
              ].map(({ key, label, sub }) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-black">{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                  </div>
                  <Toggle checked={notifs[key as keyof typeof notifs]} onChange={() => setNotifs(p=>({...p,[key]:!p[key as keyof typeof notifs]}))} />
                </div>
              ))}
            </div>
          )}

          {/* Security */}
          {tab === "security" && (
            <div className="space-y-4">
              <Field label="Current Password">
                <Input type={showCur ? "text" : "password"} value={curPw} onChange={setCurPw} placeholder="••••••••"
                  right={<button type="button" onClick={()=>setShowCur(v=>!v)} className="text-gray-400 hover:text-gray-600 transition-colors">{showCur ? <EyeOff size={14}/> : <Eye size={14}/>}</button>} />
              </Field>
              <Field label="New Password"><Input type="password" value={newPw} onChange={setNewPw} placeholder="••••••••" /></Field>
              <Field label="Confirm Password"><Input type="password" value={confPw} onChange={setConfPw} placeholder="••••••••" /></Field>
              {newPw && confPw && newPw !== confPw && <p className="text-xs text-red-500">Passwords do not match</p>}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <Lock size={15} className="text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-amber-800">Two-Factor Authentication</p>
                  <p className="text-xs text-amber-600 mt-0.5">Add an extra layer of security to your account.</p>
                  <button className="mt-2 text-xs text-amber-700 font-semibold underline">Enable 2FA</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save button (unchanged) */}
        <div className="px-6 pb-6 flex justify-end">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              saved ? "bg-green-500 text-white" : "bg-[#6750a4] text-white hover:bg-[#5a4490] hover:shadow-lg hover:-translate-y-0.5"
            }`}
          >
            {saved ? <><Check size={15} />Saved!</> : <><Save size={15} />Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
}