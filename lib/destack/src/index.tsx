import React from 'react'

import Editor from './editor/Editor'

import { ThemeProvider } from './store'

import './styles/app.css'

const ContentProviderBase = ({ data, standaloneServer }) => {
  return (
    <ThemeProvider>
      <div className="h-full h-screen">
        <Editor data={data} standaloneServer={standaloneServer} />
      </div>
    </ThemeProvider>
  )
}

export const ContentProvider = ({ data }) => (
  <ContentProviderBase data={data} standaloneServer={false} />
)
export const ContentProviderReact = () => (
  <ContentProviderBase data={null} standaloneServer={true} />
)

export { ContentProvider as ContentProviderGrapes } from '../src-grapes'
export { ContentProviderReact as ContentProviderReactGrapes } from '../src-grapes'
