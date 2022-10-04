import { loadBasicBlocks } from './basic'
// import {loadFormBlocks} from './form'
import { loadTailwindBlocks } from './tailblocks'

export function loadBlocks(editor) {
  loadBasicBlocks(editor)
  loadTailwindBlocks(editor)
}
