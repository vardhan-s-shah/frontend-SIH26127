import React from 'react';
import { Card } from '../components/ui/Card';
import { PlateBadge } from '../components/ui/PlateBadge';
import { StatusPill } from '../components/ui/StatusPill';
import { PrimaryButton } from '../components/ui/Buttons';
import { ScreenId } from '../types';
import { Navigation, CheckCircle2, Clock, MapPin, Search } from 'lucide-react';

interface TrajectoryPredictionScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const TrajectoryPredictionScreen: React.FC<TrajectoryPredictionScreenProps> = ({ onNavigate }) => {
  const predictions = [
    { rank: 1, cam: 'CAM 18 — Airport Terminal Rd', prob: 62, status: 'Most Likely' },
    { rank: 2, cam: 'CAM 21 — Highway Bypass Corridor', prob: 25, status: 'Alternate Route' },
    { rank: 3, cam: 'CAM 09 — City Center Flyover Loop', prob: 13, status: 'Low Probability' },
  ];

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[19px] font-bold text-fog-white">Future Trajectory Prediction &amp; Verification</h2>
          <p className="text-[12.5px] text-instrument-grey">
            Probabilistic next-camera estimation using historical route graphs, speed vectors, and time-of-day matrices.
          </p>
        </div>
        <PrimaryButton onClick={() => onNavigate('green_corridor')} size="sm">
          Emergency Green Corridor →
        </PrimaryButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Probability Ranking Panel */}
        <div className="lg:col-span-6 flex flex-col">
          <Card className="flex-1 space-y-4">
            <div className="flex justify-between items-center border-b border-steel pb-2">
              <div>
                <div className="text-[11.5px] text-instrument-grey font-mono">TARGET VEHICLE PREDICTION</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <PlateBadge plate="GJ01AB1234" size="md" />
                  <span className="text-[12px] text-instrument-grey">(Currently at CAM 15)</span>
                </div>
              </div>
              <StatusPill status="healthy" label="Model Active" />
            </div>

            <h4 className="font-bold text-[13.5px] text-fog-white">Predicted Next Camera Intersection</h4>

            <div className="space-y-3">
              {predictions.map((p) => (
                <div key={p.rank} className="p-3 bg-raised border border-steel rounded-card space-y-2">
                  <div className="flex justify-between items-center text-[13px]">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-void border border-steel flex items-center justify-center font-mono font-bold text-xs text-signal-bright">
                        {p.rank}
                      </span>
                      <span className="font-bold text-fog-white">{p.cam}</span>
                    </div>
                    <span className="font-mono font-bold text-clear-green">{p.prob}%</span>
                  </div>

                  {/* Probability Bar */}
                  <div className="h-2 bg-raised border border-steel/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-signal-blue to-clear-green rounded-full"
                      style={{ width: `${p.prob}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[11.5px] text-instrument-grey pt-2 border-t border-steel">
              Prediction based on current heading, travel velocity, historical driver habits, and road network topology.
            </div>
          </Card>
        </div>

        {/* Real-Time Verification Feed */}
        <div className="lg:col-span-6 flex flex-col">
          <Card className="flex-1 space-y-3">
            <h3 className="font-bold text-[14px] text-fog-white border-b border-steel pb-2 flex items-center justify-between">
              <span>Real-Time Prediction Verification &amp; Auto-Correction</span>
              <span className="text-[11px] font-mono text-clear-green">LIVE UPDATING</span>
            </h3>

            <div className="space-y-3">
              {/* Confirmed Card */}
              <div className="p-3.5 rounded-card bg-clear-green/10 border border-clear-green/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[13.5px] text-clear-green flex items-center gap-1.5">
                    <CheckCircle2 size={16} />
                    GJ01AB1234 — Prediction Confirmed
                  </span>
                  <span className="text-[11px] font-mono text-instrument-grey">11:14 AM</span>
                </div>
                <div className="text-[12.5px] text-fog-white">
                  Vehicle arrived at <strong className="text-clear-green font-mono">CAM 18</strong> (expected window: 11:12 – 11:16 AM). Route confidence score elevated to 91%.
                </div>
              </div>

              {/* Checking Card */}
              <div className="p-3.5 rounded-card bg-caution-amber/10 border border-caution-amber/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[13.5px] text-caution-amber flex items-center gap-1.5">
                    <Search size={16} />
                    MH12CD5678 — Verifying Trajectory
                  </span>
                  <span className="text-[11px] font-mono text-instrument-grey">11:15 AM</span>
                </div>
                <div className="text-[12.5px] text-fog-white">
                  Not yet detected at predicted CAM 07. Auditing traffic delay, camera health, and neighbor feeds — route vector updating automatically.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
