import React from 'react';

interface MetricBarProps {
  label: string;
  value: number; // 0 to 100
  valueText?: string;
  isWarning?: boolean;
  className?: string;
}

export const MetricBar: React.FC<MetricBarProps> = ({
  label,
  value,
  valueText,
  isWarning = false,
  className = '',
}) => {
  return (
    <div className={`mb-3 ${className}`}>
      <div className="flex justify-between text-[12.5px] mb-1">
        <span className="text-fog-white font-medium">{label}</span>
        <span className={`font-mono ${isWarning ? 'text-alert-red font-semibold' : 'text-instrument-grey'}`}>
          {valueText || `${value}%`}
        </span>
      </div>
      <div className="h-[7px] bg-raised border border-steel/40 rounded-[4px] overflow-hidden">
        <div
          className={`h-full rounded-[4px] transition-all duration-500 ${
            isWarning ? 'bg-alert-red' : 'bg-signal-bright'
          }`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
};
