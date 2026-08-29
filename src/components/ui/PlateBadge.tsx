import React from 'react';

interface PlateBadgeProps {
  plate: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PlateBadge: React.FC<PlateBadgeProps> = ({ plate, size = 'md', className = '' }) => {
  let sizeStyle = 'text-[13px] px-2 py-0.5';
  if (size === 'sm') sizeStyle = 'text-[11.5px] px-1.5 py-0.2';
  if (size === 'lg') sizeStyle = 'text-[18px] px-3 py-1 font-bold';

  return (
    <span
      className={`font-mono text-fog-white tracking-[0.3px] font-semibold tabular-nums inline-block bg-raised/80 border border-steel rounded-[6px] ${sizeStyle} ${className}`}
    >
      {plate}
    </span>
  );
};
