import React, { useEffect, useRef, useState } from 'react'

import './index.css'

import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import ArrowDownIcon from '@heroicons/react/24/outline/ArrowDownIcon'
import ArrowUpIcon from '@heroicons/react/24/outline/ArrowUpIcon'

import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import ArrowSmallUpIcon from '@heroicons/react/24/outline/ArrowSmallUpIcon'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'

import ComputerDesktopIcon from '@heroicons/react/24/outline/ComputerDesktopIcon'
import PencilIcon from '@heroicons/react/24/outline/PencilIcon'

import Select from './select'
import ImageDialog from './image'
import ButtonDialog from './button'
import LinkDialog from './link'
import SvgDialog from './svg'

const standaloneServerPort = 12785

interface Component {
  source: string
  folder: string
}

const themes = [
  { name: 'Hyper UI', folder: 'hyperui' },
  { name: 'Tailblocks', folder: 'tailblocks' },
  { name: 'Flowrift', folder: 'flowrift' },
  { name: 'Meraki UI', folder: 'meraki-light' },
  { name: 'Preline', folder: 'preline' },
  { name: 'Flowbite', folder: 'flowbite' },
]

function debounce(this: any, callback: Function, timeout = 1000) {
  let timeoutFn: any
  return (...args: any) => {
    const context = this
    clearTimeout(timeoutFn)
    timeoutFn = setTimeout(() => callback.apply(context, args), timeout)
  }
}

const getBaseUrl = (standaloneServer: boolean) => {
  return standaloneServer ? `http://localhost:${standaloneServerPort}` : ''
}

const getImageUrl = (standaloneServer: boolean, imageSrc: string) => {
  const baseUrl = getBaseUrl(standaloneServer)
  return `${baseUrl}/api/builder/handle?type=asset&path=${imageSrc}`
}

interface CategoryProps {
  themeIndex: number
  category: string
  components: Component[]
  standaloneServer: boolean
}
const Category: React.FC<CategoryProps> = ({ themeIndex, category, components, standaloneServer }) => {
  const [show, setShow] = useState(false)

  return (
    <div id={category.toLowerCase()}>
      <div
        onClick={() => setShow((i) => !i)}
        className={`h-12 cursor-pointer bg-white border-b last:border-b-0 flex items-center px-2 ${
          show ? 'shadow-sm' : ''
        }`}
      >
        <div className="flex-1 flex items-center">
          <Squares2X2Icon className="h-4 w-4 ml-2 mr-4" /> <h2 className="text-xs uppercase">{category}</h2>
        </div>
        <a style={{ transform: `rotate(${show ? 180 : 0}deg)` }}>
          <ArrowSmallUpIcon className="h-4 w-4" />
        </a>
      </div>
      {show && (
        <div>
          {components.map((c: Component, i: number) => (
            <img
              key={i}
              className="cursor-grab mb-2"
              src={getImageUrl(standaloneServer, `/themes/${themes[themeIndex].folder}/${c.folder}/preview.png`)}
              draggable="true"
              onDragStart={(e) => e.dataTransfer.setData('component', `${category}-${i}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

type ComponentWithCategories = { [key: string]: Component[] }

function Editor({ standaloneServer = false }) {
  const canvasRef = useRef<HTMLDivElement>(null)

  const popoverRef = useRef<HTMLDivElement>(null)
  const moveUpRef = useRef<SVGSVGElement>(null)
  const moveDownRef = useRef<SVGSVGElement>(null)
  const deleteRef = useRef<SVGSVGElement>(null)

  const [isPreview, setIsPreview] = useState(false)
  const [hoveredComponent, setHoveredComponent] = useState<HTMLDivElement | null>(null)
  const [selectedElement, setSelectedElement] = useState<HTMLDivElement | null>(null)
  const [components, setComponents] = useState<ComponentWithCategories>({})

  const [selectOpen, setSelectOpen] = useState(false)

  const [themeIndex, setThemeIndex] = useState(0)

  const [openImage, setOpenImage] = useState(false)
  const [openButton, setOpenButton] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const [openSvg, setOpenSvg] = useState(false)

  const loadTheme = async (index: number) => {
    const baseUrl = getBaseUrl(standaloneServer)
    const url = `${baseUrl}/api/builder/handle?type=theme&name=${themes[index].folder}`
    const _componentsList = await fetch(url).then((r) => r.json())

    const _components = _componentsList.reduce((r: ComponentWithCategories, c: Component) => {
      const category = c.folder.replace(/[0-9]/g, '')
      if (!r[category]) r[category] = []
      r[category].push(c)
      return r
    }, {})

    setComponents(_components)
  }

  const loadPage = async () => {
    const baseUrl = getBaseUrl(standaloneServer)
    const url2 = `${baseUrl}/api/builder/handle?type=data&path=${location.pathname}`
    const data = await fetch(url2).then((r) => r.text())
    canvasRef.current!.innerHTML = data
  }

  const savePage = async () => {
    console.log('dom changed')

    const baseUrl = getBaseUrl(standaloneServer)
    const url = `${baseUrl}/api/builder/handle?type=data&path=${location.pathname}`

    await fetch(url, { method: 'post', body: canvasRef.current!.innerHTML })
  }

  const onDomChange = () => {
    canvasRef.current
    const config = { attributes: true, childList: true, subtree: true }
    const observer = new MutationObserver(
      debounce(() => {
        savePage()
      }),
    )
    observer.observe(canvasRef.current!, config)
    return observer
  }

  useEffect(() => {
    loadPage()
    loadTheme(themeIndex)

    const observer = onDomChange()

    return () => observer.disconnect()
  }, [])

  const clearComponents = async () => {
    canvasRef.current!.innerHTML = ''
  }

  const onCanvasDrop = async (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()

    const [categoryId, componentId] = e.dataTransfer!.getData('component').split('-')
    const component: Component = components[categoryId as unknown as string][componentId as unknown as number]
    const html = component.source

    const _components = getComponents()
    if (_components.length === 0) {
      canvasRef.current!.innerHTML = html
    } else if (isElementTopHalf(hoveredComponent!, e)) {
      hoveredComponent!.insertAdjacentHTML('beforebegin', html)
    } else if (!isElementTopHalf(hoveredComponent!, e)) {
      hoveredComponent!.insertAdjacentHTML('afterend', html)
    }

    cleanCanvas()
  }

  const getElementPosition = (element: HTMLElement) => {
    const box = element.getBoundingClientRect()

    const body = document.body
    const documentElement = document.documentElement

    const scrollTop = window.scrollY || documentElement.scrollTop || body.scrollTop
    const scrollLeft = window.scrollX || documentElement.scrollLeft || body.scrollLeft

    const clientTop = documentElement.clientTop || body.clientTop || 0
    const clientLeft = documentElement.clientLeft || body.clientLeft || 0

    return { top: box.top + scrollTop - clientTop, left: box.left + scrollLeft - clientLeft }
  }

  const onCanvasMouseOver = () => {
    const components = getComponents()
    components.forEach((c) => {
      if (c.matches(':hover')) {
        if (!c.isEqualNode(hoveredComponent)) {
          setHoveredComponent(c)

          if (!popoverRef.current) return
          const rect = getElementPosition(c)
          popoverRef.current.style.top = `${rect.top}px`
          popoverRef.current.style.left = `${rect.left}px`
        }
      }
    })
  }

  const onCanvasMouseLeave = () => {
    setHoveredComponent(null)
  }

  const isEventOnElement = (element: HTMLElement, event: React.MouseEvent<HTMLElement>) => {
    if (!element) return
    const rect = element.getBoundingClientRect()
    const isX = rect.top < event.clientY && rect.bottom > event.clientY
    const isY = rect.left < event.clientX && rect.right > event.clientX
    return isX && isY
  }

  const onCanvasClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement
    if (target.tagName === 'IMG') {
      setOpenImage(true)
    } else if (target.tagName === 'BUTTON') {
      setOpenButton(true)
    } else if (target.tagName === 'A') {
      setOpenLink(true)
    } else if (target.tagName === 'path') {
      setOpenSvg(true)
    }
    setSelectedElement(target)

    if (isEventOnElement(deleteRef.current! as unknown as HTMLElement, e)) {
      const clickEvent = new MouseEvent('click', { bubbles: true })
      deleteRef.current!.dispatchEvent(clickEvent)
    } else if (isEventOnElement(moveUpRef.current! as unknown as HTMLElement, e)) {
      const clickEvent = new MouseEvent('click', { bubbles: true })
      moveUpRef.current!.dispatchEvent(clickEvent)
    } else if (isEventOnElement(moveDownRef.current! as unknown as HTMLElement, e)) {
      const clickEvent = new MouseEvent('click', { bubbles: true })
      moveDownRef.current!.dispatchEvent(clickEvent)
    }
  }

  const onComponentDelete = () => {
    canvasRef.current!.removeChild(hoveredComponent!)
    setHoveredComponent(null)
  }

  const onComponentMoveUp = () => {
    canvasRef.current!.insertBefore(hoveredComponent!, hoveredComponent!.previousElementSibling)
  }

  const onComponentMoveDown = () => {
    canvasRef.current!.insertBefore(hoveredComponent!.nextElementSibling!, hoveredComponent)
  }

  const isElementTopHalf = (element: HTMLElement, event: React.MouseEvent<HTMLElement>) => {
    const rect = element.getBoundingClientRect()
    return rect.top + (rect.bottom - rect.top) / 2 > event.clientY
  }

  const onCanvasDragOver = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const components = getComponents()
    components.forEach((c: HTMLDivElement) => {
      if (isEventOnElement(c, e)) {
        const isTopHalf = isElementTopHalf(c, e)

        c.style.setProperty(`border-${isTopHalf ? 'top' : 'bottom'}`, '4px solid cornflowerblue')
        c.style.setProperty(`border-${!isTopHalf ? 'top' : 'bottom'}`, '')

        if (!c.isEqualNode(hoveredComponent)) {
          setHoveredComponent(c)
        }
      }
    })
  }

  const cleanCanvas = () => {
    setHoveredComponent(null)

    const components = getComponents()
    components.forEach((c: HTMLDivElement) => {
      c.style.setProperty('border-top', '')
      c.style.setProperty('border-bottom', '')
    })
  }

  // NOTE this trigger more times than it should
  const onCanvasDragLeave = () => {
    cleanCanvas()
  }

  const getComponents = (): HTMLDivElement[] => {
    return Array.from(canvasRef.current?.children ?? []).filter((c) => c.nodeName !== 'SCRIPT') as HTMLDivElement[]
  }

  return (
    <div className="flex flex-row bg-white">
      {!isPreview && (
        <div
          ref={popoverRef}
          className="absolute z-10 pointer-events-none bg-gray-500"
          style={{ display: hoveredComponent ? 'block' : 'none' }}
        >
          <div className="flex flex-row p-1">
            {getComponents().indexOf(hoveredComponent!) < getComponents().length - 1 && (
              <ArrowDownIcon ref={moveDownRef} onClick={onComponentMoveDown} className="h-7 w-7 text-white p-1" />
            )}
            {getComponents().indexOf(hoveredComponent!) > 0 && (
              <ArrowUpIcon ref={moveUpRef} onClick={onComponentMoveUp} className="h-7 w-7 text-white p-1" />
            )}
            <TrashIcon id={'delete'} ref={deleteRef} onClick={onComponentDelete} className="h-7 w-7 text-white p-1" />
          </div>
        </div>
      )}
      {!isPreview && (
        <div className="w-56 p-2" style={{ height: '100vh', overflowY: 'scroll', flexShrink: 0 }}>
          {Object.keys(components).map((c: string, i) => (
            <Category
              key={i}
              category={c}
              themeIndex={themeIndex}
              components={components[c as string]}
              standaloneServer={standaloneServer}
            />
          ))}
        </div>
      )}
      <div className="w-full" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="flex items-center m-2">
          {!isPreview && (
            <div>
              <ArrowPathIcon className="h-6 w-6 mx-2 cursor-pointer" onClick={clearComponents} />
            </div>
          )}

          {!isPreview && (
            <div className="mr-auto ml-auto">
              <div
                className="flex rounded py-2 px-4 transition cursor-pointer items-center justify-center mr-auto ml-auto"
                onClick={() => setSelectOpen(true)}
              >
                {themes[themeIndex].name}
                <ChevronDownIcon className="h-4 w-4 ml-2" />
              </div>
              <Select
                defaultValue={themes[themeIndex].name}
                values={themes.map((c) => c.name)}
                open={selectOpen}
                setOpen={setSelectOpen}
                onChange={(e) => {
                  const index = themes.findIndex((r) => r.name === e)
                  loadTheme(index)
                  setThemeIndex(index)
                }}
              />
            </div>
          )}

          {!isPreview ? (
            <button
              className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 ml-6 mr-6 rounded-md flex items-center"
              onClick={() => setIsPreview((s) => !s)}
            >
              <ComputerDesktopIcon className="h-4 w-4 mr-2" />
              Preview
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 ml-6 mr-6 rounded-md flex items-center"
              style={{ marginLeft: isPreview ? 'auto' : '' }}
              onClick={() => setIsPreview((s) => !s)}
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              Editor
            </button>
          )}
        </div>
        <ImageDialog
          open={openImage}
          setOpen={setOpenImage}
          selectedElement={selectedElement!}
          standaloneServer={standaloneServer}
        />
        <ButtonDialog
          open={openButton}
          setOpen={setOpenButton}
          selectedElement={selectedElement as unknown as HTMLButtonElement}
        />
        <LinkDialog
          open={openLink}
          setOpen={setOpenLink}
          selectedElement={selectedElement as unknown as HTMLAnchorElement}
        />
        <SvgDialog open={openSvg} setOpen={setOpenSvg} selectedElement={selectedElement as unknown as SVGElement} />
        <div className="flex justify-center bg-gray-200" style={{ overflowY: 'scroll' }}>
          <div
            id="editor"
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
              height: 'fit-content',
            }}
            contentEditable={!isPreview}
          ></div>
        </div>
      </div>
    </div>
  )
}
export default Editor