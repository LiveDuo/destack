import React, { FC, useEffect, useState } from 'react'
import { ContentProviderProps } from '../../types'
import { ToastContainer } from './toast'

import devStyles from '../css/dev.module.css'
import prodStyles from '../css/prod.module.css'

const isDev = process.env.NODE_ENV !== 'production'

const ContentProvider: FC<ContentProviderProps> = ({ data, showEditorInProd = false }) => {
  const showEditor = isDev || showEditorInProd
  const [css, setCss] = useState<string | undefined>()
  const [html, setHtml] = useState<string>('')
  useEffect(() => {
    if (showEditor) {
      import('./initEditor').then((c) => c.initEditor(isDev))
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
        {/* onload={() => setCssLoaded(true)} */}
        <link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.1.4/dist/tailwind.min.css" />
        <style>{prodStyles}</style>
        <style> {css}</style>

        {/* {cssLoaded} */}
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
        <ToastContainer />
      </>
    )
}
export { ContentProvider }
