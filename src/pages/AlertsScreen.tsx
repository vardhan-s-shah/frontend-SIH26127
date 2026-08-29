import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { AlertCard } from '../components/ui/AlertCard';
import { PlateBadge } from '../components/ui/PlateBadge';
import { PrimaryButton } from '../components/ui/Buttons';
import { ScreenId, AlertItem } from '../types';
import { Bell, AlertTriangle, Video, Gauge, ShieldAlert, ArrowRight } from 'lucide-react';

interface AlertsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

const ALERTS_DATA: AlertItem[] = [
  {
    id: 'alt-1',
    type: 'duplicate',
    title: 'Duplicate Plate / Impossible Speed Detected',
    subtitle: 'GJ01AB1234 — Impossible travel speed between CAM 02 and CAM 15',
    time: '10:45 AM',
    severity: 'red',
    plate: 'GJ01AB1234',
    status: 'Under Review',
  },
  {
    id: 'alt-2',
    type: 'camera_fault',
    title: 'Camera Feed Disconnected',
    subtitle: 'CAM 04 – City Center Flyover — Stream signal offline',
    time: '10:43 AM',
    severity: 'amber',
    status: 'Under Review',
  },
  {
    id: 'alt-3',
    type: 'speed_violation',
    title: 'Speed Limit Overrun Violation',
    subtitle: 'MH12CD5678 — Overspeed detected: 78 km/h (Limit: 50 km/h)',
    time: '10:42 AM',
    severity: 'amber',
    plate: 'MH12CD5678',
    status: 'Confirmed',
  },
  {
    id: 'alt-4',
    type: 'red_light',
    title: 'Red-Light Signal Violation',
    subtitle: 'DL3CAY1122 — Crossed stop-line during red phase at Junction 5',
    time: '10:41 AM',
    severity: 'red',
    plate: 'DL3CAY1122',
    status: 'Under Review',
  },
];

export const AlertsScreen: React.FC<AlertsScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'duplicate' | 'violations' | 'faults'>('all');
  const [selectedAlert, setSelectedAlert] = useState<AlertItem>(ALERTS_DATA[0]);

  const filteredAlerts = ALERTS_DATA.filter((a) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'duplicate') return a.type === 'duplicate';
    if (activeTab === 'violations') return a.type === 'speed_violation' || a.type === 'red_light';
    if (activeTab === 'faults') return a.type === 'camera_fault';
    return true;
  });

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[19px] font-bold text-fog-white">Central Operations Alert Queue</h2>
          <p className="text-[12.5px] text-instrument-grey">
            Live exception stream: duplicate plate anomalies, speed violations, red-light events, and sensor faults.
          </p>
        </div>
      </div>

      {/* Alert Filter Tabs (per spec section 7) */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Alerts (4)' },
          { id: 'duplicate', label: 'Duplicate Plates' },
          { id: 'violations', label: 'Traffic Violations' },
          { id: 'faults', label: 'Camera Faults' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-[7px] text-[12.5px] font-medium transition-colors border cursor-pointer ${
              activeTab === tab.id
                ? 'bg-signal-blue text-white border-signal-blue font-semibold'
                : 'bg-raised text-instrument-grey border-steel hover:text-fog-white hover:border-signal-blue/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Alerts List */}
        <div className="lg:col-span-7 space-y-2.5">
          {filteredAlerts.map((alt) => (
            <AlertCard
              key={alt.id}
              severity={alt.severity}
              title={alt.title}
              subtitle={alt.subtitle}
              time={alt.time}
              icon={alt.severity === 'red' ? <AlertTriangle className="text-alert-red" /> : <Bell className="text-caution-amber" />}
              onClick={() => setSelectedAlert(alt)}
              className={selectedAlert.id === alt.id ? 'ring-2 ring-signal-blue' : ''}
            />
          ))}
        </div>

        {/* Right Column: Alert Detail Inspector */}
        <div className="lg:col-span-5">
          <Card className="space-y-3">
            <h3 className="font-bold text-[14px] text-fog-white border-b border-steel pb-2 flex justify-between items-center">
              <span>Alert Inspector</span>
              <span className="text-[11.5px] font-mono text-instrument-grey">{selectedAlert.id}</span>
            </h3>

            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Alert Type</span>
                <span className="font-semibold text-fog-white uppercase">{selectedAlert.type}</span>
              </div>

              {selectedAlert.plate && (
                <div className="flex justify-between py-1 border-b border-steel">
                  <span className="text-instrument-grey">Plate Number</span>
                  <PlateBadge plate={selectedAlert.plate} size="sm" />
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Origin Feed</span>
                <span className="font-mono text-fog-white">CAM 02 (10:11 AM)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Conflict Feed</span>
                <span className="font-mono text-fog-white">CAM 15 (10:26 AM)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Time Gap</span>
                <span className="font-mono text-fog-white">15 minutes</span>
              </div>
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Calculated Speed</span>
                <span className="font-mono text-alert-red font-bold">74.8 km/h (Physically Impossible)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Review Status</span>
                <span className="font-bold text-caution-amber">{selectedAlert.status}</span>
              </div>
            </div>

            <div className="pt-2">
              <PrimaryButton
                onClick={() => {
                  if (selectedAlert.type === 'red_light') {
                    onNavigate('violations');
                  } else {
                    onNavigate('evidence');
                  }
                }}
                className="w-full"
              >
                Inspect Evidence &amp; Video Streams →
              </PrimaryButton>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
