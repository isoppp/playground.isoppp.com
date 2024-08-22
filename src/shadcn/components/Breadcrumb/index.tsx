import { ChevronRight } from 'lucide-react'
import * as React from 'react'
import { FC, Fragment } from 'react'

export type BreadcrumbItem = {
  label: string
  href?: string
}

type Props = {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
}

export const Breadcrumb: FC<Props> = ({ items, separator }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 break-words text-sm text-muted-foreground sm:gap-2.5">
        {items.map((item, index) => {
          return (
            <Fragment key={item.label + index}>
              <li className="inline-flex items-center gap-1">
                {item.href ? (
                  <a className="transition-colors hover:text-foreground" href={item.href}>
                    {item.label}
                  </a>
                ) : (
                  item.label
                )}
              </li>
              {items.length - 1 > index && (
                <li role="presentation" aria-hidden="true">
                  {separator ?? <ChevronRight size={16} />}
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
