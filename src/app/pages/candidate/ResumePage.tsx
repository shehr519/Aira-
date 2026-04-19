import { useState, useRef } from "react";
import { Upload, FileText, Eye, RefreshCw, Trash2, Save, X } from "lucide-react";

// ── Decorative illustration: person reading (empty state) ────────
function IllustrationEmpty() {
  return (
    <div className="absolute top-0 right-0 w-[120px] h-[110px] pointer-events-none select-none">
      <svg viewBox="0 0 120 110" fill="none" className="size-full">
        {/* body */}
        <ellipse cx="82" cy="90" rx="22" ry="16" fill="#e8d5f5" />
        {/* torso */}
        <rect x="68" y="62" width="28" height="30" rx="8" fill="#9c6fd6" />
        {/* arms */}
        <path d="M68 72 Q50 68 44 78" stroke="#9c6fd6" strokeWidth="5" strokeLinecap="round" fill="none"/>
        <path d="M96 72 Q108 65 112 75" stroke="#9c6fd6" strokeWidth="5" strokeLinecap="round" fill="none"/>
        {/* head */}
        <circle cx="82" cy="50" r="16" fill="#f7c9a0" />
        {/* hair */}
        <path d="M66 48 Q68 32 82 30 Q96 32 98 48" fill="#6b3a1f" />
        {/* eyes */}
        <circle cx="77" cy="50" r="2" fill="#333" />
        <circle cx="87" cy="50" r="2" fill="#333" />
        {/* document held */}
        <rect x="36" y="62" width="26" height="34" rx="3" fill="white" stroke="#6750a4" strokeWidth="1.5"/>
        <line x1="40" y1="70" x2="58" y2="70" stroke="#6750a4" strokeWidth="1.5"/>
        <line x1="40" y1="76" x2="58" y2="76" stroke="#6750a4" strokeWidth="1.5"/>
        <line x1="40" y1="82" x2="52" y2="82" stroke="#6750a4" strokeWidth="1.5"/>
        {/* magnifier */}
        <circle cx="112" cy="32" r="10" stroke="#6750a4" strokeWidth="2" fill="#e8d5f5" />
        <line x1="119" y1="39" x2="115" y2="43" stroke="#6750a4" strokeWidth="2" strokeLinecap="round"/>
        {/* sparkles */}
        <circle cx="20" cy="30" r="3" fill="#6750a4" opacity="0.4"/>
        <circle cx="110" cy="15" r="2" fill="#17CF97" opacity="0.5"/>
        <circle cx="55" cy="18" r="2.5" fill="#6750a4" opacity="0.3"/>
      </svg>
    </div>
  );
}

// ── Decorative illustration: person with floating docs (upload) ──
function IllustrationUploaded() {
  return (
    <div className="w-[110px] h-[110px] shrink-0 pointer-events-none select-none">
      <svg viewBox="0 0 110 110" fill="none" className="size-full">
        {/* floating doc 1 */}
        <rect x="60" y="8" width="30" height="38" rx="4" fill="white" stroke="#6750a4" strokeWidth="1.5" transform="rotate(12 75 27)"/>
        <line x1="65" y1="22" x2="83" y2="19" stroke="#6750a4" strokeWidth="1.5"/>
        <line x1="65" y1="28" x2="83" y2="25" stroke="#6750a4" strokeWidth="1.5"/>
        {/* floating doc 2 */}
        <rect x="14" y="12" width="26" height="34" rx="4" fill="white" stroke="#9c6fd6" strokeWidth="1.5" transform="rotate(-10 27 29)"/>
        <line x1="18" y1="26" x2="36" y2="23" stroke="#9c6fd6" strokeWidth="1.5"/>
        <line x1="18" y1="32" x2="32" y2="29" stroke="#9c6fd6" strokeWidth="1.5"/>
        {/* body */}
        <ellipse cx="55" cy="95" rx="20" ry="13" fill="#e8d5f5"/>
        {/* torso */}
        <rect x="42" y="66" width="26" height="30" rx="8" fill="#9c6fd6"/>
        {/* arms up */}
        <path d="M42 72 Q28 60 22 50" stroke="#f7c9a0" strokeWidth="5" strokeLinecap="round" fill="none"/>
        <path d="M68 72 Q82 60 88 48" stroke="#f7c9a0" strokeWidth="5" strokeLinecap="round" fill="none"/>
        {/* head */}
        <circle cx="55" cy="54" r="14" fill="#f7c9a0"/>
        {/* hair */}
        <path d="M41 52 Q43 38 55 36 Q67 38 69 52" fill="#6b3a1f"/>
        {/* eyes */}
        <circle cx="51" cy="55" r="1.8" fill="#333"/>
        <circle cx="59" cy="55" r="1.8" fill="#333"/>
        {/* smile */}
        <path d="M51 60 Q55 64 59 60" stroke="#b57a50" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        {/* check badge */}
        <circle cx="80" cy="90" r="10" fill="#17CF97"/>
        <path d="M75 90 L79 94 L86 86" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    </div>
  );
}

// ── Resume thumbnail ─────────────────────────────────────────────
function ResumeThumbnail() {
  return (
    <div className="w-[90px] h-[115px] border border-gray-200 rounded-xl overflow-hidden shrink-0 bg-white shadow-sm flex flex-col">
      {/* header bar */}
      <div className="h-6 bg-[#6750a4] flex items-center px-2 gap-1">
        <div className="size-1.5 rounded-full bg-white opacity-70"/>
        <div className="h-0.5 flex-1 bg-white opacity-40 rounded"/>
      </div>
      {/* content lines */}
      <div className="flex-1 p-2 space-y-1">
        <div className="h-1.5 bg-gray-800 rounded-full w-4/5"/>
        <div className="h-1 bg-gray-400 rounded-full w-full"/>
        <div className="h-1 bg-gray-400 rounded-full w-3/4"/>
        <div className="h-1 bg-gray-200 rounded-full w-full mt-2"/>
        <div className="h-1 bg-gray-200 rounded-full w-full"/>
        <div className="h-1 bg-gray-200 rounded-full w-2/3"/>
        <div className="h-1 bg-gray-800 rounded-full w-3/5 mt-2"/>
        <div className="h-1 bg-gray-200 rounded-full w-full"/>
        <div className="h-1 bg-gray-200 rounded-full w-4/5"/>
      </div>
    </div>
  );
}

// ── Info row in extracted section ────────────────────────────────
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 text-sm">
      <span className="text-gray-500 w-[90px] shrink-0">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────
export function ResumePage() {
  const [hasResume, setHasResume] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showSaveBar, setShowSaveBar] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = () => {
    setHasResume(true);
    setSaved(false);
    setShowSaveBar(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) handleFile();
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setShowSaveBar(false), 1800);
  };

  const handleDelete = () => {
    setHasResume(false);
    setSaved(false);
    setShowSaveBar(false);
  };

  return (
    <div className="bg-[#fafafc] min-h-full pb-20">
      <div className="px-8 pt-8">
        {/* Page header */}
        <h1 className="text-3xl font-bold text-black mb-1">Resume</h1>
        <p className="text-base text-gray-600 mb-8">
          Keep your resume up to date so you can apply to jobs quickly and get accurate job matches.
        </p>

        {!hasResume ? (
          /* ── EMPTY STATE ─────────────────────────────── */
          <div className="relative max-w-[480px]">
            <IllustrationEmpty />
            {/* Upload zone */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center gap-3 cursor-pointer transition-colors mt-12 ${
                isDragging
                  ? "border-[#6750a4] bg-purple-50"
                  : "border-[#6750a4] border-opacity-50 bg-white hover:border-opacity-100 hover:bg-purple-50"
              }`}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {/* Document icon */}
              <div className="size-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-2">
                <FileText size={30} className="text-[#6750a4]" />
              </div>
              <p className="text-sm font-medium text-[#6750a4] underline underline-offset-2">
                Click here to upload your file or drag
              </p>
              <p className="text-xs text-gray-400">Supported formats: DOC, DOCX/PDF</p>
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFile}
              />
            </div>
          </div>
        ) : (
          /* ── UPLOADED STATE ──────────────────────────── */
          <div className="max-w-[560px] space-y-8">
            {/* File card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-5">
              <ResumeThumbnail />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} className="text-[#6750a4] shrink-0" />
                  <span className="text-sm font-medium text-gray-800 truncate">Ali_Resume.pdf</span>
                </div>
                <div className="text-xs text-gray-500 space-y-0.5 mb-4">
                  <p>File Size: <span className="text-gray-700">14 Mb</span></p>
                  <p>Uploaded date: <span className="text-gray-700">11 Nov, 2023</span></p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 bg-[#6750a4] text-white text-xs px-4 py-1.5 rounded-full hover:bg-[#5a4490] transition-colors">
                    <Eye size={13} /> View
                  </button>
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-1.5 border border-gray-300 text-gray-700 text-xs px-4 py-1.5 rounded-full hover:border-[#6750a4] hover:text-[#6750a4] transition-colors"
                  >
                    <RefreshCw size={13} /> Replace
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-1.5 border border-red-200 text-red-500 text-xs px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFile}
                  />
                </div>
              </div>
            </div>

            {/* Extracted info section */}
            <div>
              <h2 className="text-xl font-bold text-black mb-1">Extracted Information</h2>
              <p className="text-sm text-gray-500 mb-5">
                This information is automatically detected from your resume and will be displayed alongside your cv to speed up job applications.
              </p>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-6">
                <div className="space-y-2.5 flex-1">
                  <InfoRow label="Name" value="Ali Ahmed" />
                  <InfoRow label="Email" value="Ali@gmail.com" />
                  <InfoRow label="Skills" value="React, Figma, UI Design, HTML" />
                  <InfoRow label="Experience" value="1 Year" />
                </div>
                <IllustrationUploaded />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Save / Cancel bar ───────────────────────────────────── */}
      {showSaveBar && (
        <div className="fixed bottom-0 right-0 left-[270px] bg-white border-t border-gray-200 px-8 py-3 flex items-center justify-end gap-3 z-50">
          {saved && (
            <span className="text-sm text-green-600 mr-auto flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-green-500 inline-block" />
              Changes saved successfully
            </span>
          )}
          <button
            onClick={() => { setHasResume(false); setShowSaveBar(false); }}
            className="text-sm text-gray-600 border border-gray-200 px-5 py-2 rounded-full hover:bg-gray-50 transition-colors flex items-center gap-1.5"
          >
            <X size={13} /> Cancel
          </button>
          <button
            onClick={handleSave}
            className="text-sm bg-[#6750a4] text-white px-5 py-2 rounded-full hover:bg-[#5a4490] transition-colors flex items-center gap-1.5"
          >
            <Save size={13} /> Save changes
          </button>
        </div>
      )}
    </div>
  );
}
