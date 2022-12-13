import React from 'react'

import { useNode } from '@craftjs/core'

export const Image = ({ classNames, attrs }) => {
  const { connectors } = useNode((node) => ({ node }))

  const { node } = useNode((node) => ({ node }))
  const url = node.data.props.url ?? attrs.src
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
