import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Radio as Component, RadioGroup } from './'

const description = `
### Additional Modifications

- Export single radio component and radio group component
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

export const Usage: StoryObj<typeof Component> = {
  render: function Render() {
    const [value, setValue] = useState('1')
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <Component value={'1'} />
            <div>radio1</div>
          </label>
          <label className="flex items-center gap-3">
            <Component value={'2'} />
            <div>radio1</div>
          </label>
        </div>
      </RadioGroup>
    )
  },
}
