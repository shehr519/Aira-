import { useState } from "react";
import { Search } from "lucide-react";
import { JobCard, type Job } from "../../components/JobCard";
import imgGptRobot from "../../../assets/aira.png";

const ALL_JOBS: Job[] = [
  { id: 1, title: "Frontend Developer (React.js)", company: "Btab Group", location: "Pakistan(Remote)", experience: "1-3 Years", postedAgo: "2 days ago", matchPercent: 87, logoIndex: 0 },
  { id: 2, title: "Frontend Developer (React.js)", company: "Btab Group", location: "Pakistan(Remote)", experience: "1-3 Years", postedAgo: "2 days ago", matchPercent: 87, logoIndex: 1 },
  { id: 3, title: "Frontend Developer (React.js)", company: "Btab Group", location: "Pakistan(Remote)", experience: "1-3 Years", postedAgo: "2 days ago", matchPercent: 87, logoIndex: 2 },
  { id: 4, title: "Frontend Developer (React.js)", company: "Btab Group", location: "Pakistan(Remote)", experience: "1-3 Years", postedAgo: "2 days ago", matchPercent: 87, logoIndex: 3 },
  { id: 5, title: "Frontend Developer (React.js)", company: "Btab Group", location: "Pakistan(Remote)", experience: "1-3 Years", postedAgo: "2 days ago", matchPercent: 87, logoIndex: 1 },
  { id: 6, title: "Frontend Developer (React.js)", company: "Btab Group", location: "Pakistan(Remote)", experience: "1-3 Years", postedAgo: "2 days ago", matchPercent: 87, logoIndex: 2 },
];

export function JobsPage() {
  const [query, setQuery] = useState("");

  const filtered = ALL_JOBS.filter(
    (job) =>
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase())
  );

  const isEmpty = filtered.length === 0;

  return (
    <div className="p-8 bg-[#fafafc] min-h-full">
      {/* Inline search bar for this page */}
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 w-[320px] mb-7 shadow-sm">
        <Search size={15} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search job titles, companies, or skills..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder:text-gray-400"
        />
      </div>

      {isEmpty ? (
        /* ── Empty State ── */
        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-bold italic text-black mb-2">No Jobs Found!</h1>
          <p className="text-base text-black mb-12">
            We couldn't find any jobs matching your filters. Try adjusting your search or check back later
          </p>
          <div className="flex flex-col items-center w-full">
            <img
              src={imgGptRobot}
              alt="No jobs robot"
              className="w-[160px] object-contain mb-8"
            />
            <button
              onClick={() => setQuery("")}
              className="bg-[#6750a4] text-white text-sm px-7 py-2.5 rounded-full hover:bg-[#5a4490] transition-colors"
            >
              Reset Filter
            </button>
          </div>
        </div>
      ) : (
        /* ── Job Listings ── */
        <>
          <h1 className="text-3xl text-black mb-7">
            <span className="font-bold text-[#6750a4]">Hi Ali,</span>{" "}
            AIRA has found job matches for you!
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
