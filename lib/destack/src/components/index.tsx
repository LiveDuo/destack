import React, { FC, useEffect } from 'react'
import { ContentProviderProps } from '../../types'
import { ToastContainer } from './toast'

import devStyles from '../css/dev.module.css'
import prodStyles from '../css/prod.module.css'

const ContentProvider: FC<ContentProviderProps> = ({ html, css, server = true }) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      import('./initEditor').then((initEditor) => initEditor.initEditor({ server }))
    }
  }, [])

  if (process.env.NODE_ENV === 'production')
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

  return (
    <div style={{ height: '100%', margin: '0 auto' }}>
      <style>{devStyles}</style>
      <div id="gjs"></div>
    </div>
  )
}
export { ContentProvider }
