import React from 'react'

import RenderFromState from './editor/RenderFromState'
import RenderFromEditor from './editor/FrameFromEditor'

import './styles/app.css'

const showEditor = true

const ContentProvider = ({ data }) => {
  return (
    <div className="h-full h-screen">
      {showEditor ? <RenderFromEditor /> : <RenderFromState data={data} />}
    </div>
  )
}
export { ContentProvider }
