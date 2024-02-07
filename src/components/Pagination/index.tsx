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
      <div>
        {disabledPrev} {'<'}
      </div>
      {pageItems.map((item, i) => {
        return (
          <Fragment key={i}>
            {typeof item === 'string' ? (
              <div>{item}</div>
            ) : (
              <div>
                {item}
                {currentPage === item}
              </div>
            )}
          </Fragment>
        )
      })}
      <div>
        {disabledNext} {'>'}
      </div>
    </div>
  )
}
