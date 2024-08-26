import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { ChevronRight } from 'lucide-react'
import * as React from 'react'
import { FC, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const dropdownMenuVariants = tv({
  slots: {
    base: [
      'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
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

interface Props extends VariantProps<typeof dropdownMenuVariants> {
  title?: string
  items: DropdownMenuItem[]
  trigger: ReactNode
}

export const DropdownMenu: FC<Props> = ({ title, items, trigger }) => {
  const renderMenuItem = (menuItem: DropdownMenuItem, index: number) => {
    if (menuItem.subMenuItems) {
      return (
        <DropdownMenuPrimitive.Sub key={index}>
          <DropdownMenuPrimitive.SubTrigger className={subTrigger()}>
            {menuItem.icon && <span className={icon()}>{menuItem.icon}</span>}
            {menuItem.label}
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
      <DropdownMenuPrimitive.Item
        key={index}
        className={item()}
        disabled={menuItem.disabled}
        onClick={menuItem.onClick}
      >
        {menuItem.icon && <span className={icon()}>{menuItem.icon}</span>}
        {menuItem.label}
        {menuItem.shortcut && <span className={shortcut()}>{menuItem.shortcut}</span>}
      </DropdownMenuPrimitive.Item>
    )
  }

  return (
    <DropdownMenuPrimitive.Root>
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
