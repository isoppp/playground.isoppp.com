import { fireEvent, render } from '@testing-library/react'
import { ComponentPropsWithoutRef } from 'react'

import { Dialog } from '.'

type ComponentProps = ComponentPropsWithoutRef<typeof Dialog>
const renderComponent = (props?: Partial<ComponentProps>) => {
  return render(
    <Dialog trigger={<button>Open Dialog</button>} title="Dialog Title" {...props}>
      Dialog Content
    </Dialog>,
  )
}

describe('Dialog', () => {
  it('renders correctly', () => {
    const { getByText } = renderComponent()
    expect(getByText('Open Dialog')).toBeInTheDocument()
  })

  it('opens and shows content when trigger is clicked', () => {
    const { getByText } = renderComponent()

    fireEvent.click(getByText('Open Dialog'))

    expect(getByText('Dialog Title')).toBeInTheDocument()
    expect(getByText('Dialog Content')).toBeInTheDocument()
  })

  it('closes the dialog when the close button is clicked', () => {
    const { getByText, getByRole, queryByText } = renderComponent()

    fireEvent.click(getByText('Open Dialog'))

    const closeButton = getByRole('button', { name: 'Close' })
    fireEvent.click(closeButton)

    expect(queryByText('Dialog Title')).not.toBeInTheDocument()
    expect(queryByText('Dialog Content')).not.toBeInTheDocument()
  })

  it('calls onOpenChange when dialog state changes', () => {
    const onOpenChange = vi.fn()

    const { getByText } = renderComponent({
      rootProps: {
        onOpenChange,
      },
    })

    fireEvent.click(getByText('Open Dialog'))

    expect(onOpenChange).toHaveBeenCalledWith(true)

    const closeButton = getByText('Close')
    fireEvent.click(closeButton)

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
