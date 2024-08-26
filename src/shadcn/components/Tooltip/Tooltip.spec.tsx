import { render, screen } from '@testing-library/react'
import { ComponentPropsWithoutRef } from 'react'

import { Tooltip } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof Tooltip>
const renderComponent = (props?: Partial<ComponentProps>) => {
  render(
    <Tooltip trigger={<button type="button">Trigger</button>} {...(props ?? {})}>
      tooltip content
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
