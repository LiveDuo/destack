import config from '../../config'

const appendTailwindCss = (newEditor, setCssLoaded) => {
    const iframe = newEditor.Canvas.getFrameEl()

    if (!iframe) return

    const cssLink = document.createElement('link')
    cssLink.href = config.tailwindCssUrl
    cssLink.rel = 'stylesheet'
    cssLink.onload = () => { setCssLoaded(true); console.log('appendTailwindCss') }
    iframe.contentDocument.head.appendChild(cssLink)

    const cssStyle = document.createElement('style')
    cssStyle.type = 'text/css'
    cssStyle.innerHTML = `img { filter: sepia(1) hue-rotate(190deg) opacity(.46) grayscale(.7) !important; } 
    @media (min-width: 768px)`
    iframe.contentDocument.head.appendChild(cssStyle)
}
export { appendTailwindCss }

const appendCustomCss = () => {
    document.querySelector("html").style.height = '100%'
    document.querySelector("body").style.height = '100%'
    document.querySelector("#__next").style.height = '100%'
}
export { appendCustomCss }