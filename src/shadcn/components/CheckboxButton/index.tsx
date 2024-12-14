import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from 'react'
import { forwardRef } from 'react'

import { buttonVariants } from '@/shadcn/components/Button'
import { Checkbox } from '@/shadcn/components/Checkbox'
import { cn } from '@/shadcn/utils'

interface Props
  extends Pick<
    ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    'checked' | 'defaultChecked' | 'onCheckedChange' | 'disabled' | 'name'
  > {
  label: ReactNode
}

export const CheckboxButton = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, Props>(
  ({ label, ...props }, ref) => (
    <label className={buttonVariants({ variant: 'outline', size: 'xs' })} role="button">
      <Checkbox {...props} ref={ref} />
      <div className={cn('select-none', props.disabled && 'opacity-50')}>{label}</div>
    </label>
  ),
)
CheckboxButton.displayName = CheckboxPrimitive.Root.displayName
