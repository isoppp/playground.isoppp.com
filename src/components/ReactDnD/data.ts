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

export const folders: Folder[] = [
  {
    id: 'folder-1',
    parentId: null,
    childItems: [
      {
        id: 'item-1-1',
        parentId: 'folder-1',
      },
      {
        id: 'item-1-2',
        parentId: 'folder-1',
      },
    ],
    childFolders: [
      {
        id: 'folder-1-2',
        parentId: 'folder-1',
        childItems: [
          {
            id: 'item-1-2-1',
            parentId: 'folder-1-2',
          },
          {
            id: 'item-1-2-2',
            parentId: 'folder-1-2',
          },
        ],
        childFolders: [],
      },
    ],
  },
  {
    id: 'folder-2',
    parentId: null,
    childItems: [],
    childFolders: [],
  },
  {
    id: 'folder-3',
    parentId: null,
    childItems: [],
    childFolders: [],
  },
]
