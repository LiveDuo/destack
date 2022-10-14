import React from 'react'
import styled from 'styled-components'

import Arrow from '@material-ui/icons/KeyboardArrowUp'

const SidebarItemDiv = styled.div<{ visible?: boolean; height?: string }>`
  height: ${(props) =>
    props.visible && props.height && props.height !== 'full' ? `${props.height}` : 'auto'};
  width: 100%;
  flex: ${(props) => (props.visible && props.height && props.height === 'full' ? `1` : 'unset')};
  color: #545454;
`

const Chevron = styled.a<{ visible: boolean }>`
  transform: rotate(${(props) => (props.visible ? 180 : 0)}deg);
  svg {
    width: 18px;
    height: 18px;
  }
`

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
  height,
  onChange,
}) => {
  return (
    <SidebarItemDiv visible={visible} height={height} className="flex flex-col">
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
        <Chevron visible={visible}>
          <Arrow />
        </Chevron>
      </div>
      {visible ? <div className="w-full flex-1 overflow-auto">{children}</div> : null}
    </SidebarItemDiv>
  )
}
