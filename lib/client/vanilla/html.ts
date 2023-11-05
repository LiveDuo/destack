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
export { getElementProperty }

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
export { waitForElement }

const isDarkBackground = (bgColor: string) => {
  const [r, g, b] = bgColor
    .match(/\(([^()]+)\)/)![1]
    .split(',')
    .map((v) => parseInt(v))
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
  return hsp < 127.5
}
export { isDarkBackground }
