import type { Meta, StoryObj } from '@storybook/react'

import { Breadcrumb as Component } from './'

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
    items: [{ label: 'Home', href: '/' }, { label: 'Docs', href: '/docs' }, { label: 'Breadcrumb' }],
  },
}
