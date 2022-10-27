import React, { useState } from 'react'

import { useNode, useEditor } from '@craftjs/core'

import SimpleTooltip from '../../components/Tooltip'
import ActionDialog from './LinkDialog'
import Child from './Child'

const handleClick = (props) => {
  if (props.newTab) {
    window.open(props.link, '_blank')?.focus()
  } else {
    location.href = props.link
  }
}

const Link = ({ r, editable, d, i }) => {
  const { actions, node } = useNode((node) => ({ node }))
  const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }))
  const [open, setOpen] = useState(false)
  const onClick = (e) => {
    e.preventDefault()
    handleClick(node.data.props)
  }

  return !enabled ? (
    <a className={r.classNames} onClick={onClick}>
      <Child root={r} d={d.concat(i)} editable={editable} />
    </a>
  ) : (
    <>
      <ActionDialog open={open} setOpen={setOpen} props={node.data.props} actions={actions} />
      <SimpleTooltip text="Change link" side="bottom" offset={4}>
        <a
          className={`${r.classNames} cursor-pointer`}
          onClick={() => {
            setOpen(true)
          }}
        >
          <Child root={r} d={d.concat(i)} editable={editable} />
        </a>
      </SimpleTooltip>
    </>
  )
}
export { Link }
