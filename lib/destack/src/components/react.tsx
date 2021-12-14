import React, { useEffect, useState } from 'react'

import { ContentProvider } from './index'
import { StaticBuildProps } from '../../types'

const isDev = process.env.NODE_ENV !== 'production'

const ContentProviderReact = () => {
  const [loaded, setLoaded] = useState<Boolean>(false)
  const [data, setData] = useState<StaticBuildProps>({ html: undefined, css: undefined })

  useEffect(() => {
    if (!isDev) {
      fetch('/data/default.json')
        .then((response) => response.json())
        .then((_data) => {
          setData(_data)
          setLoaded(true)
        })
    } else {
      setData({ html: undefined, css: undefined })
      setLoaded(true)
    }
  }, [])

  return (
    <div style={{ height: '100%' }}>
      {loaded && (
        <ContentProvider
          html={data.html}
          css={data.css}
          standaloneBuilder={true}
          showEditorInProd={false}
        />
      )}
    </div>
  )
}

export { ContentProviderReact }
