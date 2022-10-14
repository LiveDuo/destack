import React, { useEffect, useRef, useCallback } from 'react'

import { useNode, useEditor } from '@craftjs/core'
import { ROOT_NODE } from '@craftjs/utils'

import ReactDOM from 'react-dom'

import { ArrowSmallUpIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/outline'
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline'

export const RenderNode = ({ render }) => {
  const { id } = useNode()
  const { actions, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent('selected').contains(id),
  }))

  const { isHover, dom, name, showFocus, moveable, deletable, connectors, parent } = useNode(
    (node) => {
      const displayName = node.data.custom?.displayName
      return {
        isHover: node.events.hovered,
        dom: node.dom,
        name: displayName || node.data.displayName,
        showFocus: node.id !== 'ROOT' && displayName !== 'App',
        moveable: node.id !== 'ROOT' && displayName !== 'App',
        deletable: node.id !== 'ROOT' && displayName !== 'App',
        parent: node.data.parent,
        props: node.data.props,
      }
    },
  )

  const currentRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add('component-selected')
      else dom.classList.remove('component-selected')
    }
  }, [dom, isActive, isHover])

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

  return (
    <>
      {isHover || isActive
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
              <h2 className="flex-1 mr-4">{name}</h2>
              {moveable ? (
                <a className="mr-2 cursor-move" ref={() => connectors.drag}>
                  <ArrowsPointingOutIcon className="h-4 w-4" />
                </a>
              ) : null}
              {showFocus && (
                <a
                  className="mr-2 cursor-pointer"
                  onClick={() => {
                    actions.selectNode(parent)
                  }}
                >
                  <ArrowSmallUpIcon className="h-4 w-4" />
                </a>
              )}
              {deletable ? (
                <a
                  className="cursor-pointer"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    actions.delete(id)
                  }}
                >
                  <TrashIcon className="h-4 w-4" />
                </a>
              ) : null}
            </div>,
            document.querySelector('.page-container'),
          )
        : null}
      {render}
    </>
  )
}
