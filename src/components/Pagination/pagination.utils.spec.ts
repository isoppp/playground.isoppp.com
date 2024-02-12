import { describe, expect, test } from 'vitest'

import { getRange, range, transform } from './pagination.utils'

interface GetRangeTestCase {
  siblingCount: number
  totalPage: number
  currentPageCases: number[]
  expected: ReturnType<typeof getRange>
}

const siblingCount1Tests: GetRangeTestCase[] = [
  // totalPages: 1, totalPageNumbers: 1
  {
    siblingCount: 1,
    currentPageCases: [1],
    totalPage: 1,
    expected: [1],
  },
  // totalPages: 2, totalPageNumbers: 2
  {
    siblingCount: 1,
    currentPageCases: [1, 2],
    totalPage: 2,
    expected: [1, 2],
  },
  // totalPages: 3, totalPageNumbers: 3
  {
    siblingCount: 1,
    currentPageCases: [1, 2, 3],
    totalPage: 3,
    expected: [1, 2, 3],
  },
  // totalPages: 4, totalPageNumbers: 4
  {
    siblingCount: 1,
    currentPageCases: [1, 2, 3, 4],
    totalPage: 4,
    expected: [1, 2, 3, 4],
  },
  // totalPages: 5, totalPageNumbers: 5
  {
    siblingCount: 1,
    currentPageCases: [1, 2, 3, 4, 5],
    totalPage: 5,
    expected: [1, 2, 3, 4, 5],
  },
  // totalPages: 6, totalPageNumbers: 6
  {
    siblingCount: 1,
    currentPageCases: [1, 2, 3, 4, 5, 6],
    totalPage: 6,
    expected: [1, 2, 3, 4, 5, 6],
  },
  // totalPages: 7, totalPageNumbers: 7
  {
    siblingCount: 1,
    currentPageCases: [1, 2, 3, 4, 5, 6, 7],
    totalPage: 7,
    expected: [1, 2, 3, 4, 5, 6, 7],
  },
  // // totalPages: 8, totalPageNumbers: 7
  {
    siblingCount: 1,
    currentPageCases: [1, 2, 3],
    totalPage: 8,
    expected: [1, 2, 3, 4, 5, 'ellipsis', 8],
  },
  {
    siblingCount: 1,
    currentPageCases: [4],
    totalPage: 8,
    expected: [1, 'ellipsis', 3, 4, 5, 'ellipsis', 8],
  },
  {
    siblingCount: 1,
    currentPageCases: [5],
    totalPage: 8,
    expected: [1, 'ellipsis', 4, 5, 6, 'ellipsis', 8],
  },
  {
    siblingCount: 1,
    currentPageCases: [6],
    totalPage: 8,
    expected: [1, 'ellipsis', 4, 5, 6, 7, 8],
  },
  // totalPages: 9, totalPageNumbers: 7
  {
    siblingCount: 1,
    currentPageCases: [1, 2, 3],
    totalPage: 9,
    expected: [1, 2, 3, 4, 5, 'ellipsis', 9],
  },
  {
    siblingCount: 1,
    currentPageCases: [4],
    totalPage: 9,
    expected: [1, 'ellipsis', 3, 4, 5, 'ellipsis', 9],
  },
  {
    siblingCount: 1,
    currentPageCases: [5],
    totalPage: 9,
    expected: [1, 'ellipsis', 4, 5, 6, 'ellipsis', 9],
  },
  {
    siblingCount: 1,
    currentPageCases: [6],
    totalPage: 9,
    expected: [1, 'ellipsis', 5, 6, 7, 'ellipsis', 9],
  },
  {
    siblingCount: 1,
    currentPageCases: [7, 8, 9],
    totalPage: 9,
    expected: [1, 'ellipsis', 5, 6, 7, 8, 9],
  },
]

const siblingCount2Tests: GetRangeTestCase[] = [
  // totalPages: 1, totalPageNumbers: 1
  {
    siblingCount: 2,
    currentPageCases: [1],
    totalPage: 1,
    expected: [1],
  },
  // totalPages: 2, totalPageNumbers: 2
  {
    siblingCount: 2,
    currentPageCases: [1, 2],
    totalPage: 2,
    expected: [1, 2],
  },
  // totalPages: 3, totalPageNumbers: 3
  {
    siblingCount: 2,
    currentPageCases: [1, 2, 3],
    totalPage: 3,
    expected: [1, 2, 3],
  },
  // totalPages: 4, totalPageNumbers: 4
  {
    siblingCount: 2,
    currentPageCases: [1, 2, 3, 4],
    totalPage: 4,
    expected: [1, 2, 3, 4],
  },
  // totalPages: 5, totalPageNumbers: 5
  {
    siblingCount: 2,
    currentPageCases: [1, 2, 3, 4, 5],
    totalPage: 5,
    expected: [1, 2, 3, 4, 5],
  },
  // totalPages: 6, totalPageNumbers: 6
  {
    siblingCount: 2,
    currentPageCases: [1, 2, 3, 4, 5, 6],
    totalPage: 6,
    expected: [1, 2, 3, 4, 5, 6],
  },
  // totalPages: 7, totalPageNumbers: 7
  {
    siblingCount: 2,
    currentPageCases: [1, 2, 3, 4, 5, 6, 7],
    totalPage: 7,
    expected: [1, 2, 3, 4, 5, 6, 7],
  },
  // totalPages: 8, totalPageNumbers: 8
  {
    siblingCount: 2,
    currentPageCases: [1, 2, 3, 4, 5, 6, 7, 8],
    totalPage: 8,
    expected: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  // totalPages: 9, totalPageNumbers: 9
  {
    siblingCount: 2,
    currentPageCases: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    totalPage: 9,
    expected: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    siblingCount: 2,
    currentPageCases: [1, 2, 3, 4],
    totalPage: 10,
    expected: [1, 2, 3, 4, 5, 6, 7, 'ellipsis', 10],
  },
  {
    siblingCount: 2,
    currentPageCases: [5],
    totalPage: 10,
    expected: [1, 'ellipsis', 3, 4, 5, 6, 7, 'ellipsis', 10],
  },
  {
    siblingCount: 2,
    currentPageCases: [6],
    totalPage: 10,
    expected: [1, 'ellipsis', 4, 5, 6, 7, 8, 'ellipsis', 10],
  },
  {
    siblingCount: 2,
    currentPageCases: [7, 8, 9, 10],
    totalPage: 10,
    expected: [1, 'ellipsis', 4, 5, 6, 7, 8, 9, 10],
  },
  // totalPages: 11, totalPageNumbers: 9
  {
    siblingCount: 2,
    currentPageCases: [1, 2, 3, 4],
    totalPage: 11,
    expected: [1, 2, 3, 4, 5, 6, 7, 'ellipsis', 11],
  },
  {
    siblingCount: 2,
    currentPageCases: [5],
    totalPage: 11,
    expected: [1, 'ellipsis', 3, 4, 5, 6, 7, 'ellipsis', 11],
  },
  {
    siblingCount: 2,
    currentPageCases: [6],
    totalPage: 11,
    expected: [1, 'ellipsis', 4, 5, 6, 7, 8, 'ellipsis', 11],
  },
  {
    siblingCount: 2,
    currentPageCases: [7],
    totalPage: 11,
    expected: [1, 'ellipsis', 5, 6, 7, 8, 9, 'ellipsis', 11],
  },
  {
    siblingCount: 2,
    currentPageCases: [8, 9, 10, 11],
    totalPage: 11,
    expected: [1, 'ellipsis', 5, 6, 7, 8, 9, 10, 11],
  },
]

export const getRangeTestCases: GetRangeTestCase[] = [
  {
    siblingCount: 1,
    currentPageCases: [0],
    totalPage: 0,
    expected: [],
  },
  ...siblingCount1Tests,
  ...siblingCount2Tests,
]

describe('pagination utils', () => {
  test('range method', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5])
  })

  test('transform method', () => {
    const items = [1, 2, 'ellipsis', 3, 4]
    const transformed = transform(items)
    expect(transformed).toEqual([
      {
        type: 'page',
        value: 1,
      },
      {
        type: 'page',
        value: 2,
      },
      {
        type: 'ellipsis',
      },
      {
        type: 'page',
        value: 3,
      },
      {
        type: 'page',
        value: 4,
      },
    ])
  })

  describe('getRange method', () => {
    test.each(getRangeTestCases)(
      'siblingCount: $siblingCount, totalPage: $totalPage, currentPage: $currentPageCases',
      ({ expected, currentPageCases, ...ctx }) => {
        for (const currentPage of currentPageCases) {
          const range = getRange({ ...ctx, currentPage })
          expect(range).toEqual(expected)
        }
      },
    )
  })
})
