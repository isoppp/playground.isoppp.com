import { Slot } from '@radix-ui/react-slot'
import { ButtonHTMLAttributes } from 'react'
import * as React from 'react'
import { tv, VariantProps } from 'tailwind-variants'

import { cn } from '@/shadcn/utils'

const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
    'border border-inherit',
    'ring-offset-background',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'border-transparent hover:bg-accent hover:text-accent-foreground',
      link: 'border-transparent text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'px-4 py-2',
      sm: 'rounded-md px-3 py-2',
      lg: 'rounded-md px-8 py-3',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface ButtonProps
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, asChild = false, children, leftIcon, rightIcon, ...props }, ref) => {
    const Component = asChild ? Slot : 'button'
    return (
      <Component className={cn(buttonVariants({ variant, size }))} ref={ref} {...props}>
        {leftIcon}
        {children}
        {rightIcon}
      </Component>
    )
  },
)
Button.displayName = 'Button'
