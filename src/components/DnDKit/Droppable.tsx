import { useDroppable } from '@dnd-kit/core'
import React, { FC, ReactNode } from 'react'

import { FlatItem } from './data'

type Props = {
  flatItem: FlatItem
  children: ReactNode
}
export const Droppable: FC<Props> = ({ flatItem, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: flatItem.id,
  })
  const style = {
    color: isOver ? 'green' : undefined,
  }

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  )
}
