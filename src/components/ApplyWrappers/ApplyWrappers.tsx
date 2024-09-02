import { FC, ReactNode } from 'react'

type Props = {
  wrappers: Readonly<FC<{ children: ReactNode }>[]>
  children: ReactNode
}

/**
 * Dynamically apply wrappers to children.
 * @see https://dev.to/dailydevtips1/conditional-wrapping-in-react-46o5
 */
export const ApplyWrappers: FC<Props> = ({ wrappers, children }) =>
  wrappers.reduceRight((acc, wrapper) => (wrapper ? wrapper({ children: acc }) : acc), children)
