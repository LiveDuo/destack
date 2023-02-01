import React, { FC, useEffect, useState, useRef } from 'react'

import { ContentProvider } from './index'
import { dataType } from '../../../types'

import { loadTemplate } from '../utils'

const isDev = '_self' in React.createElement('div')

const ContentProviderReact: FC = () => {
  const mounted = useRef<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [data, setData] = useState<dataType[] | undefined>()

  const loadData = async () => {
    const data = await loadTemplate(true)

    if (!data) return
    const content = JSON.parse(data)

    if (!content.components) return
    setData(content)
    setLoaded(true)
  }

  useEffect(() => {
    if (mounted.current) return

    if (!isDev) {
      loadData()
    } else {
      setData(undefined)
      setLoaded(true)
    }

    mounted.current = true
  }, [])

  return (
    <div style={{ height: '100%' }}>
      {loaded && <ContentProvider data={data} standaloneServer={true} showEditorInProd={false} />}
    </div>
  )
}

export { ContentProviderReact }
