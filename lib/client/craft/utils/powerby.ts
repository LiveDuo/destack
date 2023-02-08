const getElementProperty = (
  element: HTMLElement,
  property: string,
  defaultValue: string,
): string => {
  const value = window.getComputedStyle(element)[property as any]
  if (value !== defaultValue) return value
  else if (!element || element.childNodes.length === 0) return defaultValue
  else return getElementProperty(element?.childNodes[0] as HTMLElement, property, defaultValue)
}

const appendPoweredBy = (target: HTMLElement, bgColor: string, color: string) => {
  if (!window.document.getElementById('powered-by')) {
    const divnode = window.document.createElement('div')

    divnode.innerHTML =
      'Powered by <a rel="dofollow" href="https://www.getdestack.com/" target="_blank" class="font-bold hover:opacity-80">Destack</a> | The open source page builder'
    divnode.setAttribute('id', 'powered-by')
    divnode.style.width = '100%'
    divnode.style.padding = '8px 0'
    divnode.style.textAlign = 'center'
    divnode.style.backgroundColor = bgColor
    divnode.style.color = color

    target.appendChild(divnode)
  }
}

const isDarkBackground = (bgColor: string) => {
  const [r, g, b] = bgColor
    .match(/\(([^()]+)\)/)![1]
    .split(',')
    .map((v) => parseInt(v))
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
  return hsp < 127.5
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

const loadPoweredBy = async () => {
  // wait loading
  await waitForElement(
    window.document.body,
    '.page-container > div:first-child > :not(:only-child)',
  )

  // get elements
  const container = window.document.querySelector('.page-container') as HTMLElement
  const lastComponent = container.querySelector(':scope > :first-child > :last-child')

  // get colors
  const bgColor = getElementProperty(
    lastComponent as HTMLElement,
    'backgroundColor',
    'rgba(0, 0, 0, 0)',
  )
  const textColor = isDarkBackground(bgColor) ? 'white' : 'grey'

  appendPoweredBy(container.parentElement as HTMLElement, bgColor, textColor)
}
export { loadPoweredBy }
