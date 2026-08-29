import React from 'react';

interface RadarSweepProps {
  /** Diameter of the radar dish in pixels */
  size?: number;
  /** 'full' = full-page app loader, 'inline' = small search indicator */
  variant?: 'full' | 'inline';
}

/**
 * RadarSweep — purely CSS-animated radar dish.
 * Used in exactly two places:
 *   1. Full-page app initial load (variant="full")
 *   2. Inline ANPR plate search loading (variant="inline")
 *
 * Three concentric pulsing rings, a rotating sweep line,
 * a solid center dot, and 3 blinking detection blips.
 * All colours from the Night Ops design system.
 */
export const RadarSweep: React.FC<RadarSweepProps> = ({ size = 150, variant = 'full' }) => {
  const half = size / 2;

  // Blinking dot positions (polar → cartesian, ~55% radius from center)
  const dotRadius = half * 0.52;
  const blinkDots = [
    { angle: 42,  delay: '0s',    color: '#3DDC84' },
    { angle: 155, delay: '0.6s',  color: '#3DDC84' },
    { angle: 270, delay: '1.1s',  color: '#3DDC84' },
  ].map(({ angle, delay, color }) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: half + dotRadius * Math.cos(rad),
      y: half + dotRadius * Math.sin(rad),
      delay,
      color,
    };
  });

  const dotSize = variant === 'inline' ? 5 : 7;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ overflow: 'visible', flexShrink: 0 }}
    >
      {/* ── Concentric pulsing rings (3 rings, staggered) ── */}
      {[0, 1, 2].map((i) => (
        <circle
          key={`ring-${i}`}
          cx={half}
          cy={half}
          r={half - 1}
          stroke="#2F6FED"
          strokeWidth="1"
          fill="none"
          style={{
            transformOrigin: `${half}px ${half}px`,
            animation: `radarRing ${2.4}s cubic-bezier(0.4, 0, 0.6, 1) ${i * 0.8}s infinite`,
          }}
        />
      ))}

      {/* ── Static dim base circle (gives the "dish" edge) ── */}
      <circle
        cx={half}
        cy={half}
        r={half - 1}
        stroke="#2F6FED"
        strokeWidth="1"
        strokeOpacity="0.18"
        fill="rgba(47, 111, 237, 0.04)"
      />

      {/* ── Cross-hair grid lines (very faint) ── */}
      <line x1={half} y1={2} x2={half} y2={size - 2} stroke="#2F6FED" strokeWidth="0.5" strokeOpacity="0.15" />
      <line x1={2} y1={half} x2={size - 2} y2={half} stroke="#2F6FED" strokeWidth="0.5" strokeOpacity="0.15" />

      {/* ── Mid-radius reference ring (faint) ── */}
      <circle
        cx={half}
        cy={half}
        r={half * 0.55}
        stroke="#2F6FED"
        strokeWidth="0.5"
        strokeOpacity="0.15"
        fill="none"
      />

      {/* ── Rotating sweep line + conic fade sector ── */}
      <g
        style={{
          transformOrigin: `${half}px ${half}px`,
          animation: 'radarSweep 2s linear infinite',
        }}
      >
        {/* Sweep trailing glow (conic sector approximated with semi-transparent wedge) */}
        <path
          d={`M ${half} ${half} L ${half} ${2} A ${half - 1} ${half - 1} 0 0 1 ${size - 2} ${half} Z`}
          fill="url(#sweepGradient)"
          opacity="0.25"
        />
        {/* Sweep arm line */}
        <line
          x1={half}
          y1={half}
          x2={half}
          y2={2}
          stroke="#4C8DFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.9"
        />
      </g>

      {/* ── Gradient definition for sweep sector ── */}
      <defs>
        <radialGradient id="sweepGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#2F6FED" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#2F6FED" stopOpacity="0"   />
        </radialGradient>
      </defs>

      {/* ── Blinking detection blips ── */}
      {blinkDots.map((dot, i) => (
        <circle
          key={`dot-${i}`}
          cx={dot.x}
          cy={dot.y}
          r={dotSize / 2}
          fill={dot.color}
          style={{
            transformOrigin: `${dot.x}px ${dot.y}px`,
            animation: `radarDotBlink 1.8s ease-in-out ${dot.delay} infinite`,
          }}
        />
      ))}

      {/* ── Solid center dot ── */}
      <circle cx={half} cy={half} r={variant === 'inline' ? 3 : 4} fill="#2F6FED" />
      <circle cx={half} cy={half} r={variant === 'inline' ? 1.5 : 2} fill="#4C8DFF" />
    </svg>
  );
};
