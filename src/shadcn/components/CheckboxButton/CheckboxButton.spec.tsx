import { render, screen } from '@testing-library/react'
import { ComponentPropsWithoutRef } from 'react'

import { CheckboxButton } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof CheckboxButton>
const renderComponent = (props?: Partial<ComponentProps>) => {
  render(<CheckboxButton {...(props ?? {})} />)
}

describe('CheckboxButton', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
