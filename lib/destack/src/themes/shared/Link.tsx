import React from 'react'

import { useNode, useEditor } from '@craftjs/core'

import Child from './Child'

const handleClick = (props) => {
  if (props.newTab) {
    window.open(props.link, '_blank')?.focus()
  } else {
    location.href = props.link
  }
}

const Link = ({ r, d, i }) => {
  const { node } = useNode((node) => ({ node }))
  const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }))
  const onClick = (e) => {
    e.preventDefault()
    if (!enabled) handleClick(node.data.props)
  }

  return (
    <a className={r.classNames} onClick={onClick}>
      <Child root={r} d={d.concat(i)} />
    </a>
  )
}
export { Link }
