import { render, screen } from '@testing-library/react'
import { ComponentPropsWithoutRef } from 'react'

import { Tooltip } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof Tooltip>
const renderComponent = (props?: Partial<ComponentProps>) => {
  render(
    <Tooltip content={'tooltip content'} {...(props ?? {})}>
      <button type="button">Trigger</button>
    </Tooltip>,
  )
}

describe('Tooltip', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  // Test behaviour on storybook with headless browser since it needs ResizeObserver mock.
})
