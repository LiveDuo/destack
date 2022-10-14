import React from 'react'

import { Squares2X2Icon } from '@heroicons/react/24/outline'
import { ArrowSmallUpIcon } from '@heroicons/react/24/outline'

export type SidebarItemProps = {
  title: string
  height?: string
  visible?: boolean
  onChange?: (bool: boolean) => void
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ visible, title, children, onChange }) => {
  return (
    <div className="flex flex-col w-full">
      <div
        onClick={() => {
          if (onChange) onChange(!visible)
        }}
        className={`h-12 cursor-pointer bg-white border-b last:border-b-0 flex items-center px-2 ${
          visible ? 'shadow-sm' : ''
        }`}
      >
        <div className="flex-1 flex items-center">
          <Squares2X2Icon className="h-4 w-4 ml-2 mr-4" />{' '}
          <h2 className="text-xs uppercase">{title}</h2>
        </div>
        <a style={{ transform: `rotate(${visible ? 180 : 0}deg)` }}>
          <ArrowSmallUpIcon className="h-4 w-4" />
        </a>
      </div>
      {visible ? <div className="w-full flex-1 overflow-auto">{children}</div> : null}
    </div>
  )
}
