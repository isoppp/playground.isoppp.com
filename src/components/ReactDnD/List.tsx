import { XYCoord } from 'dnd-core'
import { FC, Fragment, useCallback, useMemo, useState } from 'react'

import { FlatItem, folders } from './data'
import { Direction, onDraggingData, Row } from './Row'
import { flattenList } from './util'

type Props = {}

export const List: FC<Props> = ({}) => {
  const flatItems = useMemo(() => flattenList(folders), [])
  const [openFolderIds, setOpenFolderIds] = useState<string[]>([])
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

  const filteredFlatItems = useMemo(() => {
    return flatItems.filter((flatItem) => {
      if (flatItem.type === 'folder') {
        return !flatItem.rawFolder.parentId || openFolderIds.includes(flatItem.rawFolder.parentId)
      } else {
        return !flatItem.rawItem.parentId || openFolderIds.includes(flatItem.rawItem.parentId)
      }
    })
  }, [flatItems, openFolderIds])

  const [dnd, setDnd] = useState<
    | null
    | ({
        originalItem: FlatItem
      } & Pick<onDraggingData, 'position' | 'isMiddle' | 'targetIndex'>)
  >(null)
  const [clientOffsetY, setClientOffsetY] = useState<null | XYCoord['y']>(null)
  const [direction, setDirection] = useState<Direction>('none')

  const onUpdateClientOffset = useCallback(
    (newClientOffset: XYCoord) => {
      const threshold = 24
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
        if (clientOffsetY - newClientOffset.y > threshold) {
          setDirection('up')
          setClientOffsetY(newClientOffset.y)
        } else if (newClientOffset.y - clientOffsetY > threshold) {
          setDirection('down')
          setClientOffsetY(newClientOffset.y)
        }
      }
    },
    [clientOffsetY, direction],
  )

  const moveFlatItem = useCallback(
    ({ flatItem, originalIndex, targetIndex, position, isMiddle }: onDraggingData) => {
      if (originalIndex === targetIndex) {
        setDnd(null)
      } else {
        if (
          dnd?.originalItem.id !== flatItem.id ||
          dnd?.position !== position ||
          dnd?.targetIndex !== targetIndex ||
          dnd?.isMiddle !== isMiddle
        ) {
          setDnd({
            originalItem: flatItem,
            position,
            targetIndex,
            isMiddle,
          })
        }
      }
    },
    [dnd?.isMiddle, dnd?.originalItem.id, dnd?.position, dnd?.targetIndex],
  )

  const borderTypes = useMemo(() => {
    if (!dnd || !dnd?.targetIndex) return []
    const prevItem = flatItems[dnd.targetIndex - 1]
    const nextItem = flatItems[dnd.targetIndex - 1]

    return flatItems.map((flatItem, i) => {
      if (!dnd || dnd?.targetIndex !== i) return 'none'

      const position = dnd?.position ?? 'none'
      if (dnd.originalItem.type === 'item' && flatItem.type === 'folder') {
        if (dnd.isMiddle) {
          return 'surround'
        } else if (direction === 'up' && position === 'top' && prevItem) {
          return 'top'
        } else if (direction === 'down' && position === 'bottom' && nextItem) {
          return 'bottom'
        }
        return 'surround'
      } else if (direction.startsWith('up')) {
        return 'top'
      } else if (direction.startsWith('down')) {
        return 'bottom'
      }
      return 'none'
    })
  }, [direction, dnd, flatItems])

  const resetState = useCallback(() => {
    setDnd(null)
    setDirection('none')
    setClientOffsetY(null)
  }, [])

  return (
    <div>
      <button type="button" onClick={toggleAllFolders}>
        Toggle All Folders
      </button>
      <div className="p-1 bg-gray-100">
        <div className="flex flex-col">
          {filteredFlatItems.map((flatItem, i) => (
            <Fragment key={flatItem.id}>
              <Row
                key={flatItem.id}
                flatItem={flatItem}
                index={i}
                onDragging={moveFlatItem}
                onDrop={resetState}
                border={borderTypes[i] ?? 'none'}
                onUpdateClientOffset={onUpdateClientOffset}
                onToggleFolder={() => onToggleFolder(flatItem.id)}
                isFolderOpen={flatItem.type === 'folder' && openFolderIds.includes(flatItem.id)}
              />
            </Fragment>
          ))}
        </div>
      </div>
      <div className="fixed right-0 top-0 bg-gray-100 whitespace-pre-wrap z-[100]">{JSON.stringify(dnd, null, 2)}</div>
    </div>
  )
}
