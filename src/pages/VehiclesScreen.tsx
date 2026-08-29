import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { PlateBadge } from '../components/ui/PlateBadge';
import { StatusPill } from '../components/ui/StatusPill';
import { PrimaryButton } from '../components/ui/Buttons';
import { RadarSweep } from '../components/ui/RadarSweep';
import { ScreenId } from '../types';
import { Search, Car, Navigation, ShieldCheck, MapPin } from 'lucide-react';

interface VehiclesScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const VehiclesScreen: React.FC<VehiclesScreenProps> = ({ onNavigate }) => {
  const [searchPlate, setSearchPlate] = useState('GJ01AB1234');
  const [activePlate, setActivePlate] = useState('GJ01AB1234');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchPlate.trim() || isSearching) return;
    setIsSearching(true);
    // Simulate a ~1.4s network round-trip to the ANPR database
    setTimeout(() => {
      setActivePlate(searchPlate.toUpperCase().trim());
      setIsSearching(false);
    }, 1400);
  };

  const sightings = [
    { cam: 'CAM 01', time: '10:22:17 AM', loc: 'Ashram Road, Sector 12', status: 'healthy', date: 'Today' },
    { cam: 'CAM 04', time: '10:32:15 AM', loc: 'Income Tax Flyover', status: 'warning', date: 'Today' },
    { cam: 'CAM 09', time: '10:43:02 AM', loc: 'University Circle', status: 'warning', date: 'Today' },
    { cam: 'CAM 15', time: '11:04:11 AM', loc: 'SVPI Airport Road', status: 'offline', date: 'Today' },
  ];

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Page Header */}
      <div>
        <h2 className="text-[17px] sm:text-[19px] font-bold text-fog-white">Vehicle Detection &amp; ANPR Database</h2>
        <p className="text-[11.5px] sm:text-[12.5px] text-instrument-grey">
          Search national vehicle registry, view multi-frame temporal voting OCR results and historical sightings.
        </p>
      </div>

      {/* Search Bar */}
      <Card className="p-3">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-instrument-grey" />
            <input
              type="text"
              value={searchPlate}
              onChange={(e) => setSearchPlate(e.target.value)}
              className="w-full bg-raised border border-steel rounded-[8px] pl-10 pr-4 py-2.5 text-[13px] sm:text-[14px] font-mono text-fog-white focus:outline-none focus:border-signal-blue uppercase tracking-wider"
              placeholder="ENTER PLATE NUMBER (E.G. GJ01AB1234)"
            />
          </div>
          <PrimaryButton type="submit" size="md" className="w-full sm:w-auto" disabled={isSearching}>
            {isSearching ? 'Searching...' : 'Execute Search'}
          </PrimaryButton>
        </form>
      </Card>

      {/* ── Inline Radar Loader — shown while search is in-flight ── */}
      {isSearching && (
        <Card className="flex flex-col items-center justify-center py-10 gap-5">
          <RadarSweep size={58} variant="inline" />
          <div className="text-center">
            <p className="text-[13px] font-mono text-[#8A97AB] radar-ellipsis">
              Searching vehicle database
            </p>
            <p className="text-[11px] font-mono text-[#4A5568] mt-1">
              Querying 12,482 registered vehicles across national registry
            </p>
          </div>
        </Card>
      )}

      {/* Two Column Results Layout (stacked on tablet & mobile, 7:5 side-by-side on desktop) */}
      {!isSearching && (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Vehicle Card */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-steel pb-3">
              <div>
                <div className="text-[11px] sm:text-[12px] text-instrument-grey font-mono">TARGET VEHICLE RECORD</div>
                <PlateBadge plate={activePlate} size="lg" className="mt-1" />
              </div>
              <StatusPill status="healthy" label="Verified Record" />
            </div>

            {/* Photo & Specs: Stacks vertically on phone/tablet, side-by-side on xl: */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
              {/* Vehicle Photo Mock */}
              <div className="xl:col-span-5 h-[160px] sm:h-[180px] bg-raised border border-steel rounded-[8px] flex flex-col items-center justify-center text-instrument-grey p-4 relative overflow-hidden flex-shrink-0">
                <Car size={44} className="text-steel mb-2" />
                <span className="text-[12px] font-mono">ANPR SNAPSHOT</span>
                <span className="text-[10px] text-instrument-grey/70">CAM 15 · 11:04:11 AM</span>
                <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-clear-green/20 border border-clear-green/40 text-clear-green text-[10px] font-bold rounded">
                  96% OCR
                </div>
              </div>

              {/* Vehicle Specs Grid */}
              <div className="xl:col-span-7 space-y-2 text-[12.5px] sm:text-[13.5px] min-w-0">
                <div className="flex justify-between py-1 border-b border-steel gap-2">
                  <span className="text-instrument-grey flex-shrink-0">Vehicle Class</span>
                  <span className="font-semibold text-fog-white text-right truncate">Passenger Car (Sedan)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-steel gap-2">
                  <span className="text-instrument-grey flex-shrink-0">Color</span>
                  <span className="font-semibold text-fog-white text-right truncate">Pearl White</span>
                </div>
                <div className="flex justify-between py-1 border-b border-steel gap-2">
                  <span className="text-instrument-grey flex-shrink-0">Make / Model</span>
                  <span className="font-semibold text-fog-white text-right truncate">Maruti Suzuki Ciaz</span>
                </div>
                <div className="flex justify-between py-1 border-b border-steel gap-2">
                  <span className="text-instrument-grey flex-shrink-0">ANPR Confidence</span>
                  <span className="font-mono font-bold text-clear-green text-right">96.4%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-steel gap-2">
                  <span className="text-instrument-grey flex-shrink-0">First Seen</span>
                  <span className="font-mono text-fog-white text-right truncate">Today, 10:22:17 AM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-steel gap-2">
                  <span className="text-instrument-grey flex-shrink-0">Total Sightings</span>
                  <span className="font-mono text-fog-white text-right truncate">4 Cameras Today</span>
                </div>
              </div>
            </div>

            {/* Note box */}
            <div className="p-3 bg-raised border border-steel rounded-[8px] text-[11.5px] sm:text-[12px] text-instrument-grey leading-relaxed flex items-start gap-2">
              <ShieldCheck size={16} className="text-clear-green flex-shrink-0 mt-0.5" />
              <span>
                Plate verified across 5 video frames using temporal-voting OCR — reduces single-frame optical blur and motion artifacts.
              </span>
            </div>

            {/* Actions: Stacks on mobile/narrow width, 2-across on sm: */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <PrimaryButton
                onClick={() => onNavigate('trajectory_map')}
                className="w-full sm:flex-1 text-[13px]"
              >
                <Navigation size={15} />
                Reconstruct Trajectory Map
              </PrimaryButton>
              <PrimaryButton
                variant="outline"
                onClick={() => onNavigate('reid')}
                className="w-full sm:flex-1 text-[13px]"
              >
                Cross-Cam ReID Breakdown
              </PrimaryButton>
            </div>
          </Card>
        </div>

        {/* Right Column: Sightings Log */}
        <div className="lg:col-span-5">
          <Card className="h-full flex flex-col">
            <h3 className="font-bold text-[13.5px] sm:text-[14px] text-fog-white mb-3 pb-2 border-b border-steel flex items-center justify-between">
              <span>Sighting History</span>
              <span className="text-[10.5px] sm:text-[11.5px] font-mono text-instrument-grey">CHRONOLOGICAL</span>
            </h3>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[360px] lg:max-h-none pr-1">
              {sightings.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-card bg-raised border border-steel flex items-start gap-3 hover:border-signal-blue/50 transition-colors"
                >
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
                    s.status === 'healthy' ? 'bg-clear-green' : s.status === 'warning' ? 'bg-caution-amber' : 'bg-alert-red'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono font-bold text-[13px] sm:text-[13.5px] text-fog-white">{s.cam}</span>
                      <span className="text-[11px] sm:text-[11.5px] text-instrument-grey font-mono">{s.time}</span>
                    </div>
                    <div className="text-[12px] sm:text-[12.5px] text-instrument-grey flex items-center gap-1 mt-0.5 truncate">
                      <MapPin size={12} className="flex-shrink-0" />
                      <span className="truncate">{s.loc}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      )}
    </div>
  );
};
