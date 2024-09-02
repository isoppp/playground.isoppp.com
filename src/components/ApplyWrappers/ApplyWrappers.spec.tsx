import { render } from '@testing-library/react'
import { FC, ReactNode } from 'react'

import { ApplyWrappers } from './ApplyWrappers'

const SomeComponent: FC<{ children: ReactNode }> = ({ children }) => <div data-order="4">{children}</div>
describe('ApplyWrappers', () => {
  it('works properly', () => {
    render(
      <ApplyWrappers
        wrappers={[
          ({ children }) => <div data-order="1">{children}</div>,
          ({ children }) => <div data-order="2">{children}</div>,
          ({ children }) => <div data-order="3">{children}</div>,
          SomeComponent,
        ]}
      >
        content
      </ApplyWrappers>,
    )
    expect(document.body).toContainHTML(
      '<div data-order="1"><div data-order="2"><div data-order="3"><div data-order="4">content</div></div></div></div>',
    )
  })
})
