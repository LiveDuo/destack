import {loadBasicBlocks} from './basic'
// import {loadFormBlocks} from './form'
import {loadTailwindBlocks} from './tailwind'

export function loadBlocks (editor) {
  loadBasicBlocks(editor)
  loadTailwindBlocks(editor)

}

