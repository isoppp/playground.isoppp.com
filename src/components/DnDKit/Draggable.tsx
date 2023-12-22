import { useDraggable } from '@dnd-kit/core'
import React, { FC, ReactNode } from 'react'

import { FlatItem } from './data'

type Props = {
  flatItem: FlatItem
  children: ReactNode
}
export const Draggable: FC<Props> = ({ flatItem, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: flatItem.id,
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  )
}
