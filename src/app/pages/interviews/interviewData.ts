// ── Shared Interview Data ────────────────────────────────────────
// NOTE: No JSX here — logos live in InterviewLogos.tsx

export { LOGO_COMPONENTS } from "./InterviewLogos";

export type InterviewType = "video" | "coding" | "technical" | "hr";
export type ConductedBy = "company" | "ai";
export type InterviewStatus = "upcoming" | "live" | "completed" | "awaiting" | "cancelled";
export type InterviewResult = "passed" | "failed" | "pending";

export interface Interview {
  id: number;
  company: string;
  role: string;
  type: InterviewType;
  conductedBy: ConductedBy;
  date: string;
  dateISO: string;
  time: string;
  dayLabel: string;
  duration: number;
  status: InterviewStatus;
  score?: number;
  result?: InterviewResult;
  logoIndex: number;
  description: string;
  instructions?: string[];
  notes?: string;
  round?: string;
}

export const INTERVIEWS: Interview[] = [
  // ── Upcoming ──────────────────────────────────────────────────
  {
    id: 1,
    company: "Z Solutions",
    role: "Frontend Developer",
    type: "video",
    conductedBy: "ai",
    date: "Tomorrow",
    dateISO: "2026-04-11",
    time: "3:00 PM",
    dayLabel: "Saturday",
    duration: 60,
    status: "upcoming",
    logoIndex: 0,
    round: "Next Interview",
    description: "Video Interview with Z solutions — AI-conducted initial screening round.",
    instructions: [
      "Ensure your camera and microphone are working before joining.",
      "Find a quiet, well-lit environment for the interview.",
      "The AI interviewer will ask you a series of questions about your experience.",
      "You can ask for clarification if a question is unclear.",
      "Dress professionally as you would for an in-person interview.",
    ],
  },
  {
    id: 2,
    company: "Pixelora Studios",
    role: "UI/UX Developer",
    type: "coding",
    conductedBy: "company",
    date: "15 Dec 2025",
    dateISO: "2026-04-15",
    time: "11:00 AM",
    dayLabel: "Thursday",
    duration: 90,
    status: "upcoming",
    logoIndex: 1,
    round: "Coding Interview",
    description: "Complete the coding task of Pixelora Studios — a frontend coding assignment.",
    instructions: [
      "Read the problem statement carefully before starting.",
      "You may use any resources except AI code assistants.",
      "Write clean, well-commented code.",
      "Test your solution against all visible test cases before submitting.",
      "You have 90 minutes to complete the task.",
    ],
    notes: "Deadline: Tomorrow",
  },
  {
    id: 3,
    company: "DataCore",
    role: "Software Engineer",
    type: "technical",
    conductedBy: "company",
    date: "18 Apr 2026",
    dateISO: "2026-04-18",
    time: "10:00 AM",
    dayLabel: "Saturday",
    duration: 45,
    status: "upcoming",
    logoIndex: 2,
    round: "Technical Round",
    description: "Technical discussion with senior engineer from DataCore.",
    instructions: [
      "Prepare to discuss your past projects in detail.",
      "Expect questions on system design, scalability, and architecture.",
      "Be ready to whiteboard solutions verbally.",
      "Review common data structures and algorithms beforehand.",
    ],
  },
  {
    id: 4,
    company: "TechHive Solutions",
    role: "Full Stack Developer",
    type: "hr",
    conductedBy: "company",
    date: "12 Jan 2026",
    dateISO: "2026-01-12",
    time: "11:00 AM",
    dayLabel: "Thursday",
    duration: 30,
    status: "awaiting",
    logoIndex: 0,
    round: "HR Interview",
    description: "HR interview with TechHive Solutions — offer discussion and culture fit.",
    instructions: [
      "Prepare questions about the company's culture and growth opportunities.",
      "Be ready to discuss your salary expectations.",
      "Review the company's values and recent news.",
    ],
  },

  // ── Previous / Completed ──────────────────────────────────────
  {
    id: 5,
    company: "Z Solutions",
    role: "Frontend Developer",
    type: "video",
    conductedBy: "ai",
    date: "5 Jan 2026",
    dateISO: "2026-01-05",
    time: "2:00 PM",
    dayLabel: "Monday",
    duration: 45,
    status: "completed",
    score: 82,
    result: "passed",
    logoIndex: 0,
    round: "Initial Screening",
    description: "Video Interview with Z solutions — AI-conducted screening round.",
    notes: "Completed — Score: 82%",
  },
  {
    id: 6,
    company: "Pixelora Studios",
    role: "UI/UX Developer",
    type: "coding",
    conductedBy: "company",
    date: "15 Dec 2025",
    dateISO: "2025-12-15",
    time: "11:00 AM",
    dayLabel: "Thursday",
    duration: 90,
    status: "completed",
    score: 74,
    result: "passed",
    logoIndex: 1,
    round: "Coding Interview",
    description: "Completed coding assignment reviewed by the team.",
    notes: "Completed — Score: 74%",
  },
  {
    id: 7,
    company: "DataCore",
    role: "Software Engineer",
    type: "technical",
    conductedBy: "company",
    date: "5 Jan 2026",
    dateISO: "2026-01-05",
    time: "3:00 PM",
    dayLabel: "Monday",
    duration: 60,
    status: "completed",
    result: "passed",
    logoIndex: 2,
    round: "Technical Round",
    description: "Technical discussion with senior engineer.",
    notes: "Completed — Status: Passed",
  },
];

export const TYPE_LABELS: Record<InterviewType, string> = {
  video: "Video Interview",
  coding: "Coding Interview",
  technical: "Technical Interview",
  hr: "HR Interview",
};

export const STATUS_COLORS: Record<InterviewStatus, { bg: string; text: string; border: string }> = {
  upcoming: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  live: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  completed: { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" },
  awaiting: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  cancelled: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
};

export function getInterview(id: number): Interview | undefined {
  return INTERVIEWS.find((i) => i.id === id);
}

export function getUpcoming(): Interview[] {
  return INTERVIEWS.filter((i) => i.status === "upcoming" || i.status === "live" || i.status === "awaiting");
}

export function getPrevious(): Interview[] {
  return INTERVIEWS.filter((i) => i.status === "completed" || i.status === "cancelled");
}
