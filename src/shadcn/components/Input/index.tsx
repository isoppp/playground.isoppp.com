import * as React from 'react'

import { cn } from '@/shadcn/utils'

export interface InputProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    | 'type'
    | 'onChange'
    | 'onBlur'
    | 'onFocus'
    | 'onInput'
    | 'disabled'
    | 'placeholder'
    | 'defaultValue'
    | 'value'
    | 'autoFocus'
    | 'autoComplete'
  > {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn([
        'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
        'ring-offset-background',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
      ])}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }