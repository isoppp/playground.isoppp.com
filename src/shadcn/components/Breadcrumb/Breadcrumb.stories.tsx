import { Meta, StoryObj } from '@storybook/react'

import { Breadcrumb as Component } from './'

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
    items: [{ label: 'Home', href: '/' }, { label: 'Docs', href: '/docs' }, { label: 'Breadcrumb' }],
  },
}
