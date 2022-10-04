// import b1s from './column1 1.svg'
// import b2s from './column2 1.svg'
// import b3s from './column3 1.svg'
// import b4s from './column3-7 1.svg'
import b5s from './image 1.svg'
import b6s from './link 1.svg'
import b7s from './map 1.svg'
import b8s from './text 1.svg'
import b9s from './video 1.svg'

import { getSvgHtml } from '../../../utils'

export function loadBasicBlocks(editor, opt = {}) {
  const c = opt
  let bm = editor.BlockManager
  const category = { label: 'Basic', order: 0, open: false }

  const toAdd = (t: string) => true // blocks.indexOf(name) >= 0;

  toAdd('text') &&
    bm.add('text', {
      label: getSvgHtml(b8s),
      category: category,
      // attributes: { class: 'gjs-fonts gjs-f-text' },
      content: {
        type: 'text',
        // content: '<span class="leading-relaxed">Insert your styled text here</span>',
        content: 'Insert your text here',
        style: { padding: '10px' },
        activeOnRender: 1,
      },
    })

  toAdd('link') &&
    bm.add('link', {
      label: getSvgHtml(b6s),
      category: category,
      // attributes: { class: 'fa fa-link' },
      content: {
        type: 'link',
        content: 'Link',
        style: { color: '#6366f1' },
      },
    })

  toAdd('image') &&
    bm.add('image', {
      label: getSvgHtml(b5s),
      category: category,
      // attributes: { class: 'gjs-fonts gjs-f-image' },
      content: {
        style: { color: 'black' },
        type: 'image',
        activeOnRender: 1,
      },
    })

  toAdd('video') &&
    bm.add('video', {
      label: getSvgHtml(b9s),
      category: category,
      // attributes: { class: 'fa fa-youtube-play' },
      content: {
        type: 'video',
        src: 'img/video2.webm',
        style: {
          height: '350px',
          width: '615px',
        },
      },
    })

  toAdd('map') &&
    bm.add('map', {
      label: getSvgHtml(b7s),
      category: category,
      // attributes: { class: 'fa fa-map-o' },
      content: {
        type: 'map',
        style: { height: '350px' },
      },
    })
}
