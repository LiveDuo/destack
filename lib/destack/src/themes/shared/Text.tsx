import { useNode, useEditor } from '@craftjs/core'
import React from 'react'

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
  const { node, actions, connectors } = useNode((node) => ({ node }))
  const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }))
  const onChange = (e) => {
    actions.setProp((prop) => (prop.text = e.target.value), 500)
  }
  const onClick = (e) => {
    if (enabled) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
  const text = node.data.props.text ?? props.text ?? ''
  return enabled ? (
    <span
      ref={(ref) => connectors.connect(ref as HTMLElement)}
      contentEditable
      suppressContentEditableWarning={true}
      className={props.className}
      onClick={onClick}
      onChange={onChange}
    >
      {text}
    </span>
  ) : (
    <span className={props.className} style={{ ...props }}>
      {props.text}
    </span>
  )
}

export { Text }

Text.craft = {
  displayName: 'Text',
  props: {
    textAlign: 'left',
    margin: [0, 0, 0, 0],
    text: 'Text',
  },
  related: {},
}
