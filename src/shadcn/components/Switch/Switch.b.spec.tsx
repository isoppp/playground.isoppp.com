import { userEvent } from '@storybook/test'
import { act, render, screen } from '@testing-library/react'
import type { ComponentPropsWithoutRef } from 'react'

import { Switch } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof Switch>
const renderComponent = (props?: Partial<ComponentProps>) => {
  render(<Switch {...(props ?? {})} />)
}

describe('Switch', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('works correctly', async () => {
    const onCheckedChange = vitest.fn()
    renderComponent({
      defaultChecked: false,
      onCheckedChange,
    })
    expect(screen.getByRole('switch')).toBeInTheDocument()

    await act(async () => {
      await userEvent.click(screen.getByRole('switch'))
    })
    expect(onCheckedChange).toBeCalledWith(true)
  })
})
