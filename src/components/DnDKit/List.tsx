import { useDndContext } from '@dnd-kit/core'
import { FC, useMemo } from 'react'

import { folders } from './data'
import { Draggable } from './Draggable'
import { Droppable } from './Droppable'
import { Row } from './Row'
import { flattenList } from './util'

type Props = {}

export const List: FC<Props> = ({}) => {
  const { active, dragOverlay, droppableRects, over, measureDroppableContainers, windowRect } = useDndContext()

  console.log({
    active,
    dragOverlay,
    droppableRects,
    over,
    measureDroppableContainers,
    windowRect,
  })
  const flatItems = useMemo(() => flattenList(folders), [])
  return (
    <div className="flex flex-col gap-1">
      {flatItems.map((flatItem) => (
        <Draggable flatItem={flatItem} key={flatItem.id}>
          <Droppable flatItem={flatItem}>
            <Row flatItem={flatItem} />
          </Droppable>
        </Draggable>
      ))}
    </div>
  )
}
