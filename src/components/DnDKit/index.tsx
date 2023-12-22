import { DndContext, DragMoveEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { FC, useState } from 'react'

import { List } from './List'

type Props = {}

export const DnDKit: FC<Props> = ({}) => {
  const [activeId, setActiveId] = useState(null)
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div>active: {activeId}</div>
      <List />
    </DndContext>
  )

  function handleDragStart(event: DragStartEvent) {
    if (!event.active) return
    setActiveId(event.active.id)
  }

  function handleDragMove(event: DragMoveEvent) {
    if (!event.over) return
    console.log('move', event)
  }

  function handleDragOver(event: DragOverEvent) {
    console.log('over', event)
  }

  function handleDragEnd() {
    setActiveId(null)
  }
}
