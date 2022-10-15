import React, { useEffect } from 'react'

import RenderFromState from './editor/RenderFromState'
import RenderFromEditor from './editor/FrameFromEditor'

import './styles/app.css'

const ContentProvider = ({ data }) => {
  useEffect(() => {
    console.log(data)
  }, [])

  return (
    <div className="h-full h-screen">
      {!data ? <RenderFromEditor /> : <RenderFromState data={data} />}
    </div>
  )
}
export { ContentProvider }
