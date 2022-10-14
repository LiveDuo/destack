import React from 'react'

import { useNode } from '@craftjs/core'

import { Resizable } from 're-resizable'

export const Resizer = () => {
  const { connectors, node } = useNode((node) => ({ node }))
  const { width, height } = node.data.props

  const onLoad = (ref) => {
    if (ref) connectors.connect(ref.resizable)
  }

  return <Resizable enable={{}} ref={(ref) => onLoad(ref)} size={{ width, height }} />
}
