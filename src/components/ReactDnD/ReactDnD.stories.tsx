import { Meta, StoryObj } from '@storybook/react'

import { ReactDnD as Component } from './'

export default {
  component: Component,
} as Meta<typeof Component>

export const Default: StoryObj<typeof Component> = {
  args: {},
}
