import React from 'react';
import { Card } from '../components/ui/Card';
import { PrimaryButton } from '../components/ui/Buttons';
import { ScreenId } from '../types';
import { Building2, Info, ArrowUpRight } from 'lucide-react';

interface InfrastructureScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const InfrastructureScreen: React.FC<InfrastructureScreenProps> = ({ onNavigate }) => {
  const priorityList = [
    { rank: 1, name: 'MG Road Junction', score: 92, tag: 'Intersection Improvement', type: 'High Priority' },
    { rank: 2, name: 'City Center Flyover Approach', score: 85, tag: 'Flyover Grade Study', type: 'High Priority' },
    { rank: 3, name: 'Ring Road, Sector 12 Corridor', score: 71, tag: 'Road Widening Study', type: 'Medium Priority' },
    { rank: 4, name: 'Airport Road Interchange', score: 58, tag: 'Signal Timing Review', type: 'Medium Priority' },
  ];

  const studies = [
    {
      title: 'Road Development & Bypass',
      criteria: ['Persistent extreme delay (>30 mins)', 'Origin-destination demand high', 'Limited alternative bypass routes'],
    },
    {
      title: 'Road Widening Study',
      criteria: ['Queue length exceeds lane capacity', 'Safety & collision risk elevated', 'Land acquisition feasibility verified'],
    },
    {
      title: 'Intersection Improvement',
      criteria: ['Severe phase delay & queue spillback', 'Signal timing optimization needed', 'Pedestrian refuge improvement'],
    },
    {
      title: 'Flyover / Grade Separation',
      criteria: ['Evaluated only after signal optimization', 'Continuous multi-corridor bottleneck'],
    },
  ];

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[19px] font-bold text-fog-white">Road &amp; Infrastructure Analysis</h2>
          <p className="text-[12.5px] text-instrument-grey">
            Municipal planning decision support based on multi-factor congestion pressure scores and bottleneck duration.
          </p>
        </div>
        <PrimaryButton onClick={() => onNavigate('police_deployment')} size="sm">
          Police Deployment Support →
        </PrimaryButton>
      </div>

      {/* Infrastructure Priority Score Ranking */}
      <Card className="space-y-4">
        <div className="flex justify-between items-center border-b border-steel pb-2">
          <h3 className="font-bold text-[14px] text-fog-white">
            Infrastructure Priority Score (Ranked Bottlenecks)
          </h3>
          <span className="text-[11px] font-mono text-instrument-grey">AI MULTI-CRITERIA SCORING</span>
        </div>

        <div className="space-y-3">
          {priorityList.map((item) => (
            <div key={item.rank} className="flex items-center gap-3 py-1">
              <div className="w-7 h-7 rounded-full bg-raised border border-steel flex items-center justify-center font-mono font-bold text-xs text-fog-white flex-shrink-0">
                {item.rank}
              </div>
              <div className="w-[220px] font-bold text-[13.5px] text-fog-white truncate flex-shrink-0">
                {item.name}
              </div>
              <div className="flex-1 h-2.5 bg-raised border border-steel/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-signal-blue to-alert-red rounded-full"
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <div className="w-10 font-mono font-bold text-[13.5px] text-fog-white text-right flex-shrink-0">
                {item.score}
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-raised border border-steel text-instrument-grey whitespace-nowrap flex-shrink-0">
                {item.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="text-[11.5px] text-instrument-grey pt-2 border-t border-steel/60">
          Score combines traffic volume, travel-time delay, queue frequency, capacity pressure, and origin-destination demand.
        </div>
      </Card>

      {/* Engineering Study Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {studies.map((s, idx) => (
          <Card key={idx} className="bg-raised border border-steel flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-[13.5px] text-fog-white mb-2">{s.title}</h4>
              <ul className="space-y-1.5 text-[12px] text-instrument-grey list-disc pl-4 leading-relaxed">
                {s.criteria.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      <div className="p-3 bg-raised border border-steel rounded-[8px] text-[12px] text-instrument-grey flex items-center gap-2">
        <Info size={16} className="text-signal-bright flex-shrink-0" />
        <span>
          This platform provides quantitative data for municipal engineering — final infrastructure construction decisions remain with authorized civil engineers and city planners.
        </span>
      </div>
    </div>
  );
};
