import * as LabelPrimitive from '@radix-ui/react-label'
import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { forwardRef } from 'react'

const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  Pick<ComponentPropsWithoutRef<typeof LabelPrimitive.Root>, 'children' | 'htmlFor' | 'asChild'>
>((props, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
