import React from 'react';

export type BadgeVariant = 'neutral' | 'accent' | 'outline' | 'subtle';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export function Badge({ variant = 'neutral', children, className = '', ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2 py-0.5 text-[10px] font-sans font-medium tracking-wide uppercase border select-none';

  const variantStyles: Record<BadgeVariant, string> = {
    neutral: 'bg-[#161616] text-[#C8C3B8] border-[#1E1E1E]',
    accent: 'bg-[#7D0A0A]/15 text-[#F4F4F4] border-[#7D0A0A]/40',
    outline: 'bg-transparent text-[#888888] border-[#1E1E1E]',
    subtle: 'bg-white/5 text-[#F4F4F4] border-transparent'
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}

export default Badge;
