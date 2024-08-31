import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { SelectRaw as Component } from './index'

const description = `
### Additional Modifications

- This component does not exist in shadcn/ui, but sometimes I need a simple select component that fits with other shadcn style components. 
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

const options = Array.from({ length: 100 }, (_, i) => ({
  label: 'Select Item ' + (i + 1),
  value: window.crypto.randomUUID(),
}))

export const Default: StoryObj<typeof Component> = {
  args: {
    options,
    value: options[50]?.value,
    onChange: fn(),
  },
}
