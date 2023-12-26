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
  const [startClientOffsetX, setStartClientOffsetX] = useState<number | null>(null)
  const [clientOffsetX, setClientOffsetX] = useState<number | null>(null)
  const [direction, setDirection] = useState<'up' | 'down' | 'none'>('none')

  const resetState = useCallback(() => {
    setDnd(null)
    setClientOffsetY(null)
    setClientOffsetX(null)
    setStartClientOffsetX(null)
    setDirection('none')
  }, [])

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
      if (startClientOffsetX == null) setStartClientOffsetX(newClientOffset.x)
      setClientOffsetX(newClientOffset.x)
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

  const moveTargetState = useMemo<{ borderType: Border; depth: number }>(() => {
    const invalidResponse = { borderType: 'none', depth: 0 } as const
    if (!dnd || dnd?.targetIndex == null) return invalidResponse

    const targetItem = filteredFlatItems[dnd.targetIndex]
    if (!targetItem) return invalidResponse

    const isUp = direction === 'up'
    const isDown = direction === 'down'

    const isPositionTop = dnd.position === 'top'
    const isPositionBottom = dnd.position === 'bottom'

    const prevItem = isDown ? targetItem : filteredFlatItems[dnd.targetIndex - 1]
    const nextItem = isUp ? targetItem : filteredFlatItems[dnd.targetIndex + 1]

    console.log({
      prev: prevItem?.id,
      next: nextItem?.id,
      prevItem,
      nextItem,
    })

    function getBorderType() {
      if (!dnd || !targetItem) return 'none'
      if (dnd.originalItem.type === 'item') {
        if (targetItem.type === 'folder') {
          if (dnd.isMiddle || (isUp && isPositionBottom) || (isDown && isPositionTop)) {
            return 'surround'
          } else if (isUp) {
            return prevItem ? 'top' : targetItem.type === 'folder' ? 'surround' : 'none'
          } else if (isDown) {
            return 'bottom'
          }
        } else if (isUp) {
          return 'top'
        } else if (isDown) {
          return 'bottom'
        }
      } else if (dnd.originalItem.type === 'folder') {
        // folderとアイテムの間にフォルダは入らない
        if (prevItem?.type === 'folder' && nextItem?.type === 'item') return 'none'
        // itemとitemの間にもフォルダは入らない
        if (prevItem?.type === 'item' && nextItem?.type === 'item') return 'none'

        if (targetItem.type === 'folder') {
          if (dnd.isMiddle || (isUp && isPositionBottom) || (isDown && isPositionTop)) {
            return 'surround'
          } else if (isUp) {
            return 'top'
          } else if (isDown) {
            return 'bottom'
          }
        } else if (isUp) {
          if (prevItem?.type === 'item') return 'none'
          return 'top'
        } else if (isDown) {
          if (nextItem?.type === 'item') return 'none'
          return 'bottom'
        }
      }

      return 'none'
    }

    function getMinDepth() {
      if (!dnd || !targetItem || borderType === 'none' || borderType === 'surround') return 0
      if (dnd.originalItem.type === 'item') {
        if (!prevItem) return -1

        return prevItem.type === 'folder' ? prevItem.depth + 1 : prevItem.depth
      } else if (dnd.originalItem.type === 'folder') {
        if (!prevItem || !nextItem) return 0

        if (prevItem.type === 'item') {
          return prevItem.depth - 1
        } else if (prevItem.type === 'folder' && nextItem.type === 'folder') {
          return prevItem.depth
        } else if (prevItem?.type === 'folder') {
          return prevItem.depth + 1
        }
      }

      return 0
    }
    function getMaxDepth() {
      if (!dnd || !targetItem || borderType === 'none' || borderType === 'surround') return 0
      if (dnd.originalItem?.type === 'item') {
        if (prevItem) {
          if (prevItem.type === 'folder') {
            return prevItem.depth + 1
          } else {
            return prevItem.depth
          }
        } else {
          return 0
        }
      } else if (dnd.originalItem?.type === 'folder') {
        if (prevItem) {
          if (prevItem.type === 'folder') {
            return Math.min(prevItem.depth + 1)
          } else if (prevItem.type === 'item') {
            return Math.min(prevItem.depth)
          }
        }
        return 0
      }

      return -1
    }

    function getDepth(borderType: Border) {
      if (!dnd || !targetItem || borderType === 'none' || borderType === 'surround') return 0
      const candidateDepth =
        dnd.originalItem.depth + Math.floor(((clientOffsetX ?? 0) - (startClientOffsetX ?? 0)) / 40)
      return Math.min(Math.max(getMinDepth(), candidateDepth), getMaxDepth())
    }

    const borderType = getBorderType()
    return {
      borderType: getBorderType(),
      depth: getDepth(borderType),
    }
  }, [clientOffsetX, direction, dnd, filteredFlatItems, startClientOffsetX])

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
    moveTargetState,
    onUpdateClientOffset,
  }
}
