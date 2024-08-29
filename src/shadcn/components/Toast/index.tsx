import * as ToastPrimitives from '@radix-ui/react-toast'
import { X } from 'lucide-react'
import { FC, useEffect } from 'react'
import * as React from 'react'
import { tv } from 'tailwind-variants'

import { cn } from '@/shadcn/utils'

import { useToast } from './useToast'

const toastVariants = tv({
  slots: {
    base: 'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
    viewport:
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
    action:
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
    close:
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
    title: 'text-sm font-semibold',
    description: 'text-sm opacity-90',
  },
  variants: {
    variant: {
      default: {
        base: 'border bg-background text-foreground',
      },
      destructive: {
        base: 'destructive border-destructive bg-destructive text-destructive-foreground',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const Toast: FC = () => {
  const { toasts, dismiss } = useToast()

  useEffect(() => {
    toasts.forEach((t) => dismiss(t.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ToastPrimitives.Provider>
      {toasts.map(function ({ id, title, description, action, variant, ...rootProps }) {
        const className = toastVariants({ variant: variant ?? undefined })

        return (
          <ToastPrimitives.Root key={id} className={className.base()} {...rootProps}>
            <div className="grid gap-1">
              {title && (
                <ToastPrimitives.Title className={className.title()} data-testid="toast-title">
                  {title}
                </ToastPrimitives.Title>
              )}
              {description && (
                <ToastPrimitives.Description className={className.description()} data-testid="toast-description">
                  {description}
                </ToastPrimitives.Description>
              )}
            </div>
            {action}
            <ToastPrimitives.Close className={className.close()} toast-close="">
              <X className="size-4" />
            </ToastPrimitives.Close>
          </ToastPrimitives.Root>
        )
      })}
      <ToastPrimitives.Viewport className={toastVariants().viewport()} />
    </ToastPrimitives.Provider>
  )
}

export const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => {
  const { action } = toastVariants()
  return <ToastPrimitives.Action ref={ref} className={cn(action(), className)} {...props} />
})
ToastAction.displayName = ToastPrimitives.Action.displayName
