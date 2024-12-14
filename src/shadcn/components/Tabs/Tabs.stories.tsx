import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import * as Tabs from './'

const description = `
### Additional Modifications

- Change export name
- Remove margin top from TabsContent
`

export default {
  component: Tabs.Root,
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
} as Meta<typeof Tabs.Root>

export const UncontrolledExample: StoryObj<typeof Tabs.Root> = {
  render: () => {
    return (
      <Tabs.Root defaultValue="1">
        <Tabs.List>
          <Tabs.Tab value="1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="2">Tab 2</Tabs.Tab>
          <Tabs.Tab value="3">Tab 3</Tabs.Tab>
        </Tabs.List>
        <div>
          <Tabs.Content value="1">Panel 1</Tabs.Content>
          <Tabs.Content value="2">Panel 2</Tabs.Content>
          <Tabs.Content value="3">Panel 3</Tabs.Content>
        </div>
      </Tabs.Root>
    )
  },
  args: {},
}

export const ControlledExample: StoryObj<typeof Tabs.Root> = {
  render: () => {
    const [value, setValue] = useState('1')
    return (
      <Tabs.Root value={value} onValueChange={setValue}>
        <Tabs.List>
          <Tabs.Tab value="1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="2">Tab 2</Tabs.Tab>
          <Tabs.Tab value="3">Tab 3</Tabs.Tab>
        </Tabs.List>
        <div>
          <Tabs.Content value="1">Panel 1</Tabs.Content>
          <Tabs.Content value="2">Panel 2</Tabs.Content>
          <Tabs.Content value="3">Panel 3</Tabs.Content>
        </div>
      </Tabs.Root>
    )
  },
  args: {},
}
