import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { CheckboxButton as Component } from './'

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
    label: 'Label',
    defaultChecked: true,
    onCheckedChange: fn(),
    disabled: false,
  },
}
