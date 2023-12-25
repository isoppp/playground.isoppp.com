export type Item = {
  id: string
  parentId: string | null
}
export type Folder = {
  id: string
  parentId: string | null
  childItems: Item[]
  childFolders: Folder[]
}

export type FlatItem =
  | {
      type: 'folder'
      id: string // folderなら folder-, itemなら item- で始まる文字列(prefixは変数化）
      depth: number
      rawFolder: Folder
      rawItem: undefined
    }
  | {
      type: 'item'
      id: string // folderなら folder-, itemなら item- で始まる文字列(prefixは変数化）
      depth: number
      rawFolder: undefined
      rawItem: Item
    }

const dRandomId = () => 'd-' + Math.random().toString(32).substring(4)
const pRandomId = () => 'd-' + Math.random().toString(32).substring(4)

function createFolder(props: { id?: string; childProjectCount: number; childFolderProjectCounts?: number[] }): Folder {
  const { id, childProjectCount, childFolderProjectCounts } = props
  const did = id ?? dRandomId()
  return {
    id: did,
    parentId: null,
    childItems: Array(childProjectCount)
      .fill(0)
      .map(() => ({ id: pRandomId(), parentId: did })),
    childFolders: childFolderProjectCounts?.map((count) => createFolder({ id, childProjectCount: count })) ?? [],
  }
}

export const folders: Folder[] = [
  // createFolder({childProjectCount: 0, childFolderProjectCounts: [0, 0]}),
  createFolder({ childProjectCount: 0, childFolderProjectCounts: [] }),
  createFolder({ childProjectCount: 2, childFolderProjectCounts: [2, 1, 0] }),
  createFolder({ childProjectCount: 0, childFolderProjectCounts: [1, 0] }),
  createFolder({ childProjectCount: 0, childFolderProjectCounts: [0, 0] }),
  // createFolder({childProjectCount: 1, childFolderProjectCounts: [1, 1]}),
]
