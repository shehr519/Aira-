import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare,
  Users, Maximize2, Settings, ChevronLeft, Send, Cpu, Clock, Wifi
} from "lucide-react";
import { getInterview, LOGO_COMPONENTS } from "./interviewData";

// ── Chat message type ─────────────────────────────────────────────
interface ChatMsg {
  id: number;
  sender: string;
  text: string;
  time: string;
  mine: boolean;
}

const INITIAL_MSGS: ChatMsg[] = [
  { id: 1, sender: "AI Interviewer", text: "Hello! Welcome to your interview session. I hope you're feeling confident today.", time: "3:00 PM", mine: false },
  { id: 2, sender: "AI Interviewer", text: "Please make sure your camera and microphone are working correctly before we begin.", time: "3:01 PM", mine: false },
];

// ── AI questions flow ─────────────────────────────────────────────
const AI_QUESTIONS = [
  "Tell me about yourself and your experience as a frontend developer.",
  "Can you describe a challenging project you've worked on and how you overcame the obstacles?",
  "How do you approach optimising a slow React application?",
  "What's your experience with state management libraries like Redux or Zustand?",
  "Where do you see yourself in 3 to 5 years?",
];

// ── Video tile ────────────────────────────────────────────────────
function VideoTile({ label, muted, large, isAI, cameraOn }: {
  label: string; muted?: boolean; large?: boolean; isAI?: boolean; cameraOn?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden flex items-center justify-center ${
        large ? "flex-1 min-h-[300px]" : "w-44 h-32"
      } ${isAI ? "bg-gradient-to-br from-[#4a3880] to-[#6750a4]" : "bg-gray-800"}`}
    >
      {isAI ? (
        <div className="flex flex-col items-center gap-3">
          <div className="size-16 rounded-full bg-white/20 flex items-center justify-center">
            <Cpu size={32} className="text-white" />
          </div>
          <p className="text-white text-sm font-semibold">AI Interviewer</p>
        </div>
      ) : cameraOn ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
          <div className="size-16 rounded-full bg-[#6750a4] flex items-center justify-center">
            <span className="text-white text-2xl font-bold">AP</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="size-12 rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-white text-lg font-bold">AP</span>
          </div>
          <p className="text-gray-400 text-xs">Camera Off</p>
        </div>
      )}

      {/* Label */}
      <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1.5">
        {muted && <MicOff size={10} className="text-red-400" />}
        {label}
      </div>

      {/* Speaking indicator */}
      {isAI && (
        <div className="absolute top-2 right-2 flex gap-0.5 items-end h-4">
          {[3, 5, 4, 6, 3].map((h, i) => (
            <div
              key={i}
              className="w-1 bg-green-400 rounded-full animate-pulse"
              style={{ height: h * 2, animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Timer ─────────────────────────────────────────────────────────
function ElapsedTimer({ started }: { started: boolean }) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    if (!started) return;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [started]);
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return <span className="text-white font-mono text-sm">{m}:{s}</span>;
}

// ── Main page ─────────────────────────────────────────────────────
export function JoinInterviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const interview = getInterview(Number(id));

  const [phase, setPhase] = useState<"lobby" | "live" | "ended">("lobby");
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>(INITIAL_MSGS);
  const [draft, setDraft] = useState("");
  const [qIndex, setQIndex] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  // Simulate AI asking next question
  useEffect(() => {
    if (phase !== "live") return;
    if (qIndex >= AI_QUESTIONS.length) return;
    const t = setTimeout(() => {
      setMsgs((prev) => [...prev, {
        id: Date.now(), sender: "AI Interviewer",
        text: AI_QUESTIONS[qIndex],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        mine: false,
      }]);
    }, qIndex === 0 ? 2000 : 0);
    return () => clearTimeout(t);
  }, [phase, qIndex]);

  const sendMsg = () => {
    if (!draft.trim()) return;
    setMsgs((prev) => [...prev, {
      id: Date.now(), sender: "You", text: draft,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      mine: true,
    }]);
    setDraft("");
    // Advance to next question after reply
    setTimeout(() => {
      setQIndex((q) => q + 1);
    }, 1500);
  };

  const Logo = LOGO_COMPONENTS[(interview?.logoIndex ?? 0) % LOGO_COMPONENTS.length];

  // ── Lobby ──────────────────────────────────────────────────────
  if (phase === "lobby") {
    return (
      <div className="bg-gray-900 min-h-full flex items-center justify-center p-8">
        <div className="max-w-[480px] w-full">
          <button
            onClick={() => navigate(`/interviews/${id}`)}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors"
          >
            <ChevronLeft size={16} /> Back
          </button>

          <div className="bg-gray-800 rounded-3xl p-8 text-center">
            {/* Company + interview info */}
            <div className="size-16 rounded-2xl bg-white mx-auto mb-4 flex items-center justify-center p-2">
              <Logo />
            </div>
            <h1 className="text-xl font-bold text-white mb-1">{interview?.round ?? "Video Interview"}</h1>
            <p className="text-sm text-gray-400 mb-6">{interview?.company} · {interview?.date} at {interview?.time}</p>

            {/* Camera preview */}
            <div className="bg-gray-700 rounded-2xl h-48 flex items-center justify-center mb-5 relative overflow-hidden">
              {camOn ? (
                <div className="size-20 rounded-full bg-[#6750a4] flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">AP</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <VideoOff size={28} className="text-gray-500" />
                  <p className="text-gray-500 text-sm">Camera is off</p>
                </div>
              )}
              <div className="absolute bottom-3 text-gray-400 text-xs">Your preview</div>
            </div>

            {/* Device toggles */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-colors ${micOn ? "bg-gray-700 text-white" : "bg-red-500/20 text-red-400"}`}
              >
                {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                <span className="text-xs">{micOn ? "Mic On" : "Mic Off"}</span>
              </button>
              <button
                onClick={() => setCamOn(!camOn)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-colors ${camOn ? "bg-gray-700 text-white" : "bg-red-500/20 text-red-400"}`}
              >
                {camOn ? <Video size={20} /> : <VideoOff size={20} />}
                <span className="text-xs">{camOn ? "Cam On" : "Cam Off"}</span>
              </button>
              <button className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-700 text-white">
                <Settings size={20} />
                <span className="text-xs">Settings</span>
              </button>
            </div>

            {/* Connection check */}
            <div className="flex items-center justify-center gap-2 bg-green-900/30 border border-green-700/30 text-green-400 text-xs px-4 py-2 rounded-full mb-6">
              <Wifi size={13} /> Connection good · Ready to join
            </div>

            {/* CTA */}
            <button
              onClick={() => setPhase("live")}
              className="w-full bg-[#6750a4] text-white text-sm py-3 rounded-full hover:bg-[#5a4490] transition-colors font-semibold"
            >
              Join Interview Now
            </button>
            <button
              onClick={() => navigate("/interviews")}
              className="w-full text-gray-500 text-sm py-2 mt-2 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Ended ──────────────────────────────────────────────────────
  if (phase === "ended") {
    return (
      <div className="bg-gray-900 min-h-full flex items-center justify-center p-8">
        <div className="bg-gray-800 rounded-3xl p-10 max-w-sm w-full text-center">
          <div className="size-20 rounded-full bg-[#6750a4]/20 flex items-center justify-center mx-auto mb-5">
            <PhoneOff size={36} className="text-[#6750a4]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Interview Ended</h2>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Thank you for completing the interview. Your performance has been recorded and results will be shared shortly.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate(`/interviews/${id}/report`)}
              className="w-full bg-[#6750a4] text-white text-sm py-2.5 rounded-full hover:bg-[#5a4490] transition-colors"
            >
              View Interview Report
            </button>
            <button
              onClick={() => navigate("/interviews")}
              className="w-full border border-gray-600 text-gray-400 text-sm py-2.5 rounded-full hover:border-gray-400 transition-colors"
            >
              Back to Interviews
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Live interview ─────────────────────────────────────────────
  return (
    <div className="bg-gray-900 min-h-full flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-gray-800 border-b border-gray-700 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-red-500/20 text-red-400 text-xs px-3 py-1 rounded-full">
            <span className="size-1.5 rounded-full bg-red-500 animate-pulse inline-block" /> LIVE
          </div>
          <div className="flex items-center gap-1.5 text-gray-300 text-sm">
            <Clock size={14} /> <ElapsedTimer started={phase === "live"} />
          </div>
        </div>
        <p className="text-white text-sm font-semibold hidden sm:block">
          {interview?.company} · {interview?.round ?? "Video Interview"}
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors">
            <Users size={16} />
          </button>
          <button className="p-2 rounded-xl bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video area */}
        <div className="flex-1 p-5 flex flex-col gap-3 overflow-hidden">
          {/* Main video (AI) */}
          <VideoTile label="AI Interviewer" large isAI />

          {/* Self preview */}
          <div className="flex justify-end">
            <VideoTile label="You" muted={!micOn} cameraOn={camOn} />
          </div>
        </div>

        {/* Chat panel */}
        {chatOpen && (
          <div className="w-72 bg-gray-800 border-l border-gray-700 flex flex-col shrink-0">
            <div className="px-4 py-3 border-b border-gray-700">
              <p className="text-white text-sm font-semibold">Interview Chat</p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {msgs.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.mine ? "items-end" : "items-start"}`}>
                  <p className="text-xs text-gray-500 mb-1">{m.sender} · {m.time}</p>
                  <div
                    className={`max-w-[220px] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                      m.mine ? "bg-[#6750a4] text-white rounded-br-none" : "bg-gray-700 text-gray-200 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="p-3 border-t border-gray-700 flex gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 text-white text-sm px-3 py-2 rounded-full outline-none placeholder:text-gray-500 border border-gray-600 focus:border-[#6750a4]"
              />
              <button onClick={sendMsg} className="p-2 bg-[#6750a4] rounded-full hover:bg-[#5a4490] transition-colors">
                <Send size={14} className="text-white" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Control bar */}
      <div className="flex items-center justify-center gap-4 py-5 bg-gray-800 border-t border-gray-700 shrink-0">
        <button
          onClick={() => setMicOn(!micOn)}
          className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-colors ${micOn ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-red-500/20 text-red-400 hover:bg-red-500/30"}`}
        >
          {micOn ? <Mic size={22} /> : <MicOff size={22} />}
          <span className="text-xs">{micOn ? "Mute" : "Unmute"}</span>
        </button>

        <button
          onClick={() => setCamOn(!camOn)}
          className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-colors ${camOn ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-red-500/20 text-red-400 hover:bg-red-500/30"}`}
        >
          {camOn ? <Video size={22} /> : <VideoOff size={22} />}
          <span className="text-xs">{camOn ? "Stop Video" : "Start Video"}</span>
        </button>

        <button
          onClick={() => setChatOpen(!chatOpen)}
          className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-colors ${chatOpen ? "bg-[#6750a4] text-white" : "bg-gray-700 text-white hover:bg-gray-600"}`}
        >
          <MessageSquare size={22} />
          <span className="text-xs">Chat</span>
        </button>

        <button
          onClick={() => setPhase("ended")}
          className="flex flex-col items-center gap-1 p-3 rounded-2xl bg-red-500 text-white hover:bg-red-600 transition-colors px-6"
        >
          <PhoneOff size={22} />
          <span className="text-xs">End Call</span>
        </button>
      </div>
    </div>
  );
}
