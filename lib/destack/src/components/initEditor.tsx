import { loadPanels } from '../lib/panels'
import { loadTraits } from '../lib/traits'
import { loadComponents } from '../lib/components'
import { loadBlocks } from '../lib/blocks'
import { fetchJSON, escapeName } from '../utils'
import { appendCss } from '../lib/css'
import { handleEvents } from '../lib/events'

import { ChangeEvent } from 'react'
import { standaloneServerPort as port } from '../../server/config'

const uploadFile = (e, editor, standaloneServer): void => {
  const files = e.dataTransfer ? e.dataTransfer.files : e.target.files
  const formData = new FormData()
  for (const i in files) {
    formData.append('file-' + i, files[i])
  }

  const baseUrl = standaloneServer ? `http://localhost:${port}` : ''
  fetch(`${baseUrl}/api/builder/handle`, { method: 'POST', body: formData })
    .then((res) => res.json())
    .then((images) => {
      editor.AssetManager.add(images)
    })
}

const initEditor = async (startServer = true, standaloneServer): Promise<void> => {
  const grapesjs = await import('grapesjs')

  // for 'npm run test' only
  globalThis.grapesjs = grapesjs

  if (startServer) {
    assetManagerOptions.uploadFile = (e: ChangeEvent<HTMLInputElement>) =>
      uploadFile(e, editor, standaloneServer)
    editorOptions.assetManager = assetManagerOptions
  }

  // need var intead of const so it's global
  // and its accessible in uploadFile function
  var editor = grapesjs.init(editorOptions)

  loadTraits(editor)
  loadPanels(editor, startServer)
  loadComponents(editor)
  loadBlocks(editor)

  appendCss(editor)

  if (startServer) handleEvents(editor, standaloneServer)
  if (startServer) loadTemplate(editor, standaloneServer)
}

const loadTemplate = async (editor, standaloneServer): Promise<void> => {
  const baseUrl = standaloneServer ? `http://localhost:${port}` : ''
  const data = await fetchJSON({ method: 'get', url: `${baseUrl}/api/builder/handle` })
  const pathNameWindows = location.pathname === '/' ? '\\default.json' : `${location.pathname}.json`
  const pathNameUnix = location.pathname === '/' ? '/default.json' : `${location.pathname}.json`
  const component = Object.keys(data).find((c) =>
    [pathNameWindows, pathNameUnix].includes(data[c].filename),
  )
  if (!component) return
  const content = JSON.parse(data[component].content)
  editor.setComponents(JSON.parse(content.components))
  editor.setStyle(JSON.parse(content.styles))
}

const assetManagerOptions = {
  storageType: '',
  storeOnChange: true,
  storeAfterUpload: true,
  assets: [],
  uploadFile,
}

const editorOptions = {
  selectorManager: { escapeName },
  container: '#gjs',
  height: '100%',
  storageManager: { autoload: false },
  showDevices: false,
  traitsEditor: true,
  assetManager: assetManagerOptions,
}
export { initEditor }
