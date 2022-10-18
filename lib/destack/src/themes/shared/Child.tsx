import React, { useState } from 'react'

import { Element } from '@craftjs/core'
import { useNode, useEditor } from '@craftjs/core'

import { ContainerSimple } from './Simple'
import { Text } from './Text'

import SimpleTooltip from '../../components/Tooltip'
import ImageDialog from '../../components/ImageDialog'

const Image = ({ classNames, attrs }) => {
  const { actions, node } = useNode((node) => ({ node }))
  const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }))

  const [open, setOpen] = useState(false)

  const url = node.data.props.url

  return !enabled ? (
    <img className={classNames} {...attrs} src={node.data.props.url ?? attrs.src} />
  ) : (
    <>
      <ImageDialog open={open} setOpen={setOpen} currentUrl={url} actions={actions} />
      <SimpleTooltip text="Change image" side="bottom" offset={4}>
        <img
          className={`${classNames} hover:opacity-70 cursor-pointer`}
          {...attrs}
          src={node.data.props.url ?? attrs.src}
          onClick={() => {
            setOpen(true)
          }}
        />
      </SimpleTooltip>
    </>
  )
}
export { Image }

const Link = ({ r, editable, d, i }) => {
  const { actions } = useNode()

  return (
    <a
      className={r.classNames}
      onClick={() => {
        actions.setProp((prop) => (prop.href = 'https://example.com'), 500)

        console.log('link modal')
      }}
    >
      <Child root={r} d={d.concat(i)} editable={editable} />
    </a>
  )
}
export { Link }

interface RootProps {
  childNodes: RootProps[]
  attrs: object
  tagName: string
  classNames: string
  nodeType: number
  innerText: string
  constructor: string
}
interface ChildProps {
  root: RootProps
  editable: boolean
  d?: number[]
}
const Child: React.FC<ChildProps> = ({ root, d = [0], editable }) => {
  if (!root || root?.childNodes.length === 0) return null

  return (
    <>
      {Array.from(root?.childNodes).map((r, i) => {
        const id = 'components-' + d.concat(i).join('')

        if (r.nodeType === 1) {
          if (r.tagName === 'DIV')
            return (
              <div className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </div>
            )
          else if (r.tagName === 'H1')
            return (
              <h1 className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </h1>
            )
          else if (r.tagName === 'H2')
            return (
              <h2 className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </h2>
            )
          else if (r.tagName === 'P')
            return (
              <p className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </p>
            )
          else if (r.tagName === 'A')
            return (
              <Element is={ContainerSimple} id={id}>
                <Link r={r} d={d} i={i} editable={editable} />
              </Element>
            )
          else if (r.tagName === 'SPAN')
            return (
              <span className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </span>
            )
          else if (r.tagName === 'STRONG')
            return (
              <strong className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </strong>
            )
          else if (r.tagName === 'SECTION')
            return (
              <section className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </section>
            )
          else if (r.tagName === 'IMG') {
            return editable ? (
              <Element is={ContainerSimple} id={id} canvas>
                <Image classNames={r.classNames} attrs={r.attrs} />
              </Element>
            ) : (
              <img className={r.classNames} {...r.attrs} />
            )
          } else return <p>Unknown container</p>
        } else if (r.nodeType === 3) {
          if (r.innerText.trim() === '') return null
          // className={r.parentNode.classNames}
          if (r.constructor === 'TextNode')
            return editable ? (
              <Element is={ContainerSimple} id={id}>
                <Text text={r.innerText} editable={true} />
              </Element>
            ) : (
              <Text text={r.innerText} editable={false} />
            )
          else return <p>Unknown node</p>
        } else {
          return <p>Unknown type</p>
        }
      })}
    </>
  )
}
export default Child

const Component = ({ children }) => {
  const { connectors } = useNode()
  return <div ref={(ref) => connectors.connect(ref as HTMLDivElement)}>{children}</div>
}
export { Component }
