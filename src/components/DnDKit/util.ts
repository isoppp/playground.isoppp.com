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
        depth: currentDepth,
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
