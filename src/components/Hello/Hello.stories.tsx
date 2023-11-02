import { Meta, StoryObj } from '@storybook/react'

import { Hello as Component } from './'

export default {
  component: Component,
} as Meta<typeof Component>

export const Default: StoryObj<typeof Component> = {
  args: {},
}
