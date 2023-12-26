import { XYCoord } from 'dnd-core'
import { useCallback, useMemo, useState } from 'react'

import { DRAG_DIRECTION_THRESHOLD } from './constants'
import { FlatItem } from './data'
import { Border, onDraggingData, Position } from './Row'
import { getAllChildItems } from './util'

type DragAndDropState = {
  originalItem: FlatItem
  position: Position
  originalIndex: number
  targetIndex: number
  isMiddle: boolean
}

export const useDragAndDrop = (flatItems: FlatItem[]) => {
  const [openFolderIds, setOpenFolderIds] = useState<string[]>([])
  const [dnd, setDnd] = useState<DragAndDropState | null>(null)
  const [clientOffsetY, setClientOffsetY] = useState<number | null>(null)
  const [direction, setDirection] = useState<'up' | 'down' | 'none'>('none')

  const filteredFlatItems = useMemo(() => {
    return flatItems.filter((flatItem) => {
      if (flatItem.type === 'folder') {
        return !flatItem.rawFolder.parentId || openFolderIds.includes(flatItem.rawFolder.parentId)
      } else {
        return !flatItem.rawItem.parentId || openFolderIds.includes(flatItem.rawItem.parentId)
      }
    })
  }, [flatItems, openFolderIds])

  const draggingChildIds = useMemo(() => {
    if (!dnd?.originalItem?.id) return []
    return getAllChildItems(dnd?.originalItem?.id, flatItems)
  }, [dnd?.originalItem?.id, flatItems])

  const onToggleFolder = useCallback(
    (folderId: string) => {
      if (openFolderIds.includes(folderId)) {
        setOpenFolderIds((old) => old.filter((id) => id !== folderId))
      } else {
        setOpenFolderIds((old) => [...old, folderId])
      }
    },
    [openFolderIds],
  )
  const toggleAllFolders = useCallback(() => {
    if (openFolderIds.length === 0) {
      setOpenFolderIds(flatItems.filter((flatItem) => flatItem.type === 'folder').map((flatItem) => flatItem.id))
    } else {
      setOpenFolderIds([])
    }
  }, [flatItems, openFolderIds.length])

  const onUpdateClientOffset = useCallback(
    (newClientOffset: XYCoord) => {
      if (direction === 'none' && !clientOffsetY) {
        setClientOffsetY(newClientOffset.y)
      } else if (direction) {
        if (direction === 'up') {
          setClientOffsetY((oldY) => (oldY ? Math.min(oldY, newClientOffset.y) : null))
        } else if (direction === 'down') {
          setClientOffsetY((oldY) => (oldY ? Math.max(oldY, newClientOffset.y) : null))
        }
      }

      if (clientOffsetY) {
        if (clientOffsetY - newClientOffset.y > DRAG_DIRECTION_THRESHOLD) {
          setDirection('up')
          setClientOffsetY(newClientOffset.y)
        } else if (newClientOffset.y - clientOffsetY > DRAG_DIRECTION_THRESHOLD) {
          setDirection('down')
          setClientOffsetY(newClientOffset.y)
        }
      }
    },
    [clientOffsetY, direction],
  )

  const onDragging = useCallback(
    ({ flatItem, originalIndex, targetIndex, position, isMiddle }: onDraggingData) => {
      if (
        dnd?.originalItem.id !== flatItem.id ||
        dnd?.position !== position ||
        dnd?.targetIndex !== targetIndex ||
        dnd?.isMiddle !== isMiddle
      ) {
        setDnd({
          originalItem: flatItem,
          originalIndex,
          position,
          targetIndex,
          isMiddle,
        })
      }
    },
    [dnd?.isMiddle, dnd?.originalItem.id, dnd?.position, dnd?.targetIndex],
  )

  const resetState = useCallback(() => {
    setDnd(null)
    setDirection('none')
    setClientOffsetY(null)
  }, [])

  const borderType = useMemo<Border>(() => {
    if (!dnd || dnd?.targetIndex == null) return 'none'

    const flatItem = flatItems[dnd.targetIndex]
    if (!flatItem) return 'none'

    const prevItem = flatItems[dnd.targetIndex - 1]
    // const nextItem = filteredFlatItems[dnd.targetIndex - 1]

    const isUp = direction === 'up'
    const isDown = direction === 'down'

    const isPositionTop = dnd.position === 'top'
    const isPositionBottom = dnd.position === 'bottom'

    if (dnd.originalItem.type === 'item') {
      if (flatItem.type === 'folder') {
        if (dnd.isMiddle || (isUp && isPositionBottom) || (isDown && isPositionTop)) {
          return 'surround'
        } else if (isUp) {
          return prevItem ? 'top' : flatItem.type === 'folder' ? 'surround' : 'none'
        } else if (isDown) {
          return 'bottom'
        }
      } else if (isUp) {
        return 'top'
      } else if (isDown) {
        return 'bottom'
      }
    } else if (dnd.originalItem.type === 'folder') {
      if (flatItem.type === 'folder') {
        if (dnd.isMiddle || (isUp && isPositionBottom) || (isDown && isPositionTop)) {
          return 'surround'
        } else if (isUp) {
          return 'top'
        } else if (isDown) {
          return 'bottom'
        }
      } else if (isUp) {
        return 'top'
      } else if (isDown) {
        return 'bottom'
      }
    }

    return 'none'
  }, [direction, dnd, flatItems])

  return {
    filteredFlatItems,
    draggingChildIds,
    openFolderIds,
    onToggleFolder,
    toggleAllFolders,
    dnd,
    direction,
    onDragging,
    resetState,
    borderType,
    onUpdateClientOffset,
  }
}
