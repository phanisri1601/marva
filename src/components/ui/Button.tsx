'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 border-0 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200',
      secondary: 'bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200',
      outline: 'bg-transparent border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200',
    };

    const sizes = {
      sm: 'px-5 py-2 text-sm font-medium',
      md: 'px-6 py-2.5 text-base font-semibold',
      lg: 'px-8 py-3 text-lg font-semibold',
    };

    return (
      <button
        className={cn(
          'rounded-full font-medium transition-all duration-200 relative overflow-hidden',
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
