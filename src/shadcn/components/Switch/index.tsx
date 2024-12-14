import * as SwitchPrimitives from '@radix-ui/react-switch'
import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { forwardRef } from 'react'

import { cn } from '@/shadcn/utils'

const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitives.Root>,
  Pick<
    ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    'checked' | 'defaultChecked' | 'onCheckedChange' | 'disabled'
  >
>(({ ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn([
      'w-11 cursor-pointer rounded-full border-2 border-transparent transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
    ])}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none',
        'block size-5 rounded-full bg-background shadow-lg ring-0 transition-transform',
        'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
