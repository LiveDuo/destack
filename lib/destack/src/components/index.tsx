import React, { FC, useEffect, useState } from 'react'
import { ContentProviderProps } from '../../types'
import { ToastContainer } from './toast'

import devStyles from '../css/dev.module.css'
import prodStyles from '../css/prod.module.css'

import { tailwindCssUrl } from '../../server/config'

const ContentProvider: FC<ContentProviderProps> = ({
  data,
  showEditorInProd = false,
  standaloneServer = false,
}) => {
  const [css, setCss] = useState<string | undefined>()
  const [html, setHtml] = useState<string | undefined>()

  const isDev = !data
  const showEditor = isDev || showEditorInProd
  const startServer = isDev && !showEditorInProd

  const [tailwindLoaded, setTailwindLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (showEditor) {
      import('./initEditor').then((c) => c.initEditor(startServer, standaloneServer))
    } else {
      const pathName =
        window.location.pathname === '/' ? '/default.json' : `${window.location.pathname}.json`
      const template = data.find((d) => d.filename === pathName)
      if (template) {
        const content = JSON.parse(template.content)
        setCss(content.css)
        setHtml(content.html)
      }
    }
  }, [])

  if (showEditor)
    return (
      <div style={{ height: '100%', margin: '0 auto' }}>
        <style>{devStyles}</style>
        <div id="gjs"></div>
      </div>
    )
  else
    return (
      <>
        <link rel="stylesheet" onLoad={() => setTailwindLoaded(true)} href={tailwindCssUrl} />
        <style>{prodStyles}</style>
        <style> {css}</style>
        {(!standaloneServer || tailwindLoaded) && (
          <div dangerouslySetInnerHTML={{ __html: html ?? '' }}></div>
        )}
        <ToastContainer />
      </>
    )
}
export { ContentProvider }
