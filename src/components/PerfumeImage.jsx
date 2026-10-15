import React, { useId } from "react";

export default function PerfumeImage({ perfume, size = 240, tilt = 0 }) {
  const { palette } = perfume;
  const id = useId().replace(/:/g, "");

  const glass = palette.glass;
  const liquid = palette.liquid;
  const cap = palette.cap;
  const accent = palette.accent;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `rotate(${tilt}deg)`,
        transition: "transform .4s ease",
      }}
    >
      <svg viewBox="0 0 200 260" width="100%" height="100%">
        <defs>
          <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={glass} stopOpacity="0.95" />
            <stop offset="50%" stopColor={glass} stopOpacity="0.75" />
            <stop offset="100%" stopColor={liquid} stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id={`l-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={liquid} stopOpacity="0.95" />
            <stop offset="100%" stopColor={glass} stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id={`c-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
            <stop offset="40%" stopColor={cap} stopOpacity="1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id={`s-${id}`} cx="0.3" cy="0.2" r="0.9">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter id={`b-${id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* shadow */}
        <ellipse cx="100" cy="245" rx="55" ry="8" fill="#000" opacity="0.35" filter={`url(#b-${id})`} />

        {/* cap */}
        <rect x="75" y="10" width="50" height="34" rx="6" fill={`url(#c-${id})`} />
        <rect x="80" y="4" width="40" height="12" rx="3" fill={cap} />
        <rect x="80" y="4" width="40" height="4" rx="2" fill="#fff" opacity="0.35" />

        {/* neck */}
        <rect x="85" y="44" width="30" height="24" rx="4" fill={glass} opacity="0.9" />
        <rect x="85" y="44" width="10" height="24" fill="#fff" opacity="0.25" />

        {/* shoulder */}
        <path d="M60 80 Q100 60 140 80 L145 92 L55 92 Z" fill={`url(#g-${id})`} />

        {/* body */}
        <rect x="45" y="92" width="110" height="140" rx="14" fill={`url(#g-${id})`} />
        <rect x="45" y="92" width="110" height="140" rx="14" fill="none" stroke={accent} strokeOpacity="0.35" />

        {/* liquid */}
        <rect x="52" y="120" width="96" height="104" rx="10" fill={`url(#l-${id})`} opacity="0.85" />
        <rect x="52" y="120" width="96" height="8" rx="4" fill="#fff" opacity="0.15" />

        {/* highlight */}
        <rect x="55" y="100" width="14" height="120" rx="7" fill="#fff" opacity="0.22" />

        {/* sparkle */}
        <circle cx="80" cy="150" r="40" fill={`url(#s-${id})`} />

        {/* label */}
        <rect x="62" y="160" width="76" height="44" rx="6" fill="#111" opacity="0.55" />
        <rect x="62" y="160" width="76" height="44" rx="6" fill="none" stroke={accent} strokeOpacity="0.7" strokeWidth="1" />
        <text x="100" y="182" textAnchor="middle" fontSize="10" fill={accent} fontFamily="Cormorant Garamond, serif" fontWeight="600">
          {perfume.name.split(" ")[0]}
        </text>
        <text x="100" y="194" textAnchor="middle" fontSize="7" fill={accent} opacity="0.8" fontFamily="Inter, sans-serif">
          {perfume.size}
        </text>
      </svg>
    </div>
  );
}