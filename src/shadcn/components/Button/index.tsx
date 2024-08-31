import { Slot } from '@radix-ui/react-slot'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

import { cn } from '@/shadcn/utils'

export const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
    'border border-inherit',
    'cursor-pointer', // for other HTML elements
    'transition-colors',
    'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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
      xs: 'rounded-sm px-2 py-1',
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
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, asChild = false, children, ...props }, ref) => {
    const Component = asChild ? Slot : 'button'
    return (
      <Component className={cn(buttonVariants({ variant, size }))} ref={ref} {...props}>
        {children}
      </Component>
    )
  },
)
Button.displayName = 'Button'
