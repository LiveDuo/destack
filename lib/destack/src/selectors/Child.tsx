import React from 'react'

import { Element } from '@craftjs/core'
import { useNode } from '@craftjs/core'

import { HTMLElement, TextNode } from 'node-html-parser'

import { ContainerSimple } from './ContainerSimple'
import { Text } from './Text'

import { ToolbarSection, ToolbarItem } from '../toolbar/index'

interface ChildProps {
  root: HTMLElement
  editable: boolean
  d?: number
}
const Child: React.FC<ChildProps> = ({ root, d = 0, editable }) => {
  // console.log(`depth=${d}`)
  if (!root || root?.childNodes.length === 0) return null

  return (
    <>
      {Array.from(root?.childNodes).map((h, i) => {
        const r = h as HTMLElement
        const id = Math.random().toString() // `${d}${i}`
        // console.log(`key=${d}${i} type=${r.nodeType} tag=${r.tagName}`)

        if (r.nodeType === 1) {
          if (r.tagName === 'DIV')
            return (
              <div className={r.classNames} id={id}>
                <Child root={r} d={d + 1} editable={editable} />
              </div>
            )
          else if (r.tagName === 'H1')
            return (
              <h1 className={r.classNames} id={id}>
                <Child root={r} d={d + 1} editable={editable} />
              </h1>
            )
          else if (r.tagName === 'H2')
            return (
              <h2 className={r.classNames} id={id}>
                <Child root={r} d={d + 1} editable={editable} />
              </h2>
            )
          else if (r.tagName === 'P')
            return (
              <p className={r.classNames} id={id}>
                <Child root={r} d={d + 1} editable={editable} />
              </p>
            )
          else if (r.tagName === 'A')
            return (
              // <Element is={ContainerSimple} id={id}>
              <a className={r.classNames}>
                <Child root={r} d={d + 1} editable={editable} />
              </a>
              // </Element>
            )
          else if (r.tagName === 'SPAN')
            return (
              <span className={r.classNames} id={id}>
                <Child root={r} d={d + 1} editable={editable} />
              </span>
            )
          else if (r.tagName === 'STRONG')
            return (
              <strong className={r.classNames} id={id}>
                <Child root={r} d={d + 1} editable={editable} />
              </strong>
            )
          else if (r.tagName === 'SECTION')
            return (
              <section className={r.classNames} id={id}>
                <Child root={r} d={d + 1} editable={editable} />
              </section>
            )
          else return <p>Unknown container</p>
        } else if (r.nodeType === 3) {
          if (r.innerText.trim() === '') return null
          // className={r.parentNode.classNames}
          if (r instanceof TextNode)
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
  const { connectors } = useNode((node) => ({ selected: node.events.selected }))
  return <div ref={(ref) => connectors.connect(ref as HTMLDivElement)}>{children}</div>
}
export { Component }

const ToolbarComponent = ({ title }) => {
  return (
    <ToolbarSection title={title}>
      <ToolbarItem full={true} type="text" propKey="width" index={0} />
    </ToolbarSection>
  )
}
export { ToolbarComponent }
