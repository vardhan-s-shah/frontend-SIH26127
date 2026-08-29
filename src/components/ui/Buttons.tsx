import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  let baseStyle = 'bg-signal-blue text-white hover:bg-signal-bright font-semibold rounded-[8px] transition-all cursor-pointer inline-flex items-center justify-center gap-2';
  
  if (variant === 'outline') {
    baseStyle = 'bg-transparent border border-steel text-fog-white hover:border-signal-blue hover:text-white font-semibold rounded-[8px] transition-all cursor-pointer inline-flex items-center justify-center gap-2';
  } else if (variant === 'danger') {
    baseStyle = 'bg-alert-red text-white hover:bg-alert-red/80 font-semibold rounded-[8px] transition-all cursor-pointer inline-flex items-center justify-center gap-2';
  }

  let sizeStyle = 'px-4 py-2 text-[13.5px]';
  if (size === 'sm') sizeStyle = 'px-3 py-1.5 text-[12.5px]';
  if (size === 'lg') sizeStyle = 'px-5 py-2.5 text-[14.5px]';

  return (
    <button className={`${baseStyle} ${sizeStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};
