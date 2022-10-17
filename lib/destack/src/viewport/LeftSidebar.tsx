import React, { useState, useContext } from 'react'

import { useEditor } from '@craftjs/core'

import { ChevronDownIcon } from '@heroicons/react/24/outline'

import { SidebarItem } from './SidebarItem'

import SimpleTooltip from '../components/Tooltip'
import Select from '../components/Select'

import { ThemeContext } from '../store'

const Sidebar = () => {
  const { components, categories, themeNames, themeIndex, updateIndex } = useContext(ThemeContext)
  const { enabled, connectors } = useEditor(({ options }) => ({ enabled: options.enabled }))
  const [toolbarVisible, setToolbarVisible] = useState([true, true])
  const [selectOpen, setSelectOpen] = useState(false)

  const onChange = (name) => {
    updateIndex(themeNames.indexOf(name))
  }

  return (
    <div
      className={`toolbox h-full flex flex-col bg-white ${enabled ? 'w-48' : 'w-0 opacity-0'}`}
      style={{ transition: '0.4s cubic-bezier(0.19, 1, 0.22, 1)' }}
    >
      <a
        className="flex rounded py-2 px-4 transition cursor-pointer items-center m-2 justify-center"
        onClick={() => setSelectOpen(true)}
      >
        {themeNames[themeIndex]}
        <ChevronDownIcon className="h-4 w-4 ml-2" />
      </a>

      <Select values={themeNames} open={selectOpen} setOpen={setSelectOpen} onChange={onChange} />
      <div className="flex flex-1 flex-col items-center pt-3">
        {categories.map((b, j) => (
          <SidebarItem
            title={b}
            visible={toolbarVisible[j]}
            onChange={() => setToolbarVisible((t) => t.map((c, i) => (i === j ? !c : c)))}
          >
            {components
              ?.filter((c) => c.category === b)
              .map((c, i) => {
                return (
                  <div
                    key={i}
                    ref={(ref) =>
                      connectors.create(ref as HTMLElement, React.createElement(c.render))
                    }
                  >
                    <SimpleTooltip text={c.name} side="right" offset={12}>
                      <a className="cursor-move m-2 pb-2 cursor-pointer block">
                        <img src={c.image} width="600px" height="300px" />
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
