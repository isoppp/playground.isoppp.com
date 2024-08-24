import * as React from 'react'

import { cn } from '@/shadcn/utils'

interface Props {
  allowResize?: boolean
}
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, Props {}

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  Pick<
    TextareaProps,
    keyof Props | 'disabled' | 'autoFocus' | 'onChange' | 'value' | 'defaultValue' | 'rows' | 'placeholder'
  >
>(({ ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
        'ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'resize-none',
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
