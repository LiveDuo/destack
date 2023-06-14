import React, { useEffect, useRef, useState, useCallback } from 'react'

import { useNode, useEditor } from '@craftjs/core'

import ReactDOM from 'react-dom'

import LinkDialog from '../shared/LinkDialog'
import ImageDialog from '../shared/ImageDialog'
import ButtonDialog from '../shared/ButtonDialog'
import HashtagDialog from '../shared/HashtagDialog'
import SvgDialog from '../shared/SvgDialog'

import ArrowSmallUpIcon from '@heroicons/react/24/outline/ArrowSmallUpIcon'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import HashtagIcon from '@heroicons/react/24/outline/HashtagIcon'
import PhotoIcon from '@heroicons/react/24/outline/PhotoIcon'
import LinkIcon from '@heroicons/react/24/outline/LinkIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import ArrowsPointingOutIcon from '@heroicons/react/24/outline/ArrowsPointingOutIcon'

interface ContainerProps {
  render: React.ReactNode
  standaloneServer: boolean
}

const EditorElement: React.FC<ContainerProps> = ({ render, standaloneServer }) => {
  const { id } = useNode()
  const { actions, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent('selected').contains(id),
  }))

  const { connectors, node } = useNode((node) => ({ node }))

  const data = node.data
  const dom = node.dom
  const displayName = data.custom?.displayName || data.displayName

  const isRootChild = data.parent === 'ROOT'
  const showFocus = id !== 'ROOT' && displayName !== 'App'

  const currentRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (dom) {
      if (isActive || node.events.hovered) dom.classList.add('component-selected')
      else dom.classList.remove('component-selected')
    }
  }, [dom, isActive, node.events.hovered])

  const getPos = useCallback((dom: HTMLElement | null) => {
    const { top, left, bottom } = dom ? dom.getBoundingClientRect() : { top: 0, left: 0, bottom: 0 }
    return { top: `${top > 0 ? top : bottom}px`, left: `${left}px` }
  }, [])

  const scroll = useCallback(() => {
    if (!currentRef.current) return
    const { top, left } = getPos(dom)
    currentRef.current.style.top = top
    currentRef.current.style.left = left
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
  const [openButton, setOpenButton] = useState(false)
  const [openHash, setOpenHash] = useState(false)
  const [openSvg, setOpenSvg] = useState(false)

  // const linkWithSvg = dom?.nodeName === 'A' && [...dom?.childNodes].some(r => r.nodeName === 'svg')

  return (
    <>
      {node.events.hovered || isActive
        ? ReactDOM.createPortal(
            <div
              ref={() => currentRef.current}
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
              {isRootChild && (
                <a className="mr-2 cursor-move" ref={() => connectors.drag}>
                  <ArrowsPointingOutIcon className="h-4 w-4" />
                </a>
              )}
              {isRootChild && (
                <a
                  className="mr-2 cursor-pointer"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    setOpenHash(true)
                  }}
                >
                  <HashtagIcon className="h-4 w-4" />
                </a>
              )}
              {showFocus && (
                <a
                  className="mr-2 cursor-pointer"
                  onClick={() => {
                    actions.selectNode(data.parent ?? undefined)
                  }}
                >
                  <ArrowSmallUpIcon className="h-4 w-4" />
                </a>
              )}
              {dom?.nodeName === 'IMG' && (
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
              {dom?.nodeName === 'svg' && (
                <a
                  className="cursor-pointer"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    setOpenSvg(true)
                  }}
                >
                  <PhotoIcon className="h-4 w-4" />
                </a>
              )}
              {dom?.nodeName === 'A' && (
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
              {dom?.nodeName === 'BUTTON' && (
                <a
                  className="cursor-pointer"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    setOpenButton(true)
                  }}
                >
                  <CircleStackIcon className="h-4 w-4" />
                </a>
              )}
              {isRootChild && (
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
              <ImageDialog
                open={openImage}
                setOpen={setOpenImage}
                node={node}
                actions={actions}
                standaloneServer={standaloneServer}
              />
              <HashtagDialog open={openHash} setOpen={setOpenHash} node={node} actions={actions} />
              <SvgDialog open={openSvg} setOpen={setOpenSvg} node={node} actions={actions} />
              <ButtonDialog
                open={openButton}
                setOpen={setOpenButton}
                node={node}
                actions={actions}
              />
            </div>,
            document.querySelector('.page-container') as HTMLElement,
          )
        : null}
      {render}
    </>
  )
}
export default EditorElement
