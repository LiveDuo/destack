import React, { FC, useEffect } from 'react'
import { ContentProviderProps } from '../../types'

import styles from '../css/index.module.css'

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
        {/* <link href={config.tailwindCssUrl} rel="stylesheet" /> */}
        <style>{css}</style>
        {/* {cssLoaded} */}
        {<div dangerouslySetInnerHTML={{ __html: html }}></div>}
      </>
    )

  return (
    <div style={{ height: '100%', margin: '0 auto' }}>
      <style>{styles}</style>
      <div id="gjs"></div>
    </div>
  )
}
export { ContentProvider }
1
