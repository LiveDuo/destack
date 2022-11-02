import React from 'react'

import { Element } from '@craftjs/core'
import { useNode } from '@craftjs/core'

import { ContainerSimple } from './Simple'
import { Text } from './Text'
import { Link } from './Link'
import { Button } from './Button'
import { Image } from './Image'

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
          else if (r.tagName === 'H3')
            return (
              <h3 className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </h3>
            )
          else if (r.tagName === 'H4')
            return (
              <h4 className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </h4>
            )
          else if (r.tagName === 'H5')
            return (
              <h5 className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </h5>
            )
          else if (r.tagName === 'H6')
            return (
              <h6 className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </h6>
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
          else if (r.tagName === 'HEADER')
            return (
              <header className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </header>
            )
          else if (r.tagName === 'FOOTER')
            return (
              <footer className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </footer>
            )
          else if (r.tagName === 'NAV')
            return (
              <nav className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </nav>
            )
          else if (r.tagName === 'ASIDE')
            return (
              <aside className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </aside>
            )
          else if (r.tagName === 'DETAILS')
            return (
              <details className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </details>
            )
          else if (r.tagName === 'SUMMARY')
            return (
              <summary className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </summary>
            )
          else if (r.tagName === 'BLOCKQUOTE')
            return (
              <blockquote className={r.classNames} id={id} {...r.attrs}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </blockquote>
            )
          else if (r.tagName === 'INPUT')
            return <input className={r.classNames} id={id} {...r.attrs} />
          else if (r.tagName === 'LABEL')
            return (
              <label className={r.classNames} id={id} {...r.attrs}>
                {r.innerText}
              </label>
            )
          else if (r.tagName === 'TEXTAREA')
            return (
              <textarea className={r.classNames} id={id} {...r.attrs}>
                {r.innerText}
              </textarea>
            )
          else if (r.tagName === 'BUTTON')
            return (
              <Element is={ContainerSimple} id={id}>
                <Button r={r} d={d} i={i} editable={editable} />
              </Element>
            )
          else if (r.tagName === 'FORM')
            return (
              <form className={r.classNames} id={id} {...r.attrs}>
                <Child root={r} d={d.concat(i)} editable={editable} />
              </form>
            )
          else if (r.tagName === 'SVG')
            return (
              <svg
                className={r.classNames}
                id={id}
                fill={r.attrs['fill']}
                viewBox={r.attrs['view-box']}
                stroke={r.attrs['stroke']}
              >
                {r.childNodes
                  .filter((c) => c.tagName === 'PATH')
                  .map((c, i) => (
                    <path
                      key={`${id}-${i}`}
                      className={r.classNames}
                      d={c.attrs['d']}
                      fillRule={c.attrs['fill-rule']}
                      clipRule={c.attrs['clip-rule']}
                      strokeLinecap={c.attrs['stroke-linecap']}
                      strokeLinejoin={c.attrs['stroke-linejoin']}
                      strokeWidth={c.attrs['stroke-width']}
                    />
                  ))}
              </svg>
            )
          else if (r.tagName === 'ADDRESS')
            return editable ? (
              <Element is={ContainerSimple} id={id}>
                <address className={r.classNames} id={id} {...r.attrs}>
                  <Text text={r.innerText} editable={true} />
                </address>
              </Element>
            ) : (
              <address className={r.classNames} id={id} {...r.attrs}>
                <Text text={r.innerText} editable={false} />
              </address>
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
          if (r.constructor === 'TextNode' || r.constructor === 't')
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

const ComponentChild = ({ children }) => {
  const { connectors } = useNode()
  return <div ref={(ref) => connectors.connect(ref as HTMLDivElement)}>{children}</div>
}

const Component = ({ root, editable = true }) =>
  editable ? (
    <ComponentChild>
      <Child root={root} editable={editable} />
    </ComponentChild>
  ) : (
    <Child root={root} editable={editable} />
  )
export { Component }
