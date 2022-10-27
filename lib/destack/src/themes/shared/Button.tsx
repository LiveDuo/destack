import React, { useState } from 'react'

import { useNode, useEditor } from '@craftjs/core'

import SimpleTooltip from '../../components/Tooltip'
import ActionDialog from './ButtonDialog'
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
    const form = e.target.closest('form')

    if (!props.submitAsync) {
      form.submit()
      return
    }

    const formData = new FormData()
    for (let e of form.elements) {
      if (e.type !== 'submit') {
        formData.append(e.id, e.type === 'radio' ? e.checked : e.value)
      }
    }

    const options = {
      method: props.submitMethod,
      ...(props.submitMethod !== 'GET' ? { body: formData } : {}),
    }
    fetch(props.submitUrl, options)
      .then((e) => e.text().then((d) => ({ ok: e.ok, text: d })))
      .then(({ ok, text }) => {
        alert(ok ? text ?? 'All good' : 'Something went wrong')
      })
  }
}

const Button = ({ r, editable, d, i }) => {
  const { actions, node } = useNode((node) => ({ node }))
  const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }))
  const [open, setOpen] = useState(false)
  const onClick = (e) => {
    e.preventDefault()
    handleClick(node.data.props, e)
  }

  return !enabled ? (
    <button className={r.classNames} onClick={onClick}>
      <Child root={r} d={d.concat(i)} editable={editable} />
    </button>
  ) : (
    <>
      <ActionDialog open={open} setOpen={setOpen} props={node.data.props} actions={actions} />
      <SimpleTooltip text="Change action" side="bottom" offset={4}>
        <button
          className={`${r.classNames} cursor-pointer`}
          onClick={(e) => {
            e.preventDefault()
            setOpen(true)
          }}
        >
          <Child root={r} d={d.concat(i)} editable={editable} />
        </button>
      </SimpleTooltip>
    </>
  )
}
export { Button }
