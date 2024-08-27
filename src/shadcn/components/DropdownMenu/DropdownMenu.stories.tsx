import { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, waitFor } from '@storybook/test'
import { fn, within } from '@storybook/test'
import { User } from 'lucide-react'

import { DropdownMenu as Component } from './'

const description = `
### Additional Modifications

- Simplify the component
- Remove radio and checkbox features
- Disable slide animation and replace with fade animation
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

export const Test1: StoryObj<typeof Component> = {
  tags: ['!autodocs'],
  args: {
    trigger: <button type="button">Trigger</button>,
    title: 'Title',
    items: [
      {
        label: 'Item 1',
        onClick: fn(),
      },
      {
        label: 'Item 2',
        subMenuItems: [
          {
            label: 'Sub Item 1',
            onClick: fn(),
          },
        ],
      },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement)
    const doc = within(document.body)

    expect(c.getByRole('button', { name: 'Trigger' })).toBeInTheDocument()

    await userEvent.click(c.getByRole('button', { name: 'Trigger' }))

    await waitFor(() => {
      expect(doc.getByText('Title')).toBeInTheDocument()
    })
    await expect(doc.getAllByRole('menuitem').length).toBe(2)

    // click event
    await userEvent.click(doc.getByRole('menuitem', { name: 'Item 1' }))
    await expect(args.items[0].onClick).toHaveBeenCalledOnce()

    // sub menu
    await waitFor(() => {
      expect(c.getByRole('button', { name: 'Trigger' })).toBeInTheDocument()
    })
    await userEvent.click(c.getByRole('button', { name: 'Trigger' }))
    await userEvent.hover(doc.getByRole('menuitem', { name: 'Item 2' }))

    await waitFor(() => {
      expect(doc.getByRole('menuitem', { name: 'Sub Item 1' })).toBeInTheDocument()
    })

    await userEvent.click(doc.getByRole('menuitem', { name: 'Sub Item 1' }))
    await expect(args.items[1].subMenuItems?.[0].onClick).toHaveBeenCalledOnce()
  },
}
