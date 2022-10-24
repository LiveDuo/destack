import React from 'react'

import RenderFromEditor from './editor/FrameFromEditor'

import './styles/app.css'

const ContentProvider = ({ data }) => {
  return (
    <div className="h-full h-screen">
      <RenderFromEditor data={data} standaloneServer={false} />
    </div>
  )
}
export { ContentProvider }

const ContentProviderReact = () => {
  return (
    <div className="h-full h-screen">
      <RenderFromEditor data={null} standaloneServer={true} />
    </div>
  )
}
export { ContentProviderReact }
