import React from 'react'

import { useNode } from '@craftjs/core'

interface ImageProps {
  d: number[]
  i: number
  classNames: string
  attrs: any
  propId: string
}
interface ImageInterface extends React.FC<ImageProps> {
  craft: object
}

export const Image: ImageInterface = ({ d: _d, i: _i, classNames, attrs, propId }) => {
  const { connectors } = useNode((node) => ({ node }))

  const { node } = useNode((node) => ({ node }))

  const url = node.data.props[propId]?.url ?? attrs.src
  const { ['class']: foo, ...attrsR } = attrs

  return (
    <img
      ref={(ref) => connectors.connect(ref as HTMLElement)}
      className={classNames}
      {...attrsR}
      src={url}
    />
  )
}

Image.craft = {
  displayName: 'Image',
  props: {},
  rules: {
    canDrag: () => true,
  },
  related: {},
}
