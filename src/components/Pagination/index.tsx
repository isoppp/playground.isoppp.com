import clsx from 'clsx'
import { FC, Fragment } from 'react'

import { usePagination } from './usePagination'

export type PaginationProps = {
  totalCount: number
  perPage: number
  currentPage: number
}

export const Pagination: FC<PaginationProps> = ({ perPage, currentPage, totalCount }) => {
  const lastPage = Math.ceil(totalCount / perPage)
  const pageItems = usePagination({
    lastPage,
    currentPage,
  })

  const disabledPrev = currentPage <= 1
  const disabledNext = currentPage >= lastPage

  return (
    <div className="flex items-center gap-x-2 text-sm">
      <div className={clsx(disabledPrev && 'bg-red-100 opacity-50')}>{'<'}</div>
      {pageItems.map((item, i) => {
        return (
          <Fragment key={i}>
            {typeof item === 'string' ? (
              <div>{item}</div>
            ) : (
              <div className={clsx(currentPage === item && 'text-red-500 font-bold')}>{item}</div>
            )}
          </Fragment>
        )
      })}
      <div className={clsx(disabledNext && 'bg-gray-100 opacity-50')}>{'>'}</div>
    </div>
  )
}
