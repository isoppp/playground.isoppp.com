import { FOLDER_PREFIX, ITEM_PREFIX } from './constants'
import { FlatItem, Folder } from './data'

export function flattenList(folders: Folder[], depth = 0): FlatItem[] {
  const flatList: FlatItem[] = []

  folders
    .sort((a, b) => a.order - b.order)
    .forEach((folder) => {
      flatList.push({
        type: 'folder',
        id: FOLDER_PREFIX + folder.id,
        depth,
        raw: folder,
      })

      folder.childItems
        .sort((a, b) => a.order - b.order)
        .forEach((item) => {
          flatList.push({
            type: 'item',
            id: ITEM_PREFIX + item.id,
            depth: depth + 1,
            raw: item,
          })
        })

      flatList.push(...flattenList(folder.childFolders, depth + 1))
    })

  return flatList
}

export function unflattenList(flatList: FlatItem[]): Folder[] {
  const folderMap: Record<string, Folder> = {}
  const rootFolders: Folder[] = []

  flatList.forEach((flatItem) => {
    if (flatItem.type === 'folder') {
      const newFolder: Folder = {
        ...flatItem.raw,
        childItems: [],
        childFolders: [],
      }

      folderMap[newFolder.id] = newFolder

      if (newFolder.parentId === null) {
        rootFolders.push(newFolder)
      } else {
        folderMap[newFolder.parentId]?.childFolders.push(newFolder)
      }
    }
  })

  flatList.forEach((flatItem) => {
    if (flatItem.type === 'item' && flatItem.raw.parentId) {
      folderMap[flatItem.raw.parentId]?.childItems.push(flatItem.raw)
    }
  })

  return rootFolders
}

export const getAllChildFlatItemIds = (folderRawId: string, items: FlatItem[]): string[] => {
  let childItemIds: string[] = []

  items.forEach((item) => {
    if (item.type === 'folder' && item.raw.parentId === folderRawId) {
      // 子フォルダとその子アイテムのIDを取得
      childItemIds.push(item.id) // フォルダ自身も含める
      childItemIds = childItemIds.concat(getAllChildFlatItemIds(item.raw.id, items))
    } else if (item.type === 'item' && item.raw.parentId === folderRawId) {
      // アイテムの場合、リストに追加
      childItemIds.push(item.id)
    }
  })

  return childItemIds
}

export function findLastIndex<T>(array: T[], predicate: (element: T | undefined) => boolean): number {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) {
      return i
    }
  }
  return -1 // 要素が見つからない場合は-1を返す
}

export const collectChildFolderIds = (folderId: string, flatItems: FlatItem[]): string[] => {
  const childFolderIds: string[] = []

  const findChildFolders = (currentId: string) => {
    flatItems.forEach((item) => {
      if (item.type === 'folder' && item.raw.parentId === removePrefix(currentId)) {
        childFolderIds.push(item.id)
        findChildFolders(item.id)
      }
    })
  }

  findChildFolders(folderId)
  return childFolderIds
}

export const removePrefix = (id: string): string => {
  return id.replace(FOLDER_PREFIX, '').replace(ITEM_PREFIX, '')
}
