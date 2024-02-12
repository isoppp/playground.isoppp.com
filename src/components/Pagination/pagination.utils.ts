export type Props = {
  siblingCount: number
  currentPage: number
  totalPage: number
}

export const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

export type TransformResult = Array<{ type: 'page'; value: number } | { type: 'ellipsis' }>
export const transform = (items: (string | number)[]): TransformResult => {
  return items.map((value) => {
    return typeof value === 'number' ? { type: 'page', value } : { type: 'ellipsis' }
  })
}

const ELLIPSIS = 'ellipsis'

export const getRange = ({ siblingCount, currentPage, totalPage }: Props) => {
  const totalLength = Math.min(2 * siblingCount + 5, totalPage)

  const firstPageIndex = 1
  const lastPageIndex = totalPage

  const leftSiblingIndex = Math.max(currentPage - siblingCount, firstPageIndex)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPageIndex)

  const showLeftEllipsis = totalPage > totalLength && leftSiblingIndex > firstPageIndex + 1
  const showRightEllipsis = totalPage > totalLength && rightSiblingIndex < lastPageIndex - 1

  const itemCount = totalLength - 2 // 2 stands for one ellipsis and either first or last page

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = range(1, itemCount)
    return [...leftRange, ELLIPSIS, lastPageIndex]
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = range(lastPageIndex - itemCount + 1, lastPageIndex)
    return [firstPageIndex, ELLIPSIS, ...rightRange]
  }

  if (showLeftEllipsis && showRightEllipsis) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex)
    return [firstPageIndex, ELLIPSIS, ...middleRange, ELLIPSIS, lastPageIndex]
  }

  const fullRange = range(firstPageIndex, lastPageIndex)
  return fullRange
}

export const getTransformedRange = (props: Props) => transform(getRange(props))
