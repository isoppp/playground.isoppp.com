import { FC } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { folders } from './data'
import { List } from './List'

type Props = {}

export const ReactDnD: FC<Props> = ({}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <List folders={folders} />
    </DndProvider>
  )
}
