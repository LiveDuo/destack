import loadBasicBlocks from './basic'
import { getThemeUrl, getPngFromId } from '../../utils/index'

const loadThemeBlocks = async (
  newEditor: { BlockManager: any },
  folder: any,
  standaloneServer: boolean,
): Promise<void> => {
  const url = getThemeUrl(standaloneServer, folder)
  const data = await fetch(url).then((r) => r.json())

  const components = data.map((c: any) => ({
    displayName: c.folder.replace(/(\d)/g, ' $1'),
    category: c.folder.replace(/\d/g, ''),
    source: c.source,
    themeFolder: folder,
    blockFolder: c.folder,
  }))

  components.forEach((s: any) => {
    newEditor.BlockManager.add(s.displayName, {
      label: getPngFromId(s.themeFolder, s.blockFolder, standaloneServer),
      attributes: { class: '' },
      content: s.source,
      category: { label: s.category, open: s.category === 'Features' },
    })
  })
}
export { loadThemeBlocks }

export function loadBlocks(editor: any, standaloneServer: boolean) {
  loadBasicBlocks(editor)
  loadThemeBlocks(editor, 'tailblocks', standaloneServer)
}
