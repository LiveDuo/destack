/* eslint-disable @typescript-eslint/no-non-null-assertion */
import config from '../../config'

const appendTailwindCss = (newEditor): void => {
  const iframe = newEditor.Canvas.getFrameEl()

  if (!iframe) return

  const cssLink = document.createElement('link')
  cssLink.href = config.tailwindCssUrl
  cssLink.rel = 'stylesheet'

  const cssStyle = document.createElement('style')
  cssStyle.innerHTML = `img.object-cover { filter: sepia(1) hue-rotate(190deg) opacity(.46) grayscale(.7) !important; }`

  // checks iframe is ready before loading Tailwind CSS - issue with firefox
  const f = setInterval(() => {
    const doc = iframe.contentDocument
    if (doc.readyState === 'complete') {
      doc.head.appendChild(cssLink)
      doc.head.appendChild(cssStyle)
      clearInterval(f)
    }
  }, 100)
}

const appendCustomCss = () => {
  document.querySelector('html')!.style.height = '100%'
  document.querySelector('body')!.style.height = '100%'
  // FIX for react: document.querySelector('#root')
  const next: HTMLElement = document.querySelector('#__next')!
  next.style.height = '100%'
}

const appendCss = (newEditor) => {
  appendCustomCss()
  appendTailwindCss(newEditor)
}
export { appendCss }
