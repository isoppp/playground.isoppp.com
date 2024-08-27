import { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, waitFor, within } from '@storybook/test'
import { useState } from 'react'

import { Popover as Component } from './'

const description = `
### Additional Modifications

- !!! Require config modification
  - Add fade-in, fade-out to keyframes
  - Add fade-in, fade-out to animation
  - Add sm-md shadow to boxShadow
  - Change timing-function and duration to 0.15s and cubic-bezier(0.22, 1, 0.36, 1) in animation
- asChild is always true. user should not choose it

- TODO: Investigate if it's possible to enable boxShadow transition. Currently, this is challenging because the element is removed from the DOM after closing the tooltip, which interferes with the animation.
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
  render: (args) => {
    return (
      <div className="p-20">
        <Component {...args} />
      </div>
    )
  },
  args: {
    trigger: <button type="button">Trigger</button>,
    children: 'Hello, world!',
  },
}

export const Controlled: StoryObj<typeof Component> = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-20">
        <Component {...args} rootProps={{ open, onOpenChange: setOpen }} />
      </div>
    )
  },
  args: {
    trigger: <button type="button">Trigger</button>,
    children: 'Hello, world!',
  },
}

export const Test: StoryObj<typeof Component> = {
  tags: ['!autodocs'],
  render: (args) => {
    return (
      <div className="p-20">
        <Component {...args} />
      </div>
    )
  },
  args: {
    trigger: <button type="button">Trigger</button>,
    children: 'Hello, world!',
  },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement)

    // open popover
    await userEvent.click(c.getByRole('button'))
    await waitFor(() => {
      expect(document.querySelector('[data-testid=popover-content]')).toBeInTheDocument()
    })

    // close popover by clicking outside
    await userEvent.click(document.body)
    await waitFor(() => {
      expect(document.querySelector('[data-testid=popover-content]')).toBeNull()
    })
  },
}
