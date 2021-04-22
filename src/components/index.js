import React, {useState, useEffect} from 'react'
import {initEditor} from '../libs'
import '../css/index.module.css'

if (typeof window !== 'undefined') {
  require('grapesjs-preset-webpage')
}

const MarkdownProvider = () => {
  useEffect(() => initEditor(), [])

  if (typeof window === 'undefined') return null
  return (
    <div style={{height: '100%', margin: '0 auto'}}>
      <div id="gjs"></div>
    </div>
  )
}
export { MarkdownProvider }
