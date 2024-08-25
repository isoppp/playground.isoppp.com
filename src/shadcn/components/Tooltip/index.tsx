import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

import { cn } from '@/shadcn/utils'

const tooltipVariants = tv({
  slots: {
    content: [
      'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-sm-md',
      'transition-all',
      'animate-fade-in',
      'data-[state=closed]:animate-fade-out',
    ],
  },
})
const { content: contentClassName } = tooltipVariants()

interface Props extends VariantProps<typeof tooltipVariants> {
  children: ReactNode
  content: ReactNode
  providerProps?: Pick<ComponentPropsWithoutRef<typeof TooltipPrimitive.TooltipProvider>, 'delayDuration'>
  contentProps?: Pick<ComponentPropsWithoutRef<typeof TooltipPrimitive.TooltipContent>, 'align' | 'side'>
}

export const Tooltip: FC<Props> = ({ children, content, contentProps, providerProps }) => {
  return (
    <TooltipPrimitive.TooltipProvider delayDuration={0} {...(providerProps ?? {})}>
      <TooltipPrimitive.Tooltip>
        <TooltipPrimitive.TooltipTrigger asChild>{children}</TooltipPrimitive.TooltipTrigger>
        <TooltipPrimitive.TooltipContent
          data-testid="tooltip-content"
          side={'top'}
          align={'center'}
          className={cn(contentClassName())}
          {...(contentProps ?? {})}
        >
          {content}
        </TooltipPrimitive.TooltipContent>
      </TooltipPrimitive.Tooltip>
    </TooltipPrimitive.TooltipProvider>
  )
}
