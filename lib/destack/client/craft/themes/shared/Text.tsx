import React, { useEffect, useState } from 'react'

import { useNode, useEditor } from '@craftjs/core'

export type TextProps = {
  id: String
  className: string
  fontSize: string
  textAlign: string
  fontWeight: string
  color: Record<'r' | 'g' | 'b' | 'a', string>
  shadow: number
  text: string
  margin: [string, string, string, string]
}

const Text = (props) => {
  const { node, connectors, actions } = useNode((node) => ({ node }))
  const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }))
  const [text] = useState(node.data.props[props.id]?.text ?? props.text)
  const onChange = (e) => {
    actions.setProp((prop) => {
      if (!prop[props.id]) prop[props.id] = {}
      prop[props.id].text = e.target.innerText
    }, 500)
  }
  const onClick = (e) => {
    if (enabled) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return enabled ? (
    <span
      ref={(ref) => connectors.connect(ref as HTMLElement)}
      contentEditable
      suppressContentEditableWarning={true}
      className={props.className}
      onClick={onClick}
      onInput={onChange}
    >
      {text}
    </span>
  ) : (
    <span className={props.className} style={{ ...props }}>
      {text}
    </span>
  )
}

export { Text }

Text.craft = {
  displayName: 'Text',
  props: {
    text: '',
  },
  related: {},
}
