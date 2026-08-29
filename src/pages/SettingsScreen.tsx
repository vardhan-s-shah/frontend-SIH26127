import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { PrimaryButton } from '../components/ui/Buttons';
import { ScreenId } from '../types';
import { Settings, Sliders, Shield, Database, Save, Check } from 'lucide-react';

interface SettingsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onNavigate }) => {
  const [anprThreshold, setAnprThreshold] = useState(85);
  const [reidThreshold, setReidThreshold] = useState(75);
  const [autoRecovery, setAutoRecovery] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[19px] font-bold text-fog-white">System Settings &amp; AI Model Parameters</h2>
          <p className="text-[12.5px] text-instrument-grey">
            Configure OCR confidence cutoffs, ReID matching thresholds, camera ingestion parameters, and operator access controls.
          </p>
        </div>
        <PrimaryButton onClick={handleSave} size="sm">
          {saved ? (
            <span className="flex items-center gap-1.5 text-clear-green">
              <Check size={16} /> Saved Successfully
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Save size={16} /> Save Configuration
            </span>
          )}
        </PrimaryButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* AI Thresholds Panel */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="space-y-4">
            <h3 className="font-bold text-[14px] text-fog-white border-b border-steel pb-2 flex items-center gap-2">
              <Sliders size={16} className="text-signal-bright" />
              <span>ANPR &amp; ReID Threshold Tuning</span>
            </h3>

            {/* Slider 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[13px]">
                <span className="text-fog-white font-medium">Minimum ANPR OCR Confidence Cutoff</span>
                <span className="font-mono text-clear-green font-bold">{anprThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="99"
                value={anprThreshold}
                onChange={(e) => setAnprThreshold(Number(e.target.value))}
                className="w-full h-2 bg-raised border border-steel/40 rounded-lg appearance-none cursor-pointer accent-signal-blue"
              />
              <p className="text-[11.5px] text-instrument-grey">
                Plate readings below this confidence score will be marked as "Uncertain" and sent for temporal voting or manual review.
              </p>
            </div>

            {/* Slider 2 */}
            <div className="space-y-1.5 pt-2 border-t border-steel/60">
              <div className="flex justify-between text-[13px]">
                <span className="text-fog-white font-medium">Cross-Camera ReID Match Threshold</span>
                <span className="font-mono text-signal-bright font-bold">{reidThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={reidThreshold}
                onChange={(e) => setReidThreshold(Number(e.target.value))}
                className="w-full h-2 bg-raised border border-steel/40 rounded-lg appearance-none cursor-pointer accent-signal-blue"
              />
              <p className="text-[11.5px] text-instrument-grey">
                Minimum overall multi-vector similarity score required to automatically join two vehicle sightings into a single trajectory.
              </p>
            </div>
          </Card>
        </div>

        {/* System Automation & Security Panel */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="space-y-4">
            <h3 className="font-bold text-[14px] text-fog-white border-b border-steel pb-2 flex items-center gap-2">
              <Shield size={16} className="text-clear-green" />
              <span>Automated Sensor Failover &amp; Policy Settings</span>
            </h3>

            <div className="flex items-center justify-between py-2 border-b border-steel">
              <div>
                <div className="text-[13px] font-semibold text-fog-white">Self-Checking Camera Recovery</div>
                <div className="text-[11.5px] text-instrument-grey">Automatically switch to neighbor feeds when camera drops signal</div>
              </div>
              <button
                onClick={() => setAutoRecovery(!autoRecovery)}
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  autoRecovery ? 'bg-clear-green' : 'bg-steel'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-void shadow-md transform transition-transform ${
                  autoRecovery ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="space-y-2 text-[12.5px]">
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">Database PostGIS Ingestion Engine</span>
                <span className="font-mono text-fog-white">PostgreSQL 16 + PostGIS 3.4</span>
              </div>
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">System Role</span>
                <span className="font-mono text-clear-green font-bold">SOC Level 3 Operator</span>
              </div>
              <div className="flex justify-between py-1 border-b border-steel">
                <span className="text-instrument-grey">API Gateway Security</span>
                <span className="font-mono text-fog-white">mTLS / OAuth2 Bearer Tokens</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
