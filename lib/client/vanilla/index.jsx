import React, { useEffect, useRef, useState } from 'react'

import './index.css'

import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import ArrowDownIcon from '@heroicons/react/24/outline/ArrowDownIcon'
import ArrowUpIcon from '@heroicons/react/24/outline/ArrowUpIcon'

import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import ArrowSmallUpIcon from '@heroicons/react/24/outline/ArrowSmallUpIcon'

const standaloneServerPort = 12785

const themes = [
  { name: 'Hyper UI', folder: 'hyperui' },
  { name: 'Tailblocks', folder: 'tailblocks' },
  { name: 'Flowrift', folder: 'flowrift' },
  { name: 'Meraki UI', folder: 'meraki-light' },
  { name: 'Preline', folder: 'preline' },
  { name: 'Flowbite', folder: 'flowbite' },
]

const theme = themes[0]

function debounce(callback, timeout = 1000) {
  let timeoutFn
  return (...args) => {
    const context = this
    clearTimeout(timeoutFn)
    timeoutFn = setTimeout(() => callback.apply(context, args), timeout)
  }
}

const getBaseUrl = (standaloneServer) => {
  return standaloneServer ? `http://localhost:${standaloneServerPort}` : ''
}

const getImageUrl = (standaloneServer, imageSrc) => {
  const baseUrl = getBaseUrl(standaloneServer)
  return `${baseUrl}/api/builder/handle?type=asset&path=${imageSrc}`
}

const Category = ({ name, components }) => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <div
        onClick={() => setShow((i) => !i)}
        className={`h-12 cursor-pointer bg-white border-b last:border-b-0 flex items-center px-2 ${
          show ? 'shadow-sm' : ''
        }`}
      >
        <div className="flex-1 flex items-center">
          <Squares2X2Icon className="h-4 w-4 ml-2 mr-4" />{' '}
          <h2 className="text-xs uppercase">{name}</h2>
        </div>
        <a style={{ transform: `rotate(${show ? 180 : 0}deg)` }}>
          <ArrowSmallUpIcon className="h-4 w-4" />
        </a>
      </div>
      {show && (
        <div>
          {components.map((c, i) => (
            <img
              key={i}
              className="cursor-grab mb-2"
              src={getImageUrl(
                false,
                `/themes/${theme.name.replaceAll(' ', '')}/${c.folder}/preview.png`,
              )}
              draggable="true"
              onDragStart={(e) => e.dataTransfer.setData('component', `${name}-${i}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
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

  const loadComponents = async () => {
    const baseUrl = getBaseUrl(false)
    const url = `${baseUrl}/api/builder/handle?type=theme&name=${theme.folder}`
    const _componentsList = await fetch(url).then((r) => r.json())

    const _components = _componentsList.reduce((r, c) => {
      const category = c.folder.replace(/[0-9]/g, '')
      if (!r[category]) r[category] = []
      r[category].push(c)
      return r
    }, {})

    setComponents(_components)
  }

  const loadPage = async () => {
    const baseUrl = getBaseUrl(false)
    const url2 = `${baseUrl}/api/builder/handle?type=data&path=${location.pathname}`
    const data = await fetch(url2).then((r) => r.text())
    canvasRef.current.innerHTML = data
  }

  const savePage = async () => {
    console.log('dom changed')

    const baseUrl = getBaseUrl(false)
    const url = `${baseUrl}/api/builder/handle?type=data&path=${location.pathname}`

    await fetch(url, { method: 'post', body: canvasRef.current.innerHTML })
  }

  const onDomChange = () => {
    canvasRef.current
    const config = { attributes: true, childList: true, subtree: true }
    const observer = new MutationObserver(
      debounce(() => {
        savePage()
      }),
    )
    observer.observe(canvasRef.current, config)
    return observer
  }

  useEffect(() => {
    loadPage()
    loadComponents()

    const observer = onDomChange()

    return () => observer.disconnect()
  }, [])

  const clearComponents = async () => {
    canvasRef.current.innerHTML = ''
  }

  const onCanvasDrop = async (e) => {
    e.preventDefault()

    const [categoryId, componentId] = e.dataTransfer.getData('component').split('-')
    const html = components[categoryId][componentId].source

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
      <div className="w-56 p-2" style={{ height: '100vh', overflowY: 'scroll', flexShrink: 0 }}>
        {Object.keys(components).map((c, i) => (
          <Category key={i} name={c} components={components[c]} />
        ))}
      </div>
      <div className="w-full" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="flex items-center m-2">
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
              flex: 1,
              margin: isPreview ? '0px' : '20px',
              maxWidth: isPreview ? '100%' : '868px',
              minHeight: '1024px',
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
