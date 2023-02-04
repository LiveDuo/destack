import React from 'react'

import { useNode, useEditor } from '@craftjs/core'

import Child from './Child'

const handleClick = (props, e) => {
  if (props?.type === 'url') {
    if (props?.newTab) {
      window.open(props.url, '_blank')?.focus()
    } else {
      location.href = props.url
    }
  } else if (props?.type === 'email') {
    location.href = `mailto:${props.email}`
  } else if (props?.type === 'submit') {
    const form = e.target.closest('form')

    if (!props?.submitAsync) {
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

const Button = ({ r, d, i, propId }) => {
  const { node } = useNode((node) => ({ node }))
  const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }))
  const { connectors } = useNode((node) => ({ node }))

  const { ['class']: foo, ...attrsR } = r.attrs

  const onClick = (e) => {
    e.preventDefault()
    if (!enabled) handleClick(node.data.props[propId], e)
  }

  return (
    <button
      ref={(ref) => connectors.connect(ref as HTMLElement)}
      {...attrsR}
      className={r.classNames}
      onClick={onClick}
    >
      <Child root={r} d={d.concat(i)} />
    </button>
  )
}
export { Button }

Button.craft = {
  displayName: 'Button',
  props: {},
  rules: {
    canDrag: () => true,
  },
  related: {},
}
