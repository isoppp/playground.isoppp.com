import { FC, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Folder, folders } from './data'
import { List } from './List'

type Props = {}

export const ReactDnD: FC<Props> = ({}) => {
  const [foldersState, setFolders] = useState<Folder[]>(folders)
  return (
    <DndProvider backend={HTML5Backend}>
      <List folders={foldersState} setFolders={setFolders} />
    </DndProvider>
  )
}
