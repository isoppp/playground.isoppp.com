import { render, screen } from '@testing-library/react'
import { ComponentPropsWithoutRef } from 'react'

import { Toast } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof Toast>
const renderComponent = (props?: Partial<ComponentProps>) => {
  render(<Toast {...(props ?? {})} />)
}

describe('Toast', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
