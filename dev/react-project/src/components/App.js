require('../styles/index.module.css')

import { useEffect, useState } from 'react'

import { ContentProvider } from 'destack'

const isDev = process.env.NODE_ENV !== 'production'

const App = () => {
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
      {loaded && <ContentProvider html={data.html} css={data.css} />}
    </div>
  )
}

export default App
