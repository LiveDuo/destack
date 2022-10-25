import React from 'react'

import RenderFromEditor from './editor/FrameFromEditor'

import { ThemeProvider } from './store'

import './styles/app.css'

const ContentProvider = ({ data }) => {
  return (
    <ThemeProvider>
      <div className="h-full h-screen">
        <RenderFromEditor data={data} standaloneServer={false} />
      </div>
    </ThemeProvider>
  )
}
export { ContentProvider }

const ContentProviderReact = () => {
  return (
    <ThemeProvider>
      <div className="h-full h-screen">
        <RenderFromEditor data={null} standaloneServer={true} />
      </div>
    </ThemeProvider>
  )
}
export { ContentProviderReact }
