import { Meta, StoryObj } from '@storybook/react'

import { Label as Component } from './'

const description = `
### Additional Modifications

- Remove icon variant, I think icon button should be another component.
- Add left/right icon props.
`

export default {
  component: Component,
  docs: {
    description: {
      component: description,
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
