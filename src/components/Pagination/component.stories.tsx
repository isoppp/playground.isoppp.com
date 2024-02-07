import { Meta, StoryObj } from '@storybook/react'

import { Pagination as Component } from './'

export default {
  component: Component,
  argTypes: {},
} as Meta<typeof Component>

export const Default: StoryObj<typeof Component> = {
  render: (args) => {
    const samples: Array<typeof args> = [
      { totalCount: 1, perPage: 2, currentPage: 1 },
      { totalCount: 6, perPage: 2, currentPage: 2 },
      { totalCount: 10, perPage: 2, currentPage: 3 },
      { totalCount: 10, perPage: 2, currentPage: 2 },
      { totalCount: 10, perPage: 2, currentPage: 4 },
      { totalCount: 14, perPage: 2, currentPage: 1 },
      { totalCount: 14, perPage: 2, currentPage: 7 },
      { totalCount: 16, perPage: 2, currentPage: 7 },
      { totalCount: 200, perPage: 2, currentPage: 1 },
      { totalCount: 200, perPage: 2, currentPage: 2 },
      { totalCount: 200, perPage: 2, currentPage: 3 },
      { totalCount: 200, perPage: 2, currentPage: 50 },
      { totalCount: 200, perPage: 2, currentPage: 100 },
      { totalCount: 200, perPage: 2, currentPage: 99 },
      { totalCount: 200, perPage: 2, currentPage: 98 },
    ]
    return (
      <div className="flex flex-col">
        <div>This is shown by args</div>
        <Component {...args} />
        <div className="flex flex-col gap-2 border-t mt-4 pt-4">
          <div>static examples...</div>
          {samples.map((props, i) => (
            <Component {...props} key={i} />
          ))}
        </div>
      </div>
    )
  },

  args: {
    totalCount: 1,
    perPage: 2,
    currentPage: 1,
  },
}
