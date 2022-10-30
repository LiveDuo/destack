import React from 'react'

import { useNode } from '@craftjs/core'

import { Resizable } from 're-resizable'

export const Container = ({ children }) => {
  const { connectors, node } = useNode((node) => ({ node }))
  const { width, height } = node.data.props

  return (
    <Resizable
      enable={{}}
      ref={(ref) => connectors.connect(ref?.resizable as HTMLElement)}
      size={{ width: width ?? '100%', height: height ?? '100%' }}
      className="bg-white"
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
