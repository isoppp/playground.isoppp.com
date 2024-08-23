import clsx from 'clsx'
import { FC } from 'react'

import { getTransformedRange } from './pagination.utils'

export type PaginationProps = {
  totalPage: number
  currentPage: number
  siblingCount?: number
}

export const Pagination: FC<PaginationProps> = ({ totalPage, currentPage, siblingCount = 2 }) => {
  const paginationItems = getTransformedRange({ currentPage, totalPage, siblingCount })

  const disabledPrev = currentPage <= 1
  const disabledNext = currentPage >= totalPage

  const commonItemClassNames = 'w-4 flex items-center justify-center'

  return (
    <div className="flex items-center gap-x-2 text-sm">
      <div className={clsx(commonItemClassNames, disabledPrev && 'bg-gray-400')}>{'<'}</div>
      {paginationItems.map((item, i) => {
        if (item.type === 'ellipsis') {
          return (
            <div key={i} className={clsx(commonItemClassNames, 'text-gray-500')}>
              ...
            </div>
          )
        } else {
          return (
            <div key={i} className={clsx(commonItemClassNames, currentPage === item.value && 'font-bold text-red-500')}>
              {item.value}
            </div>
          )
        }
      })}
      <div className={clsx(commonItemClassNames, disabledNext && 'bg-gray-400')}>{'>'}</div>
    </div>
  )
}
