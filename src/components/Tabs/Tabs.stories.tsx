import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Tabs } from './'

export default {
  component: Tabs.Root,
} as Meta<typeof Tabs.Root>

export const Controlled: StoryObj<typeof Tabs.Root> = {
  render: () => {
    const [value, setValue] = useState('a')
    return (
      <Tabs.Root value={value} onChangeValue={setValue}>
        <div className="flex items-center gap-4 border-b-4">
          <Tabs.Trigger value="a">
            {({ isActive, onClick }) => {
              return (
                <button type="button" onClick={onClick}>
                  Trigger1 active={isActive.toString()}
                </button>
              )
            }}
          </Tabs.Trigger>
          <Tabs.Trigger value="b">
            {({ isActive, onClick }) => {
              return (
                <button type="button" onClick={onClick}>
                  Trigger2 active={isActive.toString()}
                </button>
              )
            }}
          </Tabs.Trigger>
        </div>

        <div className="p-4">
          <Tabs.Content value="a">Tab1</Tabs.Content>
          <Tabs.Content value="b">Tab2</Tabs.Content>
        </div>
      </Tabs.Root>
    )
  },
  args: {},
}

export const UnControlled: StoryObj<typeof Tabs.Root> = {
  render: () => {
    return (
      <Tabs.Root defaultValue="a">
        <div className="flex items-center gap-4 border-b-4">
          <Tabs.Trigger value="a">
            {({ isActive, onClick }) => {
              return (
                <button type="button" onClick={onClick}>
                  Trigger1 active={isActive.toString()}
                </button>
              )
            }}
          </Tabs.Trigger>
          <Tabs.Trigger value="b">
            {({ isActive, onClick }) => {
              return (
                <button type="button" onClick={onClick}>
                  Trigger2 active={isActive.toString()}
                </button>
              )
            }}
          </Tabs.Trigger>
        </div>

        <div className="p-4">
          <Tabs.Content value="a">Tab1</Tabs.Content>
          <Tabs.Content value="b">Tab2</Tabs.Content>
        </div>
      </Tabs.Root>
    )
  },
  args: {},
}
