import clsx from 'clsx'
import { Identifier, XYCoord } from 'dnd-core'
import { FC } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { MdDragIndicator } from 'react-icons/md'
import { MdArrowForwardIos } from 'react-icons/md'

import { ITEM_TYPE } from './constants'
import { FlatItem } from './data'

export type Position = 'none' | 'top' | 'bottom'
export type Border = 'top' | 'bottom' | 'surround' | 'none'

export type onDraggingData = {
  flatItem: FlatItem
  originalIndex: number
  targetIndex: number
  position: Position
  isMiddle: boolean
}
type Props = {
  flatItem: FlatItem
  index: number
  onDragging: (data: onDraggingData) => void
  onDrop: () => void
  borderState?: { borderType: Border; depth: number }
  onUpdateClientOffset: (clientOffset: XYCoord) => void
  onToggleFolder: () => void
  isFolderOpen?: boolean
  isDraggingChild: boolean
}

type DragItem = {
  index: number
  id: string
  type: string
  raw: FlatItem
}

export const Row: FC<Props> = ({
  flatItem,
  index,
  onDragging,
  onDrop,
  borderState,
  onUpdateClientOffset,
  onToggleFolder,
  isFolderOpen,
  isDraggingChild,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ITEM_TYPE.ITEM,
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

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverBoundingHeight = hoverBoundingRect.bottom - hoverBoundingRect.top
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      onUpdateClientOffset(clientOffset as XYCoord)

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

      // Time to actually perform the action
      onDragging({
        flatItem: item.raw,
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
    type: ITEM_TYPE.ITEM,
    item: () => {
      return { id: flatItem.id, index, raw: flatItem }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging || isDraggingChild ? 0.5 : 1
  preview(drop(ref))

  return (
    <div className="py-0.5" ref={ref} data-handler-id={handlerId}>
      <div
        className={clsx([
          'relative bg-white py-1 flex items-center gap-4',
          borderState?.borderType === 'surround' && 'shadow-[inset_0_0_0_3px_#3b82f6]',
        ])}
        style={{
          opacity,
          paddingLeft: 16 + flatItem.depth * 40 + 'px',
        }}
      >
        {borderState?.borderType === 'top' && (
          <div
            className="absolute -top-1 left-0 right-0 h-1 bg-blue-500  z-10"
            style={{
              left: borderState.depth * 40 + 'px',
            }}
          />
        )}
        {borderState?.borderType === 'bottom' && (
          <div
            className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-500 z-10"
            style={{
              left: borderState.depth * 40 + 'px',
            }}
          />
        )}
        <div ref={drag} className="flex items-center">
          <MdDragIndicator />
        </div>
        {flatItem.type === 'folder' && (
          <div className="flex items-center">
            <button
              type="button"
              onClick={onToggleFolder}
              className={clsx(['flex items-center', isFolderOpen && 'rotate-90'])}
            >
              <MdArrowForwardIos />
            </button>
          </div>
        )}
        <div>{index}</div>
        <div className="font-bold">{flatItem.type.substr(0, 1).toUpperCase()}</div>
        <div>id: {flatItem.id}</div>
        <div>depth: {flatItem.depth}</div>
        <div>order: {flatItem.order}</div>
      </div>
    </div>
  )
}
