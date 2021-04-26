import React, {useState, useEffect} from 'react'

import {loadPanels} from '../libs/panels'
import {loadTraits} from '../libs/traits'
import {loadFormComponents} from '../libs/components/form'
import {loadTailwindBlocks} from '../libs/blocks/tailwind'
import {loadBasicBlocks} from '../libs/blocks/basic'
import {loadFormBlocks} from '../libs/blocks/form'
import {appendTailwindCss, appendCustomCss} from '../libs/css'
import {handleEditorEvents} from '../libs/events'

import {fetchJSON, escapeName} from '../utils'

import styles from '../css/index.module.css'
import config from '../config'

const grapesjs = (typeof window !== 'undefined') ? require('grapesjs') : null

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
  storageManager: { autoload: false }
}

const MarkdownProvider = ({html, css}) => {
  const [cssLoaded, setCssLoaded] = useState(false)
  useEffect(() => { if (!html) {
    const newEditor = grapesjs.init(editorOptions)

    loadTraits(newEditor)
    loadPanels(newEditor)

    loadFormComponents(newEditor)

    loadBasicBlocks(newEditor)
    loadFormBlocks(newEditor)
    loadTailwindBlocks(newEditor)

    handleEditorEvents(newEditor)

    const categories = newEditor.BlockManager.getCategories()
    categories.each(category => {
      category.set('open', false).on('change:open', opened => {
        opened.get('open') && categories.each(category => {
          category !== opened && category.set('open', false)
        })
      })
    })

    appendTailwindCss(newEditor, setCssLoaded)
    appendCustomCss()

    loadTemplate(newEditor)
  } }, [])

  if (typeof window === 'undefined') return null
  if (html) return (
    <div>
        <link href={config.tailwindCssUrl} rel="stylesheet" onLoad={() => setCssLoaded(true)}/>
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
