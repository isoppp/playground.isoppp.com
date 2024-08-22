import { Meta, StoryObj } from '@storybook/react'
import { FaPlus } from 'react-icons/fa'

import { Button as Component } from './'

const description = `
### Additional Modifications

- Remove icon variant, I think icon button should be another component.
- Add left/right icon props.
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

export const _Patterns: StoryObj<typeof Component> = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Component>Button</Component>
      </div>
      <div>
        <Component leftIcon={<FaPlus />}>Button</Component>
      </div>
      <div>
        <Component rightIcon={<FaPlus />}>Button</Component>
      </div>
    </div>
  ),
}

export const Default: StoryObj<typeof Component> = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
}
