import type { Meta, StoryObj } from '@storybook/react'

import { AnaglyphText as Component } from './'

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

export const Animate: StoryObj<typeof Component> = {
  args: {
    type: 'animate',
  },
}

export const Static: StoryObj<typeof Component> = {
  args: {
    type: 'static',
  },
}
