import React, { useEffect, useRef, useState } from 'react'

import './index.css'

import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/outline'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import { ArrowUpIcon } from '@heroicons/react/24/outline'

const standaloneServerPort = 12785

const themes = [
  { name: 'Hyper UI', folder: 'hyperui' },
  { name: 'Tailblocks', folder: 'tailblocks' },
  { name: 'Flowrift', folder: 'flowrift' },
  { name: 'Meraki UI', folder: 'meraki-light' },
  { name: 'Preline', folder: 'preline' },
  { name: 'Flowbite', folder: 'flowbite' },
]

const placeholderImageUrl = 'https://placehold.co/400x200'

const getBaseUrl = (standaloneServer) => {
  return standaloneServer ? `http://localhost:${standaloneServerPort}` : ''
}

function ContentProvider() {
  const canvasRef = useRef(null)

  const popoverRef = useRef(null)
  const moveUpRef = useRef(null)
  const moveDownRef = useRef(null)
  const deleteRef = useRef(null)

  const [isPreview, setIsPreview] = useState(false)
  const [hoveredComponent, setHoveredComponent] = useState()
  const [components, setComponents] = useState([])

  const loadData = async () => {
    const baseUrl = getBaseUrl(false)
    const url = `${baseUrl}/api/builder/handle?type=theme&name=${themes[0].folder}`
    const _components = await fetch(url).then((r) => r.json())

    setComponents(_components)
  }

  useEffect(() => {
    loadData()

    loadComponents()
  }, [])

  const loadComponents = () => {
    const html = localStorage.getItem('page')
    if (html) {
      canvasRef.current.innerHTML = html
    } else {
      alert('Save not found')
    }
  }

  const saveComponents = () => {
    localStorage.setItem('page', canvasRef.current.innerHTML)
  }

  const clearComponents = async () => {
    canvasRef.current.innerHTML = ''
  }

  const onCanvasDrop = async (e) => {
    e.preventDefault()

    const componentId = e.dataTransfer.getData('component-id')
    const html = components[componentId].source

    const _components = getComponents()
    if (_components.length === 0) {
      canvasRef.current.innerHTML = html
    } else if (isElementTopHalf(hoveredComponent, e)) {
      hoveredComponent.insertAdjacentHTML('beforebegin', html)
    } else if (!isElementTopHalf(hoveredComponent, e)) {
      hoveredComponent.insertAdjacentHTML('afterend', html)
    }

    cleanCanvas()
  }

  const onComponentDragStart = (e, i) => {
    e.dataTransfer.setData('component-id', i)
  }

  const getElementPosition = (element) => {
    const box = element.getBoundingClientRect()

    const body = document.body
    const documentElement = document.documentElement

    const scrollTop = window.scrollY || documentElement.scrollTop || body.scrollTop
    const scrollLeft = window.scrollX || documentElement.scrollLeft || body.scrollLeft

    const clientTop = documentElement.clientTop || body.clientTop || 0
    const clientLeft = documentElement.clientLeft || body.clientLeft || 0

    return { top: box.top + scrollTop - clientTop, left: box.left + scrollLeft - clientLeft }
  }

  const onCanvasMouseOver = (e) => {
    const components = getComponents()
    components.forEach((c) => {
      if (c.matches(':hover')) {
        if (!c.isEqualNode(hoveredComponent)) {
          setHoveredComponent(c)

          const rect = getElementPosition(c)
          popoverRef.current.style.top = `${rect.top}px`
          popoverRef.current.style.left = `${rect.left}px`
        }
      }
    })
  }

  const onCanvasMouseLeave = () => {
    setHoveredComponent()
  }

  const isEventOnElement = (element, event) => {
    if (!element) return
    const rect = element.getBoundingClientRect()
    const isX = rect.top < event.clientY && rect.bottom > event.clientY
    const isY = rect.left < event.clientX && rect.right > event.clientX
    return isX && isY
  }

  const onCanvasClick = (e) => {
    if (isEventOnElement(deleteRef.current, e)) {
      canvasRef.current.removeChild(hoveredComponent)
      setHoveredComponent()
    } else if (isEventOnElement(moveUpRef.current, e)) {
      canvasRef.current.insertBefore(hoveredComponent, hoveredComponent.previousElementSibling)
    } else if (isEventOnElement(moveDownRef.current, e)) {
      canvasRef.current.insertBefore(hoveredComponent.nextElementSibling, hoveredComponent)
    }
  }

  const isElementTopHalf = (element, event) => {
    const rect = element.getBoundingClientRect()
    return rect.top + (rect.bottom - rect.top) / 2 > event.clientY
  }

  const onCanvasDragOver = (e) => {
    e.preventDefault()

    const components = getComponents()
    components.forEach((c) => {
      if (isEventOnElement(c, e)) {
        const isTopHalf = isElementTopHalf(c, e)
        c.style[`border-${isTopHalf ? 'top' : 'bottom'}`] = '4px solid cornflowerblue'
        c.style[`border-${!isTopHalf ? 'top' : 'bottom'}`] = ''

        if (!c.isEqualNode(hoveredComponent)) {
          setHoveredComponent(c)
        }
      }
    })
  }

  const cleanCanvas = () => {
    setHoveredComponent()

    const components = getComponents()
    components.forEach((c) => {
      c.style['border-top'] = ''
      c.style['border-bottom'] = ''
    })
  }

  // NOTE this trigger more times than it should
  const onCanvasDragLeave = () => {
    cleanCanvas()
  }

  const getComponents = () => {
    return Array.from(canvasRef.current?.children ?? []).filter((c) => c.nodeName !== 'SCRIPT')
  }

  return (
    <div className="flex flex-row bg-white">
      <div
        ref={popoverRef}
        className="absolute z-10 pointer-events-none bg-gray-500"
        style={{ display: hoveredComponent ? 'block' : 'none' }}
      >
        <div className="flex flex-row p-1">
          {getComponents().indexOf(hoveredComponent) < getComponents().length - 1 && (
            <ArrowDownIcon ref={moveDownRef} className="h-7 w-7 text-white p-1" />
          )}
          {getComponents().indexOf(hoveredComponent) > 0 && (
            <ArrowUpIcon ref={moveUpRef} className="h-7 w-7 text-white p-1" />
          )}
          <TrashIcon ref={deleteRef} className="h-7 w-7 text-white p-1" />
        </div>
      </div>
      <div className="w-48 p-2" style={{ height: '100vh', overflowY: 'scroll' }}>
        {components.map((c, i) => (
          <img
            key={i}
            className="cursor-grab mb-2"
            src={placeholderImageUrl}
            draggable="true"
            onDragStart={(e) => onComponentDragStart(e, i)}
          />
        ))}
      </div>
      <div className="w-full" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="flex items-center m-2">
          <ArrowDownOnSquareIcon
            className="h-6 w-6 mx-2 ml-4 cursor-pointer"
            onClick={loadComponents}
          />
          <ArrowUpOnSquareIcon className="h-6 w-6 mx-2 cursor-pointer" onClick={saveComponents} />
          <TrashIcon className="h-6 w-6 mx-2 cursor-pointer" onClick={clearComponents} />
          <button
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 ml-auto mr-6 rounded-md"
            onClick={() => setIsPreview((s) => !s)}
          >
            {!isPreview ? 'Preview' : 'Editor'}
          </button>
        </div>
        <div className="flex justify-center bg-gray-200" style={{ overflowY: 'scroll' }}>
          <div
            ref={canvasRef}
            className="bg-white ease-animation"
            onClick={onCanvasClick}
            onMouseOver={onCanvasMouseOver}
            onMouseLeave={onCanvasMouseLeave}
            onDrop={onCanvasDrop}
            onDragOver={onCanvasDragOver}
            onDragLeave={onCanvasDragLeave}
            style={{
              margin: isPreview ? '0px' : '20px',
              width: isPreview ? '100%' : 720,
              minHeight: 960,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export { ContentProvider }

const ContentProviderReact = () => <div>todo</div>
export { ContentProviderReact }
