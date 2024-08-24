import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Textarea as Component } from './'

const description = `
### Additional Modifications

- Add an auto-resize feature using the field-resizing CSS property, which is a very new API.
  - See https://developer.mozilla.org/ja/docs/Web/CSS/field-sizing
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
    disabled: false,
    autoFocus: false,
    onChange: fn(),
    defaultValue: 'defaultValue',
    placeholder: 'placeholder',
    allowResize: false,
    autoResizable: true,
    minOrMaxHeightClassNames: ['min-h-16', 'max-h-40'],
  },
}
