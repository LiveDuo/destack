import React, {useState, useEffect} from 'react'
import {initEditor} from '../libs'
import '../css/index.module.css'

if (typeof window !== 'undefined') {
  require('grapesjs-preset-webpage')
}

export default function Home({html}) {
  return (
  html ? 
  <div>
      <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
  </div> : <MarkdownProvider html={html}/>) 
}


const MarkdownProvider = ({html}) => {
  const [cssLoaded, setCssLoaded] = useState(false)
  useEffect(() => { if (!html) initEditor() }, [])

  if (typeof window === 'undefined') return null

  if (html) return (
    <div>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" onLoad={() => setCssLoaded(true)}/>
        {cssLoaded && <div dangerouslySetInnerHTML={{ __html: html }}></div>}
    </div>)

  return (
    <div style={{height: '100%', margin: '0 auto'}}>
      <div id="gjs"></div>
    </div>)
}
export { MarkdownProvider }
