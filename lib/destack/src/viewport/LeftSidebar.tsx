import React, { useState } from 'react'

import { useEditor } from '@craftjs/core'

import Banner1 from '../selectors/Banner1'
import Banner2 from '../selectors/Banner2'
import Banner3 from '../selectors/Banner3'

import bannerImage1 from '../selectors/Banner1/preview.png'
import bannerImage2 from '../selectors/Banner2/preview.png'

import { SidebarItem } from './SidebarItem'

import SimpleTooltip from '../components/Tooltip'

const components = [
  {
    name: 'Banner 1',
    category: 'Banners',
    render: Banner1,
    image: bannerImage1,
  },
  {
    name: 'Banner 2',
    category: 'Banners',
    render: Banner2,
    image: bannerImage2,
  },
  {
    name: 'Banner 3',
    category: 'CTA',
    render: Banner3,
    image: bannerImage2,
  },
]

const categories = [...new Set(components.map((c) => c.category))]

export const Toolbox = () => {
  const { enabled, connectors } = useEditor(({ options }) => ({ enabled: options.enabled }))
  const [toolbarVisible, setToolbarVisible] = useState([true, true])
  return (
    <div
      className={`toolbox h-full flex flex-col bg-white ${enabled ? 'w-48' : 'w-0 opacity-0'}`}
      style={{ transition: '0.4s cubic-bezier(0.19, 1, 0.22, 1)' }}
    >
      <div className="flex flex-1 flex-col items-center pt-3">
        {categories.map((b, j) => (
          <SidebarItem
            title={b}
            visible={toolbarVisible[j]}
            onChange={() => setToolbarVisible((t) => t.map((c, i) => (i === j ? !c : c)))}
          >
            {components
              .filter((c) => c.category === b)
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
