import { userEvent } from '@storybook/test'
import { act, render, screen } from '@testing-library/react'
import { ComponentPropsWithoutRef } from 'react'

import { CheckboxButton } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof CheckboxButton>
const renderComponent = (props?: Partial<ComponentProps>) => {
  const onCheckedChange = vitest.fn()
  render(<CheckboxButton label={'Label'} onCheckedChange={onCheckedChange} {...(props ?? {})} />)
  return {
    onCheckedChange,
  }
}

describe('CheckboxButton', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('works correctly', async () => {
    const { onCheckedChange } = renderComponent()

    await act(async () => {
      await userEvent.click(screen.getByRole('button'))
    })
    await act(async () => {
      await userEvent.click(screen.getByRole('checkbox'))
    })
    expect(onCheckedChange).toBeCalledTimes(2)
  })
})
