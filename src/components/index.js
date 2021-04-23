import React, {useState, useEffect} from 'react'
import {initEditor} from '../libs'
import styles from '../css/index.module.css'

if (typeof window !== 'undefined') {
  require('grapesjs-preset-webpage')
}

const MarkdownProvider = ({html, css}) => {
  const [cssLoaded, setCssLoaded] = useState(false)
  useEffect(() => { if (!html) initEditor() }, [])

  if (typeof window === 'undefined') return null
  if (html) return (
    <div>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" onLoad={() => setCssLoaded(true)}/>
        <style>{css}</style>
        {cssLoaded && <div dangerouslySetInnerHTML={{ __html: html }}></div>}
    </div>)

  return (
    <div style={{height: '100%', margin: '0 auto'}}>
      <style>{styles}</style>
      <div id="gjs"></div>
    </div>)
}
export { MarkdownProvider }
