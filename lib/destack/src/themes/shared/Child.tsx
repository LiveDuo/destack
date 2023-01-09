import React from 'react'

import { Element } from '@craftjs/core'
import { useNode } from '@craftjs/core'

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
  d?: number[]
}
const Child: React.FC<ChildProps> = ({ root, d = [0] }) => {
  if (!root || root?.childNodes.length === 0) return null

  return (
    <>
      {Array.from(root?.childNodes).map((r, i) => {
        const id = 'components-' + d.concat(i).join('')

        if (r.nodeType === 1) {
          if (r.tagName === 'DIV')
            return (
              <div className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </div>
            )
          else if (r.tagName === 'H1')
            return (
              <h1 className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </h1>
            )
          else if (r.tagName === 'H2')
            return (
              <h2 className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </h2>
            )
          else if (r.tagName === 'H3')
            return (
              <h3 className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </h3>
            )
          else if (r.tagName === 'H4')
            return (
              <h4 className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </h4>
            )
          else if (r.tagName === 'H5')
            return (
              <h5 className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </h5>
            )
          else if (r.tagName === 'H6')
            return (
              <h6 className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </h6>
            )
          else if (r.tagName === 'P')
            return (
              <p className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </p>
            )
          else if (r.tagName === 'A') return <Element is={Link} id={id} r={r} d={d} i={i} />
          else if (r.tagName === 'SPAN')
            return (
              <span className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </span>
            )
          else if (r.tagName === 'STRONG')
            return (
              <strong className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </strong>
            )
          else if (r.tagName === 'SECTION')
            return (
              <section className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </section>
            )
          else if (r.tagName === 'HEADER')
            return (
              <header className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </header>
            )
          else if (r.tagName === 'FOOTER')
            return (
              <footer className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </footer>
            )
          else if (r.tagName === 'NAV')
            return (
              <nav className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </nav>
            )
          else if (r.tagName === 'ASIDE')
            return (
              <aside className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </aside>
            )
          else if (r.tagName === 'DETAILS')
            return (
              <details className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </details>
            )
          else if (r.tagName === 'SUMMARY')
            return (
              <summary className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </summary>
            )
          else if (r.tagName === 'BLOCKQUOTE')
            return (
              <blockquote className={r.classNames} id={id} {...r.attrs}>
                <Child root={r} d={d.concat(i)} />
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
          else if (r.tagName === 'BUTTON') return <Element is={Button} id={id} r={r} d={d} i={i} />
          else if (r.tagName === 'FORM')
            return (
              <form className={r.classNames} id={id} {...r.attrs}>
                <Child root={r} d={d.concat(i)} />
              </form>
            )
          else if (r.tagName === 'SVG')
            return (
              <svg
                className={r.classNames}
                id={id}
                fill={r.attrs['fill']}
                viewBox={r.attrs['viewbox']}
                stroke={r.attrs['stroke']}
                xmlns={r.attrs['xmlns']}
              >
                {r.childNodes
                  .filter((c) => c.tagName === 'PATH')
                  .map((c, i) => (
                    <path
                      key={`${id}-${i}`}
                      d={c.attrs['d']}
                      fillRule={c.attrs['fill-rule']}
                      clipRule={c.attrs['clip-rule']}
                      strokeLinecap={c.attrs['stroke-linecap']}
                      strokeLinejoin={c.attrs['stroke-linejoin']}
                      strokeWidth={c.attrs['stroke-width']}
                      stroke={c.attrs['stroke']}
                      fill={c.attrs['fill']}
                    />
                  ))}
              </svg>
            )
          else if (r.tagName === 'ADDRESS')
            return (
              <address className={r.classNames} id={id} {...r.attrs}>
                <Text text={r.innerText} />
              </address>
            )
          else if (r.tagName === 'IMG') {
            return <Element is={Image} id={id} classNames={r.classNames} attrs={r.attrs} />
          } else if (r.tagName === 'ARTICLE') {
            return (
              <article className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </article>
            )
          } else if (r.tagName === 'DL') {
            return (
              <article className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </article>
            )
          } else if (r.tagName === 'DD') {
            return (
              <article className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </article>
            )
          } else if (r.tagName === 'DT') {
            return (
              <article className={r.classNames} id={id}>
                <Child root={r} d={d.concat(i)} />
              </article>
            )
          } else if (r.tagName === 'SCRIPT') {
            return null
          } else if (r.tagName === 'LINK') {
            return <link {...r.attrs}></link>
          } else if (r.tagName === 'BR') {
            return <br className={r.classNames} id={id} />
          } else if (r.tagName === 'UL') {
            return (
              <ul className={r.classNames}>
                <Child root={r} d={d.concat(i)} />
              </ul>
            )
          } else if (r.tagName === 'LI') {
            return (
              <li className={r.classNames}>
                <Child root={r} d={d.concat(i)} />
              </li>
            )
          } else if (r.tagName === 'CITE') {
            return (
              <cite className={r.classNames}>
                <Child root={r} d={d.concat(i)} />
              </cite>
            )
          } else if (r.tagName === 'HR') {
            return <hr className={r.classNames}></hr>
          } else if (r.tagName === 'IFRAME') {
            return <iframe className={r.classNames} {...r.attrs} />
          } else if (r.tagName === 'STYLE') {
            return <style>{r.innerText}</style>
          } else if (r.tagName === 'TABLE') {
            return (
              <table className={r.classNames}>
                <Child root={r} d={d.concat(i)} />
              </table>
            )
          } else if (r.tagName === 'THEAD') {
            return (
              <thead className={r.classNames} {...r.attrs}>
                <Child root={r} d={d.concat(i)} />
              </thead>
            )
          } else if (r.tagName === 'TBODY') {
            return (
              <tbody className={r.classNames}>
                <Child root={r} d={d.concat(i)} />
              </tbody>
            )
          } else if (r.tagName === 'TR') {
            return (
              <tr className={r.classNames}>
                <Child root={r} d={d.concat(i)} />
              </tr>
            )
          } else if (r.tagName === 'TD') {
            return (
              <td className={r.classNames}>
                <Child root={r} d={d.concat(i)} />
              </td>
            )
          } else if (r.tagName === 'TH') {
            return (
              <th className={r.classNames}>
                <Child root={r} d={d.concat(i)} />
              </th>
            )
          } else {
            return <p>Unknown container</p>
          }
        } else if (r.nodeType === 3) {
          if (r.innerText.trim() === '') return null
          // className={r.parentNode.classNames}
          if (r.constructor === 'TextNode' || r.constructor === 't')
            return <Text text={r.innerText ?? ''} />
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

const Component = ({ root, editable }) =>
  editable ? (
    <ComponentChild>
      <Child root={root} />
    </ComponentChild>
  ) : (
    <Child root={root} />
  )
export { Component }
