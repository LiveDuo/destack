import React from 'react'

import { Element } from '@craftjs/core'
import { useNode, useEditor } from '@craftjs/core'

import { HTMLElement, TextNode } from 'node-html-parser'

import { ContainerSimple } from './ContainerSimple'
import { Container } from './Container'
import { Text } from './Text'

import { ToolbarSection, ToolbarItem } from '../toolbar/index'

interface ChildProps {
  root: HTMLElement
  d?: number
}
const Child: React.FC<ChildProps> = ({ root, d = 0 }) => {
  if (!root || root?.childNodes.length === 0) return null

  return (
    <>
      {Array.from(root?.childNodes).map((h, _i) => {
        const r = h as HTMLElement
        const id = Math.random().toString() // `${d}${i}`
        if (r.nodeType === 1) {
          if (r.tagName === 'DIV')
            return (
              <div className={r.classNames} id={id}>
                <Child root={r} d={d + 1} />
              </div>
            )
          else if (r.tagName === 'H1')
            return (
              <h1 className={r.classNames} id={id}>
                <Child root={r} d={d + 1} />
              </h1>
            )
          else if (r.tagName === 'H2')
            return (
              <h2 className={r.classNames} id={id}>
                <Child root={r} d={d + 1} />
              </h2>
            )
          else if (r.tagName === 'P')
            return (
              <p className={r.classNames} id={id}>
                <Child root={r} d={d + 1} />
              </p>
            )
          else if (r.tagName === 'A')
            return (
              <Element canvas is={ContainerSimple} id={id}>
                <a className={r.classNames} id={id}>
                  <Child root={r} d={d + 1} />
                </a>
              </Element>
            )
          else if (r.tagName === 'SPAN')
            return (
              <a className={r.classNames} id={id}>
                <Child root={r} d={d + 1} />
              </a>
            )
          else if (r.tagName === 'STRONG')
            return (
              <strong className={r.classNames} id={id}>
                <Child root={r} d={d + 1} />
              </strong>
            )
          else if (r.tagName === 'SECTION')
            return (
              <section className={r.classNames} id={id}>
                <Child root={r} d={d + 1} />
              </section>
            )
          else
            return (
              <Element canvas is={Container} id={id}>
                Unknown container
              </Element>
            )
        } else if (r.nodeType === 3) {
          if (r.innerText.trim() === '') return null
          // className={r.parentNode.classNames}
          if (r instanceof TextNode)
            return (
              <Element canvas is={Container} id={id}>
                <Text text={r.innerText} />
              </Element>
            )
          else
            return (
              <Element canvas is={Container} id={id}>
                Unknown node
              </Element>
            )
        } else {
          return (
            <Element canvas is={Container} id={id}>
              Unknown type
            </Element>
          )
        }
      })}
    </>
  )
}
export default Child

const Component = ({ children }) => {
  const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }))
  const { connectors } = useNode((node) => ({ selected: node.events.selected }))
  return (
    <div ref={connectors.connect} enabled={enabled}>
      {children}
    </div>
  )
}
export { Component }

const ToolbarComponent = ({ title }) => {
  return (
    <ToolbarSection title={title}>
      <ToolbarItem full={true} type="text" />
    </ToolbarSection>
  )
}
export { ToolbarComponent }
