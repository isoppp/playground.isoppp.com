import { userEvent } from '@storybook/test'
import { render, screen } from '@testing-library/react'
import { Plus } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'

import { Button, Button as Component } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof Button>
const renderComponent = (props?: ComponentProps) => {
  render(<Button {...(props ?? {})} />)
}

describe('Button', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('asChild works correctly', async () => {
    const onClick = vitest.fn()
    render(
      <Component asChild onClick={onClick}>
        <button>
          <Plus data-testid="plus1" />
          <span>Button</span>
          <Plus data-testid="plus2" />
        </button>
      </Component>,
    )
    expect(screen.getByTestId('plus1')).toBeInTheDocument()
    expect(screen.getByTestId('plus2')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
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
