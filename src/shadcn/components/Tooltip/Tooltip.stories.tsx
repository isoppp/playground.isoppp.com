import { Meta, StoryObj } from '@storybook/react'
import { expect, waitFor } from '@storybook/test'
import { userEvent, within } from '@storybook/test'

import { Tooltip as Component } from './'

const description = `
### Additional Modifications

- !!! Require config modification
  - Add fade-in, fade-out to keyframes
  - Add fade-in, fade-out to animation
  - Add sm-md shadow to boxShadow
  - Change timing-function and duration to 0.15s and cubic-bezier(0.22, 1, 0.36, 1) in animation
- Remove classnames related to slide animation
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
    trigger: <button type="button">Hover me</button>,
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

    await userEvent.hover(c.getByRole('button'))
    await waitFor(() => {
      expect(c.getByTestId('tooltip-content')).toBeInTheDocument()
    })
  },
}
