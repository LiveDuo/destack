import React from 'react'

import { useNode } from '@craftjs/core'

import { Resizable } from 're-resizable'

export const Container = ({ children }) => {
  const { connectors, node } = useNode((node) => ({ node }))
  const { height } = node.data.props

  return (
    <Resizable
      enable={{}}
      ref={(ref) => connectors.connect(ref?.resizable as HTMLElement)}
      size={{ width: '800', height: height ?? '800' }}
      // minWidth={800}
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
