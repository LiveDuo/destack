if (typeof window !== 'undefined') {
  require('grapesjs-preset-webpage')
}

import sources from '../data'

const grapesjs = (typeof window !== 'undefined') ? require('grapesjs') : null

const fetchJSON = (method, url, data) => fetch(url, {method, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})

const initEditor = () => {

  const newEditor = grapesjs.init({
    container : '#gjs',
    height: '100%',
    components: '',
    style: '',
    storageManager: {
      autoload: false
    },
    // plugins: ['gjs-blocks-basic'],
    // pluginsOpts: {
    //   'gjs-blocks-basic': {}
    // }
    plugins: ['gjs-preset-webpage'],
    pluginsOpts: {
      'gjs-preset-webpage': {}
    }
  })

  const blockManager = newEditor.BlockManager

  sources.forEach((s, i) => {
    blockManager.add(s.id, {
      label: s.label,
      attributes: { class: s.class },
      content: s.content,
      category:{ label: s.category, order: s.order, open: true },
    })
  })


  const saveLocally = (data) => fetchJSON('post', '/api/save', {path: 'hero.json', data})
  newEditor.on('storage:store', (e) => saveLocally(e))

  fetchJSON('get', '/api/load')
    .then(data => data.json())
    .then(data => {
      const component = data.find(c => c.filename === 'hero.json')
      const content = JSON.parse(component.content)
      newEditor.setComponents(JSON.parse(content.components))
      newEditor.setStyle(JSON.parse(content.styles))
    })
  
  newEditor.getConfig().showDevices = 0
  newEditor.Panels.addPanel({ id: 'devices-c' }).get('buttons').add([
  { id: 'set-device-desktop', command: (e) => { return e.setDevice('Desktop') }, className: 'fa fa-desktop', active: 1},
  { id: 'set-device-tablet', command: (e) => { return e.setDevice('Tablet') }, className: 'fa fa-tablet' },
  { id: 'set-device-mobile', command: (e) => { return e.setDevice('Mobile portrait') }, className: 'fa fa-mobile' },
  ])
  newEditor.Panels.addButton('options', {id: 'undo', className: 'fa fa-undo', command: 'undo', attributes: { title: 'Undo' }})
  newEditor.Panels.addButton('options', {id: 'redo', className: 'fa fa-repeat', command: 'redo', attributes: { title: 'Redo'}})
  newEditor.Panels.removeButton('options','fullscreen')
  newEditor.Panels.removeButton('options','export-template')
  // newEditor.Panels.render() // problem with traits panel

  const iframe = newEditor.Canvas.getFrameEl()
  const cssLink = document.createElement('link')
  cssLink.href = 'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css'
  cssLink.rel = 'stylesheet'
  iframe.contentDocument.head.appendChild(cssLink)
  
  const cssStyle = document.createElement('style')
  cssStyle.type = 'text/css'
  cssStyle.innerHTML = `img { filter: sepia(1) hue-rotate(190deg) opacity(.46) grayscale(.7) !important; } 
  @media (min-width: 768px)
  .md\:w-1\/3 { width: 33.333333%; }
  `
  iframe.contentDocument.head.appendChild(cssStyle)

  document.querySelector("html").style.height = '100%'
  document.querySelector("body").style.height = '100%'
  document.querySelector("#__next").style.height = '100%'

}
export { initEditor }
