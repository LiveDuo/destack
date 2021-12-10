import React, { useEffect, useState } from 'react'

import { ContentProvider } from './index'

const isDev = process.env.NODE_ENV !== 'production'

const ContentProviderReact = () => {
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState(false)

  useEffect(() => {
    if (!isDev) {
      fetch('/data/default.json')
        .then((response) => response.json())
        .then((_data) => {
          setData(_data)
          setLoaded(true)
        })
    } else {
      setData({})
      setLoaded(true)
    }
  }, [])

  return (
    <div style={{ height: '100%' }}>
      {loaded && <ContentProvider html={data.html} css={data.css} standaloneBuilder={true} />}
    </div>
  )
}

export { ContentProviderReact }
