import React from 'react'

import { useNode } from '@craftjs/core'

interface ContainerProps {
  children: React.ReactNode
}
interface ContainerInterface extends React.FC<ContainerProps> {
  craft: object
}

export const Container: ContainerInterface = ({ children }) => {
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
