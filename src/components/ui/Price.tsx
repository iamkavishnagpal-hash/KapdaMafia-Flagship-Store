import React from 'react';

export interface PriceProps {
  amount: number;
  originalAmount?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Price({
  amount,
  originalAmount,
  currency = '₹',
  size = 'md',
  className = ''
}: PriceProps) {
  const sizeStyles = {
    sm: 'text-xs sm:text-sm',
    md: 'text-sm sm:text-base',
    lg: 'text-xl sm:text-2xl font-bold'
  };

  const formattedAmount = amount.toLocaleString('en-IN');
  const formattedOriginal = originalAmount ? originalAmount.toLocaleString('en-IN') : null;

  return (
    <div className={`inline-flex items-baseline gap-2 font-sans type-price ${className}`}>
      <span className={`font-semibold text-[#F4F4F4] ${sizeStyles[size]}`}>
        {currency}{formattedAmount}
      </span>
      {originalAmount && originalAmount > amount && (
        <span className="text-xs text-[#888888] line-through font-normal">
          {currency}{formattedOriginal}
        </span>
      )}
    </div>
  );
}

export default Price;
