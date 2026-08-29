import React from 'react';
import { Card } from '../components/ui/Card';
import { StatusPill } from '../components/ui/StatusPill';
import { PrimaryButton } from '../components/ui/Buttons';
import { MapPanel } from '../components/map/MapPanel';
import { ScreenId } from '../types';
import { Siren, Navigation, CheckCircle2, Clock, Info } from 'lucide-react';

interface GreenCorridorScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const GreenCorridorScreen: React.FC<GreenCorridorScreenProps> = ({ onNavigate }) => {
  const corridorSignals = [
    { name: 'Junction 3 — Paldi Interchange', sub: 'Cleared at 10:52:03 AM', status: 'healthy', label: 'Green · Active' },
    { name: 'Junction 5 — MG Road Crossing', sub: 'Cleared at 10:52:41 AM', status: 'healthy', label: 'Green · Active' },
    { name: 'Junction 8 — Income Tax Circle', sub: 'ETA 10:53:20 AM (Approach Phase)', status: 'warning', label: 'Preparing Phase' },
    { name: 'Junction 11 — Airport Road Terminal', sub: 'ETA 10:55:10 AM', status: 'low', label: 'Normal Timing' },
  ];

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[19px] font-bold text-fog-white flex items-center gap-2">
            <Siren className="text-clear-green animate-pulse" />
            <span>Emergency Vehicle Green Corridor Coordination</span>
          </h2>
          <p className="text-[12.5px] text-instrument-grey">
            Preemptive traffic signal green-wave override for authorized ambulances and organ-transit emergency vehicles.
          </p>
        </div>
      </div>

      {/* Live Route Map Visualizer */}
      <Card className="p-0 overflow-hidden relative">
        <div className="p-3 px-4 bg-raised border-b border-steel flex justify-between items-center text-xs font-mono">
          <span className="font-bold text-fog-white">ACTIVE CORRIDOR: Ambulance #108 (Emergency Transit)</span>
          <span className="text-clear-green font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-clear-green animate-live-pulse" />
            PRIORITY OVERRIDE ENGAGED
          </span>
        </div>

        {/* Leaflet Map with Emergency Corridor — explicit height so MapPanel fills correctly */}
        <div className="h-[300px] sm:h-[380px] relative">
          <MapPanel
            showEmergencyCorridor={true}
            showLegend={false}
            onNavigate={onNavigate}
            height="100%"
          />
        </div>
      </Card>

      {/* Corridor Signal Steps List */}
      <Card className="space-y-3">
        <h3 className="font-bold text-[14px] text-fog-white border-b border-steel pb-2">
          Automated Signal Step Progression
        </h3>

        <div className="space-y-2.5">
          {corridorSignals.map((sig, idx) => (
            <div key={idx} className="p-3 bg-raised border border-steel rounded-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3.5 h-3.5 rounded-full ${
                  sig.status === 'healthy' ? 'bg-clear-green' : sig.status === 'warning' ? 'bg-caution-amber' : 'bg-instrument-grey'
                }`} />
                <div>
                  <div className="font-bold text-[13.5px] text-fog-white">{sig.name}</div>
                  <div className="text-[11.5px] text-instrument-grey font-mono">{sig.sub}</div>
                </div>
              </div>

              <StatusPill status={sig.status} label={sig.label} />
            </div>
          ))}
        </div>
      </Card>

      {/* Corridor Metadata */}
      <Card className="space-y-2 text-[13px]">
        <div className="flex justify-between py-1 border-b border-steel">
          <span className="text-instrument-grey">Vehicle Registration</span>
          <span className="font-semibold text-fog-white">Ambulance #108 (Authorized Emergency Transit)</span>
        </div>
        <div className="flex justify-between py-1 border-b border-steel">
          <span className="text-instrument-grey">Estimated Transit Time</span>
          <span className="font-mono text-clear-green font-bold">6 min 40 sec (Saved ~14 mins)</span>
        </div>
        <div className="flex justify-between py-1 border-b border-steel">
          <span className="text-instrument-grey">Signal Timing Restoration</span>
          <span className="font-mono text-fog-white">Automatic restoration 15s after vehicle passage</span>
        </div>
      </Card>

      <div className="p-3 bg-raised border border-steel rounded-[8px] text-[12px] text-instrument-grey flex items-center gap-2">
        <Info size={16} className="text-signal-bright flex-shrink-0" />
        <span>
          Real signal preempt control requires integration with city ITMS controllers and secure API hardware. This interface simulates the corridor logic for demonstration.
        </span>
      </div>
    </div>
  );
};
