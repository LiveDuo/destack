import { useNode, useEditor } from '@craftjs/core'
import React from 'react'
import ContentEditable from 'react-contenteditable'

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
  const { connectors, actions, node } = useNode((node) => ({ node }))
  const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }))
  return enabled ? (
    <ContentEditable
      innerRef={connectors.connect}
      html={node.data.props.text ?? props.text ?? ''} // innerHTML of the editable div
      disabled={!enabled}
      onChange={(e) => {
        actions.setProp((prop) => (prop.text = e.target.value), 500)
      }} // use true to disable editing
      tagName="span" // Use a custom HTML tag (uses a div by default)
      className={props.className}
      onClick={(e) => {
        if (enabled) {
          e.preventDefault()
          e.stopPropagation()
        }
      }}
    />
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
