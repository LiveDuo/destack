import React from 'react'

import { useNode } from '@craftjs/core'

export const Container = ({ children }) => {
  const { connectors } = useNode()

  return (
    <div
      ref={(ref) => connectors.connect(ref as HTMLElement)}
      style={{ width: '100%', minHeight: '800px' }}
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
