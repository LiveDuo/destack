import React, { useState } from 'react'

import { useEditor } from '@craftjs/core'
import { Layers } from '@craftjs/layers'

import { SidebarItem } from './SidebarItem'
import { Toolbar } from '../toolbar/index'

export const Sidebar = () => {
  const [layersVisible, setLayerVisible] = useState(true)
  const [toolbarVisible, setToolbarVisible] = useState(true)
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  return (
    <div className="sidebar transition bg-white w-64">
      <div className="flex flex-col h-full">
        <SidebarItem
          title="Customize"
          height={!layersVisible ? 'full' : '55%'}
          visible={toolbarVisible}
          onChange={(v) => setToolbarVisible(v)}
        >
          <Toolbar />
        </SidebarItem>
        <SidebarItem
          title="Layers"
          height={!toolbarVisible ? 'full' : '45%'}
          visible={layersVisible}
          onChange={(v) => setLayerVisible(v)}
        >
          <div>
            <Layers expandRootOnLoad={true} />
          </div>
        </SidebarItem>
      </div>
    </div>
  )
}
