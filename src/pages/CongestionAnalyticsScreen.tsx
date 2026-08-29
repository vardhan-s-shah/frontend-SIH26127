import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { SignatureGradientBar } from '../components/ui/SignatureGradientBar';
import { PrimaryButton } from '../components/ui/Buttons';
import { ScreenId } from '../types';
import { BarChart3, Filter, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface CongestionAnalyticsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

const HOURLY_TRAFFIC_DATA = [
  { time: '00:00', volume: 1200, avgSpeed: 52 },
  { time: '03:00', volume: 600, avgSpeed: 58 },
  { time: '06:00', volume: 2400, avgSpeed: 45 },
  { time: '08:30', volume: 8900, avgSpeed: 18 }, // Peak morning
  { time: '11:00', volume: 5400, avgSpeed: 36 },
  { time: '14:00', volume: 4800, avgSpeed: 38 },
  { time: '17:30', volume: 9800, avgSpeed: 14 }, // Peak evening
  { time: '20:00', volume: 6200, avgSpeed: 28 },
  { time: '23:00', volume: 2800, avgSpeed: 48 },
];

export const CongestionAnalyticsScreen: React.FC<CongestionAnalyticsScreenProps> = ({ onNavigate }) => {
  const [selectedRange, setSelectedRange] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('Full 24 Hours');

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Top Header & Filter Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-[19px] font-bold text-fog-white">Congestion &amp; Peak-Hour Analytics</h2>
          <p className="text-[12.5px] text-instrument-grey">
            City-wide volume metrics, bottleneck identification, and historical corridor density trends.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="bg-raised border border-steel rounded-[8px] px-3 py-1.5 text-[13px] text-fog-white focus:outline-none focus:border-signal-blue cursor-pointer"
          >
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 Days</option>
            <option>Custom Range</option>
          </select>

          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="bg-raised border border-steel rounded-[8px] px-3 py-1.5 text-[13px] text-fog-white focus:outline-none focus:border-signal-blue cursor-pointer"
          >
            <option>Full 24 Hours</option>
            <option>Morning Peak (8–10 AM)</option>
            <option>Evening Peak (5–8 PM)</option>
          </select>

          <PrimaryButton size="sm">
            <Filter size={14} />
            Apply Filter
          </PrimaryButton>
        </div>
      </div>

      {/* 4 Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <Card>
          <div className="text-[12px] font-medium text-instrument-grey">Traffic Density</div>
          <div className="text-[24px] font-bold font-mono text-caution-amber mt-1">68%</div>
          <div className="text-[11.5px] text-caution-amber font-semibold mt-1">High (Peak Load)</div>
        </Card>
        <Card>
          <div className="text-[12px] font-medium text-instrument-grey">City Average Speed</div>
          <div className="text-[24px] font-bold font-mono text-fog-white mt-1">32 km/h</div>
          <div className="text-[11.5px] text-alert-red font-semibold mt-1 flex items-center gap-0.5">
            <ArrowDownRight size={14} /> ▼ 4.3% vs avg
          </div>
        </Card>
        <Card>
          <div className="text-[12px] font-medium text-instrument-grey">Congested Corridors</div>
          <div className="text-[24px] font-bold font-mono text-alert-red mt-1">17 Roads</div>
          <div className="text-[11.5px] text-alert-red font-semibold mt-1">Critical Delay</div>
        </Card>
        <Card>
          <div className="text-[12px] font-medium text-instrument-grey">Total Vehicle Count</div>
          <div className="text-[24px] font-bold font-mono text-fog-white mt-1">12,482</div>
          <div className="text-[11.5px] text-clear-green font-semibold mt-1 flex items-center gap-0.5">
            <ArrowUpRight size={14} /> ▲ 12.5% vs yesterday
          </div>
        </Card>
      </div>

      {/* Heatmap & Recharts Line Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Heatmap Card */}
        <div className="lg:col-span-5 flex flex-col">
          <Card className="flex-1 flex flex-col space-y-3">
            <h3 className="font-bold text-[14px] text-fog-white border-b border-steel pb-2">
              City Congestion Heatmap Grid
            </h3>

            {/* Heatmap Visualizer Canvas */}
            <div className="flex-1 h-[220px] rounded-[8px] border border-steel relative overflow-hidden flex items-center justify-center select-none" style={{
              background: `radial-gradient(circle at 35% 60%, rgba(240,71,63,0.65), transparent 40%),
                          radial-gradient(circle at 60% 40%, rgba(240,180,41,0.5), transparent 45%),
                          radial-gradient(circle at 20% 20%, rgba(61,220,132,0.4), transparent 45%),
                          #081020`
            }}>
              <div className="text-center font-mono text-fog-white bg-panel/90 px-3 py-1.5 rounded border border-steel text-xs shadow">
                MG Road Corridor: Heavy Congestion (82%)
              </div>
            </div>

            {/* Signature Gradient Legend */}
            <div>
              <SignatureGradientBar showLegend />
            </div>
          </Card>
        </div>

        {/* Recharts Chart Card */}
        <div className="lg:col-span-7 flex flex-col">
          <Card className="flex-1 flex flex-col space-y-3">
            <div className="flex justify-between items-center border-b border-steel pb-2">
              <h3 className="font-bold text-[14px] text-fog-white">
                Hourly Traffic Volume vs Velocity Trend
              </h3>
              <span className="text-[11px] font-mono text-instrument-grey">PEAK HOUR FLAGS (8:30 AM &amp; 5:30 PM)</span>
            </div>

            <div className="h-[240px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={HOURLY_TRAFFIC_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-steel)" />
                  <XAxis dataKey="time" stroke="var(--color-instrument-grey)" tick={{ fontSize: 11, fill: 'var(--color-instrument-grey)' }} />
                  <YAxis yAxisId="left" stroke="var(--color-signal-blue)" tick={{ fontSize: 11, fill: 'var(--color-signal-blue)' }} />
                  <YAxis yAxisId="right" orientation="right" stroke="var(--color-caution-amber)" tick={{ fontSize: 11, fill: 'var(--color-caution-amber)' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--color-panel)', borderColor: 'var(--color-steel)', borderRadius: '8px', color: 'var(--color-fog-white)', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Line yAxisId="left" type="monotone" dataKey="volume" name="Vehicle Volume" stroke="#2F6FED" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line yAxisId="right" type="monotone" dataKey="avgSpeed" name="Avg Speed (km/h)" stroke="#D97706" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>


      {/* Recurrent Bottleneck Callout */}
      <Card className="p-3 bg-raised border-l-4 border-l-caution-amber">
        <div className="flex items-start gap-3">
          <AlertCircle size={18} className="text-caution-amber flex-shrink-0 mt-0.5" />
          <div className="text-[12.5px] text-fog-white leading-relaxed">
            <span className="font-bold">Recurring Bottleneck Warning:</span> MG Road Junction exhibits severe slowdowns daily during 8:00 AM – 10:00 AM and 5:30 PM – 8:00 PM. System recommends signal timing adjustments.
            <button
              onClick={() => onNavigate('infrastructure')}
              className="ml-2 font-bold text-signal-bright underline hover:text-white"
            >
              Open Infrastructure Study →
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
