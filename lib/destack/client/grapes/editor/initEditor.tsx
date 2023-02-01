import { loadPanels } from '../lib/panels'
import { loadTraits } from '../lib/traits'
import { loadComponents } from '../lib/components'
import { loadBlocks } from '../lib/blocks'
import { loadTemplate, saveTemplate, escapeName, uploadFile } from '../utils'
import { appendCss } from '../lib/css'

import { ChangeEvent } from 'react'

const uploadFileAndAdd = async (e, editor, standaloneServer): Promise<void> => {
  const files = e.dataTransfer ? e.dataTransfer.files : e.target.files
  const images = await uploadFile(files[0], standaloneServer)
  editor.AssetManager.add(images)
}

const initEditor = async (startServer = true, standaloneServer): Promise<void> => {
  const grapesjs = await import('grapesjs')

  // for 'npm run test' only
  globalThis.grapesjs = grapesjs

  if (startServer) {
    assetManagerOptions.uploadFile = (e: ChangeEvent<HTMLInputElement>) =>
      uploadFileAndAdd(e, editor, standaloneServer)
    editorOptions.assetManager = assetManagerOptions
  }

  // need var intead of const so it's global
  // and its accessible in uploadFile function
  var editor = grapesjs.init(editorOptions)

  loadTraits(editor)
  loadPanels(editor, startServer, standaloneServer)
  loadComponents(editor)
  loadBlocks(editor, standaloneServer)

  appendCss(editor)

  if (startServer) {
    editor.on('storage:store', (e) => saveTemplate(e, standaloneServer))
    const data = await loadTemplate(standaloneServer)

    if (!data) return
    const content = JSON.parse(data)

    if (!content.components) return
    editor.setComponents(JSON.parse(content.components))
    editor.setStyle(JSON.parse(content.styles))
  }
}

const assetManagerOptions = {
  storageType: '',
  storeOnChange: true,
  storeAfterUpload: true,
  assets: [],
  uploadFile: uploadFileAndAdd,
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
