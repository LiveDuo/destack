import React, { FC, useEffect, useState } from 'react'
import { ContentProviderProps } from '../../types'
import { ToastContainer } from './toast'

import devStyles from '../css/dev.module.css'
import prodStyles from '../css/prod.module.css'

import { tailwindCssUrl } from '../../server/config'

const ContentProvider: FC<ContentProviderProps> = ({
  html,
  css,
  showEditorInProd = false,
  standaloneServer = false,
}) => {
  const isDev = !html && !css
  const showEditor = isDev || showEditorInProd

  const [tailwindLoaded, setTailwindLoaded] = useState<Boolean>(false)

  useEffect(() => {
    if (showEditor) {
      import('./initEditor').then((c) => c.initEditor(isDev, standaloneServer))
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
