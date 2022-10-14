import React, { useState } from 'react'

import { useEditor } from '@craftjs/core'

import Banner1 from '../selectors/Banner1'
import Banner2 from '../selectors/Banner2'

import bannerImage1 from '../selectors/Banner1/preview.png'
import bannerImage2 from '../selectors/Banner2/preview.png'

import { SidebarItem } from './SidebarItem'

import SimpleTooltip from '../components/Tooltip'

export const Toolbox = () => {
  const { enabled, connectors } = useEditor(({ options }) => ({ enabled: options.enabled }))

  const [toolbarVisible, setToolbarVisible] = useState(true)
  const [toolbar2Visible, setToolbar2Visible] = useState(true)

  return (
    <div
      className={`toolbox h-full flex flex-col bg-white ${enabled ? 'w-48' : 'w-0 opacity-0'}`}
      style={{ transition: '0.4s cubic-bezier(0.19, 1, 0.22, 1)' }}
    >
      <div className="flex flex-1 flex-col items-center pt-3">
        <SidebarItem
          title="Banners"
          visible={toolbarVisible}
          onChange={(v) => setToolbarVisible(v)}
        >
          <div ref={(ref) => connectors.create(ref as HTMLElement, <Banner1 />)}>
            <SimpleTooltip text="Banner 1" side="right" offset={12}>
              <a className="cursor-move m-2 pb-2 cursor-pointer block">
                <img src={bannerImage1} width="600px" height="300px" />
              </a>
            </SimpleTooltip>
          </div>
          <div ref={(ref) => connectors.create(ref as HTMLElement, <Banner2 />)}>
            <SimpleTooltip text="Banner 2" side="right" offset={12}>
              <a className="cursor-move m-2 pb-2 cursor-pointer block">
                <img src={bannerImage2} width="600px" height="300px" />
              </a>
            </SimpleTooltip>
          </div>
        </SidebarItem>

        <SidebarItem title="CTA" visible={toolbar2Visible} onChange={(v) => setToolbar2Visible(v)}>
          <div ref={(ref) => connectors.create(ref as HTMLElement, <Banner1 />)}>
            <SimpleTooltip text="Banner 1" side="right" offset={12}>
              <a className="m-2 pb-2 cursor-pointer block">
                <img src={bannerImage1} width="600px" height="300px" />
              </a>
            </SimpleTooltip>
          </div>
          <div ref={(ref) => connectors.create(ref as HTMLElement, <Banner2 />)}>
            <SimpleTooltip text="Banner 2" side="right" offset={12}>
              <a className="m-2 pb-2 cursor-pointer block">
                <img src={bannerImage2} width="600px" height="300px" />
              </a>
            </SimpleTooltip>
          </div>
        </SidebarItem>
      </div>
    </div>
  )
}
