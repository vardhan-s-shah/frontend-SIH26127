import React from 'react';
import { Card } from '../components/ui/Card';
import { MetricBar } from '../components/ui/MetricBar';
import { StatusPill } from '../components/ui/StatusPill';
import { PrimaryButton } from '../components/ui/Buttons';
import { ScreenId } from '../types';
import { Layers, ShieldAlert, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface CrossCamReIDScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const CrossCamReIDScreen: React.FC<CrossCamReIDScreenProps> = ({ onNavigate }) => {
  const metrics = [
    { label: 'Plate Match', score: 98 },
    { label: 'Colour Match', score: 92 },
    { label: 'Vehicle Type Match', score: 100 },
    { label: 'Visual Appearance Similarity', score: 87 },
    { label: 'Time-Gap Plausibility', score: 81 },
    { label: 'Road-Distance Feasibility', score: 74 },
    { label: 'Speed Feasibility', score: 40, isWarning: true, valueText: '40% — FLAGGED (74.8 km/h required)' },
  ];

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-[19px] font-bold text-fog-white">Cross-Camera Vehicle Re-Identification (ReID)</h2>
          <p className="text-[12.5px] text-instrument-grey">
            Deep appearance embedding comparison, spatio-temporal constraint verification, and physics feasibility validation.
          </p>
        </div>
        <div className="flex gap-2">
          <PrimaryButton onClick={() => onNavigate('trajectory_map')} size="sm">
            View Trajectory Map →
          </PrimaryButton>
        </div>
      </div>

      {/* Source vs Candidate Snapshot Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Source Camera Card */}
        <Card className="space-y-3">
          <div className="flex justify-between items-center border-b border-steel pb-2">
            <span className="font-bold text-[14px] text-fog-white font-mono">Source — CAM 02</span>
            <span className="text-[11.5px] text-instrument-grey font-mono">10:11:20 AM</span>
          </div>

          <div className="h-[130px] bg-raised border border-steel rounded-[8px] flex items-center justify-center text-instrument-grey text-xs">
            🚙 Source Vehicle Snapshot (MG Road Junction)
          </div>

          <div className="space-y-1 text-[13px]">
            <div className="flex justify-between py-1 border-b border-steel">
              <span className="text-instrument-grey">Plate Number</span>
              <span className="font-mono font-bold text-fog-white">GJ01AB1234</span>
            </div>
            <div className="flex justify-between py-1 border-b border-steel">
              <span className="text-instrument-grey">Colour / Type</span>
              <span className="font-semibold text-fog-white">Pearl White · Sedan</span>
            </div>
          </div>
        </Card>

        {/* Candidate Camera Card */}
        <Card className="space-y-3">
          <div className="flex justify-between items-center border-b border-steel pb-2">
            <span className="font-bold text-[14px] text-fog-white font-mono">Candidate Match — CAM 15</span>
            <span className="text-[11.5px] text-instrument-grey font-mono">10:26:18 AM</span>
          </div>

          <div className="h-[130px] bg-raised border border-steel rounded-[8px] flex items-center justify-center text-instrument-grey text-xs">
            🚙 Candidate Match Snapshot (Airport Road)
          </div>

          <div className="space-y-1 text-[13px]">
            <div className="flex justify-between py-1 border-b border-steel">
              <span className="text-instrument-grey">Plate Number</span>
              <span className="font-mono font-bold text-fog-white">GJ01AB1234</span>
            </div>
            <div className="flex justify-between py-1 border-b border-steel">
              <span className="text-instrument-grey">Colour / Type</span>
              <span className="font-semibold text-fog-white">Pearl White · Sedan</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Matching Signal Breakdown */}
      <Card className="space-y-4">
        <h3 className="font-bold text-[14px] text-fog-white border-b border-steel pb-2">
          Matching Signal Breakdown (7-Vector Feature Space)
        </h3>

        <div className="space-y-2">
          {metrics.map((m, idx) => (
            <MetricBar
              key={idx}
              label={m.label}
              value={m.score}
              isWarning={m.isWarning}
              valueText={m.valueText}
            />
          ))}
        </div>

        {/* ReID Final Evaluation Callout */}
        <div className="pt-3 border-t border-steel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-raised p-4 rounded-card">
          <div>
            <div className="text-[14px] font-bold text-fog-white">
              Overall ReID Match Confidence: <span className="text-caution-amber font-mono font-bold">62%</span>
            </div>
            <div className="text-[12px] text-instrument-grey mt-0.5">
              Single signal failure detected: Speed required between CAM 02 &amp; CAM 15 exceeds urban road threshold.
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-[8px] bg-alert-red/15 text-alert-red border border-alert-red/30 text-[12.5px] font-bold flex items-center gap-2">
            <XCircle size={18} />
            <span>REJECTED — IMPOSSIBLE SPEED (74.8 km/h)</span>
          </div>
        </div>

        <div className="text-[12px] text-instrument-grey">
          <span className="font-bold text-fog-white">Ops Safety Policy:</span> Uncertain or rejected matches are never automatically treated as fact in surveillance tracking — they are routed to the Operator Alert Queue for manual evidence review.
        </div>
      </Card>
    </div>
  );
};
