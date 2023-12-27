export type Item = {
  id: string
  order: number
  parentId: string | null
}
export type Folder = {
  id: string
  parentId: string | null
  order: number
  childItems: Item[]
  childFolders: Folder[]
}

export type FlatItem =
  | {
      type: 'folder'
      id: string // folderなら folder-, itemなら item- で始まる文字列(prefixは変数化）
      depth: number
      raw: Folder
    }
  | {
      type: 'item'
      id: string // folderなら folder-, itemなら item- で始まる文字列(prefixは変数化）
      depth: number
      raw: Item
    }

const randomId = () => Math.random().toString(32).substring(6)

function createFolder(props: {
  parentId?: string
  childProjectCount: number
  childFolderProjectCounts?: number[]
  order?: number
}): Folder {
  const { parentId, childProjectCount, childFolderProjectCounts, order = 0 } = props
  const did = randomId()

  return {
    id: did,
    parentId: parentId ?? null,
    order,
    childItems: Array.from({ length: childProjectCount }, (_, index) => ({
      id: randomId(),
      parentId: did,
      order: index,
    })),
    childFolders:
      childFolderProjectCounts?.map((count, index) =>
        createFolder({ parentId: did, childProjectCount: count, order: index }),
      ) ?? [],
  }
}

export const folders: Folder[] = [
  { childProjectCount: 0, childFolderProjectCounts: [0, 0, 0, 0, 0] },
  { childProjectCount: 0, childFolderProjectCounts: [0, 0] },
  { childProjectCount: 0, childFolderProjectCounts: [] },
  { childProjectCount: 2, childFolderProjectCounts: [2, 1, 0] },
  { childProjectCount: 0, childFolderProjectCounts: [1, 0] },
  { childProjectCount: 0, childFolderProjectCounts: [0, 1] },
  { childProjectCount: 1, childFolderProjectCounts: [1, 1] },
].map((props, index) => createFolder({ ...props, order: index }))
