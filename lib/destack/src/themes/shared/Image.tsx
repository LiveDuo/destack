import React from 'react'

import { useNode } from '@craftjs/core'

const Image = ({ classNames, attrs }) => {
  const { node } = useNode((node) => ({ node }))
  const url = node.data.props.url ?? attrs.src
  const { ['class']: foo, ...attrsR } = attrs
  return <img className={classNames} {...attrsR} src={url} />
}
export { Image }
