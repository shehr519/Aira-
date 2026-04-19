import { useNavigate } from "react-router";

// Company logo variants matching the Figma designs
function GreenQuadLogo() {
  return (
    <div className="size-[72px] shrink-0 rounded-xl overflow-hidden">
      <svg viewBox="0 0 93 94" fill="none" className="size-full">
        <path d="M4 4 L45 4 L45 45 L4 45 Z" fill="#17CF97" rx="8"/>
        <path d="M48 4 L89 4 L89 45 L48 45 Z" fill="#17CF97" rx="8"/>
        <path d="M4 49 L45 49 L45 90 L4 90 Z" fill="#17CF97" rx="8"/>
        <path d="M48 49 L89 49 L89 90 L48 90 Z" fill="#17CF97" rx="8"/>
      </svg>
    </div>
  );
}

function OrangeLogo() {
  return (
    <div className="size-[72px] shrink-0 rounded-xl overflow-hidden">
      <svg viewBox="0 0 93 93" fill="none" className="size-full">
        <circle cx="46.5" cy="46.5" r="44" stroke="#FF630B" strokeWidth="10" fill="none"/>
        <path d="M20 20 Q46.5 46.5 73 20" stroke="#FF630B" strokeWidth="10" fill="none"/>
        <path d="M20 73 Q46.5 46.5 73 73" stroke="#FF630B" strokeWidth="10" fill="none"/>
      </svg>
    </div>
  );
}

function BlueLogo() {
  return (
    <div className="size-[72px] shrink-0 rounded-xl overflow-hidden">
      <svg viewBox="0 0 93 93" fill="none" className="size-full">
        <circle cx="46.5" cy="46.5" r="44" fill="#007DFC" opacity="0.15"/>
        <circle cx="46.5" cy="46.5" r="26" fill="#007DFC"/>
        <circle cx="46.5" cy="46.5" r="13" fill="white"/>
        <path d="M4 46.5 Q25 20 46.5 46.5 Q68 73 89 46.5" stroke="#007DFC" strokeWidth="6" fill="none"/>
      </svg>
    </div>
  );
}

function GreenAltLogo() {
  return (
    <div className="size-[72px] shrink-0 rounded-xl overflow-hidden">
      <svg viewBox="0 0 93 93" fill="none" className="size-full">
        <rect x="4" y="4" width="85" height="85" rx="12" fill="#17CF97" opacity="0.15"/>
        <rect x="10" y="10" width="35" height="35" rx="8" fill="#17CF97"/>
        <rect x="48" y="10" width="35" height="35" rx="8" fill="#17CF97" opacity="0.6"/>
        <rect x="10" y="48" width="35" height="35" rx="8" fill="#17CF97" opacity="0.6"/>
        <rect x="48" y="48" width="35" height="35" rx="8" fill="#17CF97"/>
      </svg>
    </div>
  );
}

const LOGOS = [GreenQuadLogo, OrangeLogo, BlueLogo, GreenAltLogo, OrangeLogo, BlueLogo];

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  experience: string;
  postedAgo: string;
  matchPercent: number;
  logoIndex: number;
}

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const navigate = useNavigate();
  const LogoComponent = LOGOS[job.logoIndex % LOGOS.length];

  return (
    <div
      className="group relative bg-white rounded-3xl p-6 flex gap-6 items-start overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#6750a4]/10 hover:-translate-y-1 hover:border-[#6750a4]/20 border border-transparent"
      style={{ boxShadow: "0px 4px 4px rgba(0,0,0,0.08), inset 0px 1px 2px rgba(0,0,0,0.04)" }}
      onClick={() => navigate(`/jobs/${job.id}`)}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#6750a4]/0 to-[#6750a4]/0 group-hover:from-[#6750a4]/3 group-hover:to-[#a78bfa]/3 transition-all duration-300 pointer-events-none" />

      <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
        <LogoComponent />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="text-xl font-bold text-black mb-1 truncate group-hover:text-[#6750a4] transition-colors duration-200">{job.title}</h3>
        <div className="flex flex-col gap-0.5 text-base text-black mb-2">
          <span className="font-medium">{job.company}</span>
          <span>{job.location}</span>
          <span>Experience: {job.experience}</span>
        </div>
        <p className="text-sm text-black mb-2">{job.postedAgo}</p>
        <p className="text-sm italic text-[#6750a4] mb-4">
          This role matches {job.matchPercent}% of your skills and experience!
        </p>
        <div>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/jobs/${job.id}`); }}
            className="bg-[#6750a4] text-white text-sm px-5 py-2 rounded-full hover:bg-[#5a4490] hover:shadow-md hover:shadow-[#6750a4]/30 transition-all duration-200 group-hover:px-7"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}