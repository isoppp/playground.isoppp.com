import { Meta, StoryObj } from '@storybook/react'

import { Dialog as Component, DialogClose } from './'

const description = `
### Additional Modifications

- Set max-height and add overflow-y auto to the content slot
- Remove slide and zoom animation
- Replace focus:* wit focus-visible:*
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
  args: {
    trigger: <button type="button">Trigger</button>,
    title: 'title',
    description: 'description',
    children: <div className="bg-muted p-10">hello</div>,
    actions: (
      <>
        <DialogClose asChild>
          <button>cancel</button>
        </DialogClose>
        <button>submit</button>
      </>
    ),
  },
}

export const Long: StoryObj<typeof Component> = {
  args: {
    trigger: <button type="button">Trigger</button>,
    title: sampleText,
    description: sampleText,
    children: <div className="h-[10000px] bg-muted p-10">hello</div>,
  },
}
