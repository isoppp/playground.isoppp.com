---
name: 'react-component'
root: './src'
output: '**/components'
ignore: []
questions:
  name: 'Please enter component name.(Convert to Pascal case.)'
---

# {{ inputs.name | pascal }}/index.tsx

```markdown
import { FC } from 'react'

type Props = {}

export const {{ inputs.name | pascal }}: FC<Props> = ({}) => {
  return <button type="button">{{ inputs.name | pascal }}</button>
}
```

# {{ inputs.name | pascal }}/{{ inputs.name | pascal }}.stories.tsx

```markdown
import { Meta, StoryObj } from '@storybook/react'

import { {{ inputs.name | pascal }} as Component } from './'

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
  args: {},
}
```

# {{ inputs.name | pascal }}/{{ inputs.name | pascal }}.spec.tsx

```markdown
import { render, screen } from '@testing-library/react'
import { ComponentPropsWithoutRef } from 'react'

import { {{ inputs.name | pascal }} } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof {{ inputs.name | pascal }}>
const renderComponent = (props?: Partial<ComponentProps>) => {
  render(<{{ inputs.name | pascal }} {...(props ?? {})} />)
}

describe('{{ inputs.name | pascal }}', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```
