import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'focus-visible:ring-ring ring-offset-background font-button-medium-sm inline-flex items-center justify-center break-keep text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary hover:bg-primary-dark disabled:bg-gray-30',
        label:
          'font-semibold text-black underline-offset-4 disabled:text-gray-40',
        disabled: 'bg-gray-40',
      },
      size: {
        lg: 'h-12 w-[315px] rounded-lg px-[2.5rem] py-3',
        md: 'h-12 w-[16.25rem] rounded-md px-[2.5rem] py-3',
        sm: 'h-12 w-[12.5rem] rounded-md px-[2.5rem] py-3',
        xs: 'h-12 w-[10.25rem] rounded-md px-[2.5rem] py-3',
        xxs: 'px-1 py-1',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        type="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
