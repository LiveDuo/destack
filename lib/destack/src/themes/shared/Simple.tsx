import React from 'react'

export const ContainerSimple = ({ children }) => {
  return <div>{children}</div>
}

ContainerSimple.craft = {
  displayName: 'Container',
  props: {},
  rules: {
    canDrag: () => true,
  },
  related: {},
}
