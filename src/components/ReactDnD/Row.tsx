import clsx from 'clsx'
import { Identifier, XYCoord } from 'dnd-core'
import { FC } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { MdDragIndicator } from 'react-icons/md'

import { FlatItem } from './data'
import { ItemTypes } from './itemTypes'

export type Direction = 'none' | 'up' | 'down'
export type Position = 'none' | 'top' | 'bottom'
export type Border = 'top' | 'bottom' | 'surround' | 'none'

export type onDraggingData = {
  flatItem: FlatItem
  originalIndex: number
  targetIndex: number
  direction: Direction
  position: Position
  isMiddle: boolean
}
type Props = {
  flatItem: FlatItem
  index: number
  lastActiveIndex: null | number
  lastDirection: null | onDraggingData['direction']
  onDragging: (data: onDraggingData) => void
  onDrop: () => void
  border?: Border
}

type DragItem = {
  index: number
  id: string
  type: string
  raw: FlatItem
}

export const Row: FC<Props> = ({ flatItem, index, lastActiveIndex, lastDirection, onDragging, onDrop, border }) => {
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
      const activeIndex = lastActiveIndex ?? dragItemIndex
      const hoverIndex = index

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverBoundingHeight = hoverBoundingRect.bottom - hoverBoundingRect.top
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      let position: Position = 'none'
      let isMiddle = false
      if (hoverClientY < hoverBoundingHeight * 0.6 && hoverClientY > hoverBoundingHeight * 0.4) {
        isMiddle = true
      }

      // set position
      if (hoverClientY >= hoverMiddleY) {
        position = 'bottom'
      }
      if (hoverClientY <= hoverMiddleY) {
        position = 'top'
      }

      const isMoved = lastActiveIndex != null && lastDirection != null
      let direction: onDraggingData['direction'] = isMoved ? lastDirection : 'none'
      // Dragging downwards
      if (activeIndex < hoverIndex) {
        direction = 'down'
      }

      // Dragging upwards and hovering at top of the item
      if (activeIndex > hoverIndex) {
        direction = 'up'
      }

      // Time to actually perform the action
      onDragging({
        flatItem: item.raw,
        direction,
        position,
        originalIndex: dragItemIndex,
        targetIndex: hoverIndex,
        isMiddle,
      })
    },
    drop() {
      onDrop()
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.FOLDER,
    item: () => {
      return { id: flatItem.id, index, raw: flatItem }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.5 : 1
  preview(drop(ref))

  return (
    <div className="py-0.5">
      <div
        ref={ref}
        data-handler-id={handlerId}
        className={clsx([
          'relative bg-white border py-1 flex items-center gap-4',
          border === 'surround' && 'shadow-[inset_0_0_0_3px_#3b82f6]',
        ])}
        style={{
          opacity,
          paddingLeft: 16 + flatItem.depth * 40 + 'px',
        }}
      >
        {border === 'top' && <div className="absolute -top-1 left-0 right-0 h-1 bg-blue-500" />}
        {border === 'bottom' && <div className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-500" />}
        <div ref={drag} className="flex items-center">
          <MdDragIndicator />
        </div>
        <div className="font-bold">{flatItem.type.substr(0, 1).toUpperCase()}</div>
        <div>id: {flatItem.id}</div>
        <div>depth: {flatItem.depth}</div>
      </div>
    </div>
  )
}
