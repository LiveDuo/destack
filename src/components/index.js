import React, { useState, useEffect } from 'react'

import { loadPanels } from '../lib/panels'
import { loadTraits } from '../lib/traits'
import { loadComponents } from '../lib/components'
import { loadBlocks } from '../lib/blocks'

import { appendCss } from '../lib/css'
import { handleEvents } from '../lib/events'

import { fetchJSON, escapeName } from '../utils'

import styles from '../css/index.module.css'
import config from '../config'

const loadTemplate = (editor) => {
  fetchJSON('get', '/api/builder/handle')
    .then(data => {
      const component = data.find(c => c.filename === 'default.json')
      if (component) {
        const content = JSON.parse(component.content)
        editor.setComponents(JSON.parse(content.components))
        editor.setStyle(JSON.parse(content.styles))
      }
    })
}

const assetManagerOptions = {
  storageType: '',
  storeOnChange: true,
  storeAfterUpload: true,
  assets: [],
  // uploadFile
}

const editorOptions = {
  selectorManager: { escapeName },
  container: '#gjs',
  height: '100%',
  storageManager: { autoload: false },
  showDevices: false,
  // assetManager: assetManagerOptions
}

const ContentProvider = ({ html, css, server = true }) => {
  const [cssLoaded, setCssLoaded] = useState(false)

  useEffect(() => {
    if (!html) {
      const grapesjs = require('grapesjs')

      const uploadFile = (e) => {
        const files = e.dataTransfer ? e.dataTransfer.files : e.target.files
        const formData = new FormData()
        for (let i in files) {
          formData.append('file-' + i, files[i])
        }

        fetch('/api/builder/handle', { method: 'POST', body: formData })
          .then((res) => res.json())
          .then((images) => {
            editor.AssetManager.add(images)
          })
      }

      if (server) assetManagerOptions.uploadFile = (e) => uploadFile(e)
      editorOptions.assetManager = assetManagerOptions

      // need var intead of const so it's global
      // and its accessible in uploadFile function
      var editor = grapesjs.init(editorOptions)

      loadTraits(editor)
      loadPanels(editor)
      loadComponents(editor)
      loadBlocks(editor)

      appendCss(editor, setCssLoaded)
      
      if (server) handleEvents(editor)
      if (server) loadTemplate(editor)
    }
  }, [])

  if (html) return (
    <div>
      <style><link href={config.tailwindCssUrl} rel="stylesheet" onLoad={() => setCssLoaded(true)} /></style>
      <style>{css}</style>
      {cssLoaded && <div dangerouslySetInnerHTML={{ __html: html }}></div>}
    </div>)

  return (
    <div style={{ height: '100%', margin: '0 auto' }}>
      <style>{styles}</style>
      <style>{`.gjs-cv-canvas { display: ${cssLoaded ? 'block' : 'none'};}`}</style>
      <div id="gjs"></div>
    </div>)
}
export { ContentProvider }
