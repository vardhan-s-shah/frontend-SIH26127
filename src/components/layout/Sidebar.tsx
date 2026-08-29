import React from 'react';
import {
  LayoutDashboard,
  Car,
  Navigation,
  Video,
  BarChart3,
  Building2,
  FileText,
  Bell,
  Siren,
  Settings,
  LogOut,
  X,
} from 'lucide-react';
import { ScreenId } from '../../types';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onLogout: () => void;
  unreadAlertsCount?: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavGroup {
  title: string;
  items: {
    id: ScreenId;
    label: string;
    icon: React.ElementType;
    badge?: number;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  onLogout,
  unreadAlertsCount = 12,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const groups: NavGroup[] = [
    {
      title: 'MONITORING',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'vehicles', label: 'Vehicles', icon: Car },
        { id: 'local_tracking', label: 'Tracking', icon: Navigation },
        { id: 'camera_health', label: 'Cameras', icon: Video },
      ],
    },
    {
      title: 'ANALYSIS',
      items: [
        { id: 'congestion', label: 'Analytics', icon: BarChart3 },
        { id: 'infrastructure', label: 'Infrastructure', icon: Building2 },
        { id: 'police_deployment', label: 'Reports', icon: FileText },
      ],
    },
    {
      title: 'OPERATIONS',
      items: [
        { id: 'alerts', label: 'Alerts', icon: Bell, badge: unreadAlertsCount },
        { id: 'green_corridor', label: 'Emergency', icon: Siren },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings },
      ],
    },
  ];

  const handleItemClick = (id: ScreenId) => {
    onNavigate(id);
    if (onCloseMobile) onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="p-4 pb-3 border-b border-steel flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-signal-blue/20 border border-signal-bright/50 flex items-center justify-center text-signal-bright text-xs font-bold flex-shrink-0">
            🛡️
          </div>
          <div className="lg:block md:hidden block min-w-0">
            <div className="text-[12px] font-bold tracking-[0.4px] text-fog-white leading-tight truncate">
              CITY TRAFFIC AI
            </div>
            <div className="text-[10px] text-instrument-grey font-mono truncate">SOC COMMAND v2.4</div>
          </div>
        </div>

        {/* Mobile close drawer button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden text-instrument-grey hover:text-fog-white p-1 rounded hover:bg-raised"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav Groups */}
      <div className="flex-1 overflow-y-auto py-3 space-y-4 px-2">
        {groups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            <div className="px-3 text-[10px] font-bold text-instrument-grey/70 tracking-wider lg:block md:hidden block">
              {group.title}
            </div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentScreen === item.id ||
                (item.id === 'local_tracking' &&
                  ['local_tracking', 'reid', 'trajectory_map', 'trajectory_timeline', 'prediction'].includes(currentScreen)) ||
                (item.id === 'congestion' && ['congestion', 'travel_time'].includes(currentScreen)) ||
                (item.id === 'alerts' && ['alerts', 'evidence', 'violations'].includes(currentScreen));

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  title={item.label}
                  className={`w-full flex items-center lg:justify-between md:justify-center justify-between px-3 py-2 text-[12.5px] rounded-[6px] transition-colors cursor-pointer group relative ${
                    isActive
                      ? 'bg-signal-blue text-white font-semibold shadow-sm'
                      : 'text-instrument-grey hover:text-fog-white hover:bg-raised/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon size={16} strokeWidth={1.5} className="flex-shrink-0" />
                    <span className="truncate lg:inline md:hidden inline">{item.label}</span>
                  </div>

                  {/* Badge */}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full lg:inline md:hidden inline ${
                        isActive ? 'bg-white text-signal-blue' : 'bg-alert-red text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Tablet Hover Tooltip (md breakpoint icon-only mode) */}
                  <div className="hidden md:group-hover:flex lg:group-hover:hidden absolute left-full ml-2 px-2.5 py-1 bg-raised border border-steel text-fog-white text-[11.5px] font-medium rounded-[6px] shadow-xl z-50 whitespace-nowrap items-center pointer-events-none">
                    {item.label}
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="ml-1.5 px-1 bg-alert-red text-white text-[10px] font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Logout button */}
      <div className="p-3 border-t border-steel flex-shrink-0">
        <button
          onClick={onLogout}
          className="w-full flex items-center lg:justify-start md:justify-center justify-start gap-2.5 px-3 py-2 text-[12.5px] text-instrument-grey hover:text-alert-red hover:bg-alert-red/10 rounded-[6px] transition-colors cursor-pointer"
          title="Sign Out"
        >
          <LogOut size={16} strokeWidth={1.5} className="flex-shrink-0" />
          <span className="lg:inline md:hidden inline">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop / Tablet Sidebar Container */}
      <aside className="hidden md:flex flex-col flex-shrink-0 bg-panel border-r border-steel h-full w-[64px] lg:w-[210px] transition-all duration-200">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay with high z-index (z-[9999] / z-[10000]) to cover Leaflet popups & inspection boxes */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-[9999] flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-void/80 backdrop-blur-md transition-opacity z-[9999]"
            onClick={onCloseMobile}
          />
          {/* Drawer content */}
          <aside className="relative w-[240px] bg-panel border-r border-steel h-full shadow-2xl z-[10000] flex flex-col">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
};

