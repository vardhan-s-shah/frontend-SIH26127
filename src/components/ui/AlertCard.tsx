import React from 'react';

interface AlertCardProps {
  title: string;
  subtitle: string;
  time?: string;
  severity: 'red' | 'amber' | 'green';
  icon?: React.ReactNode;
  actionBadge?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  title,
  subtitle,
  time,
  severity,
  icon,
  actionBadge,
  onClick,
  className = '',
}) => {
  let borderColor = 'border-l-steel';
  if (severity === 'red') borderColor = 'border-l-alert-red';
  if (severity === 'amber') borderColor = 'border-l-caution-amber';
  if (severity === 'green') borderColor = 'border-l-clear-green';

  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-3 p-3.5 rounded-card bg-raised border border-steel border-l-4 ${borderColor} ${
        onClick ? 'cursor-pointer hover:bg-raised/80 transition-colors' : ''
      } ${className}`}
    >
      {icon && <div className="text-lg flex-shrink-0 mt-0.5">{icon}</div>}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="font-bold text-[13.5px] text-fog-white truncate">{title}</div>
          {time && <div className="text-[11.5px] text-instrument-grey font-mono whitespace-nowrap ml-auto">{time}</div>}
        </div>
        <div className="text-[12px] text-instrument-grey mt-0.5 leading-relaxed">{subtitle}</div>
        {actionBadge && <div className="mt-2">{actionBadge}</div>}
      </div>
    </div>
  );
};
