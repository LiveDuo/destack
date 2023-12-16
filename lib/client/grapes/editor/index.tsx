import React, { FC, useEffect, useState, useRef } from 'react'
import { ContentProviderProps } from '../../../types'
import { ToastContainer } from '../toast'

import cssOverrides from '../styles/overrides'

export const tailwindCssUrl = 'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css'

const ContentProvider: FC<ContentProviderProps> = ({ data, showEditorInProd = false, standaloneServer = false }) => {
  const mounted = useRef<boolean>(false)
  const [css, setCss] = useState<string | undefined>()
  const [html, setHtml] = useState<string | undefined>()

  const isDev = !data
  const showEditor = isDev || showEditorInProd
  const startServer = isDev && !showEditorInProd

  const [tailwindLoaded, setTailwindLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (mounted.current) return

    const $style = document.createElement('style')
    $style.innerHTML = cssOverrides
    document.head.appendChild($style)

    if (showEditor) {
      import('./initEditor').then((c) => c.initEditor(startServer, standaloneServer))
    } else {
      const templateData = data?.find(({ name }) => name === `${location.pathname}.json`)
      if (!templateData) return

      const content = JSON.parse(templateData.content)
      setCss(content.css)
      setHtml(content.html)
    }

    mounted.current = true
  }, [])

  if (showEditor)
    return (
      <div style={{ height: '100%', margin: '0 auto' }}>
        <div id="gjs"></div>
      </div>
    )
  else
    return (
      <>
        <link rel="stylesheet" onLoad={() => setTailwindLoaded(true)} href={tailwindCssUrl} />
        <style> {css}</style>
        {(!standaloneServer || tailwindLoaded) && <div dangerouslySetInnerHTML={{ __html: html ?? '' }}></div>}
        <ToastContainer />
      </>
    )
}
export { ContentProvider }
