import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    // Base styles: clear focus state, no tap highlight, flex alignment
    const baseStyles =
      'inline-flex items-center justify-center font-sans font-medium transition-colors select-none rounded-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    // Size variants
    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'text-xs px-3.5 py-2 gap-1.5 min-h-[36px]',
      md: 'text-sm px-5 py-2.5 gap-2 min-h-[44px]',
      lg: 'text-sm sm:text-base px-7 py-3.5 gap-2.5 min-h-[48px]'
    };

    // Semantic style variants
    const variantStyles: Record<ButtonVariant, string> = {
      primary: 'bg-[#F4F4F4] text-[#080808] hover:bg-white active:bg-[#E5E5E5]',
      secondary: 'bg-[#161616] text-[#F4F4F4] border border-[#1E1E1E] hover:bg-[#202020] hover:border-[#333333] active:bg-[#111111]',
      outline: 'bg-transparent text-[#F4F4F4] border border-[#1E1E1E] hover:border-[#666666] hover:bg-white/5 active:bg-white/10',
      ghost: 'bg-transparent text-[#C8C3B8] hover:text-[#F4F4F4] hover:bg-white/5 active:bg-white/10',
      danger: 'bg-[#7D0A0A] text-white hover:bg-[#9E1010] active:bg-[#5C0707]'
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
