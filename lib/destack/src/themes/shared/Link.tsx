import React, { useState } from 'react'

import { useNode, useEditor } from '@craftjs/core'

import SimpleTooltip from '../../components/Tooltip'
import ActionDialog from './ActionDialog'
import Child from './Child'

const handleClick = (props, e) => {
  if (props.type === 'url') {
    if (props.newTab) {
      window.open(props.url, '_blank')?.focus()
    } else {
      location.href = props.url
    }
  } else if (props.type === 'email') {
    location.href = `mailto:${props.email}`
  } else if (props.type === 'submit') {
    const target = e.target as HTMLInputElement
    const form = target.form as HTMLFormElement
    console.log(form)
  }
}

const Link = ({ r, editable, d, i }) => {
  const { actions, node } = useNode((node) => ({ node }))
  const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }))
  const [open, setOpen] = useState(false)
  const onClick = (e) => {
    e.preventDefault()
    handleClick(node.data.props, e)
  }

  return !enabled ? (
    <a className={r.classNames} onClick={onClick}>
      <Child root={r} d={d.concat(i)} editable={editable} />
    </a>
  ) : (
    <>
      <ActionDialog
        open={open}
        setOpen={setOpen}
        currentUrl={node.data.props.url}
        actions={actions}
      />
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
