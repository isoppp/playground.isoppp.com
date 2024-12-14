import { userEvent } from '@storybook/test'
import { render, screen } from '@testing-library/react'
import type { ComponentPropsWithoutRef } from 'react'

import { Input } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof Input>
const renderComponent = (props?: Partial<ComponentProps>) => {
  render(<Input {...(props ?? {})} />)
}

describe('Input', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('works correctly', async () => {
    const onChange = vitest.fn()
    const onInput = vitest.fn()

    renderComponent({
      onChange,
      onInput,
    })
    expect(screen.getByRole('textbox')).toBeInTheDocument()

    await userEvent.type(screen.getByRole('textbox'), 'test')
    expect(onChange).toHaveBeenCalledTimes(4)
    expect(onInput).toHaveBeenCalledTimes(4)
  })
})
