import { userEvent } from '@storybook/test'
import { render, screen } from '@testing-library/react'
import { ComponentPropsWithoutRef } from 'react'

import { Button } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof Button>
const renderComponent = (props?: ComponentProps) => {
  render(<Button {...(props ?? {})} />)
}

describe('Button', () => {
  it('renders correctly', () => {
    renderComponent({
      leftIcon: <span data-testid="left">left icon</span>,
      rightIcon: <span data-testid="right">right icon</span>,
    })
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByTestId('left')).toBeInTheDocument()
    expect(screen.getByTestId('right')).toBeInTheDocument()
  })

  it('can handle onClick event', async () => {
    const onClick = vitest.fn()
    renderComponent({
      onClick,
    })
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
