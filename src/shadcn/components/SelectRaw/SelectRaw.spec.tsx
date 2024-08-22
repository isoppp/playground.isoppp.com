import { userEvent } from '@storybook/test'
import { render, screen } from '@testing-library/react'
import { ComponentPropsWithoutRef } from 'react'

import { SelectRaw } from './index'

type ComponentProps = ComponentPropsWithoutRef<typeof SelectRaw>
const renderComponent = (props?: Partial<ComponentProps>) => {
  render(
    <SelectRaw
      {...(props ?? {})}
      options={[
        {
          label: 'label1',
          value: 'value1',
        },
        {
          label: 'label2',
          value: 'value2',
        },
      ]}
    />,
  )
}

describe('SelectRaw', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getAllByRole('option').length).toBe(2)
  })

  it('works correctly', async () => {
    const onChange = vitest.fn()
    renderComponent({
      onChange: (e) => {
        onChange(e.target.value)
      },
    })
    expect(screen.getByRole('combobox')).toBeInTheDocument()

    await userEvent.selectOptions(screen.getByRole('combobox'), [screen.getAllByRole('option')[1]])
    expect(onChange).toBeCalledWith('value2')
  })
})
