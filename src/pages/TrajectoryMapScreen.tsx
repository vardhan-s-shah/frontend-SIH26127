import React from 'react';
import { Card } from '../components/ui/Card';
import { PlateBadge } from '../components/ui/PlateBadge';
import { SignatureGradientBar } from '../components/ui/SignatureGradientBar';
import { PrimaryButton } from '../components/ui/Buttons';
import { MapPanel } from '../components/map/MapPanel';
import { ScreenId } from '../types';
import { Navigation, Clock, MapPin, Gauge, ArrowLeft } from 'lucide-react';

interface TrajectoryMapScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const TrajectoryMapScreen: React.FC<TrajectoryMapScreenProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Back button & vehicle header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('vehicles')}
            className="flex items-center gap-1.5 text-[13px] text-instrument-grey hover:text-fog-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to Vehicles</span>
          </button>
          <span className="text-steel">|</span>
          <div className="flex items-center gap-2">
            <span className="text-[14px] text-instrument-grey">Trajectory for</span>
            <PlateBadge plate="GJ01AB1234" size="md" />
          </div>
        </div>

        <PrimaryButton variant="outline" size="sm" onClick={() => onNavigate('trajectory_timeline')}>
          Switch to Timeline View →
        </PrimaryButton>
      </div>

      {/* Trajectory Map Canvas */}
      <Card className="p-0 overflow-hidden relative min-h-[400px] flex flex-col">
        <div className="p-3 px-4 bg-raised border-b border-steel flex items-center justify-between z-10 text-xs">
          <div className="flex items-center gap-2 font-bold text-fog-white">
            <Navigation size={16} className="text-signal-bright" />
            <span>Multi-Camera Trajectory Reconstruction (Signature Recency &amp; Speed Gradient)</span>
          </div>
          <div className="flex items-center gap-3 text-instrument-grey font-mono text-[11px]">
            <span>Start: CAM 01 (10:22 AM)</span>
            <span>→</span>
            <span>Current: CAM 15 (11:04 AM)</span>
          </div>
        </div>

        {/* Interactive Leaflet Map with Gradient Polyline */}
        <div className="relative flex-1 min-h-[360px]">
          <MapPanel
            showTrajectory={true}
            onNavigate={onNavigate}
            height="100%"
          />

          {/* Signature Gradient Bar Legend Overlay */}
          <div className="absolute bottom-4 right-4 bg-panel/95 border border-steel p-2.5 rounded-card w-[260px] z-[1000] backdrop-blur-md">
            <div className="text-[11px] font-bold text-fog-white mb-1">Signature Trajectory Recency</div>
            <SignatureGradientBar showLegend />
          </div>
        </div>
      </Card>

      {/* Trajectory Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <Card>
          <div className="text-[12px] font-medium text-instrument-grey flex items-center gap-1.5">
            <Clock size={15} />
            <span>Total Travel Time</span>
          </div>
          <div className="text-[20px] font-bold font-mono text-fog-white mt-1 tabular-nums">
            41 min 54 sec
          </div>
        </Card>

        <Card>
          <div className="text-[12px] font-medium text-instrument-grey flex items-center gap-1.5">
            <MapPin size={15} />
            <span>Total Distance</span>
          </div>
          <div className="text-[20px] font-bold font-mono text-fog-white mt-1 tabular-nums">
            23.7 km
          </div>
        </Card>

        <Card>
          <div className="text-[12px] font-medium text-instrument-grey flex items-center gap-1.5">
            <Gauge size={15} />
            <span>Avg Travel Speed</span>
          </div>
          <div className="text-[20px] font-bold font-mono text-clear-green mt-1 tabular-nums">
            34 km/h
          </div>
        </Card>

        <Card>
          <div className="text-[12px] font-medium text-instrument-grey flex items-center gap-1.5">
            <Gauge size={15} />
            <span>Peak Segment Speed</span>
          </div>
          <div className="text-[20px] font-bold font-mono text-caution-amber mt-1 tabular-nums">
            68 km/h
          </div>
        </Card>
      </div>
    </div>
  );
};
