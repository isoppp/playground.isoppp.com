import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

import { cn } from '@/shadcn/utils'

const popoverVariants = tv({
  slots: {
    content: [
      'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
      'animate-fade-in data-[state=closed]:animate-fade-out',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    ],
  },
})
const { content } = popoverVariants()

interface Props extends VariantProps<typeof popoverVariants> {
  trigger: ReactNode
  children: ReactNode
  rootProps?: Pick<ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>, 'open' | 'onOpenChange'>
  contentProps?: Pick<ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, 'align' | 'sideOffset' | 'side'>
}

export const Popover: FC<Props> = ({ trigger, children, rootProps, contentProps }) => {
  return (
    <PopoverPrimitive.Root {...rootProps}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={cn(content())}
          sideOffset={4}
          data-testid="popover-content"
          {...contentProps}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
