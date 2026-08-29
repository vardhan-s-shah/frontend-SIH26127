import React, { useEffect, useState } from 'react';
import { RadarSweep } from '../components/ui/RadarSweep';

const STATUS_MESSAGES = [
  'Initializing city grid',
  'Connecting to camera network',
  'Loading ANPR engine',
  'Syncing vehicle registry',
  'Establishing ReID pipeline',
];

interface AppLoadingScreenProps {
  onComplete: () => void;
}

/**
 * Full-page initial app load screen.
 * Shown once on first paint, dismissed after ~2.6s with a 300ms opacity fade.
 * Uses the Night Ops design system: Void Navy bg, Signal Blue radar, IBM Plex Mono status text.
 */
export const AppLoadingScreen: React.FC<AppLoadingScreenProps> = ({ onComplete }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Cycle through status messages every 520ms
    const msgInterval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 520);

    // Start fade-out after 2.6s, then unmount 300ms later
    const fadeTimer = setTimeout(() => {
      setFadingOut(true);
      clearInterval(msgInterval);
      setTimeout(onComplete, 300);
    }, 2600);

    return () => {
      clearInterval(msgInterval);
      clearTimeout(fadeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050A14]"
      style={{
        transition: 'opacity 300ms ease',
        opacity: fadingOut ? 0 : 1,
        pointerEvents: fadingOut ? 'none' : 'auto',
      }}
      aria-label="Application loading"
    >
      {/* Top wordmark */}
      <div className="mb-10 text-center select-none">
        <div
          className="text-[22px] sm:text-[26px] font-bold tracking-[0.1em] text-[#E8EDF5]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          CITY-WIDE AI ENGINE
        </div>
        <div className="text-[11.5px] font-mono text-[#8A97AB] mt-1 tracking-widest">
          MULTI-CAMERA ANPR COMMAND CENTER
        </div>
      </div>

      {/* Radar animation */}
      <div className="relative">
        <RadarSweep size={152} variant="full" />
      </div>

      {/* Status text with animated ellipsis */}
      <div className="mt-9 text-center space-y-1.5">
        <p
          className="text-[13px] font-mono text-[#8A97AB] radar-ellipsis"
          style={{ minWidth: '260px' }}
          key={msgIndex}
        >
          {STATUS_MESSAGES[msgIndex]}
        </p>
        <p className="text-[11px] font-mono text-[#4A5568]">
          Ahmedabad Metropolitan Grid · 45 Sensors Active
        </p>
      </div>

      {/* Bottom version stamp */}
      <div className="absolute bottom-6 text-[10.5px] font-mono text-[#2A3A50] tracking-wider select-none">
        ANPR OPS COMMAND v2.4 · SECURE GRID
      </div>
    </div>
  );
};
