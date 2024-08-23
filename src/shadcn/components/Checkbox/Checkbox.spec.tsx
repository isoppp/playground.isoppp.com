import { userEvent } from '@storybook/test'
import { act, render, screen } from '@testing-library/react'
import { ComponentPropsWithoutRef } from 'react'

import { Checkbox } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof Checkbox>
const renderComponent = (props?: Partial<ComponentProps>) => {
  render(<Checkbox {...(props ?? {})} />)
}

describe('Checkbox', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('works correctly', async () => {
    const fn = vitest.fn()
    renderComponent({ onCheckedChange: fn })

    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    await act(async () => {
      await userEvent.click(screen.getByRole('checkbox'))
    })

    expect(fn).toBeCalledWith(true)
  })
})
