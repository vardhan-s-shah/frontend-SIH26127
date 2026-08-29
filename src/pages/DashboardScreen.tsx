import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { PlateBadge } from '../components/ui/PlateBadge';
import { MapPanel } from '../components/map/MapPanel';
import { CITY_MAP_CONFIG, MOCK_CAMERA_NODES } from '../data/mockMapData';
import { ScreenId, Detection } from '../types';
import { Activity, Car, Gauge, Radio, ArrowUpRight, ArrowDownRight, MapPin, Eye } from 'lucide-react';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

const INITIAL_DETECTIONS: Detection[] = [
  { id: '1', plate: 'GJ01AB1234', timestamp: '10:32:15', cameraId: 'CAM 01', location: 'Ashram Road, Sector 12', confidence: 96, vehicleType: 'Car', vehicleColor: 'White' },
  { id: '2', plate: 'MH12CD5678', timestamp: '10:32:12', cameraId: 'CAM 04', location: 'Income Tax Flyover', confidence: 94, vehicleType: 'SUV', vehicleColor: 'Black' },
  { id: '3', plate: 'HR26DK9812', timestamp: '10:32:10', cameraId: 'CAM 02', location: 'MG Road Junction', confidence: 91, vehicleType: 'Truck', vehicleColor: 'Blue' },
  { id: '4', plate: 'RJ14CT2776', timestamp: '10:32:09', cameraId: 'CAM 09', location: 'University Circle', confidence: 98, vehicleType: 'Car', vehicleColor: 'Silver' },
  { id: '5', plate: 'DL3CAY1122', timestamp: '10:32:06', cameraId: 'CAM 15', location: 'SVPI Airport Expressway', confidence: 89, vehicleType: 'Motorcycle', vehicleColor: 'Red' },
  { id: '6', plate: 'KA05MH4321', timestamp: '10:32:01', cameraId: 'CAM 05', location: 'SG Highway Commerce', confidence: 95, vehicleType: 'Car', vehicleColor: 'White' },
];

const SAMPLE_PLATES = ['TS09EA9988', 'UP32BZ1001', 'TN07CK5432', 'MP09AB8765', 'KL01BB3344'];

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const [detections, setDetections] = useState<Detection[]>(INITIAL_DETECTIONS);

  // Real-time simulated live feed addition
  useEffect(() => {
    const interval = setInterval(() => {
      const randomPlate = SAMPLE_PLATES[Math.floor(Math.random() * SAMPLE_PLATES.length)];
      const randomCam = MOCK_CAMERA_NODES[Math.floor(Math.random() * MOCK_CAMERA_NODES.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      const newDetection: Detection = {
        id: String(Date.now()),
        plate: randomPlate,
        timestamp: timeStr,
        cameraId: randomCam.id,
        location: randomCam.location,
        confidence: Math.floor(Math.random() * 10) + 90,
        vehicleType: 'Car',
        vehicleColor: 'White',
      };

      setDetections((prev) => [newDetection, ...prev.slice(0, 9)]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* 4 Glanceable KPI Cards (2x2 on tablet, 4-across on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <Card className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[12px] font-medium text-instrument-grey">Total Vehicles</span>
            <Car size={16} className="text-instrument-grey" />
          </div>
          <div className="mt-2">
            <div className="text-[22px] sm:text-[24px] font-bold text-fog-white font-mono tabular-nums leading-none">
              12,482
            </div>
            <div className="flex items-center gap-1 text-[11.5px] text-clear-green mt-1 font-medium">
              <ArrowUpRight size={14} />
              <span>▲ 12.5% vs yesterday</span>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[12px] font-medium text-instrument-grey">Avg Speed</span>
            <Gauge size={16} className="text-instrument-grey" />
          </div>
          <div className="mt-2">
            <div className="text-[22px] sm:text-[24px] font-bold text-fog-white font-mono tabular-nums leading-none">
              32 km/h
            </div>
            <div className="flex items-center gap-1 text-[11.5px] text-alert-red mt-1 font-medium">
              <ArrowDownRight size={14} />
              <span>▼ 4.3% vs yesterday</span>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[12px] font-medium text-instrument-grey">Traffic Density</span>
            <Activity size={16} className="text-instrument-grey" />
          </div>
          <div className="mt-2">
            <div className="text-[22px] sm:text-[24px] font-bold text-fog-white font-mono tabular-nums leading-none">
              68%
            </div>
            <div className="flex items-center gap-1.5 text-[11.5px] text-caution-amber mt-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-caution-amber"></span>
              <span>High Density (Peak Hour)</span>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[12px] font-medium text-instrument-grey">Active Cameras</span>
            <Radio size={16} className="text-instrument-grey" />
          </div>
          <div className="mt-2">
            <div className="text-[22px] sm:text-[24px] font-bold text-fog-white font-mono tabular-nums leading-none">
              42 / 45
            </div>
            <div className="flex items-center gap-1 text-[11.5px] text-clear-green mt-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-clear-green animate-live-pulse"></span>
              <span>3 Offline (CAM 04, 08, 12)</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Map & Live Feed Section (Stacked on tablet/phone, 8:4 side-by-side on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Live City Interactive Leaflet Map (~68% width on desktop) */}
        <div className="lg:col-span-8 flex flex-col">
          <Card className="flex-1 p-0 overflow-hidden flex flex-col relative min-h-[350px] sm:min-h-[420px] lg:min-h-[460px]">
            {/* Header bar */}
            <div className="p-3 px-4 border-b border-steel bg-raised/50 flex flex-wrap items-center justify-between gap-2 z-10">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-signal-bright flex-shrink-0" />
                <span className="text-[12.5px] sm:text-[13.5px] font-bold text-fog-white truncate">
                  Live GIS ANPR Map — {CITY_MAP_CONFIG.cityName}
                </span>
              </div>
              <span className="text-[10.5px] sm:text-[11px] font-mono text-instrument-grey/70 italic">Camera status legend shown on map</span>
            </div>

            {/* Interactive Leaflet Map — single info panel is the Leaflet popup on each pin */}
            <div className="flex-1 relative min-h-[300px] sm:min-h-[360px] lg:min-h-[400px]">
              <MapPanel
                onNavigate={onNavigate}
                height="100%"
              />
            </div>
          </Card>
        </div>

        {/* Live Recent Detections Panel (~32% width on desktop) */}
        <div className="lg:col-span-4 flex flex-col">
          <Card className="flex-1 flex flex-col p-3.5 sm:p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-steel">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-clear-green animate-live-pulse" />
                <h3 className="font-bold text-[13.5px] sm:text-[14px] text-fog-white">Recent Detections</h3>
              </div>
              <span className="text-[10.5px] sm:text-[11.5px] text-instrument-grey font-mono">LIVE FEED</span>
            </div>

            <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[340px] sm:max-h-[400px] pr-1">
              {detections.map((det, idx) => (
                <div
                  key={det.id}
                  onClick={() => onNavigate('vehicles')}
                  className={`p-2.5 rounded-[8px] bg-raised/70 border border-steel/80 flex items-center justify-between hover:border-signal-blue transition-colors cursor-pointer ${
                    idx === 0 ? 'border-signal-blue/60 bg-signal-blue/10 animate-fade-in' : ''
                  }`}
                >
                  <div className="flex flex-col gap-0.5 min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <PlateBadge plate={det.plate} size="sm" />
                      <span className="text-[10.5px] sm:text-[11px] text-instrument-grey font-mono">{det.cameraId}</span>
                    </div>
                    <div className="text-[11px] sm:text-[11.5px] text-instrument-grey truncate">
                      {det.location}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-[10.5px] sm:text-[11.5px] text-instrument-grey font-mono tabular-nums">{det.timestamp}</div>
                    <div className="text-[10.5px] sm:text-[11px] font-mono text-clear-green font-semibold">{det.confidence}% OCR</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-steel flex gap-2">
              <button
                onClick={() => onNavigate('vehicles')}
                className="flex-1 py-2 text-[12px] sm:text-[12.5px] bg-raised hover:bg-steel/50 text-fog-white font-semibold rounded-[8px] border border-steel transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye size={14} />
                Search Vehicle Database
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
