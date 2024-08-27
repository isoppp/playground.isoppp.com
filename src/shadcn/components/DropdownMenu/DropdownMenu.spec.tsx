import { render, screen } from '@testing-library/react'
import { ComponentPropsWithoutRef } from 'react'

import { DropdownMenu } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof DropdownMenu>
const renderComponent = (props?: Partial<ComponentProps>) => {
  const onClickItem1 = vitest.fn()
  const onClickSubItem1 = vitest.fn()
  render(
    <DropdownMenu
      trigger={<button type="button">Trigger</button>}
      title={'Title'}
      items={[
        {
          label: 'Item 1',
          onClick: onClickItem1,
        },
        {
          label: 'Item 2',
          subMenuItems: [
            {
              label: 'Sub Item 1',
              onClick: onClickSubItem1,
            },
          ],
        },
      ]}
      {...(props ?? {})}
    />,
  )

  return {
    onClickItem1,
    onClickSubItem1,
  }
}

describe('DropdownMenu', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument()
  })
})
