import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as LabelPrimitive from '@radix-ui/react-label'
import { Check } from 'lucide-react'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/shadcn/utils'

export const CheckboxButton = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  Pick<
    ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    'checked' | 'defaultChecked' | 'onCheckedChange' | 'disabled'
  >
>(({ ...props }, ref) => (
  <LabelPrimitive.Root
    className={cn([
      'inline-flex items-center gap-2 rounded-md border px-3 py-1',
      'transition-colors hover:bg-muted',
      'cursor-pointer',
    ])}
  >
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'size-4 overflow-hidden rounded-sm border border-primary',
        'ring-offset-background',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
        <Check className="size-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    <div>label</div>
  </LabelPrimitive.Root>
))
CheckboxButton.displayName = CheckboxPrimitive.Root.displayName
