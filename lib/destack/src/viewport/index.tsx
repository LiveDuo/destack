import React, { useEffect } from 'react'

import { useEditor } from '@craftjs/core'

import { Header } from './Header'
import { Sidebar as LeftSidebar } from './LeftSidebar'

export const Viewport: React.FC = ({ children }) => {
  const { connectors, actions } = useEditor((state) => ({ enabled: state.options.enabled }))

  useEffect(() => {
    setTimeout(() => {
      actions.setOptions((o) => (o.enabled = true))
    }, 200)
  }, [actions.setOptions])

  return (
    <div className="viewport">
      <div className="flex h-full overflow-hidden flex-row w-full fixed">
        <LeftSidebar />
        <div className="page-container flex flex-1 h-full flex-col">
          <Header />
          <div
            className="craftjs-renderer flex-1 h-full w-full transition pb-8 overflow-auto"
            ref={(ref) => connectors.select(connectors.hover(ref as HTMLElement, ''), '')}
          >
            <div
              className="relative flex-col flex items-center pt-8 justify-center"
              style={{ maxWidth: '800px', margin: 'auto' }}
            >
              {children}
            </div>
            <div className={'flex items-center justify-center w-full pt-6 text-xs text-gray-400'}>
              <a href="https://www.netlify.com">This site is powered by Netlify</a>
            </div>
          </div>
        </div>
        {/* <RightSidebar /> */}
      </div>
    </div>
  )
}
