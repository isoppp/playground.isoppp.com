import { userEvent } from '@storybook/test'
import { act, render, screen } from '@testing-library/react'

import * as Tabs from '@/shadcn/components/Tabs/index'

const renderUnControlledComponent = () => {
  render(
    <Tabs.Root defaultValue="1">
      <Tabs.List>
        <Tabs.Tab value="1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="3">Tab 3</Tabs.Tab>
      </Tabs.List>
      <div>
        <Tabs.Content value="1">Panel 1</Tabs.Content>
        <Tabs.Content value="2">Panel 2</Tabs.Content>
        <Tabs.Content value="3">Panel 3</Tabs.Content>
      </div>
    </Tabs.Root>,
  )
}

const renderControlledComponent = () => {
  const setValue = vitest.fn()
  render(
    <Tabs.Root value={'1'} onValueChange={setValue}>
      <Tabs.List>
        <Tabs.Tab value="1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="3">Tab 3</Tabs.Tab>
      </Tabs.List>
      <div>
        <Tabs.Content value="1">Panel 1</Tabs.Content>
        <Tabs.Content value="2">Panel 2</Tabs.Content>
        <Tabs.Content value="3">Panel 3</Tabs.Content>
      </div>
    </Tabs.Root>,
  )
  return {
    setValue,
  }
}

describe('Tabs', () => {
  describe('UnControlled', () => {
    it('renders correctly', () => {
      renderUnControlledComponent()
      expect(screen.getByRole('tablist')).toBeInTheDocument()
      expect(screen.getAllByRole('tab').length).toBe(3)
    })

    it('works correctly', async () => {
      renderUnControlledComponent()
      expect(screen.getByRole('tablist')).toBeInTheDocument()

      expect(screen.queryByText('Panel 3')).not.toBeInTheDocument()

      await act(async () => {
        await userEvent.click(screen.getByRole('tab', { name: 'Tab 3' }))
      })
      expect(screen.getByText('Panel 3')).toBeInTheDocument()
    })
  })

  describe('Controlled', () => {
    it('renders correctly', () => {
      renderControlledComponent()
      expect(screen.getByRole('tablist')).toBeInTheDocument()
      expect(screen.getAllByRole('tab').length).toBe(3)
    })

    it('works correctly', async () => {
      const { setValue } = renderControlledComponent()
      expect(screen.getByRole('tablist')).toBeInTheDocument()

      expect(screen.queryByText('Panel 3')).not.toBeInTheDocument()

      await act(async () => {
        await userEvent.click(screen.getByRole('tab', { name: 'Tab 3' }))
      })
      expect(setValue).toBeCalledWith('3')
    })
  })
})
