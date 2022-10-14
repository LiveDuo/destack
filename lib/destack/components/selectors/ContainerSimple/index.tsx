import React from 'react'

import { ContainerSettings } from './ContainerSettings'

import { Resizer } from '../Resizer'

export type ContainerProps = {
  children: React.ReactNode
}

const defaultProps = {}

export const ContainerSimple = (props: Partial<ContainerProps>) => {
  props = {
    ...defaultProps,
    ...props,
  }
  const { children } = props
  return <Resizer propKey={{ width: 'width', height: 'height' }}>{children}</Resizer>
}

ContainerSimple.craft = {
  displayName: 'Container',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: ContainerSettings,
  },
}
