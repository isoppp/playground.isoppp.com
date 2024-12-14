import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { ChevronRight } from 'lucide-react'
import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

const dropdownMenuVariants = tv({
  slots: {
    base: [
      'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
      'animate-fade-in data-[state=closed]:animate-fade-out',
    ],
    item: [
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
      'transition-colors',
      'focus:bg-accent focus:text-accent-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    ],
    label: ['border-b border-muted px-2 py-1.5 text-sm font-semibold'],
    subTrigger: [
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
      'focus:bg-accent data-[state=open]:bg-accent',
    ],
    shortcut: 'ml-auto text-xs tracking-widest opacity-60',
    icon: 'mr-2',
    chevron: 'ml-auto size-4',
  },
})

const { base, item, label, subTrigger, shortcut, icon, chevron } = dropdownMenuVariants()

interface DropdownMenuItem {
  label: string
  icon?: ReactNode
  shortcut?: string
  disabled?: boolean
  onClick?: () => void
  subMenuItems?: DropdownMenuItem[]
}

const renderMenuItem = (menuItem: DropdownMenuItem, index: number): ReactNode => {
  const commonContent = (
    <>
      {menuItem.icon && <span className={icon()}>{menuItem.icon}</span>}
      {menuItem.label}
    </>
  )

  if (menuItem.subMenuItems) {
    return (
      <DropdownMenuPrimitive.Sub key={index}>
        <DropdownMenuPrimitive.SubTrigger className={subTrigger()}>
          {commonContent}
          <ChevronRight className={chevron()} />
        </DropdownMenuPrimitive.SubTrigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.SubContent className={base()}>
            {menuItem.subMenuItems.map((childItem, childIndex) => renderMenuItem(childItem, childIndex))}
          </DropdownMenuPrimitive.SubContent>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Sub>
    )
  }

  return (
    <DropdownMenuPrimitive.Item key={index} className={item()} disabled={menuItem.disabled} onClick={menuItem.onClick}>
      {commonContent}
      {menuItem.shortcut && <span className={shortcut()}>{menuItem.shortcut}</span>}
    </DropdownMenuPrimitive.Item>
  )
}

interface Props extends VariantProps<typeof dropdownMenuVariants> {
  title?: string
  items: DropdownMenuItem[]
  trigger: ReactNode
  rootProps?: Pick<ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>, 'open' | 'onOpenChange'>
}

export const DropdownMenu: FC<Props> = ({ title, items, trigger, rootProps }) => {
  return (
    <DropdownMenuPrimitive.Root {...rootProps}>
      <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content className={base()}>
          {title && <DropdownMenuPrimitive.Label className={label()}>{title}</DropdownMenuPrimitive.Label>}
          {items.map((item, index) => renderMenuItem(item, index))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}
