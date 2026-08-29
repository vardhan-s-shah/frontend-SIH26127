import React, { useState, useEffect } from 'react';
import { Bell, User, ChevronDown, Menu, Sun, Moon } from 'lucide-react';
import { ScreenId } from '../../types';

interface TopbarProps {
  onNavigate: (screen: ScreenId) => void;
  unreadAlertsCount?: number;
  onToggleMobileMenu?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onNavigate,
  unreadAlertsCount = 12,
  onToggleMobileMenu,
  theme = 'dark',
  onToggleTheme,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hours}:${mins}:${secs} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-[56px] flex items-center justify-between px-3 md:px-5 border-b border-steel bg-panel flex-shrink-0 select-none">
      {/* Title & Mobile Hamburger */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden text-instrument-grey hover:text-fog-white p-1.5 rounded-[6px] hover:bg-raised transition-colors cursor-pointer"
          aria-label="Toggle navigation drawer"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-[15px] sm:text-[17px] font-bold text-fog-white tracking-[0.2px] truncate">
          CITY-WIDE AI ENGINE <span className="text-[13px] font-medium text-instrument-grey hidden sm:inline">| Multi-Camera ANPR</span>
        </h1>

        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-clear-green/10 border border-clear-green/30 text-clear-green text-[11px] font-semibold flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-clear-green animate-live-pulse"></span>
          <span>SYSTEM LIVE</span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Timecode display */}
        <div className="font-mono text-[11.5px] sm:text-[12px] text-instrument-grey bg-raised/80 border border-steel px-2.5 py-1 rounded-[6px] tabular-nums hidden sm:block">
          {timeStr || '13:15:00 IST'}
        </div>

        {/* Theme Toggle (Sun/Moon) */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-[6px] text-instrument-grey hover:text-fog-white hover:bg-raised transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
          </button>
        )}

        {/* Quick Alert Bell */}
        <button
          onClick={() => onNavigate('alerts')}
          className="relative p-1.5 rounded-[6px] text-instrument-grey hover:text-fog-white hover:bg-raised transition-colors cursor-pointer"
          title="View Alerts"
        >
          <Bell size={18} strokeWidth={1.5} />
          {unreadAlertsCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-alert-red animate-pulse" />
          )}
        </button>

        {/* User Dropdown */}
        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-steel text-fog-white cursor-pointer hover:opacity-90">
          <div className="w-7 h-7 rounded-full bg-signal-blue/20 border border-signal-blue/40 flex items-center justify-center text-signal-bright flex-shrink-0">
            <User size={15} />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-[12.5px] font-semibold leading-none">Ops Officer</div>
            <div className="text-[10px] text-instrument-grey leading-none mt-0.5">Control Center</div>
          </div>
          <ChevronDown size={14} className="text-instrument-grey hidden sm:block ml-0.5" />
        </div>
      </div>
    </header>
  );
};

