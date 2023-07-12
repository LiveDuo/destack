import { loadPanels } from '../lib/panels'
import { loadTraits } from '../lib/traits'
import { loadComponents } from '../lib/components'
import { loadBlocks } from '../lib/blocks'
import { loadTemplate, saveTemplate, escapeName, uploadFile } from '../utils'
import { appendCss } from '../lib/css'

import { ChangeEvent } from 'react'

const uploadFileAndAdd = async (
  e: ChangeEvent<HTMLInputElement>,
  editor: any,
  standaloneServer: boolean,
): Promise<void> => {
  const files = e.target.files as FileList
  const images = await uploadFile(files[0], standaloneServer)
  editor.AssetManager.add(images)
}

declare global {
  // @ts-ignore
  var grapesjs: any
}

const initEditor = async (startServer = true, standaloneServer: boolean): Promise<void> => {
  // @ts-ignore
  const grapesjs = await import('grapesjs')

  // for 'npm run test' only
  // @ts-ignore
  globalThis.grapesjs = grapesjs

  if (startServer) {
    assetManagerOptions.uploadFile = (e: ChangeEvent<HTMLInputElement>) =>
      uploadFileAndAdd(e as any, editor, standaloneServer)
    editorOptions.assetManager = assetManagerOptions
  }

  // need var instead of const so it's global
  // and its accessible in uploadFile function
  // @ts-ignore
  var editor = grapesjs.init(editorOptions)

  loadTraits(editor)
  loadPanels(editor, startServer, standaloneServer)
  loadComponents(editor)
  loadBlocks(editor, standaloneServer)

  appendCss(editor)

  if (startServer) {
    editor.on('storage:store', () => {
      const e = { components: editor.getComponents(), styles: editor.getStyles() }
      saveTemplate(e, standaloneServer)
    })
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
