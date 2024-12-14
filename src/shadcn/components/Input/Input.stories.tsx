import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Input as Component } from './'

const description = `
### Additional Modifications

- 
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

export const Patterns: StoryObj<typeof Component> = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Component type="text " />
      </div>
      <div>
        <Component type="file" />
      </div>
      <div>
        <Component type="password" />
      </div>
    </div>
  ),
}

export const Default: StoryObj<typeof Component> = {
  args: {
    placeholder: 'Placeholder',
    type: 'text',
    disabled: false,
    onFocus: fn(),
    onInput: fn(),
    onBlur: fn(),
    onChange: fn(),
  },
}
