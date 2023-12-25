import { FC, Fragment, useCallback, useMemo, useState } from 'react'

import { FlatItem, folders } from './data'
import { onDraggingData, Row } from './Row'
import { flattenList } from './util'

type Props = {}

export const List: FC<Props> = ({}) => {
  const flatItems = useMemo(() => flattenList(folders), [])
  const [dnd, setDnd] = useState<
    | null
    | ({
        originalItem: FlatItem
      } & Pick<onDraggingData, 'direction' | 'position' | 'isMiddle' | 'targetIndex'>)
  >(null)
  const moveFlatItem = useCallback(
    ({ flatItem, originalIndex, targetIndex, direction, position, isMiddle }: onDraggingData) => {
      if (originalIndex === targetIndex) {
        setDnd(null)
      } else {
        setDnd({
          originalItem: flatItem,
          direction,
          position,
          targetIndex,
          isMiddle,
        })
      }
    },
    [],
  )

  const borderTypes = useMemo(() => {
    if (!dnd || !dnd?.targetIndex) return []
    const prevItem = flatItems[dnd.targetIndex - 1]
    const nextItem = flatItems[dnd.targetIndex - 1]

    return flatItems.map((flatItem, i) => {
      if (!dnd || dnd?.targetIndex !== i) return 'none'

      const direction = dnd?.direction ?? 'none'
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
  }, [dnd, flatItems])
  return (
    <>
      <div className="flex flex-col">
        {flatItems.map((flatItem, i) => (
          <Fragment key={flatItem.id}>
            <Row
              key={flatItem.id}
              flatItem={flatItem}
              index={i}
              lastActiveIndex={dnd?.targetIndex ?? null}
              lastDirection={dnd?.direction ?? null}
              onDragging={moveFlatItem}
              onDrop={() => setDnd(null)}
              border={borderTypes[i] ?? 'none'}
            />
          </Fragment>
        ))}
      </div>
      <div className="pre-wrap">{JSON.stringify(dnd, null, 2)}</div>
    </>
  )
}
