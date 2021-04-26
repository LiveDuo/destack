import {loadBasicBlocks} from './basic'
// import {loadFormBlocks} from './form'
import {loadTailwindBlocks} from './tailwind'

export function loadBlocks (editor) {
  loadBasicBlocks(editor)
  loadTailwindBlocks(editor)

  const categories = editor.BlockManager.getCategories()
  categories.each(category => {
    category.set('open', false).on('change:open', opened => {
      opened.get('open') && categories.each(category => {
        category !== opened && category.set('open', false)
      })
    })
  })
}

