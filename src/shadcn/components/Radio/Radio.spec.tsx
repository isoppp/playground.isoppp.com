import { userEvent } from '@storybook/test'
import { act, render, screen } from '@testing-library/react'
import { ComponentPropsWithoutRef } from 'react'

import { Radio, RadioGroup } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof Radio>
const renderComponent = (props?: Partial<ComponentProps>) => {
  const onValueChange = vitest.fn()
  render(
    <RadioGroup onValueChange={onValueChange}>
      <Radio value={'1'} {...props} />
      <Radio value={'2'} {...props} />
      <Radio value={'3'} {...props} />
    </RadioGroup>,
  )

  return {
    onValueChange,
  }
}

describe('Radio', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    expect(screen.getAllByRole('radio').length).toBe(3)
  })

  it('works correctly', async () => {
    const { onValueChange } = renderComponent()

    await act(async () => {
      await userEvent.click(screen.getAllByRole('radio')[1])
    })
    expect(onValueChange).toBeCalledWith('2')
  })
})
