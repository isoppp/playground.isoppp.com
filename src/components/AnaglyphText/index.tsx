import type { FC } from 'react'

import { cn } from '@/shadcn/utils'

import styles from './index.module.css'
type Props = {
  type: 'animate' | 'static'
}

export const AnaglyphText: FC<Props> = ({ type }) => {
  return (
    <div>
      <div className={cn(styles.text, styles[type])}>AnaglyphText</div>
      <svg
        className={cn(styles.text, styles[type])}
        xmlns="http://www.w3.org/2000/svg"
        height="240px"
        viewBox="0 -960 960 960"
        width="240px"
        fill="black"
      >
        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
      </svg>
    </div>
  )
}
