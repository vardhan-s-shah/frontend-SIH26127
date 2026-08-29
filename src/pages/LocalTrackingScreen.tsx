import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { StatusPill } from '../components/ui/StatusPill';
import { PrimaryButton } from '../components/ui/Buttons';
import { ScreenId, TrackedObject } from '../types';
import {
  Video,
  Navigation,
  Search,
  Filter,
  Map as MapIcon,
  Car,
  AlertTriangle,
  ArrowLeft,
  Layers,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface LocalTrackingScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

interface CameraFeedItem {
  id: string;
  location: string;
  status: 'online' | 'offline';
  latestPlate: string;
  fps: number;
  image: string;
  vehicleType: string;
  speed: string;
}

const CAMERA_FEEDS: CameraFeedItem[] = [
  {
    id: 'CAM-034',
    location: 'SG Highway',
    status: 'online',
    latestPlate: 'GJ01AB1234',
    fps: 30,
    image: '/cam1.jpg',
    vehicleType: 'Car (White Sedan)',
    speed: '48 km/h',
  },
  {
    id: 'CAM-021',
    location: 'Airport Road',
    status: 'online',
    latestPlate: 'MH12XYS678',
    fps: 30,
    image: '/cam2.jpg',
    vehicleType: 'SUV (Black)',
    speed: '54 km/h',
  },
  {
    id: 'CAM-067',
    location: 'Ring Road',
    status: 'online',
    latestPlate: 'DL8CAX6789',
    fps: 30,
    image: '/cam1.jpg',
    vehicleType: 'Sedan (Silver)',
    speed: '42 km/h',
  },
  {
    id: 'CAM-112',
    location: 'MG Road',
    status: 'online',
    latestPlate: 'KA05MN4321',
    fps: 30,
    image: '/cam2.jpg',
    vehicleType: 'Hatchback (Grey)',
    speed: '36 km/h',
  },
  {
    id: 'CAM-076',
    location: 'C.G. Road',
    status: 'online',
    latestPlate: 'RJ14BD7788',
    fps: 30,
    image: '/cam1.jpg',
    vehicleType: 'SUV (White)',
    speed: '28 km/h',
  },
  {
    id: 'CAM-053',
    location: 'Paldi',
    status: 'online',
    latestPlate: 'UP32LM9056',
    fps: 30,
    image: '/cam2.jpg',
    vehicleType: 'Sedan (Red)',
    speed: '45 km/h',
  },
  {
    id: 'CAM-004',
    location: 'Income Tax Flyover',
    status: 'offline',
    latestPlate: '—',
    fps: 0,
    image: '',
    vehicleType: '—',
    speed: '0 km/h',
  },
  {
    id: 'CAM-089',
    location: 'University Circle',
    status: 'online',
    latestPlate: 'TS09EA9988',
    fps: 30,
    image: '/cam1.jpg',
    vehicleType: 'Van (Silver)',
    speed: '38 km/h',
  },
  {
    id: 'CAM-015',
    location: 'Sabarmati Riverfront',
    status: 'online',
    latestPlate: 'HR26DK9812',
    fps: 30,
    image: '/cam2.jpg',
    vehicleType: 'Car (Blue)',
    speed: '51 km/h',
  },
];

export const LocalTrackingScreen: React.FC<LocalTrackingScreenProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'single'>('grid');
  const [selectedCam, setSelectedCam] = useState<CameraFeedItem>(CAMERA_FEEDS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline'>('all');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const trackedObjects: TrackedObject[] = [
    { id: '1', trackId: 'ID 14', type: 'Car (Sedan)', entryTime: '10:21:40', exitTime: '10:22:17', direction: 'Northbound', status: 'Exited' },
    { id: '2', trackId: 'ID 15', type: 'SUV (Black)', entryTime: '10:22:05', exitTime: '—', direction: 'Southbound', status: 'Active' },
    { id: '3', trackId: 'ID 16', type: 'Public Bus', entryTime: '10:21:58', exitTime: '10:22:10', direction: 'Eastbound', status: 'Exited' },
    { id: '4', trackId: 'ID 17', type: 'Motorcycle', entryTime: '10:22:12', exitTime: '—', direction: 'Northbound', status: 'Active' },
  ];

  const filteredFeeds = CAMERA_FEEDS.filter((cam) => {
    const matchesSearch =
      cam.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cam.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cam.latestPlate.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ? true : cam.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCardClick = (cam: CameraFeedItem) => {
    setSelectedCam(cam);
    setViewMode('single');
  };

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-[17px] sm:text-[19px] font-bold text-fog-white">
            {viewMode === 'grid' ? 'Live Cameras' : `Camera Feed — ${selectedCam.id}`}
          </h2>
          <p className="text-[11.5px] sm:text-[12.5px] text-instrument-grey">
            {viewMode === 'grid'
              ? 'Real-time feeds from all cameras with automatic ANPR vehicle detection'
              : `Single-camera tactical tracking · ${selectedCam.location} · ByteTrack Kalman vectors`}
          </p>
        </div>

        {/* Action Controls on the Right */}
        <div className="flex items-center gap-2 flex-wrap">
          {viewMode === 'single' ? (
            <PrimaryButton
              variant="outline"
              size="sm"
              onClick={() => setViewMode('grid')}
              className="flex items-center gap-1.5"
            >
              <ArrowLeft size={15} />
              Back to Multi-Cam Grid
            </PrimaryButton>
          ) : (
            <>
              {/* Search Toggle */}
              {showSearchInput ? (
                <div className="relative flex items-center animate-in fade-in duration-150">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter by CAM / location / plate..."
                    className="bg-raised border border-steel rounded-[8px] pl-8 pr-3 py-1.5 text-[12.5px] text-fog-white placeholder:text-instrument-grey focus:outline-none focus:border-signal-blue w-[190px] sm:w-[240px]"
                    autoFocus
                  />
                  <Search size={14} className="absolute left-2.5 text-instrument-grey" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 text-xs text-instrument-grey hover:text-fog-white"
                    >
                      ×
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 rounded-[8px] bg-panel border border-steel text-instrument-grey hover:text-fog-white hover:border-signal-blue transition-colors cursor-pointer"
                  title="Search Cameras"
                  aria-label="Search"
                >
                  <Search size={16} />
                </button>
              )}

              {/* Status Filter Toggle */}
              <button
                onClick={() => {
                  if (statusFilter === 'all') setStatusFilter('online');
                  else if (statusFilter === 'online') setStatusFilter('offline');
                  else setStatusFilter('all');
                }}
                className={`p-2 rounded-[8px] bg-panel border border-steel transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                  statusFilter !== 'all'
                    ? 'text-signal-bright border-signal-bright/60 bg-signal-blue/10'
                    : 'text-instrument-grey hover:text-fog-white hover:border-signal-blue'
                }`}
                title={`Filter Status: ${statusFilter.toUpperCase()}`}
                aria-label="Filter"
              >
                <Filter size={16} />
                {statusFilter !== 'all' && (
                  <span className="capitalize text-[11.5px]">{statusFilter}</span>
                )}
              </button>

              {/* View Map Button (Navigation / Switcher) */}
              <PrimaryButton
                variant="outline"
                size="sm"
                onClick={() => onNavigate('trajectory_map')}
                className="flex items-center gap-2 font-semibold"
              >
                <MapIcon size={15} />
                <span>View Map</span>
              </PrimaryButton>
            </>
          )}
        </div>
      </div>

      {/* MULTI-CAM GRID VIEW */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFeeds.map((cam) => {
            const isOnline = cam.status === 'online';

            return (
              <Card
                key={cam.id}
                onClick={() => handleCardClick(cam)}
                className="p-0 overflow-hidden group cursor-pointer hover:border-signal-blue/70 transition-all duration-200 flex flex-col"
              >
                {/* Header Row */}
                <div className="px-3.5 py-2.5 bg-panel border-b border-steel flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <Video size={16} className="text-signal-bright flex-shrink-0" />
                    <span className="font-mono font-bold text-[13.5px] text-fog-white truncate">
                      {cam.id}
                    </span>
                    <span className="text-[12px] text-instrument-grey truncate">
                      {cam.location}
                    </span>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isOnline ? 'bg-clear-green animate-live-pulse' : 'bg-alert-red'
                      }`}
                    />
                    <span
                      className={`text-[11.5px] font-semibold ${
                        isOnline ? 'text-clear-green' : 'text-alert-red'
                      }`}
                    >
                      {isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>

                {/* Video Feed Body */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-void flex items-center justify-center select-none">
                  {isOnline ? (
                    <>
                      {/* Realistic Video Frame */}
                      <img
                        src={cam.image}
                        alt={`${cam.id} live stream`}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Subtle Tactical Scanline / Grid Overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                          backgroundImage:
                            'repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0 1px, transparent 1px 3px)',
                        }}
                      />

                      {/* Live Bounding Box Overlay on Detected Vehicle */}
                      <div className="absolute top-[48%] left-[38%] w-[68px] h-[40px] border-2 border-clear-green/90 bg-clear-green/10 rounded-[2px] shadow-sm pointer-events-none flex flex-col justify-between">
                        <span className="bg-clear-green text-void text-[8px] font-mono font-bold px-1 leading-tight self-start rounded-b-none">
                          96%
                        </span>
                      </div>

                      {/* Bottom-Left Overlay: Mini status & frame rate */}
                      <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white/90 border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-clear-green" />
                        <span>{cam.fps} FPS · AI TRACK</span>
                      </div>

                      {/* Bottom-Right Overlay: Detected Plate Badge (matching reference) */}
                      <div className="absolute bottom-2.5 right-2.5 z-10 bg-black/85 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-xl">
                        <div className="w-4 h-4 rounded-full bg-signal-blue/80 flex items-center justify-center text-[9px] text-white">
                          <Car size={10} />
                        </div>
                        <span className="font-mono text-[12px] font-bold text-white tracking-wider">
                          {cam.latestPlate}
                        </span>
                      </div>

                      {/* Hover Overlay Icon */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="bg-panel/90 border border-steel px-3 py-1.5 rounded-full text-fog-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                          <Maximize2 size={13} className="text-signal-bright" />
                          <span>Expand Live Feed</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Offline / No Signal State */
                    <div className="flex flex-col items-center justify-center p-6 text-center text-instrument-grey space-y-2">
                      <div className="w-10 h-10 rounded-full bg-alert-red/10 border border-alert-red/30 flex items-center justify-center text-alert-red mb-1">
                        <AlertTriangle size={20} />
                      </div>
                      <span className="font-mono font-bold text-fog-white text-xs tracking-wider">
                        STREAM UNAVAILABLE (NO SIGNAL)
                      </span>
                      <span className="text-[11px] text-instrument-grey max-w-[200px]">
                        Failover sensor route active · Auto-recovery in progress
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* SINGLE CAMERA EXPANDED VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-in fade-in duration-200">
          {/* Live Camera Stream with Bounding Boxes & Telemetry */}
          <div className="lg:col-span-7 flex flex-col">
            <Card className="p-0 overflow-hidden flex-1 flex flex-col">
              <div className="p-3 px-4 bg-raised border-b border-steel flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <Video size={16} className="text-clear-green" />
                  <span className="font-bold text-fog-white font-mono">
                    {selectedCam.id} · {selectedCam.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-clear-green/20 text-clear-green font-mono font-semibold">
                    {selectedCam.fps} FPS · 1080p LIVE
                  </span>
                  <span className="font-mono text-instrument-grey">{selectedCam.speed}</span>
                </div>
              </div>

              {/* Tactical Video Feed Container */}
              <div className="relative flex-1 bg-void min-h-[340px] overflow-hidden flex items-center justify-center border-b border-steel select-none">
                {selectedCam.status === 'online' ? (
                  <>
                    <img
                      src={selectedCam.image}
                      alt={selectedCam.id}
                      className="w-full h-full object-cover"
                    />

                    {/* Bounding Box 1 */}
                    <div className="absolute top-[28%] left-[28%] w-[120px] h-[80px] border-2 border-clear-green rounded-[3px] shadow-lg pointer-events-none">
                      <span className="absolute -top-5 left-0 bg-clear-green text-void font-mono font-bold text-[10px] px-1.5 py-0.2 rounded-t">
                        ID 14 · {selectedCam.latestPlate} (96%)
                      </span>
                      <div className="absolute top-1/2 right-0 w-8 h-[2px] bg-clear-green -rotate-12" />
                    </div>

                    {/* Bounding Box 2 */}
                    <div className="absolute top-[50%] left-[52%] w-[100px] h-[70px] border-2 border-caution-amber rounded-[3px] shadow-lg pointer-events-none">
                      <span className="absolute -top-5 left-0 bg-caution-amber text-void font-mono font-bold text-[10px] px-1.5 py-0.2 rounded-t">
                        ID 15 · SUV (91%)
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 text-[11px] font-mono text-white/90 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-steel flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-clear-green animate-pulse" />
                      <span>TRACKING: ByteTrack v2.1 (Kalman Active)</span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/85 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full flex items-center gap-2 shadow-xl">
                      <Car size={13} className="text-signal-bright" />
                      <span className="font-mono text-[12.5px] font-bold text-white tracking-wide">
                        {selectedCam.latestPlate}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-instrument-grey space-y-2">
                    <AlertTriangle size={36} className="text-alert-red mb-2" />
                    <span className="font-mono font-bold text-fog-white text-sm">FEED OFFLINE</span>
                    <span className="text-xs text-instrument-grey">No video telemetry received from this node</span>
                  </div>
                )}
              </div>

              {/* Bottom Quick Navigation within Single Camera */}
              <div className="p-3 bg-panel flex items-center justify-between text-xs">
                <span className="text-instrument-grey">
                  Current Target: <strong className="text-fog-white font-mono">{selectedCam.latestPlate}</strong>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onNavigate('reid')}
                    className="px-2.5 py-1 bg-raised hover:bg-signal-blue hover:text-white border border-steel text-fog-white rounded-[6px] font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Cross-Cam ReID</span>
                    <ChevronRight size={13} />
                  </button>
                  <button
                    onClick={() => onNavigate('trajectory_map')}
                    className="px-2.5 py-1 bg-signal-blue text-white rounded-[6px] font-semibold hover:bg-signal-bright transition-colors flex items-center gap-1"
                  >
                    <span>Track on Map</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Tracked Objects Table */}
          <div className="lg:col-span-5 flex flex-col">
            <Card className="flex-1 flex flex-col">
              <h3 className="font-bold text-[14px] text-fog-white mb-3 pb-2 border-b border-steel flex items-center justify-between">
                <span>Tracked Objects ({selectedCam.id})</span>
                <span className="text-[11.5px] font-mono text-instrument-grey">{selectedCam.location}</span>
              </h3>

              <div className="overflow-x-auto flex-1">
                <table className="w-full text-[13px] text-left">
                  <thead>
                    <tr className="text-instrument-grey border-b border-steel text-[11.5px] uppercase font-mono">
                      <th className="py-2 px-1">Track ID</th>
                      <th className="py-2 px-1">Entry</th>
                      <th className="py-2 px-1">Exit</th>
                      <th className="py-2 px-1">Direction</th>
                      <th className="py-2 px-1 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-steel">
                    {trackedObjects.map((obj) => (
                      <tr key={obj.id} className="hover:bg-raised/50 transition-colors">
                        <td className="py-2.5 px-1 font-mono font-bold text-signal-bright">{obj.trackId}</td>
                        <td className="py-2.5 px-1 font-mono text-instrument-grey">{obj.entryTime}</td>
                        <td className="py-2.5 px-1 font-mono text-instrument-grey">{obj.exitTime}</td>
                        <td className="py-2.5 px-1 text-fog-white">{obj.direction}</td>
                        <td className="py-2.5 px-1 text-right">
                          <StatusPill status={obj.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-raised border border-steel rounded-[8px] text-[12px] text-instrument-grey leading-relaxed">
                <div className="font-bold text-fog-white mb-1">Architecture Boundary Note:</div>
                A local track ID is valid <span className="text-fog-white font-semibold">only inside this camera's frame</span>. When a vehicle exits the field of view, its identity is resolved across the city network separately via Cross-Camera ReID.
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

