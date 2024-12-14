import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { ComponentPropsWithoutRef, FC } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

import { cn } from '@/shadcn/utils'

const tabsVariants = tv({
  slots: {
    root: '',
    list: 'inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
    tab: [
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium',
      'ring-offset-background transition-all',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
    ],
    content: [
      'ring-offset-background',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    ],
  },
})
const { root, list, tab, content } = tabsVariants()

interface TabsProps
  extends VariantProps<typeof tabsVariants>,
    Pick<
      ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
      'defaultValue' | 'value' | 'onValueChange' | 'children'
    > {}

export const Root: FC<TabsProps> = ({ ...props }) => {
  return <TabsPrimitive.Root className={cn(root())} {...props} />
}

interface ListProps
  extends VariantProps<typeof tabsVariants>,
    Pick<ComponentPropsWithoutRef<typeof TabsPrimitive.List>, 'children'> {}

export const List: FC<ListProps> = ({ ...props }) => {
  return <TabsPrimitive.List className={cn(list())} {...props} />
}

interface TabProps
  extends VariantProps<typeof tabsVariants>,
    Pick<ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>, 'children' | 'value'> {}

export const Tab: FC<TabProps> = ({ ...props }) => {
  return <TabsPrimitive.Trigger className={cn(tab())} {...props} />
}

interface ContentProps
  extends VariantProps<typeof tabsVariants>,
    Pick<ComponentPropsWithoutRef<typeof TabsPrimitive.Content>, 'children' | 'value'> {}

export const Content: FC<ContentProps> = ({ ...props }) => {
  return <TabsPrimitive.Content className={cn(content())} {...props} />
}
