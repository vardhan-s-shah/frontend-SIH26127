import React from 'react';
import { Card } from '../components/ui/Card';
import { PrimaryButton } from '../components/ui/Buttons';
import { ScreenId } from '../types';
import { Clock, Route, BarChart3, Info } from 'lucide-react';

interface TravelTimeScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const TravelTimeScreen: React.FC<TravelTimeScreenProps> = ({ onNavigate }) => {
  const cameraPairs = [
    { pair: 'CAM 01 → CAM 02', dist: '2.4 km', avgTime: '7 min', speed: '20.5 km/h', status: 'Moderate' },
    { pair: 'CAM 02 → CAM 04', dist: '1.8 km', avgTime: '4 min', speed: '27.0 km/h', status: 'Free Flow' },
    { pair: 'CAM 01 → CAM 09', dist: '3.7 km', avgTime: '15 min', speed: '14.8 km/h', status: 'Congested' },
    { pair: 'CAM 04 → CAM 15', dist: '5.2 km', avgTime: '11 min', speed: '28.3 km/h', status: 'Free Flow' },
  ];

  const frequentRoutes = [
    { rank: 1, route: 'CAM 01 → CAM 04 → CAM 09', count: 342, score: 90 },
    { rank: 2, route: 'CAM 02 → CAM 15 (Airport Highway)', count: 210, score: 65 },
    { rank: 3, route: 'CAM 05 → CAM 06 (University Belt)', count: 158, score: 48 },
    { rank: 4, route: 'CAM 11 → CAM 18 (Industrial Belt)', count: 114, score: 32 },
  ];

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[19px] font-bold text-fog-white">Travel-Time &amp; Usual-Route Analysis</h2>
          <p className="text-[12.5px] text-instrument-grey">
            Inter-camera spatial travel times, corridor velocity calculations, and daily origin-destination demand trends.
          </p>
        </div>
        <PrimaryButton onClick={() => onNavigate('congestion')} size="sm">
          Open Congestion Analytics →
        </PrimaryButton>
      </div>

      {/* Camera-Pair Travel Times Table */}
      <Card>
        <h3 className="font-bold text-[14px] text-fog-white border-b border-steel pb-2 mb-3">
          Camera-Pair Travel Times &amp; Segment Speeds
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-[13.5px] text-left">
            <thead>
              <tr className="text-instrument-grey border-b border-steel text-[11.5px] uppercase font-mono">
                <th className="py-2.5 px-3">Camera Corridor Pair</th>
                <th className="py-2.5 px-3">Road Distance</th>
                <th className="py-2.5 px-3">Mean Travel Time</th>
                <th className="py-2.5 px-3">Calculated Avg Speed</th>
                <th className="py-2.5 px-3 text-right">Flow State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel">
              {cameraPairs.map((cp, idx) => (
                <tr key={idx} className="hover:bg-raised/50 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-fog-white">{cp.pair}</td>
                  <td className="py-3 px-3 font-mono text-instrument-grey">{cp.dist}</td>
                  <td className="py-3 px-3 font-mono text-fog-white">{cp.avgTime}</td>
                  <td className="py-3 px-3 font-mono text-clear-green font-semibold">{cp.speed}</td>
                  <td className="py-3 px-3 text-right font-semibold text-[12.5px]">
                    <span className={cp.status === 'Congested' ? 'text-alert-red' : cp.status === 'Moderate' ? 'text-caution-amber' : 'text-clear-green'}>
                      {cp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 p-2.5 bg-raised border border-steel rounded-[8px] text-[12px] text-instrument-grey flex items-center gap-2">
          <Info size={16} className="text-signal-bright flex-shrink-0" />
          <span>
            Approximate segment speed is calculated from GIS road distance and travel time. Certified legal speed enforcement requires dedicated radar/laser calibration procedures.
          </span>
        </div>
      </Card>

      {/* Most Frequent Routes Ranking */}
      <Card className="space-y-4">
        <h3 className="font-bold text-[14px] text-fog-white border-b border-steel pb-2">
          Most Frequent Vehicle Corridors Today (Top Origin-Destination Pairs)
        </h3>

        <div className="space-y-3">
          {frequentRoutes.map((r) => (
            <div key={r.rank} className="flex items-center gap-3 py-1">
              <div className="w-7 h-7 rounded-full bg-raised border border-steel flex items-center justify-center font-mono font-bold text-xs text-fog-white flex-shrink-0">
                {r.rank}
              </div>
              <div className="w-[260px] font-mono font-semibold text-[13px] text-fog-white truncate flex-shrink-0">
                {r.route}
              </div>
              <div className="flex-1 h-2.5 bg-raised border border-steel/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-signal-blue to-signal-bright rounded-full"
                  style={{ width: `${r.score}%` }}
                />
              </div>
              <div className="w-16 text-right font-mono font-bold text-[13px] text-fog-white flex-shrink-0">
                {r.count} <span className="text-[11px] font-normal text-instrument-grey">trips</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
