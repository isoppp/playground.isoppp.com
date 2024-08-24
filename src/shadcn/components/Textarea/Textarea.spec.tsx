import { userEvent } from '@storybook/test'
import { render, screen } from '@testing-library/react'
import { ComponentPropsWithoutRef } from 'react'

import { Textarea } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof Textarea>
const renderComponent = (props?: Partial<ComponentProps>) => {
  render(<Textarea {...(props ?? {})} />)
}

describe('Textarea', () => {
  it('renders correctly', () => {
    renderComponent({
      placeholder: 'placeholder',
    })
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument()
  })

  it('works correctly', async () => {
    const onChangeValue = vitest.fn()
    renderComponent({
      defaultValue: 'defaultValue',
      onChange: (e) => onChangeValue(e.target.value),
    })
    expect(screen.getByRole('textbox')).toHaveValue('defaultValue')
    await userEvent.type(screen.getByRole('textbox'), 'newValue')
    expect(onChangeValue).toBeCalledWith('defaultValuenewValue')
  })
})
