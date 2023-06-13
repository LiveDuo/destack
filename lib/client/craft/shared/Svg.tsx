import React from 'react'

import { useNode } from '@craftjs/core'

// const examplePath = 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'

interface SvgProps {
  r: any
  propId: string
}
interface SvgInterface extends React.FC<SvgProps> {
  craft: object
}

const Svg: SvgInterface = ({ r, propId }) => {
  const { connectors, node } = useNode((node) => ({ node }))
  const path = node.data.props[propId]?.path

  const nodes = r.childNodes.filter((c: any) => c.tagName === 'PATH')
  return (
    <svg
      ref={(ref) => connectors.connect(ref as unknown as HTMLElement)}
      className={r.classNames}
      key={propId}
      height={r.attrs['height']}
      width={r.attrs['width']}
      fill={r.attrs['fill']}
      viewBox={r.attrs['viewbox']}
      stroke={r.attrs['stroke']}
      xmlns={r.attrs['xmlns']}
    >
      {nodes
        .filter((_: any, i: number) => i === 0 || !path)
        .map((c: any, i: number) => (
          <path
            key={propId + i.toString()}
            d={path ?? c.attrs['d']}
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
}
export { Svg }

Svg.craft = {
  displayName: 'Svg',
  props: {},
  rules: {
    canDrag: () => true,
  },
  related: {},
}
