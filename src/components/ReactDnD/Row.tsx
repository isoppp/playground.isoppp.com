import { Identifier, XYCoord } from 'dnd-core'
import { FC } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { MdDragIndicator } from 'react-icons/md'

import { FlatItem } from './data'
import { ItemTypes } from './itemTypes'
type Props = {
  flatItem: FlatItem
  index: number
  moveFlatItem: (flatItem: FlatItem, originalIndex: number, targetIndex: number) => void
}

type DragItem = {
  index: number
  id: string
  type: string
  raw: FlatItem
}

export const Row: FC<Props> = ({ flatItem, index, moveFlatItem }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.FOLDER,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragItemIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragItemIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragItemIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragItemIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveFlatItem(item.raw, dragItemIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.FOLDER,
    item: () => {
      return { id: flatItem.id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.5 : 1
  preview(drop(ref))

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={'bg-white border py-1 flex items-center gap-4'}
      style={{
        opacity,
        paddingLeft: 16 + flatItem.depth * 40 + 'px',
      }}
    >
      <div ref={drag} className="flex items-center">
        <MdDragIndicator />
      </div>
      <div className="font-bold">{flatItem.type.substr(0, 1).toUpperCase()}</div>
      <div>id: {flatItem.id}</div>
      <div>depth: {flatItem.depth}</div>
    </div>
  )
}
