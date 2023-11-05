import React, { useEffect, useState } from 'react'

const getElementProperty = (element: HTMLElement, property: string, defaultValue: string): string => {
  const value = window.getComputedStyle(element)[property as any]
  if (value !== defaultValue) return value
  else if (!element || element.childNodes.length === 0) return defaultValue
  else return getElementProperty(element?.childNodes[0] as HTMLElement, property, defaultValue)
}

const waitForElement = (target: HTMLElement, selector: string): Promise<HTMLElement> => {
  return new Promise((r) => {
    const e = target.querySelector(selector) as HTMLElement
    if (e) return r(e)

    const observer = new MutationObserver(async (m) => {
      const e = target.querySelector(selector) as HTMLElement
      await new Promise((r) => setTimeout(r, 100)) // hack to wait for computed styles
      if (e) {
        r(e)
        observer.disconnect()
      }
    })

    observer.observe(target, { childList: true, subtree: true })
  })
}

const isDarkBackground = (bgColor: string) => {
  const [r, g, b] = bgColor
    .match(/\(([^()]+)\)/)![1]
    .split(',')
    .map((v) => parseInt(v))
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
  return hsp < 127.5
}

const PoweredBy = () => {
  const [textColor, setTextColor] = useState<string | null>(null)
  const [bgColor, setBgColor] = useState<string | null>(null)

  const loadTheme = async () => {
    // wait loading
    await waitForElement(window.document.body, '#page > :last-child')

    // set bg color
    const container = window.document.querySelector('#page') as HTMLElement
    const lastComponent = container.querySelector('#page > :last-child')
    const bgColor = getElementProperty(lastComponent as HTMLElement, 'backgroundColor', 'rgba(0, 0, 0, 0)')
    setBgColor(bgColor)

    // set text color
    const textColor = isDarkBackground(bgColor) ? 'white' : 'grey'
    setTextColor(textColor)
  }

  useEffect(() => {
    loadTheme()
  }, [])

  if (!textColor || !bgColor) return null
  return (
    <div
      id="powered-by"
      style={{
        width: '100%',
        padding: '8px 0',
        textAlign: 'center',
        color: textColor,
        backgroundColor: bgColor,
      }}
    >
      Powered by&nbsp;
      <a rel="dofollow" href="https://www.getdestack.com/" target="_blank" className="font-bold hover:opacity-80">
        Destack
      </a>
      &nbsp; | The open source page builder
    </div>
  )
}
export default PoweredBy
