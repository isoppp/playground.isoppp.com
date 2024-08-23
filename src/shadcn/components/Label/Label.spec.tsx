import { render, screen } from '@testing-library/react'
import { ComponentPropsWithoutRef } from 'react'

import { Label } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof Label>
const renderComponent = (props?: Partial<ComponentProps>) => {
  render(
    <>
      <Label {...(props ?? {})} htmlFor="1">
        label
      </Label>
      <input type="checkbox" id="1" defaultChecked={false} />
    </>,
  )
}

describe('Label', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByLabelText('label')).toBeInTheDocument()
  })
})
