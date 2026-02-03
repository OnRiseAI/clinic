import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'rounded-lg',

          // Variants
          {
            // Primary - Deep teal
            primary:
              'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md',
            // Secondary - Neutral
            secondary:
              'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300',
            // Outline
            outline:
              'border border-neutral-300 bg-transparent text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400',
            // Ghost
            ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100',
            // Accent - Warm coral for CTAs
            accent:
              'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-sm hover:shadow-md',
          }[variant],

          // Sizes
          {
            sm: 'h-9 px-3 text-sm',
            md: 'h-11 px-5 text-base',
            lg: 'h-13 px-7 text-lg',
          }[size],

          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
