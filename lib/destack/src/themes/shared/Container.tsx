import React from 'react'

import { useNode } from '@craftjs/core'

import { Resizable } from 're-resizable'

export const Container = ({ children }) => {
  const { connectors, node } = useNode((node) => ({ node }))
  const { height } = node.data.props

  const onLoad = (ref) => {
    if (ref) connectors.connect(ref.resizable)
  }

  return (
    <Resizable
      enable={{}}
      ref={(ref) => onLoad(ref)}
      size={{ width: 'unset', height }}
      minWidth={800}
      style={{ backgroundColor: 'white' }}
    >
      {children}
    </Resizable>
  )
}

Container.craft = {
  displayName: 'Container',
  props: {},
  rules: {
    canDrag: () => true,
  },
  related: {},
}
