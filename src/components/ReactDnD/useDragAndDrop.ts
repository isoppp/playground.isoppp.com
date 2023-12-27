import { XYCoord } from 'dnd-core'
import { useCallback, useMemo, useRef, useState } from 'react'

import { DRAG_DIRECTION_THRESHOLD, MIN_ORDER } from './constants'
import { FlatItem } from './data'
import { Border, onDraggingData, Position } from './Row'
import { collectChildFolderIds, findLastIndex, getAllChildItems } from './util'

export type Direction = 'none' | 'up' | 'down'

type DragAndDropState = {
  originalItem: FlatItem
  position: Position
  originalIndex: number
  targetIndex: number
  isMiddle: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useDragAndDrop = (flatItems: FlatItem[], setFlatItems: (items: FlatItem[]) => void) => {
  const [openFolderIds, setOpenFolderIds] = useState<string[]>([])
  const [dnd, setDnd] = useState<DragAndDropState | null>(null)
  const [realtimeOffset, setRealtimeOffset] = useState<XYCoord | null>(null)
  const clientOffsetY = useRef<number | null>(null)
  const offsetXByDndUpdate = useRef<number | null>(null)
  const [direction, setDirection] = useState<Direction>('none')

  const resetState = useCallback(() => {
    setDnd(null)
    setRealtimeOffset(null)
    clientOffsetY.current = null
    offsetXByDndUpdate.current = null
    setDirection('none')
  }, [])

  const filteredFlatItems = useMemo(() => {
    return flatItems.filter((flatItem) => !flatItem.raw.parentId || openFolderIds.includes(flatItem.raw.parentId))
  }, [flatItems, openFolderIds])

  const draggingChildIds = useMemo(() => {
    if (!dnd?.originalItem?.id) return []
    return getAllChildItems(dnd?.originalItem?.id, flatItems)
  }, [dnd?.originalItem?.id, flatItems])

  const onToggleFolder = useCallback(
    (folderId: string) => {
      if (openFolderIds.includes(folderId)) {
        // フォルダを閉じる場合、その子フォルダのIDも収集して除外する
        const childFolderIds = collectChildFolderIds(folderId, flatItems)
        setOpenFolderIds((old) => old.filter((id) => id !== folderId && !childFolderIds.includes(id)))
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
      setRealtimeOffset(newClientOffset)

      if (offsetXByDndUpdate.current === null) {
        offsetXByDndUpdate.current = newClientOffset.x
      }

      if (direction === 'none' && clientOffsetY.current === null) {
        clientOffsetY.current = newClientOffset.y
      } else if (direction) {
        if (direction === 'up') {
          clientOffsetY.current =
            clientOffsetY.current !== null ? Math.min(clientOffsetY.current, newClientOffset.y) : null
        } else if (direction === 'down') {
          clientOffsetY.current =
            clientOffsetY.current !== null ? Math.max(clientOffsetY.current, newClientOffset.y) : null
        }
      }

      if (clientOffsetY.current !== null) {
        if (clientOffsetY.current - newClientOffset.y > DRAG_DIRECTION_THRESHOLD) {
          setDirection('up')
          clientOffsetY.current = newClientOffset.y
        } else if (newClientOffset.y - clientOffsetY.current > DRAG_DIRECTION_THRESHOLD) {
          setDirection('down')
          clientOffsetY.current = newClientOffset.y
        }
      }
    },
    [clientOffsetY, direction, offsetXByDndUpdate],
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
        offsetXByDndUpdate.current = realtimeOffset?.x ?? null
      }
    },
    [dnd?.isMiddle, dnd?.originalItem.id, dnd?.position, dnd?.targetIndex, realtimeOffset?.x],
  )

  const moveTargetState = useMemo<{
    borderType: Border
    depth: number
    prevItem?: FlatItem
    nextItem?: FlatItem
  }>(() => {
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

        if (prevItem.type === 'item' && nextItem.type === 'folder') {
          return Math.min(prevItem.depth, nextItem.depth)
        }
        if (prevItem.type === 'item') {
          return prevItem.depth
        }
        if (prevItem.type === 'folder' && nextItem.type === 'folder') {
          if (prevItem.depth === nextItem.depth) {
            return prevItem.depth
          } else {
            return nextItem.depth
          }
        }
        if (prevItem?.type === 'folder') {
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
        dnd.originalItem.depth + Math.floor(((realtimeOffset?.x ?? 0) - (offsetXByDndUpdate.current ?? 0)) / 40)
      return Math.min(Math.max(getMinDepth(), candidateDepth), getMaxDepth())
    }

    const borderType = getBorderType()
    return {
      borderType: getBorderType(),
      depth: getDepth(borderType),
      prevItem,
      nextItem,
    }
  }, [direction, dnd, filteredFlatItems, realtimeOffset?.x])

  const onDrop = useCallback(() => {
    if (!dnd) return

    const targetItem = filteredFlatItems[dnd.targetIndex]
    if (!targetItem) return

    let newParentId: string | null = null
    let newOrder = MIN_ORDER

    if (moveTargetState.borderType === 'surround') {
      newParentId = targetItem.id
      // filterから探さなくて大丈夫か？
      const lastChildReverseIndex = findLastIndex(
        flatItems,
        (item) => item?.type === dnd.originalItem.type && item?.parentId === targetItem.id,
      )
      const lastChild = flatItems[lastChildReverseIndex]
      newOrder = lastChild ? lastChild.order + 1 : MIN_ORDER
    } else if (moveTargetState.borderType === 'top' || moveTargetState.borderType === 'bottom') {
      const { depth, prevItem, nextItem } = moveTargetState

      // console.log({
      //   depth,
      //   nextDepth: nextItem?.depth,
      //   nextId: nextItem?.id,
      //   prevDepth: prevItem?.depth,
      //   prevId: prevItem?.id,
      // })

      if (nextItem && dnd.originalItem.type === nextItem?.type && nextItem.depth === depth) {
        // console.log('1')
        newOrder = nextItem.order
        newParentId = nextItem.parentId
      } else if (prevItem && dnd.originalItem.type === prevItem?.type && prevItem.depth === depth) {
        // console.log('2')
        newOrder = prevItem.order + 1
        newParentId = prevItem.parentId
      } else {
        // console.log('3')
        const lastChildReverseIndex = findLastIndex(flatItems, (item) => {
          return dnd.originalItem.type === item?.type && depth === item.depth
        })
        const lastChild = flatItems[lastChildReverseIndex]
        newOrder = lastChild ? lastChild.order + 1 : MIN_ORDER
        newParentId = lastChild ? lastChild.parentId : prevItem?.id ?? null
      }
    }

    const insertBefore = flatItems.find(
      (item) => item.type === dnd.originalItem.type && item.parentId === newParentId && item.order === newOrder,
    )

    console.log({
      type: dnd.originalItem.type,
      id: dnd.originalItem.raw.id,
      parentId: newParentId,
      order: newOrder,
      insertBeforeId: insertBefore?.id ?? null,
    })

    resetState()
  }, [dnd, filteredFlatItems, flatItems, moveTargetState, resetState])

  return {
    filteredFlatItems,
    draggingChildIds,
    openFolderIds,
    onToggleFolder,
    toggleAllFolders,
    dnd,
    direction,
    onDragging,
    onDrop,
    moveTargetState,
    onUpdateClientOffset,
  }
}
