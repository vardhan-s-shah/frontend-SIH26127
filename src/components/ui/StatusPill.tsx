import React from 'react';
import { StatusState } from '../../types';

interface StatusPillProps {
  status: StatusState | string;
  label?: string;
  className?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, label, className = '' }) => {
  const normalized = status.toLowerCase();
  
  let styles = 'bg-instrument-grey/15 text-instrument-grey';
  let defaultLabel = status;

  if (normalized === 'healthy' || normalized === 'good' || normalized === 'online' || normalized === 'active' || normalized === 'exited') {
    styles = 'bg-clear-green/15 text-clear-green';
    defaultLabel = label || (normalized === 'healthy' ? 'Healthy' : normalized === 'online' ? 'Online' : status);
  } else if (normalized === 'warning' || normalized === 'caution' || normalized === 'medium' || normalized === 'preparing') {
    styles = 'bg-caution-amber/15 text-caution-amber';
    defaultLabel = label || (normalized === 'warning' ? 'Warning' : status);
  } else if (normalized === 'offline' || normalized === 'critical' || normalized === 'high' || normalized === 'rejected') {
    styles = 'bg-alert-red/15 text-alert-red';
    defaultLabel = label || (normalized === 'offline' ? 'Offline' : status);
  } else if (normalized === 'low' || normalized === 'normal') {
    styles = 'bg-instrument-grey/15 text-instrument-grey';
    defaultLabel = label || status;
  }

  return (
    <span className={`text-[11.5px] font-bold px-2.5 py-[3px] rounded-pill inline-block leading-tight ${styles} ${className}`}>
      {label || defaultLabel}
    </span>
  );
};
