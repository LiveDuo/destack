import React, { useState, useContext, useEffect } from 'react'

import { useEditor } from '@craftjs/core'

import { SidebarItem } from './SidebarItem'

import SimpleTooltip from '../components/Tooltip'

import { ThemeContext } from '../store'

const Sidebar = () => {
  const { components, categories } = useContext(ThemeContext)
  const { enabled, connectors } = useEditor(({ options }) => ({ enabled: options.enabled }))

  const [toolbarVisible, setToolbarVisible] = useState<boolean[]>([])

  useEffect(() => {
    const v = Array.from({ length: categories.length }, (_, i) => i === 0)
    setToolbarVisible(v)
  }, [categories])

  return (
    <div
      className={`toolbox h-full flex flex-col bg-white ${enabled ? 'w-48' : 'w-0 opacity-0'}`}
      style={{ transition: '0.4s cubic-bezier(0.19, 1, 0.22, 1)' }}
    >
      <div className="flex flex-1 flex-col items-center pt-3 overflow-scroll hide-scrollbars">
        {categories.map((b, j) => (
          <SidebarItem
            key={j}
            title={b}
            visible={toolbarVisible[j]}
            onChange={() => setToolbarVisible((t) => t.map((c, i) => (i === j ? !c : c)))}
          >
            {components
              ?.filter((c) => c.craft.category === b)
              .map((c, i) => {
                return (
                  <div
                    key={i}
                    ref={(ref) => connectors.create(ref as HTMLElement, React.createElement(c))}
                  >
                    <SimpleTooltip text={c.craft.displayName} side="right" offset={12}>
                      <a className="cursor-move m-2 pb-2 cursor-pointer block">
                        <img src={c.craft.image} width="600px" height="300px" />
                      </a>
                    </SimpleTooltip>
                  </div>
                )
              })}
          </SidebarItem>
        ))}
      </div>
    </div>
  )
}
export { Sidebar }
