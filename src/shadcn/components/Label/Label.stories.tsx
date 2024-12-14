import type { Meta, StoryObj } from '@storybook/react'

import { Label as Component } from './'

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

export const Default: StoryObj<typeof Component> = {
  args: {
    children: 'Label',
  },
}

export const AsChildPatternWithCheckbox: StoryObj<typeof Component> = {
  args: {
    asChild: true,
    children: (
      <label className="flex items-center gap-4">
        <span>Label</span>
        <input type="checkbox" />
      </label>
    ),
  },
}
