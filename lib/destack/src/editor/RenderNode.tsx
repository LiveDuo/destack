import React, { useEffect, useRef, useCallback } from 'react'

import { useNode, useEditor } from '@craftjs/core'
import { ROOT_NODE } from '@craftjs/utils'

import ReactDOM from 'react-dom'

import ArrowUp from '@material-ui/icons/ArrowUpward'
import Delete from '@material-ui/icons/Delete'
import Move from '@material-ui/icons/MoveToInbox'

export const RenderNode = ({ render }) => {
  const { id } = useNode()
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent('selected').contains(id),
  }))

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => {
    return {
      isHover: node.events.hovered,
      dom: node.dom,
      name: node.data.custom.displayName || node.data.displayName,
      moveable: node.id !== 'ROOT',
      deletable: node.id !== 'ROOT',
      parent: node.data.parent,
      props: node.data.props,
    }
  })

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
              ref={currentRef}
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
                <a className="mr-2 cursor-move" ref={drag}>
                  <Move style={{ width: '15px', height: '15px' }} />
                </a>
              ) : null}
              {id !== ROOT_NODE && (
                <a
                  className="mr-2 cursor-pointer"
                  onClick={() => {
                    actions.selectNode(parent)
                  }}
                >
                  <ArrowUp style={{ width: '15px', height: '15px' }} />
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
                  <Delete style={{ width: '15px', height: '15px' }} />
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
