import { FC, Fragment, useMemo } from 'react'

import { Folder } from './data'
import { Row } from './Row'
import { useDragAndDrop } from './useDragAndDrop'
import { flattenList } from './util'

type Props = {
  folders: Folder[]
}

export const List: FC<Props> = ({ folders }) => {
  const flatItems = useMemo(() => flattenList(folders), [folders])
  const {
    filteredFlatItems,
    draggingChildIds,
    openFolderIds,
    onToggleFolder,
    toggleAllFolders,
    dnd,
    onUpdateClientOffset,
    direction,
    resetState,
    borderType,
    onDragging,
  } = useDragAndDrop(flatItems)

  return (
    <div>
      <button type="button" onClick={toggleAllFolders}>
        Toggle All Folders
      </button>
      <div className="p-1 bg-gray-100">
        <div className="flex flex-col">
          {filteredFlatItems.map((flatItem, i) => {
            const isDraggingChild = draggingChildIds.includes(flatItem.id)
            const showBorder =
              !isDraggingChild && dnd && dnd?.originalIndex !== dnd?.targetIndex && dnd.targetIndex === i
            return (
              <Fragment key={flatItem.id}>
                <Row
                  key={flatItem.id}
                  flatItem={flatItem}
                  index={i}
                  onDragging={onDragging}
                  onDrop={resetState}
                  border={showBorder ? borderType : 'none'}
                  onUpdateClientOffset={onUpdateClientOffset}
                  onToggleFolder={() => onToggleFolder(flatItem.id)}
                  isFolderOpen={flatItem.type === 'folder' && openFolderIds.includes(flatItem.id)}
                  isDraggingChild={isDraggingChild}
                />
              </Fragment>
            )
          })}
        </div>
      </div>
      <div className="fixed right-0 top-0 bg-gray-100 whitespace-pre-wrap z-[100]">
        {JSON.stringify({ direction, dnd }, null, 2)}
      </div>
    </div>
  )
}
