import { FC } from 'react'

import { FlatItem } from './data'

type Props = {
  flatItem: FlatItem
}

export const Row: FC<Props> = ({ flatItem }) => {
  return (
    <div
      className={'bg-white border py-1 flex items-center gap-4'}
      style={{
        paddingLeft: 16 + (flatItem.depth + (flatItem.type === 'item' ? 1 : 0)) * 40 + 'px',
      }}
    >
      <div>handle</div>
      <div className="font-bold">{flatItem.type.substr(0, 1).toUpperCase()}</div>
      <div>{flatItem.id}</div>
      <div>{flatItem.depth}</div>
    </div>
  )
}
