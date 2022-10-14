import React, { useState } from 'react'

import { useEditor } from '@craftjs/core'
import { Tooltip } from '@material-ui/core'

import Banner1 from '../selectors/Banner1'
import Banner2 from '../selectors/Banner2'

import bannerImage1 from '../selectors/Banner1/preview.png'
import bannerImage2 from '../selectors/Banner2/preview.png'

import { SidebarItem } from './SidebarItem'

import SquareIcon from '@material-ui/icons/CropSquare'

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
          icon={SquareIcon}
          title="Banners"
          visible={toolbarVisible}
          onChange={(v) => setToolbarVisible(v)}
        >
          <div ref={(ref) => connectors.create(ref as HTMLElement, <Banner1 />)}>
            <Tooltip title="Banner 1" placement="right">
              <a className="cursor-move m-2 pb-2 cursor-pointer block">
                <img src={bannerImage1} width="600px" height="300px" />
              </a>
            </Tooltip>
          </div>
          <div ref={(ref) => connectors.create(ref as HTMLElement, <Banner2 />)}>
            <Tooltip title="Banner 2" placement="right">
              <a className="cursor-move m-2 pb-2 cursor-pointer block">
                <img src={bannerImage2} width="600px" height="300px" />
              </a>
            </Tooltip>
          </div>
        </SidebarItem>

        <SidebarItem
          icon={SquareIcon}
          title="CTA"
          visible={toolbar2Visible}
          onChange={(v) => setToolbar2Visible(v)}
        >
          <div ref={(ref) => connectors.create(ref as HTMLElement, <Banner1 />)}>
            <Tooltip title="CTA 1" placement="right">
              <a className="m-2 pb-2 cursor-pointer block">
                <img src={bannerImage1} width="600px" height="300px" />
              </a>
            </Tooltip>
          </div>
          <div ref={(ref) => connectors.create(ref as HTMLElement, <Banner2 />)}>
            <Tooltip title="CTA 2" placement="right">
              <a className="m-2 pb-2 cursor-pointer block">
                <img src={bannerImage2} width="600px" height="300px" />
              </a>
            </Tooltip>
          </div>
        </SidebarItem>
      </div>
    </div>
  )
}
