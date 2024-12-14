import type { Meta, StoryObj } from '@storybook/react'

import { useToast } from '@/shadcn/components/Toast/useToast'

import { Toast as Component, ToastAction } from './'

const description = `
### Additional Modifications

- 
`

export default {
  component: Component,
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
} as Meta<typeof Component>

const sampleText = Array(10).fill('Sample Text.').join(' ')

export const Default: StoryObj<typeof Component> = {
  render: function Render() {
    const { toast } = useToast()
    return (
      <div>
        <Component />
        <button className="block py-4" onClick={() => toast({ title: sampleText, description: sampleText })}>
          default
        </button>
        <button className="block py-4" onClick={() => toast({ title: sampleText, description: undefined })}>
          title only
        </button>
        <button className="block py-4" onClick={() => toast({ title: undefined, description: sampleText })}>
          description only
        </button>
        <button
          className="block py-4"
          onClick={() =>
            toast({
              title: undefined,
              description: sampleText,
              action: <ToastAction altText={'Do something'}>Action</ToastAction>,
            })
          }
        >
          with action
        </button>

        <button
          className="block py-4"
          onClick={() => toast({ title: sampleText, description: sampleText, variant: 'destructive' })}
        >
          destructive
        </button>
      </div>
    )
  },
  args: {},
}
