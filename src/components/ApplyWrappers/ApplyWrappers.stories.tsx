import { Meta, StoryObj } from '@storybook/react'

import { ApplyWrappers as Component } from './ApplyWrappers'

export default {
  component: Component,
} satisfies Meta<typeof Component>

export const Default: StoryObj<typeof Component> = {
  args: {
    wrappers: [
      ({ children }) => (
        <div style={{ background: 'blur' }} className="p-4">
          {children}
        </div>
      ),
      ({ children }) => (
        <div style={{ background: 'red' }} className="p-4">
          {children}
        </div>
      ),
      ({ children }) => (
        <div style={{ background: 'gray' }} className="p-4">
          {children}
        </div>
      ),
      ({ children }) => <a href="#sample">{children}</a>,
    ],
    children: 'check me in devtool',
  },
}
