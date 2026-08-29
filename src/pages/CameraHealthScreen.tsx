import React from 'react';
import { Card } from '../components/ui/Card';
import { StatusPill } from '../components/ui/StatusPill';
import { AlertCard } from '../components/ui/AlertCard';
import { PrimaryButton } from '../components/ui/Buttons';
import { ScreenId } from '../types';
import { Video, ShieldCheck, RefreshCw, AlertTriangle, CheckCircle2, Wrench } from 'lucide-react';

interface CameraHealthScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const CameraHealthScreen: React.FC<CameraHealthScreenProps> = ({ onNavigate }) => {
  const cameras = [
    { id: 'CAM 01', location: 'Ashram Road, Sector 12', status: 'healthy', updated: '10:34:21 AM', fps: '30 FPS', ocrConf: '96%' },
    { id: 'CAM 02', location: 'MG Road Junction', status: 'healthy', updated: '10:34:18 AM', fps: '30 FPS', ocrConf: '94%' },
    { id: 'CAM 03', location: 'Paldi Bus Station', status: 'warning', updated: '10:33:58 AM', fps: '22 FPS', ocrConf: '84%' },
    { id: 'CAM 04', location: 'Income Tax Flyover', status: 'offline', updated: '10:20:11 AM', fps: '0 FPS', ocrConf: '0%' },
    { id: 'CAM 05', location: 'SG Highway Commerce Zone', status: 'healthy', updated: '10:34:25 AM', fps: '30 FPS', ocrConf: '97%' },
    { id: 'CAM 06', location: 'University Road', status: 'healthy', updated: '10:34:12 AM', fps: '30 FPS', ocrConf: '95%' },
  ];

  const verificationChecklist = [
    'Camera online & sending continuous video stream',
    'Video stream not frozen, blacked-out or corrupted',
    'NTP timecode clocks synchronized within 15ms',
    'Video ingestion frame rate stable at >= 25 FPS',
    'Vehicle detection rate within historical baseline band',
    'ANPR confidence trend operating within normal thresholds',
    'No physically impossible duplicate observations detected',
    'Camera vector correctly aligned to road network graph',
  ];

  const systemActionRules = [
    { status: 'healthy', label: 'Healthy', action: 'Use normally, confidence score unchanged' },
    { status: 'warning', label: 'Low Quality', action: 'Reduce confidence weight, trigger re-process' },
    { status: 'offline', label: 'No Signal', action: 'Failover to neighbor cameras, mark route gap' },
    { status: 'warning', label: 'Wrong Timestamp', action: 'Flag sync error, correct or reject events' },
    { status: 'offline', label: 'Route Fault', action: 'Evaluate road graph & alternative feeds' },
  ];

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-[17px] sm:text-[19px] font-bold text-fog-white">Camera Network Health &amp; Automated Verification</h2>
          <p className="text-[11.5px] sm:text-[12.5px] text-instrument-grey">
            Self-monitoring sensor grid: automated stream integrity verification, clock sync audit, and automated failover.
          </p>
        </div>
        <PrimaryButton variant="outline" size="sm" className="w-full sm:w-auto">
          <RefreshCw size={14} />
          Run System Diagnostics
        </PrimaryButton>
      </div>

      {/* 4 Health Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <Card>
          <div className="text-[12px] font-medium text-instrument-grey">Healthy Cameras</div>
          <div className="text-[24px] font-bold font-mono text-clear-green mt-1">34</div>
        </Card>
        <Card>
          <div className="text-[12px] font-medium text-instrument-grey">Warning / Degrading</div>
          <div className="text-[24px] font-bold font-mono text-caution-amber mt-1">5</div>
        </Card>
        <Card>
          <div className="text-[12px] font-medium text-instrument-grey">Offline / No Signal</div>
          <div className="text-[24px] font-bold font-mono text-alert-red mt-1">6</div>
        </Card>
        <Card>
          <div className="text-[12px] font-medium text-instrument-grey">Total Network Nodes</div>
          <div className="text-[24px] font-bold font-mono text-fog-white mt-1">45</div>
        </Card>
      </div>

      {/* Camera Inventory Table */}
      <Card>
        <h3 className="font-bold text-[13.5px] sm:text-[14px] text-fog-white border-b border-steel pb-2 mb-3">
          Camera Network Status &amp; Live Ingestion Metrics
        </h3>

        {/* Scrollable Table Container for mobile & narrow widths */}
        <div className="overflow-x-auto -mx-1 px-1">
          <table className="w-full min-w-[580px] text-[13px] text-left">
            <thead>
              <tr className="text-instrument-grey border-b border-steel text-[11px] sm:text-[11.5px] uppercase font-mono">
                <th className="py-2.5 px-3 whitespace-nowrap min-w-[100px]">Camera ID</th>
                <th className="py-2.5 px-3 whitespace-nowrap min-w-[180px]">Location</th>
                <th className="py-2.5 px-3 whitespace-nowrap min-w-[90px]">Status</th>
                <th className="py-2.5 px-3 whitespace-nowrap min-w-[90px]">Frame Rate</th>
                <th className="py-2.5 px-3 whitespace-nowrap min-w-[80px]">OCR Conf</th>
                <th className="py-2.5 px-3 text-right whitespace-nowrap min-w-[100px]">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel">
              {cameras.map((cam) => {
                const isOffline = cam.status === 'offline';
                return (
                  <tr
                    key={cam.id}
                    className={`transition-colors ${
                      isOffline ? 'bg-alert-red/10 border-l-4 border-l-alert-red' : 'hover:bg-raised/50'
                    }`}
                  >
                    <td className="py-3 px-3 font-mono font-bold text-fog-white whitespace-nowrap">{cam.id}</td>
                    <td className="py-3 px-3 text-fog-white whitespace-nowrap">{cam.location}</td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <StatusPill status={cam.status} />
                    </td>
                    <td className="py-3 px-3 font-mono text-instrument-grey whitespace-nowrap">{cam.fps}</td>
                    <td className="py-3 px-3 font-mono text-clear-green font-semibold whitespace-nowrap">{cam.ocrConf}</td>
                    <td className="py-3 px-3 text-right font-mono text-instrument-grey whitespace-nowrap">{cam.updated}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Verification & System Action Rules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Verification Checklist */}
        <Card className="space-y-3">
          <h3 className="font-bold text-[13.5px] sm:text-[14px] text-fog-white border-b border-steel pb-2 flex items-center gap-2">
            <ShieldCheck size={16} className="text-clear-green flex-shrink-0" />
            <span>Automated 8-Point Verification Checklist</span>
          </h3>

          <ul className="space-y-2">
            {verificationChecklist.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-[12px] sm:text-[12.5px] text-fog-white border-b border-steel/50 pb-2">
                <CheckCircle2 size={16} className="text-clear-green flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* System Action Matrix */}
        <Card className="space-y-3">
          <h3 className="font-bold text-[13.5px] sm:text-[14px] text-fog-white border-b border-steel pb-2">
            Sensor Fault → Automated System Action Matrix
          </h3>

          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full min-w-[480px] text-[12px] sm:text-[12.5px] text-left">
              <thead>
                <tr className="text-instrument-grey border-b border-steel text-[11px] uppercase font-mono">
                  <th className="py-2 px-2 whitespace-nowrap min-w-[120px]">Fault Condition</th>
                  <th className="py-2 px-2 whitespace-nowrap">System Automated Failover Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-steel">
                {systemActionRules.map((rule, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 px-2 whitespace-nowrap">
                      <StatusPill status={rule.status} label={rule.label} />
                    </td>
                    <td className="py-2.5 px-2 text-fog-white">{rule.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Active Recovery Alert Card */}
      <AlertCard
        severity="red"
        icon={<Wrench className="text-alert-red" />}
        title="Active Sensor Recovery — CAM 04 (Income Tax Flyover)"
        subtitle="No stream signal detected since 10:20:11 AM. Compared against neighboring CAM 03 & CAM 05 feeds. Live network data marked UNAVAILABLE. Failover rerouted."
        actionBadge={
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] sm:text-[11.5px] font-bold text-clear-green bg-clear-green/10 border border-clear-green/30 px-2.5 py-0.5 rounded">
              Switched to CAM 03 / CAM 05 Alternate Ingestion
            </span>
          </div>
        }
      />
    </div>
  );
};
