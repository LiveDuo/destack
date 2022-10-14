import React from 'react'

import Arrow from '@material-ui/icons/KeyboardArrowUp'

export type SidebarItemProps = {
  title: string
  height?: string
  icon: React.FC
  visible?: boolean
  onChange?: (bool: boolean) => void
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  visible,
  icon: Icon,
  title,
  children,
  onChange,
}) => {
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
          <Icon /> <h2 className="text-xs uppercase">{title}</h2>
        </div>
        <a style={{ transform: `rotate(${visible ? 180 : 0}deg)` }}>
          <Arrow />
        </a>
      </div>
      {visible ? <div className="w-full flex-1 overflow-auto">{children}</div> : null}
    </div>
  )
}
