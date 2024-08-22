import { render, screen } from '@testing-library/react'
import { ComponentPropsWithoutRef } from 'react'

import { Breadcrumb } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof Breadcrumb>
const renderComponent = (props?: Partial<ComponentProps>) => {
  render(
    <Breadcrumb
      items={[{ label: 'Home', href: '/' }, { label: 'Docs', href: '/docs' }, { label: 'Breadcrumb' }]}
      {...(props ?? {})}
    />,
  )
}

describe('Breadcrumb', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Docs' })).toBeInTheDocument()
    expect(screen.getByText('Breadcrumb')).toBeInTheDocument()
  })
})
