import { render, screen } from '@testing-library/react'
import type { ComponentPropsWithoutRef } from 'react'

import { Popover } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof Popover>
const renderComponent = (props?: Partial<ComponentProps>) => {
  render(
    <Popover trigger={<button type="button">Trigger</button>} {...(props ?? {})}>
      Hello, world!
    </Popover>,
  )
}

describe('Popover', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
