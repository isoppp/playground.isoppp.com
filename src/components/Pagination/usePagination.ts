import { range } from 'remeda'
type Props = {
  lastPage: number
  currentPage: number
  maxGrid?: number
  firstPage?: number
  gapText?: string
}

// ページネーションの数字をなるべく一定上固定長で1ページ目と最終ページを必須として生成する
// 愚直にやるのが一番分かりやすくパフォーマンスがよくできそうだったので割と愚直なロジックになっている
export const usePagination = ({
  maxGrid = 7,
  lastPage,
  currentPage,
  firstPage = 1,
  gapText = '...',
}: Props): Array<number | string> => {
  if (lastPage <= maxGrid) return range(firstPage, lastPage + 1)
  if (maxGrid % 2 === 0 || maxGrid < 5) throw Error('maxGridは奇数かつ5以上を入力してください')

  // 現在のページを中央として初期化
  const result: Array<number | string> = [currentPage].filter((v) => v !== firstPage && v !== lastPage)

  // 中央から外側に1ページ、最終ページを含めずに数字を埋める
  // ループが終わらない問題は早期リターンにより発生しないようにしている
  const firstAndLastCount = 2
  for (let i = 1; result.length < maxGrid - firstAndLastCount; i++) {
    const prev = currentPage - i
    const next = currentPage + i
    if (prev > firstPage) result.unshift(prev)
    if (next < lastPage) result.push(next)

    // 念の為break
    if (i > 100) break
  }

  // 最初と最後を埋める
  result.push(lastPage)
  result.unshift(firstPage)

  // 最初と最後がそれぞれ終端と1以上離れている場合はgap文字を入れる
  const numList = result.map((v) => (typeof v === 'string' ? 0 : v))
  if (numList[0] && numList[1] && numList[1] - numList[0] > 1) {
    result.splice(1, 1, gapText)
  }
  const len = numList.length
  if (numList[len - 1] && numList[len - 2] && numList[len - 1] - numList[len - 2] > 1) {
    result.splice(len - 2, 1, gapText)
  }

  return result
}
