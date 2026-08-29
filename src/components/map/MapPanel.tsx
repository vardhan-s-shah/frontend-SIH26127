import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Maximize2, Minimize2 } from 'lucide-react';
import {
  CITY_MAP_CONFIG,
  MOCK_CAMERA_NODES,
  MOCK_TRAJECTORY_SEGMENTS,
  MOCK_GREEN_CORRIDOR_POSITIONS,
} from '../../data/mockMapData';
import { StatusPill } from '../ui/StatusPill';
import { ScreenId } from '../../types';

interface MapPanelProps {
  center?: [number, number];
  zoom?: number;
  selectedCameraId?: string | null;
  onSelectCamera?: (cameraId: string) => void;
  onNavigate?: (screen: ScreenId) => void;
  showTrajectory?: boolean;
  showEmergencyCorridor?: boolean;
  showLegend?: boolean;
  height?: string;
  className?: string;
}

// Leaflet map size invalidation helper when toggling fullscreen
const MapResizeHandler: React.FC<{ isFullscreen: boolean }> = ({ isFullscreen }) => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);
    return () => clearTimeout(timer);
  }, [isFullscreen, map]);
  return null;
};

// Custom Leaflet DivIcon generator for dark command-center aesthetic
const createCameraIcon = (status: 'healthy' | 'warning' | 'offline', isSelected: boolean, customEmoji = '🎥') => {
  let colorClass = 'green';
  if (status === 'warning') colorClass = 'amber';
  if (status === 'offline') colorClass = 'red';
  if (customEmoji === '🚑') colorClass = 'blue';

  const pulseHtml = isSelected
    ? `<div class="absolute -inset-1 rounded-full bg-signal-bright opacity-50 animate-ping"></div>`
    : '';

  return L.divIcon({
    className: 'custom-camera-marker',
    html: `
      <div class="relative flex items-center justify-center">
        ${pulseHtml}
        <div class="camera-pin-inner ${colorClass} ${isSelected ? 'scale-125 z-30' : ''}">
          <span>${customEmoji}</span>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
};

export const MapPanel: React.FC<MapPanelProps> = ({
  center = CITY_MAP_CONFIG.center,
  zoom = CITY_MAP_CONFIG.defaultZoom,
  selectedCameraId = null,
  onSelectCamera,
  onNavigate,
  showTrajectory = false,
  showEmergencyCorridor = false,
  showLegend = true,
  height = '100%',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const cameraNodes = useMemo(() => MOCK_CAMERA_NODES, []);

  // Toggle Fullscreen mode
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Sync fullscreen state with document events & Escape key listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-void transition-all duration-200 ${
        isFullscreen
          ? 'fixed inset-0 z-[9999] w-screen h-screen rounded-none border-0'
          : `rounded-card border border-steel ${className}`
      }`}
      style={{ height: isFullscreen ? '100vh' : height }}
    >
      {/* Restyled Fullscreen Toggle Button (Top-Right of Map) */}
      <div className="absolute top-3 right-3 z-[1000] flex items-center gap-2">
        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Expand Map Fullscreen'}
          className="w-[30px] h-[30px] bg-panel hover:bg-signal-blue text-fog-white hover:text-white border border-steel rounded-[8px] flex items-center justify-center shadow-lg transition-colors cursor-pointer"
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full z-0 select-none"
        attributionControl={true}
      >
        <MapResizeHandler isFullscreen={isFullscreen} />

        {/* Keyless OpenStreetMap Base Tiles */}
        <TileLayer
          url={CITY_MAP_CONFIG.tileUrl}
          attribution={CITY_MAP_CONFIG.tileAttribution}
          maxZoom={19}
        />

        {/* Trajectory Polylines (Green -> Amber -> Red Gradient Segments) */}
        {showTrajectory &&
          MOCK_TRAJECTORY_SEGMENTS.map((seg) => (
            <Polyline
              key={seg.id}
              positions={seg.positions}
              pathOptions={{
                color: seg.color,
                weight: 5,
                opacity: 0.9,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            >
              <Popup>
                <div className="font-mono text-xs text-fog-white">
                  <div className="font-bold text-signal-bright">{seg.label}</div>
                  <div className="text-[11px] text-instrument-grey">Signature Gradient Recency Segment</div>
                </div>
              </Popup>
            </Polyline>
          ))}

        {/* Emergency Green Corridor Polyline */}
        {showEmergencyCorridor && (
          <>
            <Polyline
              positions={MOCK_GREEN_CORRIDOR_POSITIONS}
              pathOptions={{
                color: '#3DDC84',
                weight: 6,
                dashArray: '10, 6',
                opacity: 0.95,
              }}
            />
            {/* Ambulance Marker */}
            <Marker
              position={MOCK_GREEN_CORRIDOR_POSITIONS[0]}
              icon={createCameraIcon('healthy', true, '🚑')}
            >
              <Popup>
                <div className="text-xs space-y-1">
                  <div className="font-bold text-clear-green flex items-center gap-1">
                    <span>🚑 AMBULANCE 108</span>
                  </div>
                  <div className="text-[11px] text-instrument-grey">Emergency Priority Corridor Active</div>
                </div>
              </Popup>
            </Marker>
          </>
        )}

        {/* Camera Markers */}
        {cameraNodes.map((cam) => {
          const isSelected = selectedCameraId === cam.id;
          const icon = createCameraIcon(cam.status, isSelected, '🎥');

          return (
            <Marker
              key={cam.id}
              position={[cam.lat, cam.lng]}
              icon={icon}
              eventHandlers={{
                click: () => {
                  if (onSelectCamera) onSelectCamera(cam.id);
                },
              }}
            >
              <Popup>
                <div className="space-y-2 min-w-[200px]">
                  <div className="flex items-center justify-between border-b border-steel pb-1.5">
                    <span className="font-mono font-bold text-[13px] text-fog-white">{cam.id}</span>
                    <StatusPill status={cam.status} />
                  </div>

                  <div className="text-[12px] space-y-1 text-instrument-grey">
                    <div>
                      Location: <strong className="text-fog-white font-normal">{cam.location}</strong>
                    </div>
                    <div>
                      Segment Speed: <strong className="text-clear-green font-mono">{cam.speed}</strong>
                    </div>
                    <div>
                      Last Observation: <span className="font-mono text-fog-white">{cam.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="pt-1.5 flex gap-2">
                    <button
                      onClick={() => {
                        if (onNavigate) onNavigate('camera_health');
                      }}
                      className="w-full py-1 text-[11.5px] bg-signal-blue text-white rounded-[6px] font-semibold hover:bg-signal-bright transition-colors text-center cursor-pointer"
                    >
                      View Live Diagnostics →
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Persistent Status Legend — bottom-left, z-[1000], visible in both normal and fullscreen */}
      {showLegend && (
        <div className="absolute bottom-7 left-3 z-[1000] flex items-center gap-3 bg-panel/90 border border-steel/70 backdrop-blur-md px-3 py-1.5 rounded-[8px] shadow-lg pointer-events-none">
          <span className="flex items-center gap-1.5 text-[11px] font-mono text-instrument-grey">
            <span className="w-2.5 h-2.5 rounded-full bg-clear-green flex-shrink-0"></span>
            Optimal
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-mono text-instrument-grey">
            <span className="w-2.5 h-2.5 rounded-full bg-caution-amber flex-shrink-0"></span>
            Slow
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-mono text-instrument-grey">
            <span className="w-2.5 h-2.5 rounded-full bg-alert-red flex-shrink-0"></span>
            Fault / Offline
          </span>
        </div>
      )}

      {/* ESC hint — shown only in fullscreen */}
      {isFullscreen && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] bg-panel/80 border border-steel/70 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none">
          <span className="text-[11px] font-mono text-instrument-grey">Press <kbd className="bg-raised border border-steel px-1 rounded text-fog-white">Esc</kbd> to exit fullscreen</span>
        </div>
      )}
    </div>
  );
};
