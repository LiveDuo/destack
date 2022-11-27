import React from 'react'

import { useNode } from '@craftjs/core'

export const Container = ({ children }) => {
  const { connectors, node } = useNode((node) => ({ node }))
  const { width, height } = node.data.props

  return (
    <div
      ref={(ref) => connectors.connect(ref as HTMLElement)}
      style={{ width: width ?? '100%', height: height ?? '100%' }}
      className="bg-white"
    >
      {children}
    </div>
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
