import { FlatItem, Folder } from './data'

export function flattenList(folders: Folder[], depth = 0): FlatItem[] {
  const flatList: FlatItem[] = []

  function processFolder(folder: Folder, currentDepth: number) {
    flatList.push({
      type: 'folder',
      id: folder.id,
      depth: currentDepth,
      rawFolder: folder,
      rawItem: undefined,
    })

    folder.childItems.forEach((item) => {
      flatList.push({
        type: 'item',
        id: item.id,
        depth: currentDepth + 1,
        rawItem: item,
        rawFolder: undefined,
      })
    })

    folder.childFolders.forEach((childFolder) => {
      processFolder(childFolder, currentDepth + 1)
    })
  }

  folders.forEach((folder) => processFolder(folder, depth))

  return flatList
}

export function unflattenList(flatList: FlatItem[]): Folder[] {
  const folderMap: Record<string, Folder> = {}
  const rootFolders: Folder[] = []

  flatList.forEach((flatItem) => {
    if (flatItem.type === 'folder') {
      const newFolder: Folder = {
        ...flatItem.rawFolder,
        childItems: [],
        childFolders: [],
      }

      folderMap[newFolder.id] = newFolder

      if (newFolder.parentId === null) {
        rootFolders.push(newFolder)
      } else {
        const parentFolder = folderMap[newFolder.parentId]
        parentFolder && parentFolder.childFolders.push(newFolder)
      }
    }
  })

  flatList.forEach((flatItem) => {
    if (flatItem.type === 'item' && flatItem.rawItem.parentId) {
      const parentFolder = folderMap[flatItem.rawItem.parentId]
      if (parentFolder) {
        parentFolder.childItems.push(flatItem.rawItem)
      }
    }
  })

  return rootFolders
}

export const getAllChildItems = (folderId: string, items: FlatItem[]): string[] => {
  let childItemIds: string[] = []

  items.forEach((item) => {
    if (item.type === 'folder' && item.rawFolder.parentId === folderId) {
      // 子フォルダとその子アイテムのIDを取得
      childItemIds.push(item.id) // フォルダ自身も含める
      childItemIds = childItemIds.concat(getAllChildItems(item.id, items))
    } else if (item.type === 'item' && item.rawItem.parentId === folderId) {
      // アイテムの場合、リストに追加
      childItemIds.push(item.id)
    }
  })

  return childItemIds
}
