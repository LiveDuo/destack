/* eslint-disable @typescript-eslint/no-non-null-assertion */
import config from '../../config'

const appendTailwindCss = (newEditor): void => {
  const iframe = newEditor.Canvas.getFrameEl()

  if (!iframe) return

  const cssLink = document.createElement('link')
  cssLink.href = config.tailwindCssUrl
  cssLink.rel = 'stylesheet'
  iframe.contentDocument.head.appendChild(cssLink)

  const cssStyle = document.createElement('style')
  cssStyle.type = 'text/css'
  cssStyle.innerHTML = `img.object-cover { filter: sepia(1) hue-rotate(190deg) opacity(.46) grayscale(.7) !important; }`
  iframe.contentDocument.head.appendChild(cssStyle)
}

const appendCustomCss = (): void => {
  document.querySelector('html')!.style.height = '100%'
  document.querySelector('body')!.style.height = '100%'
  const next: HTMLElement = document.querySelector('#__next')!
  next.style.height = '100%'
}

const appendCss = (newEditor): void => {
  appendCustomCss()
  appendTailwindCss(newEditor)
}
export { appendCss }
