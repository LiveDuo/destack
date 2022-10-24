import React, { useState } from 'react'

import { useNode, useEditor } from '@craftjs/core'

import SimpleTooltip from '../../components/Tooltip'
import ImageDialog from './ImageDialog'

const Image = ({ classNames, attrs }) => {
  const { actions, node } = useNode((node) => ({ node }))
  const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }))

  const [open, setOpen] = useState(false)

  const url = node.data.props.url

  return !enabled ? (
    <img className={classNames} {...attrs} src={url ?? attrs.src} />
  ) : (
    <>
      <ImageDialog open={open} setOpen={setOpen} currentUrl={url ?? attrs.src} actions={actions} />
      <SimpleTooltip text="Change image" side="bottom" offset={4}>
        <img
          className={`${classNames} cursor-pointer`}
          {...attrs}
          src={url ?? attrs.src}
          onClick={() => {
            setOpen(true)
          }}
        />
      </SimpleTooltip>
    </>
  )
}
export { Image }
