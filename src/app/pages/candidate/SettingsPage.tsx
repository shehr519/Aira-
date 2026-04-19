import { useState } from "react";
import { Upload, Trash2, Sun } from "lucide-react";
import imgProfilePic from "../../../assets/profile.png";

// ---------- Shared Components ----------

interface FormFieldProps {
  label: string;
  placeholder: string;
  type?: string;
}

function FormField({ label, placeholder, type = "text" }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold text-black">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="h-[41px] bg-white border border-black/10 rounded px-4 py-2 text-base text-black/45 outline-none focus:border-[#6750a4] focus:ring-1 focus:ring-[#6750a4] transition-all placeholder:text-black/45"
      />
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex items-center gap-4 mt-6">
      <button className="bg-[#6750a4] text-white text-sm px-6 py-2.5 rounded-full hover:bg-[#5a4490] transition-colors">
        Save changes
      </button>
      <button className="bg-white text-[#6750a4] text-sm px-5 py-2.5 rounded-full border border-[#6750a4] hover:bg-purple-50 transition-colors">
        Cancel
      </button>
    </div>
  );
}

// ---------- Tab: Profile ----------
function ProfileTab() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-black">Profile</h2>
        <p className="text-base text-black mt-1">Update your photo and personal details here</p>
        <div className="border-b border-[#CAC4D0] mt-4 shadow-sm" />
      </div>

      {/* Profile Picture */}
      <div className="flex items-center gap-5">
        <img
          src={imgProfilePic}
          alt="Profile"
          className="w-[122px] h-[125px] rounded-3xl object-cover shrink-0"
        />
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold text-black">Profile Picture</h3>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#6750a4] text-white text-sm px-5 py-2.5 rounded-full hover:bg-[#5a4490] transition-colors">
              <Upload size={18} />
              Upload
            </button>
            <button className="flex items-center justify-center bg-white border border-[#6750a4] text-[#6750a4] p-2.5 rounded-full hover:bg-purple-50 transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
          <p className="text-sm text-[#808080]">Supported Format JPG, PNG under 10 mb</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-4 max-w-2xl">
        <FormField label="Full Name" placeholder="Ali Ahmed" />
        <FormField label="Email" placeholder="Ali@gmail.com" type="email" />
        <FormField label="Phone Number" placeholder="0300-1234567" />
        <FormField label="Location" placeholder="Lahore, Pakistan" />
      </div>

      <ActionButtons />
    </div>
  );
}

// ---------- Tab: Experience ----------
function ExperienceTab() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-black">Education & Experience</h2>
        <p className="text-base text-black mt-1">Add your academic background and relevant experience.</p>
        <div className="border-b border-[#CAC4D0] mt-4 shadow-sm" />
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-2xl">
        <FormField label="Highest Qualification" placeholder="BS Computer Science" />
        <FormField label="University Name" placeholder="GC University" />
        <FormField label="Graduation Year" placeholder="2023" />
        <FormField label="Experience Level" placeholder="1 Year" />
        <FormField label="Past Role (optional)" placeholder="Frontend Intern at NexTech" />
        <FormField label="Current Role" placeholder="Frontend Intern at TechHive Solutions" />
      </div>

      <ActionButtons />
    </div>
  );
}

// ---------- Tab: Job History ----------
type Status = "Pending" | "Shortlisted" | "Rejected" | "Hired";

const statusStyles: Record<Status, string> = {
  Pending: "bg-blue-100 text-blue-700",
  Shortlisted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Hired: "bg-yellow-100 text-yellow-800",
};

const jobHistory = [
  { title: "Frontend Developer", company: "TechHive Solutions", companyColor: "#4CAF50", date: "12 Jan 2025", status: "Pending" as Status },
  { title: "UI/UX Designer", company: "Pixelora Studios", companyColor: "#2196F3", date: "8 Jan 2025", status: "Shortlisted" as Status },
  { title: "Data Analyst", company: "DataCore", companyColor: "#FF5722", date: "5 Jan 2025", status: "Rejected" as Status },
  { title: "Frontend Developer", company: "TechHive Solutions", companyColor: "#4CAF50", date: "12 Jan 2025", status: "Hired" as Status },
];

function JobHistoryTab() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-black">Job History</h2>
        <p className="text-base text-black mt-1">View all the jobs you have applied for and check their current status.</p>
        <div className="border-b border-[#CAC4D0] mt-4 shadow-sm" />
      </div>

      {/* Filters */}
      <div className="flex items-center justify-end gap-3">
        <button className="flex items-center gap-2 border border-gray-300 bg-white text-sm text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
          <svg viewBox="0 0 16 16" fill="none" className="size-4"><path d="M1 3h14M4 8h8M7 13h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Filter
        </button>
        <select className="border border-gray-300 bg-white text-sm text-gray-700 px-4 py-2 rounded outline-none cursor-pointer">
          <option>All interviews</option>
          <option>Pending</option>
          <option>Shortlisted</option>
          <option>Rejected</option>
          <option>Hired</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <div className="grid grid-cols-4 bg-[#e8e4f0] text-sm font-bold text-black">
          <div className="px-4 py-3">Job Title</div>
          <div className="px-4 py-3">Company</div>
          <div className="px-4 py-3">Date Applied</div>
          <div className="px-4 py-3">Status</div>
        </div>
        {jobHistory.map((job, i) => (
          <div key={i} className="grid grid-cols-4 border-t border-gray-100 bg-white text-sm hover:bg-gray-50 transition-colors">
            <div className="px-4 py-3 text-gray-700">{job.title}</div>
            <div className="px-4 py-3 flex items-center gap-2">
              <div
                className="size-5 rounded-full shrink-0"
                style={{ backgroundColor: job.companyColor }}
              />
              <span className="text-gray-700">{job.company}</span>
            </div>
            <div className="px-4 py-3 text-gray-700">{job.date}</div>
            <div className="px-4 py-3">
              <span className={`px-3 py-1 rounded text-xs font-medium ${statusStyles[job.status]}`}>
                {job.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Tab: Account ----------
function AccountTab() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-black">Account</h2>
        <p className="text-base text-black mt-1">
          Manage your security preferences and control how your account interacts with the platform.
        </p>
        <div className="border-b border-[#CAC4D0] mt-4 shadow-sm" />
      </div>

      <div className="flex flex-col gap-4 max-w-sm">
        <FormField label="Email" placeholder="Your email" type="email" />
        <FormField label="Password" placeholder="Enter your password" type="password" />
        <FormField label="Confirm Password" placeholder="Confirm password" type="password" />
      </div>

      {/* Light/Dark Mode Toggle */}
      <div className="flex items-center justify-between bg-[#f9f9f9] rounded-2xl shadow-md px-6 py-4 max-w-2xl mt-4">
        <div className="flex items-center gap-3">
          <Sun size={22} className="text-[#9c1010]" />
          <span className="text-base font-medium text-[#9c1010]">Light/Dark Mode</span>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative w-14 h-7 rounded-full border border-black/75 transition-colors duration-300 ${
            darkMode ? "bg-[#9c1010]" : "bg-gray-200"
          }`}
        >
          <span
            className={`absolute top-0.5 size-6 rounded-full bg-white border border-black/30 transition-transform duration-300 ${
              darkMode ? "translate-x-7" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

// ---------- Settings Tabs ----------
const TABS = ["Profile", "Experience", "Job History", "Account"] as const;
type Tab = typeof TABS[number];

// ---------- Main Settings Page ----------
export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Profile");

  return (
    <div className="p-8 bg-[#fafafc] min-h-full">
      <h1 className="text-4xl font-bold text-black mb-1">Settings</h1>
      <p className="text-base text-black mb-6">
        Manage your account information, update your details, and track your application history.
      </p>

      {/* Segmented Control */}
      <div className="flex border border-[rgba(76,76,76,0.25)] rounded-md overflow-hidden shadow-sm w-fit mb-8">
        {TABS.map((tab, i) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-sm font-medium transition-colors relative ${
                active
                  ? "bg-[#6750a4] text-white shadow-[inset_0px_3px_3px_rgba(0,0,0,0.2)]"
                  : "bg-white/5 text-[#4c4c4c] hover:bg-gray-100"
              } ${i !== 0 ? "border-l border-[#e6e6e6]" : ""}`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "Profile" && <ProfileTab />}
      {activeTab === "Experience" && <ExperienceTab />}
      {activeTab === "Job History" && <JobHistoryTab />}
      {activeTab === "Account" && <AccountTab />}
    </div>
  );
}
