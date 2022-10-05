import { loadBasicBlocks } from './basic'
// import {loadFormBlocks} from './form'
// import { loadTailwindBlocks } from './tailblocks'
// import { loadHyperUiBlocks } from './hyperui'
import { loadMerakiUiLigthBlocks } from './merakiui-light'

export function loadBlocks(editor) {
  loadBasicBlocks(editor)
  // loadTailwindBlocks(editor)
  // loadHyperUiBlocks(editor)
  loadMerakiUiLigthBlocks(editor)
}
