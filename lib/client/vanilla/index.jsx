import React, { useEffect, useRef, useState } from 'react'

import './index.css'

import PoweredBy from './powered'
import Editor from './editor'

const isDev = '_self' in React.createElement('div')

const ContentProvider = ({ data, standaloneServer }) => {
  const [templateData, setTemplateData] = useState()

  useEffect(() => {
    if (data) {
      const _templateData = data?.find(({ name }) => name === location.pathname)
      setTemplateData(_templateData.content)
    }
  }, [])

  if (data)
    return (
      <>
        <div id="page" dangerouslySetInnerHTML={{ __html: templateData }} />
        <PoweredBy />
      </>
    )
  else return <Editor standaloneServer={standaloneServer} />
}

export { ContentProvider }

const ContentProviderReact = () => {
  const mounted = useRef(false)
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState()

  const loadData = async () => {
    if (isDev) {
      setData(undefined)
      setLoaded(true)
      return
    }

    // TODO support non-default routes
    const url = `/default.html`
    const _data = await fetch(url).then((r) => r.text())
    setData([{ content: _data, name: '/' }])
    setLoaded(true)
  }

  useEffect(() => {
    if (mounted.current) return

    loadData()

    mounted.current = true
  }, [])

  return loaded && <ContentProvider data={data} standaloneServer={true} />
}
export { ContentProviderReact }
