import { FC, useCallback, useMemo } from 'react'

import { FlatItem, folders } from './data'
import { Row } from './Row'
import { flattenList } from './util'

type Props = {}

export const List: FC<Props> = ({}) => {
  const flatItems = useMemo(() => flattenList(folders), [])
  const moveFlatItem = useCallback(
    (flatItem: FlatItem, originalIndex: number, targetIndex: number) => {
      console.log(flatItem, originalIndex, targetIndex)
    },
    [flatItems],
  )

  return (
    <div className="flex flex-col gap-1">
      {flatItems.map((flatItem, i) => (
        <Row key={flatItem.id} flatItem={flatItem} index={i} moveFlatItem={moveFlatItem} />
      ))}
    </div>
  )
}
