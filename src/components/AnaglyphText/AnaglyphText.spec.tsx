import { render, screen } from '@testing-library/react'
import { ComponentPropsWithoutRef } from 'react'

import { AnaglyphText } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof AnaglyphText>
const renderComponent = (props?: Partial<ComponentProps>) => {
  render(<AnaglyphText {...(props ?? {})} />)
}

describe('AnaglyphText', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
