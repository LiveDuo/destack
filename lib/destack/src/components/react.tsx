import React, { useEffect, useState } from 'react'

import { ContentProvider } from './index'
import { dataType } from '../../types'

const isDev = '_self' in React.createElement('div')

const ContentProviderReact = () => {
  const [loaded, setLoaded] = useState<Boolean>(false)
  const [data, setData] = useState<dataType[] | undefined>()

  useEffect(() => {
    const pathName =
      window.location.pathname === '/'
        ? 'default.json'
        : `${window.location.pathname.substring(1)}.json`
    if (!isDev) {
      fetch(`/data/${pathName}`)
        .then((response) => response.text())
        .then((_data) => {
          setData([{ filename: `/${pathName}`, content: JSON.stringify(_data) }])
          setLoaded(true)
        })
    } else {
      setData(undefined)
      setLoaded(true)
    }
  }, [])

  return (
    <div style={{ height: '100%' }}>
      {loaded && <ContentProvider data={data} standaloneServer={true} showEditorInProd={false} />}
    </div>
  )
}

export { ContentProviderReact }
