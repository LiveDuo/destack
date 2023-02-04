import b5s from './image.png'
import b6s from './link.png'
import b7s from './map.png'
import b8s from './text.png'
import b9s from './video.png'

import { getPngHtml } from '../../../utils'

const loadBlocks = (editor) => {
  let bm = editor.BlockManager

  bm.add('text', {
    label: getPngHtml(b8s),
    category: { label: 'Basic' },
    content: {
      type: 'text',
      content: 'Insert your text',
      style: { padding: '10px' },
    },
  })

  bm.add('link', {
    label: getPngHtml(b6s),
    category: { label: 'Basic' },
    content: {
      type: 'link',
      content: 'Insert your link',
      style: { color: '#6366f1', padding: '10px' },
    },
  })

  bm.add('image', {
    label: getPngHtml(b5s),
    category: { label: 'Basic' },
    content: { type: 'image' },
  })

  bm.add('video', {
    label: getPngHtml(b9s),
    category: { label: 'Basic' },
    content: {
      type: 'video',
      style: { height: '350px' },
    },
  })

  bm.add('map', {
    label: getPngHtml(b7s),
    category: { label: 'Basic' },
    content: {
      type: 'map',
      style: { height: '350px' },
    },
  })
}

export default loadBlocks
