import React from 'react';
import { Card } from '../components/ui/Card';
import { PlateBadge } from '../components/ui/PlateBadge';
import { PrimaryButton } from '../components/ui/Buttons';
import { ScreenId } from '../types';
import { ShieldAlert, Download, Camera, Info } from 'lucide-react';

interface ViolationDetectionScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ViolationDetectionScreen: React.FC<ViolationDetectionScreenProps> = ({ onNavigate }) => {
  const violationTypes = [
    { type: 'Speeding Overrun', evidence: 'Calibrated radar/camera speed vector & signed road limit' },
    { type: 'Red-Light Signal Crossing', evidence: 'Signal state timeline, stop-line geometry, vehicle trajectory' },
    { type: 'Stop-Line Encroachment', evidence: 'Stop-line spatial vector & vehicle front bumper intersection event' },
    { type: 'Wrong-Way Driving', evidence: 'Legal lane direction vector vs vehicle velocity vector' },
    { type: 'Illegal Lane Cut / Turn', evidence: 'Lane geometry lines & solid line crossing event' },
  ];

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[19px] font-bold text-fog-white">Traffic-Violation Automated Detection</h2>
          <p className="text-[12.5px] text-instrument-grey">
            Rule-based and neural video analytics for legal traffic infractions with digital evidence packaging.
          </p>
        </div>
      </div>

      {/* Required Evidence Reference Table */}
      <Card>
        <h3 className="font-bold text-[14px] text-fog-white border-b border-steel pb-2 mb-3">
          Infraction Taxonomy &amp; Standardized Evidence Requirements
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px] text-left">
            <thead>
              <tr className="text-instrument-grey border-b border-steel text-[11.5px] uppercase font-mono">
                <th className="py-2.5 px-3">Violation Category</th>
                <th className="py-2.5 px-3">Mandatory Forensic Evidence Package</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel">
              {violationTypes.map((v, idx) => (
                <tr key={idx} className="hover:bg-raised/50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-alert-red">{v.type}</td>
                  <td className="py-2.5 px-3 text-fog-white">{v.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Red Light Violation Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Video Canvas with Red Line Overlay */}
        <div className="lg:col-span-7 flex flex-col">
          <Card className="p-0 overflow-hidden flex-1 flex flex-col min-h-[260px]">
            <div className="p-2.5 px-3 bg-raised border-b border-steel flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-fog-white">CAM 11 · Junction 5 · Red-Light Trigger</span>
              <span className="text-alert-red font-bold">10:41:03 AM</span>
            </div>

            <div className="relative flex-1 bg-void overflow-hidden min-h-[230px] flex items-center justify-center select-none">
              {/* Virtual Stop Line overlay */}
              <svg className="absolute inset-0 w-full h-full">
                <line x1="0" y1="160" x2="100%" y2="160" stroke="#F0473F" strokeWidth="4" strokeDasharray="8 6" />
                <polyline points="100,220 220,170 340,140 460,110" fill="none" stroke="#4C8DFF" strokeWidth="3" />
              </svg>

              <div className="absolute top-3 right-3 px-2.5 py-1 bg-alert-red text-white font-mono font-bold text-[11px] rounded shadow">
                RED PHASE: +2.3 SECONDS
              </div>

              <div className="absolute bottom-3 left-3 bg-panel/90 px-2.5 py-1 rounded border border-steel text-[11px] font-mono text-instrument-grey">
                STOP-LINE CROSSED BY 1.8 METERS
              </div>
            </div>
          </Card>
        </div>

        {/* Evidence Metadata Inspector */}
        <div className="lg:col-span-5 flex flex-col">
          <Card className="flex-1 space-y-3">
            <h3 className="font-bold text-[14px] text-fog-white border-b border-steel pb-2">
              Violation Evidence Metadata
            </h3>

            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Offending Vehicle</span>
                <PlateBadge plate="DL3CAY1122" size="sm" />
              </div>
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Violation Type</span>
                <span className="font-bold text-alert-red">Red-Light Crossing</span>
              </div>
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Signal Phase</span>
                <span className="font-mono text-alert-red font-semibold">Red (2.3s into phase)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Stop Line Encroachment</span>
                <span className="font-mono text-fog-white">Crossed by 1.8 m</span>
              </div>
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Trajectory Vector</span>
                <span className="font-mono text-fog-white">Continuous through junction</span>
              </div>
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Detection Confidence</span>
                <span className="font-mono text-clear-green font-bold">91.8%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Review Status</span>
                <span className="font-bold text-caution-amber">Pending Verification</span>
              </div>
            </div>

            <div className="pt-2">
              <PrimaryButton className="w-full">
                <Download size={15} />
                Download Formal Violation Report PDF
              </PrimaryButton>
            </div>
          </Card>
        </div>
      </div>

      <div className="p-3 bg-raised border border-steel rounded-[8px] text-[12px] text-instrument-grey flex items-center gap-2">
        <Info size={16} className="text-signal-bright flex-shrink-0" />
        <span>
          Environmental factors like optical glare, heavy rain, or obscured plates can cause false alerts. All flagged infractions require human operator validation before issuing legal challans.
        </span>
      </div>
    </div>
  );
};
