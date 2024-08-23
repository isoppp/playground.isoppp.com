import { ChevronDown } from 'lucide-react'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/shadcn/utils'

export type SelectOption = {
  label: string
  value: string
}
type Props = {
  options: SelectOption[]
}

export const SelectRaw = forwardRef<
  ElementRef<'select'>,
  Props & Pick<ComponentPropsWithoutRef<'select'>, 'onChange' | 'value' | 'defaultValue'>
>(({ options, ...props }, ref) => (
  <div className="relative w-full">
    <select
      ref={ref}
      className={cn([
        'appearance-none',
        'flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 my-0 text-sm',
        'ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      ])}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2" />
  </div>
))
SelectRaw.displayName = 'Select'
