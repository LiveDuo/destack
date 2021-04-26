import React, {useState, useEffect} from 'react'

import {loadPanels} from '../lib/panels'
import {loadTraits} from '../lib/traits'
import {loadComponents} from '../lib/components'
import {loadBlocks} from '../lib/blocks'

import {appendCss} from '../lib/css'
import {handleEvents} from '../lib/events'

import {fetchJSON, escapeName} from '../utils'

import styles from '../css/index.module.css'
import config from '../config'

const loadTemplate = (newEditor) => {
  fetchJSON('get', '/api/builder/handle')
    .then(data => {
      const component = data.find(c => c.filename === 'hero.json')
      if (component) {
        const content = JSON.parse(component.content)
        newEditor.setComponents(JSON.parse(content.components))
        newEditor.setStyle(JSON.parse(content.styles))
      }
    })
}

const editorOptions = {
  selectorManager: { escapeName },
  container : '#gjs',
  height: '100%',
  storageManager: { autoload: false },
  showDevices: false,
}

const MarkdownProvider = ({html, css}) => {
  const [cssLoaded, setCssLoaded] = useState(false)
  useEffect(() => { if (!html) {
    const grapesjs = require('grapesjs')

    const newEditor = grapesjs.init(editorOptions)
    
    loadTraits(newEditor)
    loadPanels(newEditor)
    loadComponents(newEditor)
    loadBlocks(newEditor)

    handleEvents(newEditor)
    appendCss(newEditor, setCssLoaded)

    loadTemplate(newEditor)
  } }, [])

  if (html) return (
    <div>
        <style><link href={config.tailwindCssUrl} rel="stylesheet" onLoad={() => setCssLoaded(true)}/></style>
        <style>{css}</style>
        {cssLoaded && <div dangerouslySetInnerHTML={{ __html: html }}></div>}
    </div>)

  return (
    <div style={{height: '100%', margin: '0 auto'}}>
      <style>{styles}</style>
      <style>{`.gjs-cv-canvas { display: ${cssLoaded ? 'block' : 'none'};}`}</style>
      <div id="gjs"></div>
    </div>)
}
export { MarkdownProvider }
