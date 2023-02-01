import React, { useState, useContext, useEffect } from 'react'

import { useEditor } from '@craftjs/core'

import { SidebarItem } from './SidebarItem'

import SimpleTooltip from '../components/Tooltip'

import { ThemeContext } from '../store'

import { Component } from '../themes/shared/Child'

import { parse } from 'node-html-parser'

import { cleanHTMLElement } from '../utils/html'

import { getImageUrl } from '../utils/fetch'

const Category = SidebarItem

const Item = ({ connectors, c }) => {
  const { standalone } = useContext(ThemeContext)

  return (
    <div
      ref={(ref) =>
        connectors.create(
          ref as HTMLElement,
          <Component root={cleanHTMLElement(parse(c.source))} />,
        )
      }
    >
      <SimpleTooltip text={c.displayName} side="right" offset={12}>
        <a className="cursor-move m-2 pb-2 cursor-pointer block">
          <img
            src={getImageUrl(
              standalone,
              `/client/craft/themes/${c.themeFolder}/${c.blockFolder}/preview.png`,
            )}
            width="600px"
            height="300px"
          />
        </a>
      </SimpleTooltip>
    </div>
  )
}

const Sidebar = () => {
  const { components, categories } = useContext(ThemeContext)
  const { enabled, connectors } = useEditor(({ options }) => ({ enabled: options.enabled }))

  const [toolbarVisible, setToolbarVisible] = useState<boolean[]>([])

  useEffect(() => {
    const v = Array.from({ length: categories.length }, (_, i) => i === 0)
    setToolbarVisible(v)
  }, [categories])

  const toggleToolbar = (index) => {
    setToolbarVisible((t) => t.map((c, i) => (i === index ? !c : c)))
  }

  return (
    <div
      className={`toolbox h-full flex flex-col bg-white ${enabled ? 'w-48' : 'w-0 opacity-0'}`}
      style={{ transition: '0.4s cubic-bezier(0.19, 1, 0.22, 1)' }}
    >
      <div className="flex flex-1 flex-col items-center pt-3 overflow-scroll hide-scrollbars">
        {categories.map((b, j) => (
          <Category key={j} title={b} visible={toolbarVisible[j]} onChange={() => toggleToolbar(j)}>
            {components
              ?.filter((c) => c.category === b)
              .map((c, i) => (
                <Item connectors={connectors} c={c} key={i} />
              ))}
          </Category>
        ))}
      </div>
    </div>
  )
}
export { Sidebar }
