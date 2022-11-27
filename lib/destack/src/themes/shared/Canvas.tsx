import React from 'react'

import { useNode } from '@craftjs/core'

export const Canvas = ({ children }) => {
  const { connectors } = useNode((node) => ({ node }))

  return (
    <div
      style={{ height: '100%', width: '100%', backgroundColor: 'white' }}
      ref={(ref) => connectors.connect(ref as HTMLElement)}
    >
      {children}
    </div>
  )
}

Canvas.craft = {
  displayName: 'Container',
  props: {},
  rules: {
    canDrag: () => true,
  },
  related: {},
}
