import React, { useEffect, useRef, useState, useCallback } from 'react'

import { useNode, useEditor } from '@craftjs/core'

import ReactDOM from 'react-dom'

import LinkDialog from '../themes/shared/LinkDialog'
import ImageDialog from '../themes/shared/ImageDialog'

import { ArrowSmallUpIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/outline'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { LinkIcon } from '@heroicons/react/24/outline'
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline'

export const RenderNode = ({ render }) => {
  const { id } = useNode()
  const { actions, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent('selected').contains(id),
  }))

  const { connectors, node } = useNode((node) => ({ node }))

  const data = node.data
  const dom = node.dom
  const displayName = data.custom?.displayName || data.displayName
  const showFocus = id !== 'ROOT' && displayName !== 'App'
  const moveable = data.parent === 'ROOT'
  const deletable = data.parent === 'ROOT'

  const currentRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (dom) {
      if (isActive || node.events.hovered) dom.classList.add('component-selected')
      else dom.classList.remove('component-selected')
    }
  }, [dom, isActive, node.events.hovered])

  const getPos = useCallback((dom: HTMLElement | null) => {
    const { top, left, bottom } = dom ? dom.getBoundingClientRect() : { top: 0, left: 0, bottom: 0 }
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    }
  }, [])

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef

    if (!currentDOM) return
    const { top, left } = getPos(dom)
    currentDOM.style.top = top
    currentDOM.style.left = left
  }, [dom, getPos])

  useEffect(() => {
    const el = document.querySelector('.craftjs-renderer')

    el?.addEventListener('scroll', scroll)

    return () => {
      el?.removeEventListener('scroll', scroll)
    }
  }, [scroll])

  const [openLink, setOpenLink] = useState(false)
  const [openImage, setOpenImage] = useState(false)

  const updateLink = dom?.childNodes[0]?.nodeName === 'A'
  const updateImage = dom?.childNodes[0]?.nodeName === 'IMG'
  return (
    <>
      {node.events.hovered || isActive
        ? ReactDOM.createPortal(
            <div
              ref={() => currentRef}
              className="px-2 py-2 text-white bg-primary fixed flex items-center leading-3 text-xs"
              style={{
                height: '30px',
                marginTop: '-29px',
                left: getPos(dom).left,
                top: getPos(dom).top,
                zIndex: 9999,
              }}
            >
              <h2 className="flex-1 mr-4">{displayName}</h2>
              {moveable && (
                <a className="mr-2 cursor-move" ref={() => connectors.drag}>
                  <ArrowsPointingOutIcon className="h-4 w-4" />
                </a>
              )}
              {showFocus && (
                <a
                  className="mr-2 cursor-pointer"
                  onClick={() => {
                    actions.selectNode(data.parent)
                  }}
                >
                  <ArrowSmallUpIcon className="h-4 w-4" />
                </a>
              )}
              {updateImage && (
                <a
                  className="cursor-pointer"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    setOpenImage(true)
                  }}
                >
                  <PhotoIcon className="h-4 w-4" />
                </a>
              )}
              {updateLink && (
                <a
                  className="cursor-pointer"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    setOpenLink(true)
                  }}
                >
                  <LinkIcon className="h-4 w-4" />
                </a>
              )}
              {deletable && (
                <a
                  className="cursor-pointer"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    actions.delete(id)
                  }}
                >
                  <TrashIcon className="h-4 w-4" />
                </a>
              )}
              <LinkDialog open={openLink} setOpen={setOpenLink} node={node} actions={actions} />
              <ImageDialog open={openImage} setOpen={setOpenImage} node={node} actions={actions} />
            </div>,
            document.querySelector('.page-container'),
          )
        : null}
      {render}
    </>
  )
}
