import React from 'react';
import { Card } from '../components/ui/Card';
import { PlateBadge } from '../components/ui/PlateBadge';
import { PrimaryButton } from '../components/ui/Buttons';
import { MapPanel } from '../components/map/MapPanel';
import { ScreenId } from '../types';
import { Clock, MapPin, ArrowLeft, Navigation } from 'lucide-react';

interface TrajectoryTimelineScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const TrajectoryTimelineScreen: React.FC<TrajectoryTimelineScreenProps> = ({ onNavigate }) => {
  const timelineNodes = [
    {
      cam: 'CAM 01',
      time: '10:22:17 AM',
      location: 'Ashram Road, Sector 12',
      travelTime: '9m 58s',
      distance: '5.2 km',
      speed: '31.3 km/h',
      color: 'bg-clear-green',
    },
    {
      cam: 'CAM 04',
      time: '10:32:15 AM',
      location: 'Income Tax Flyover',
      travelTime: '10m 47s',
      distance: '6.8 km',
      speed: '37.8 km/h',
      color: 'bg-caution-amber',
    },
    {
      cam: 'CAM 09',
      time: '10:43:02 AM',
      location: 'University Circle',
      travelTime: '21m 09s',
      distance: '11.7 km',
      speed: '33.2 km/h',
      color: 'bg-caution-amber',
    },
    {
      cam: 'CAM 15',
      time: '11:04:11 AM',
      location: 'Airport Expressway',
      travelTime: '— (Last Sighting)',
      distance: '—',
      speed: '—',
      color: 'bg-alert-red',
    },
  ];

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('trajectory_map')}
            className="flex items-center gap-1.5 text-[13px] text-instrument-grey hover:text-fog-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to Map View</span>
          </button>
          <span className="text-steel">|</span>
          <div className="flex items-center gap-2">
            <span className="text-[14px] text-instrument-grey">Timeline for</span>
            <PlateBadge plate="GJ01AB1234" size="md" />
          </div>
        </div>

        <PrimaryButton onClick={() => onNavigate('prediction')} size="sm">
          Future Trajectory Prediction →
        </PrimaryButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Vertical Timeline Card */}
        <div className="lg:col-span-6">
          <Card className="space-y-6">
            <h3 className="font-bold text-[14px] text-fog-white border-b border-steel pb-2">
              Sighting Node Sequence &amp; Inter-Camera Metrics
            </h3>

            <div className="relative pl-6 space-y-6">
              {/* Connecting line */}
              <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-steel" />

              {timelineNodes.map((node, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Node Dot */}
                  <div className={`absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full ${node.color} border-2 border-void z-10`} />

                  <div className="flex-1 bg-raised p-3.5 rounded-card border border-steel space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono font-bold text-[14px] text-fog-white">{node.cam}</span>
                      <span className="font-mono text-[12px] text-instrument-grey">{node.time}</span>
                    </div>

                    <div className="text-[12.5px] text-fog-white font-medium flex items-center gap-1">
                      <MapPin size={13} className="text-instrument-grey" />
                      <span>{node.location}</span>
                    </div>

                    {node.travelTime !== '— (Last Sighting)' && (
                      <div className="text-[11.5px] font-mono text-instrument-grey pt-1.5 border-t border-steel/60 flex items-center justify-between">
                        <span>Segment Time: <strong className="text-fog-white">{node.travelTime}</strong></span>
                        <span>Distance: <strong className="text-fog-white">{node.distance}</strong></span>
                        <span>Speed: <strong className="text-clear-green">{node.speed}</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Side Interactive GIS Preview */}
        <div className="lg:col-span-6">
          <Card className="p-0 overflow-hidden flex flex-col h-full min-h-[380px]">
            <div className="p-3 px-4 bg-raised border-b border-steel font-bold text-xs text-fog-white flex items-center gap-2">
              <Navigation size={15} className="text-signal-bright" />
              <span>Route GIS Corridor Geometry</span>
            </div>

            <div className="flex-1 relative min-h-[340px]">
              <MapPanel
                showTrajectory={true}
                onNavigate={onNavigate}
                height="100%"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
