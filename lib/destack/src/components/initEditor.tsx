import { loadPanels } from '../lib/panels'
import { loadTraits } from '../lib/traits'
import { loadComponents } from '../lib/components'
import { loadBlocks } from '../lib/blocks'
import { fetchJSON, escapeName } from '../utils'
import { appendCss } from '../lib/css'
import { handleEvents } from '../lib/events'

const initEditor = async ({ server = true }): Promise<void> => {
  const grapesjs = await import('grapesjs')
  /*       const uploadFile = (e): void => {
  const files = e.dataTransfer ? e.dataTransfer.files : e.target.files
  const formData = new FormData()
  for (const i in files) {
    formData.append('file-' + i, files[i])
  }

  fetch('/api/builder/handle', { method: 'POST', body: formData })
    .then((res) => res.json())
    .then((images) => {
      editor.AssetManager.add(images)
    })
}

if (server)
  assetManagerOptions.uploadFile = (e: ChangeEvent<HTMLInputElement>) => uploadFile(e) */
  //editorOptions.assetManager = assetManagerOptions

  // need var intead of const so it's global
  // and its accessible in uploadFile function
  const editor = grapesjs.init(editorOptions)

  loadTraits(editor)
  loadPanels(editor, server)
  loadComponents(editor)
  loadBlocks(editor)

  appendCss(editor)

  if (server) handleEvents(editor)
  if (server) loadTemplate(editor)
}

const loadTemplate = (editor): void => {
  fetchJSON({ method: 'get', url: '/api/builder/handle' }).then((data) => {
    const component = Object.keys(data).find((c) => data[c].filename === 'default.json')
    if (component) {
      const content = JSON.parse(data[component].content)
      editor.setComponents(JSON.parse(content.components))
      editor.setStyle(JSON.parse(content.styles))
    }
  })
}

/* const assetManagerOptions = {
  storageType: '',
  storeOnChange: true,
  storeAfterUpload: true,
  assets: [],
  // uploadFile
} */

const editorOptions = {
  selectorManager: { escapeName },
  container: '#gjs',
  height: '100%',
  storageManager: { autoload: false },
  showDevices: false,
  traitsEditor: true,
  // assetManager: assetManagerOptions
}
export { initEditor }
