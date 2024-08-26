import { Meta, StoryObj } from '@storybook/react'
import { User } from 'lucide-react'

import { DropdownMenu as Component } from './'

const description = `
### Additional Modifications

- Simplify the component
- Remove radio and checkbox features
`

export default {
  component: Component,
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
} as Meta<typeof Component>

export const Default: StoryObj<typeof Component> = {
  args: {
    trigger: <button type="button">Trigger</button>,
    title: 'Title',
    items: [
      {
        label: 'Item 1',
        onClick: () => alert('Item 1 selected'),
      },
      {
        label: 'Item 2',
        onClick: () => alert('Item 2 selected'),
        icon: <User />,
        shortcut: '⌘N',
      },
      {
        label: 'Item 3',
        onClick: () => alert('Item 3 selected'),
        subMenuItems: [
          {
            label: 'Item 1',
            onClick: () => alert('Item 1 selected'),
          },
          {
            label: 'Item 2',
            onClick: () => alert('Item 2 selected'),
            icon: <User />,
            shortcut: '⌘N',
          },
          {
            label: 'Item 3',
            onClick: () => alert('Item 3 selected'),
          },
        ],
      },
    ],
  },
}
