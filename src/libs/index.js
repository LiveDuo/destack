if (typeof window !== 'undefined') {
  require('grapesjs-preset-webpage')
}

const grapesjs = (typeof window !== 'undefined') ? require('grapesjs') : null

const fetchJSON = (method, url, data) => fetch(url, {method, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})

const serverUrl = 'http://localhost:3000'

const getStaticDataProps = async () => {
  const response = await fetchJSON('GET', serverUrl+'/api/load')
  const data = await response.json()
  return { props: {data} }
}
export { getStaticDataProps }

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

  const blockManager = newEditor.BlockManager;
  blockManager.add('my-map-block', {
    label: 'Simple map block',
    attributes: { class:'fa fa-map-o' },
    content: { type: 'map', style: { height: '350px'}, removable: true }
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
}
export { initEditor }
