import React, { useState } from 'react'

import { useNode, useEditor } from '@craftjs/core'

import SimpleTooltip from '../../components/Tooltip'
import LinkDialog from '../../components/LinkDialog'
import Child from './Child'

const Link = ({ r, editable, d, i }) => {
  const { actions, node } = useNode((node) => ({ node }))

  const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }))

  const [open, setOpen] = useState(false)

  return !enabled ? (
    <a
      className={r.classNames}
      onClick={() => {
        location.href = node.data.props.url
      }}
    >
      <Child root={r} d={d.concat(i)} editable={editable} />
    </a>
  ) : (
    <>
      <LinkDialog
        open={open}
        setOpen={setOpen}
        currentUrl={node.data.props.url}
        actions={actions}
      />
      <SimpleTooltip text="Change link" side="bottom" offset={4}>
        <a
          className={`${r.classNames} cursor-pointer`}
          onClick={() => {
            setOpen(true)
          }}
        >
          <Child root={r} d={d.concat(i)} editable={editable} />
        </a>
      </SimpleTooltip>
    </>
  )
}
export { Link }
