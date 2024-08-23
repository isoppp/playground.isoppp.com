import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/shadcn/utils'

export const RadioGroup = RadioGroupPrimitive.RadioGroup
export const Radio = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  Pick<ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, 'disabled' | 'value'>
>(({ ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'size-4 rounded-full border border-primary text-primary',
        'ring-offset-background',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="size-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
Radio.displayName = 'Radio'
