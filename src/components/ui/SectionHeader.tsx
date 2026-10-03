import React from 'react';

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  action,
  align = 'left',
  className = ''
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-[#222222] gap-6 ${
        align === 'center' ? 'text-center md:text-left' : ''
      } ${className}`}
    >
      <div className="space-y-2">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#7D0A0A] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7D0A0A]" />
            <span>{eyebrow}</span>
          </div>
        )}
        <h2 className="type-heading-xl text-[#F4F4F4]">
          {title}
          {titleAccent && (
            <span className="font-serif italic font-normal text-[#A0A0A0] ml-2">
              {titleAccent}
            </span>
          )}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-[#888888] max-w-xl font-sans leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0 flex items-center">{action}</div>}
    </div>
  );
}

export default SectionHeader;
