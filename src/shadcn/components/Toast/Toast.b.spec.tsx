import { userEvent } from '@storybook/test'
import { act, render, screen } from '@testing-library/react'

import { useToast } from '@/shadcn/components/Toast/useToast'

import { Toast } from '.'

function Render() {
  const { toast } = useToast()
  return (
    <>
      <button
        type="button"
        onClick={() =>
          toast({
            title: 'title',
            description: 'description',
            variant: 'default',
            action: <div data-testid="toast-action">action</div>,
          })
        }
      >
        Trigger
      </button>
      <Toast />
    </>
  )
}

const renderComponent = () => {
  render(<Render />)
}

describe('Toast', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('works correctly', async () => {
    renderComponent()
    expect(screen.getByRole('button')).toBeInTheDocument()

    await act(async () => {
      await userEvent.click(screen.getByRole('button'))
    })

    expect(screen.getByTestId('toast-title')).toBeInTheDocument()
    expect(screen.getByTestId('toast-description')).toBeInTheDocument()
    expect(screen.getByTestId('toast-action')).toBeInTheDocument()
  })
})
