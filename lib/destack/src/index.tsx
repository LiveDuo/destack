import React from 'react'
import ReactDOM from 'react-dom'

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

const ContentProvider = ({ data }) => <ContentProviderBase data={data} standaloneServer={false} />

const container = document.getElementById('root')
ReactDOM.render(<ContentProvider data={null} />, container)
