import React, { useState } from 'react';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { ScreenId } from '../../types';

interface AppLayoutProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onLogout: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentScreen,
  onNavigate,
  onLogout,
  theme,
  onToggleTheme,
  children,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen bg-void text-fog-white overflow-hidden">
      <Topbar
        onNavigate={onNavigate}
        onToggleMobileMenu={() => setIsMobileOpen((prev) => !prev)}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          currentScreen={currentScreen}
          onNavigate={onNavigate}
          onLogout={onLogout}
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 bg-void max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

