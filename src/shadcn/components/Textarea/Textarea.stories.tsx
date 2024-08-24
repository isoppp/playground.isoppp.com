import { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

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
    autoResizable: false,
  },
}

export const Resizable: StoryObj<typeof Component> = {
  args: {
    onChange: fn(),
    autoResizable: true,
    minOrMaxHeightClassNames: ['min-h-16', 'max-h-40'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const textarea = canvas.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
    const initialHeight = textarea.clientHeight
    await userEvent.type(canvas.getByRole('textbox'), '{Enter}{Enter}{Enter}{Enter}')
    const newHeight = textarea.clientHeight
    expect(initialHeight).not.toBe(newHeight)
  },
}
