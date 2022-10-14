import React from 'react'

import { ContainerSettings } from './ContainerSettings'

export const ContainerSimple = ({ children }) => {
  return <div>{children}</div>
}

ContainerSimple.craft = {
  displayName: 'Container',
  props: {},
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: ContainerSettings,
  },
}
