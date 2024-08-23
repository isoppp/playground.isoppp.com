import { Meta, StoryObj } from '@storybook/react'
import { range } from 'es-toolkit'

import { Pagination as Component } from './Pagination'

export default {
  component: Component,
  argTypes: {},
} as Meta<typeof Component>

export const DemoAllPatterns: StoryObj<typeof Component> = {
  render: () => {
    return (
      <div className="grid gap-4">
        {range(1, 3).map((siblingCount) => {
          return (
            <div key={siblingCount} className="border p-4">
              <div>siblingCount: {siblingCount}</div>
              <div>
                {range(1, 13).map((totalPage) => {
                  return (
                    <div key={totalPage} className="border p-4">
                      <div className="text-sm">totalPage: {totalPage}</div>
                      <div>
                        {range(1, totalPage + 1).map((current) => (
                          <Component
                            key={current}
                            siblingCount={siblingCount}
                            totalPage={totalPage}
                            currentPage={current}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  },
}

export const Default: StoryObj<typeof Component> = {
  args: {
    totalPage: 1,
    currentPage: 1,
    siblingCount: 1,
  },
}
