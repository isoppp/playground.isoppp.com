import type { CSSProperties } from 'react'
import { forwardRef } from 'react'

import { cn } from '@/shadcn/utils'

interface Props {
  allowResize?: boolean
  autoResizable?: boolean
  minOrMaxHeightClassNames?: Array<`max-h-${string}` | `min-h-${string}`>
}
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, Props {}

const Textarea = forwardRef<
  HTMLTextAreaElement,
  Pick<
    TextareaProps,
    keyof Props | 'disabled' | 'autoFocus' | 'onChange' | 'value' | 'defaultValue' | 'rows' | 'placeholder'
  >
>(({ allowResize, autoResizable, minOrMaxHeightClassNames, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
        'ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        !allowResize && 'resize-none',
        minOrMaxHeightClassNames,
      )}
      style={autoResizable ? ({ 'field-sizing': 'content' } as CSSProperties) : undefined}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
