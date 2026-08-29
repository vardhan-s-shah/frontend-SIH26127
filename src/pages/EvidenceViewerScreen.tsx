import React from 'react';
import { Card } from '../components/ui/Card';
import { PlateBadge } from '../components/ui/PlateBadge';
import { PrimaryButton } from '../components/ui/Buttons';
import { ScreenId } from '../types';
import { ArrowLeft, Video, Download, ShieldCheck, Film } from 'lucide-react';

interface EvidenceViewerScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const EvidenceViewerScreen: React.FC<EvidenceViewerScreenProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('alerts')}
            className="flex items-center gap-1.5 text-[13px] text-instrument-grey hover:text-fog-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to Alert Queue</span>
          </button>
          <span className="text-steel">|</span>
          <div className="flex items-center gap-2">
            <span className="text-[14px] text-instrument-grey">Evidence Package:</span>
            <PlateBadge plate="GJ01AB1234" size="md" />
            <span className="text-[12px] font-bold text-alert-red bg-alert-red/15 px-2 py-0.5 rounded">
              Duplicate Plate Conflict
            </span>
          </div>
        </div>

        <PrimaryButton size="sm">
          <Download size={14} />
          Export Certified Evidence Audit PDF
        </PrimaryButton>
      </div>

      {/* Synchronized Dual Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Synchronized Stream 1 */}
        <div className="lg:col-span-4 flex flex-col">
          <Card className="p-0 overflow-hidden flex-1 flex flex-col">
            <div className="p-2.5 px-3 bg-raised border-b border-steel flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-fog-white">CAM 02 Stream Snapshot</span>
              <span className="text-instrument-grey">10:11:20 AM</span>
            </div>
            <div className="relative flex-1 bg-raised min-h-[220px] flex items-center justify-center border-b border-steel">
              <Film size={36} className="text-steel" />
              <div className="absolute top-2 left-2 bg-panel/90 px-2 py-0.5 rounded text-[10px] font-mono text-fog-white border border-steel">
                CAM 02 · Sector 12 Junction
              </div>
              <div className="absolute bottom-2 inset-x-2 h-1 bg-steel rounded overflow-hidden">
                <div className="w-[45%] h-full bg-signal-bright" />
              </div>
            </div>
          </Card>
        </div>

        {/* Synchronized Stream 2 */}
        <div className="lg:col-span-4 flex flex-col">
          <Card className="p-0 overflow-hidden flex-1 flex flex-col">
            <div className="p-2.5 px-3 bg-raised border-b border-steel flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-fog-white">CAM 15 Stream Snapshot</span>
              <span className="text-instrument-grey">10:26:18 AM</span>
            </div>
            <div className="relative flex-1 bg-raised min-h-[220px] flex items-center justify-center border-b border-steel">
              <Film size={36} className="text-steel" />
              <div className="absolute top-2 left-2 bg-panel/90 px-2 py-0.5 rounded text-[10px] font-mono text-fog-white border border-steel">
                CAM 15 · Airport Expressway
              </div>
              <div className="absolute bottom-2 inset-x-2 h-1 bg-steel rounded overflow-hidden">
                <div className="w-[45%] h-full bg-signal-bright" />
              </div>
            </div>
          </Card>
        </div>

        {/* Evidence Metadata Inspector Panel */}
        <div className="lg:col-span-4 flex flex-col">
          <Card className="flex-1 space-y-3">
            <h3 className="font-bold text-[14px] text-fog-white border-b border-steel pb-2">
              Forensic Evidence Summary
            </h3>

            <div className="space-y-2 text-[12.5px]">
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Plate Registration</span>
                <span className="font-mono font-bold text-fog-white">GJ01AB1234</span>
              </div>
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Vehicle Class</span>
                <span className="font-semibold text-fog-white">Sedan (White)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">OCR Confidence</span>
                <span className="font-mono text-clear-green font-bold">94.2%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Anomaly Classification</span>
                <span className="font-bold text-alert-red">Duplicate / Cloned Plate</span>
              </div>
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Physics Assessment</span>
                <span className="font-mono text-alert-red font-bold">Requires 74.8 km/h speed</span>
              </div>
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Verification Status</span>
                <span className="font-bold text-caution-amber">Pending Operator Sign-off</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <PrimaryButton className="flex-1" size="sm">
                Confirm &amp; Issue Citation
              </PrimaryButton>
              <PrimaryButton variant="outline" className="flex-1" size="sm">
                Dismiss as OCR Blur
              </PrimaryButton>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
