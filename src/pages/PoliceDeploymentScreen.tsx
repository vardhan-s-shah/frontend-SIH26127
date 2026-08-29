import React from 'react';
import { Card } from '../components/ui/Card';
import { StatusPill } from '../components/ui/StatusPill';
import { PrimaryButton } from '../components/ui/Buttons';
import { ScreenId } from '../types';
import { Shield, Users, Clock, MapPin, CheckCircle } from 'lucide-react';

interface PoliceDeploymentScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const PoliceDeploymentScreen: React.FC<PoliceDeploymentScreenProps> = ({ onNavigate }) => {
  const deployments = [
    { loc: 'MG Road Junction', time: '8:00 – 10:30 AM', reason: 'Repeated peak congestion + signal overrun violations', priority: 'High', status: 'high' },
    { loc: 'City Center Flyover', time: '5:30 – 8:00 PM', reason: 'Heavy evening peak congestion & bottlenecking', priority: 'High', status: 'high' },
    { loc: 'Ring Road, Sector 12', time: '1:00 – 3:00 PM', reason: 'Unusual mid-day traffic flow anomaly detected', priority: 'Medium', status: 'medium' },
    { loc: 'University Road Corridor', time: '7:30 – 9:00 AM', reason: 'School-hour pedestrian safety & crosswalk risk', priority: 'Medium', status: 'medium' },
  ];

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[19px] font-bold text-fog-white">Traffic-Police Deployment Support</h2>
          <p className="text-[12.5px] text-instrument-grey">
            AI-assisted patrol and traffic personnel allocation recommendations based on congestion patterns and violations.
          </p>
        </div>
        <PrimaryButton onClick={() => onNavigate('alerts')} size="sm">
          Open Alert Panel →
        </PrimaryButton>
      </div>

      {/* Deployment Recommendation Table */}
      <Card>
        <h3 className="font-bold text-[14px] text-fog-white border-b border-steel pb-2 mb-3 flex items-center justify-between">
          <span>AI Deployment Schedule Recommendations</span>
          <span className="text-[11.5px] font-mono text-clear-green font-semibold">● ACTIVE SUGGESTIONS</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-[13.5px] text-left">
            <thead>
              <tr className="text-instrument-grey border-b border-steel text-[11.5px] uppercase font-mono">
                <th className="py-2.5 px-3">Target Location</th>
                <th className="py-2.5 px-3">Recommended Window</th>
                <th className="py-2.5 px-3">Trigger Reason</th>
                <th className="py-2.5 px-3 text-right">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel">
              {deployments.map((d, idx) => (
                <tr key={idx} className="hover:bg-raised/50 transition-colors">
                  <td className="py-3 px-3 font-bold text-fog-white flex items-center gap-1.5">
                    <MapPin size={14} className="text-signal-bright" />
                    {d.loc}
                  </td>
                  <td className="py-3 px-3 font-mono text-fog-white">{d.time}</td>
                  <td className="py-3 px-3 text-instrument-grey">{d.reason}</td>
                  <td className="py-3 px-3 text-right">
                    <StatusPill status={d.status} label={d.priority} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="p-3 bg-raised border border-steel rounded-[8px] text-[12px] text-instrument-grey">
        <span className="font-bold text-fog-white">Command Notice:</span> These are system-generated recommendations based on anomaly frequency. The final dispatch decision remains with authorized traffic officers.
      </div>
    </div>
  );
};
