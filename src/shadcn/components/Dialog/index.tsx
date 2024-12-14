import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const dialogVariants = tv({
  slots: {
    overlay:
      'fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    content: [
      'left-1/ 2 fixed top-1/2 z-50 grid max-h-[90dvh] w-full max-w-[90vw] -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-lg border bg-background p-4 shadow-lg duration-200 md:max-w-lg',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    ],
    close: [
      'absolute right-4 top-4 rounded-sm ring-offset-background transition-opacity',
      'hover: opacity-80',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none',
      'data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
    ],
    header: 'flex flex-col space-y-1.5 text-center sm:text-left',
    footer: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
    title: 'text-lg font-semibold leading-none tracking-tight',
    description: 'text-sm text-muted-foreground',
  },
})

interface Props extends VariantProps<typeof dialogVariants> {
  trigger: ReactNode
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  actions?: ReactNode
  rootProps?: Pick<ComponentPropsWithoutRef<typeof DialogPrimitive.Root>, 'open' | 'onOpenChange' | 'modal'>
}
export const Dialog: FC<Props> = ({ trigger, title, description, children, actions, rootProps }) => {
  const className = dialogVariants()

  return (
    <DialogPrimitive.Root {...rootProps}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={className.overlay()} />
        <DialogPrimitive.Content className={className.content()}>
          <div className={className.header()}>
            <DialogPrimitive.DialogTitle className={className.title()}>{title}</DialogPrimitive.DialogTitle>
            {description && (
              <DialogPrimitive.DialogDescription className={className.description()}>
                {description}
              </DialogPrimitive.DialogDescription>
            )}
          </div>

          <div>{children}</div>
          {actions && <div className={className.footer()}>{actions}</div>}

          <DialogPrimitive.Close className={className.close()}>
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

export const DialogClose = DialogPrimitive.Close
