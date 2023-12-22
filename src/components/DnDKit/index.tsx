import { DndContext } from '@dnd-kit/core'
import { FC, useMemo } from 'react'

import { folders } from './data'
import { flattenList } from './util'

type Props = {}

export const DnDKit: FC<Props> = ({}) => {
  const flatItems = useMemo(() => flattenList(folders), [])
  return (
    <DndContext>
      <div className="flex flex-col gap-1">
        {flatItems.map((item) => (
          <div
            key={item.id}
            className={'border py-1 flex items-center gap-4'}
            style={{
              paddingLeft: 16 + (item.depth + (item.type === 'item' ? 1 : 0)) * 40 + 'px',
            }}
          >
            <div>handle</div>
            <div className="font-bold">{item.type.substr(0, 1).toUpperCase()}</div>
            <div>{item.id}</div>
            <div>{item.depth}</div>
          </div>
        ))}
      </div>
    </DndContext>
  )
}
