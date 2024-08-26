import { render, screen } from '@testing-library/react'
import { ComponentPropsWithoutRef } from 'react'

import { DropdownMenu } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof DropdownMenu>
const renderComponent = (props?: Partial<ComponentProps>) => {
  render(<DropdownMenu {...(props ?? {})} />)
}

describe('DropdownMenu', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
