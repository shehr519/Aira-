import { createBrowserRouter } from "react-router";

// ── Candidate layout ──────────────────────────────────────────────
import { Layout }           from "./components/Layout";
import { DashboardPage }    from "./pages/candidate/DashboardPage";
import { JobsPage }         from "./pages/candidate/JobsPage";
import { JobDetailPage }    from "./pages/candidate/JobDetailPage";
import { ApplyNowPage }     from "./pages/candidate/ApplyNowPage";
import { ResumePage }       from "./pages/candidate/ResumePage";
import { TestsListPage }    from "./pages/candidate/TestsListPage";
import { TestPage }         from "./pages/candidate/TestPage";
import { TestResultPage }   from "./pages/candidate/TestResultPage";
import { AIFeedbackPage }   from "./pages/candidate/AIFeedbackPage";
import { SettingsPage }     from "./pages/candidate/SettingsPage";
import { HelpPage }         from "./pages/candidate/HelpPage";
import { PlaceholderPage }  from "./pages/candidate/PlaceholderPage";

// ── Interviews flow ──────────────────────────────────────────────
import { InterviewsPage }           from "./pages/interviews/InterviewsPage";
import { InterviewDetailPage }      from "./pages/interviews/InterviewDetailPage";
import { JoinInterviewPage }        from "./pages/interviews/JoinInterviewPage";
import { CodingTestInterviewPage }  from "./pages/interviews/CodingTestInterviewPage";
import { TechnicalDiscussionPage }  from "./pages/interviews/TechnicalDiscussionPage";
import { InterviewReportPage }      from "./pages/interviews/InterviewReportPage";
import { PreviousInterviewsPage }   from "./pages/interviews/PreviousInterviewsPage";

// ── Auth flow ─────────────────────────────────────────────────────
import { AuthPage } from "./pages/auth/AuthPage";

// ── Recruiter section ─────────────────────────────────────────────
import { RecruiterLayout }          from "./components/RecruiterLayout";
import { RecruiterDashboard }       from "./pages/recruiter/RecruiterDashboard";
import { JobPostingsPage }          from "./pages/recruiter/JobPostingsPage";
import { PostJobPage }              from "./pages/recruiter/PostJobPage";
import { ApplicantsPage }           from "./pages/recruiter/ApplicantsPage";
import { CandidateProfilePage }     from "./pages/recruiter/CandidateProfilePage";
import { AIScreeningPage }          from "./pages/recruiter/AIScreeningPage";
import { TestsRecruiterPage }       from "./pages/recruiter/TestsRecruiterPage";
import { InterviewsRecruiterPage }  from "./pages/recruiter/InterviewsRecruiterPage";
import { ReportsPage }              from "./pages/recruiter/ReportsPage";
import { RecruiterSettingsPage }    from "./pages/recruiter/RecruiterSettingsPage";
import { RecruiterHelpPage }        from "./pages/recruiter/RecruiterHelpPage";

export const router = createBrowserRouter([
  // ── Auth (no sidebar) ─────────────────────────────────────────
  { path: "/auth",       Component: AuthPage },
  { path: "/auth/login", Component: AuthPage },

  // ── Candidate app ─────────────────────────────────────────────
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: DashboardPage },

      // Jobs
      { path: "jobs",           Component: JobsPage },
      { path: "jobs/:id",       Component: JobDetailPage },
      { path: "jobs/:id/apply", Component: ApplyNowPage },

      // Resume
      { path: "resume", Component: ResumePage },

      // Tests
      { path: "tests",            Component: TestsListPage },
      { path: "tests/:id",        Component: TestPage },
      { path: "tests/:id/result", Component: TestResultPage },

      // Interviews
      { path: "interviews",               Component: InterviewsPage },
      { path: "interviews/previous",      Component: PreviousInterviewsPage },
      { path: "interviews/:id",           Component: InterviewDetailPage },
      { path: "interviews/:id/join",      Component: JoinInterviewPage },
      { path: "interviews/:id/coding",    Component: CodingTestInterviewPage },
      { path: "interviews/:id/technical", Component: TechnicalDiscussionPage },
      { path: "interviews/:id/report",    Component: InterviewReportPage },

      // AI + misc
      { path: "ai-feedback", Component: AIFeedbackPage },
      { path: "settings",    Component: SettingsPage },
      { path: "help",        Component: HelpPage },
      {
        path: "logout",
        element: <PlaceholderPage title="Logged Out" description="You have been logged out successfully." />,
      },
      { path: "*", element: <PlaceholderPage title="404 – Page Not Found" /> },
    ],
  },

  // ── Recruiter app ─────────────────────────────────────────────
  {
    path: "/recruiter",
    Component: RecruiterLayout,
    children: [
      { index: true,            Component: RecruiterDashboard },
      { path: "jobs",           Component: JobPostingsPage },
      { path: "jobs/post",      Component: PostJobPage },
      { path: "jobs/:id",       element: <PlaceholderPage title="Job Detail" description="Job details and applicant management." /> },
      { path: "applicants",     Component: ApplicantsPage },
      { path: "applicants/:id", Component: CandidateProfilePage },
      { path: "ai-screening",   Component: AIScreeningPage },
      { path: "tests",          Component: TestsRecruiterPage },
      { path: "tests/:id",      element: <PlaceholderPage title="Test Detail" description="Test results and candidate submissions." /> },
      { path: "interviews",     Component: InterviewsRecruiterPage },
      { path: "interviews/:id", element: <PlaceholderPage title="Interview Detail" description="Interview session details and report." /> },
      { path: "reports",        Component: ReportsPage },
      { path: "settings",       Component: RecruiterSettingsPage },
      { path: "help",           Component: RecruiterHelpPage },
      { path: "*",              element: <PlaceholderPage title="404 – Page Not Found" /> },
    ],
  },
]);