// ── Company logo SVG components ───────────────────────────────────

// 0 — green four-square (TechHive / Z Solutions)
export function LogoGreen() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <rect x="1" y="1" width="16" height="16" rx="3" fill="#17CF97" />
      <rect x="23" y="1" width="16" height="16" rx="3" fill="#17CF97" opacity="0.5" />
      <rect x="1" y="23" width="16" height="16" rx="3" fill="#17CF97" opacity="0.5" />
      <rect x="23" y="23" width="16" height="16" rx="3" fill="#17CF97" />
    </svg>
  );
}

// 1 — blue circle (Pixelora)
export function LogoBlue() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <circle cx="20" cy="20" r="17" fill="#007DFC" opacity="0.15" />
      <circle cx="20" cy="20" r="10" fill="#007DFC" />
      <circle cx="20" cy="20" r="5" fill="white" />
    </svg>
  );
}

// 2 — orange hexagon (DataCore)
export function LogoOrange() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="#FF630B" opacity="0.15" />
      <polygon points="20,8 30,14 30,26 20,32 10,26 10,14" fill="#FF630B" />
      <polygon points="20,14 25,17 25,23 20,26 15,23 15,17" fill="white" />
    </svg>
  );
}

export const LOGO_COMPONENTS = [LogoGreen, LogoBlue, LogoOrange];
