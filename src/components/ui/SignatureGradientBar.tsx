import React from 'react';

interface SignatureGradientBarProps {
  className?: string;
  showLegend?: boolean;
}

export const SignatureGradientBar: React.FC<SignatureGradientBarProps> = ({
  className = '',
  showLegend = false,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="h-[6px] rounded-[3px] bg-gradient-to-r from-clear-green via-caution-amber to-alert-red w-full" />
      {showLegend && (
        <div className="flex justify-between text-[11.5px] text-instrument-grey mt-1.5 font-mono">
          <span>Optimal / Low</span>
          <span>Moderate / Caution</span>
          <span>Severe / Critical</span>
        </div>
      )}
    </div>
  );
};
