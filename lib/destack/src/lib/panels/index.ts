const txtConfirm = "Are you sure you want to clear the editor? This can't be undone."

const themeList = [
  { name: 'indigo', color: '#6366f1' },
  { name: 'yellow', color: '#f59e0b' },
  { name: 'red', color: '#f56565' },
  { name: 'purple', color: '#9f7aea' },
  { name: 'pink', color: '#ed64a6' },
  { name: 'blue', color: '#4299e1' },
  { name: 'green', color: '#48bb78' },
]

const colorRegex = new RegExp(
  /(bg|text|border|ring)-(red|yellow|green|blue|indigo|purple|green)-(\d\d\d)/,
  'g',
)

const getUpdateThemeModal = (editor) => {
  const md = editor.Modal
  const pfx = editor.getConfig().stylePrefix

  const container = document.createElement('div')

  const containerBody = document.createElement('div')
  containerBody.style.padding = '40px 0px'
  containerBody.style.display = 'flex'
  containerBody.style.justifyContent = 'center'

  let selectedTheme
  themeList.forEach((theme) => {
    const btnColor = document.createElement('button')
    btnColor.className = 'change-theme-button'
    btnColor.style.backgroundColor = theme.color
    btnColor.onclick = () => (selectedTheme = theme)

    containerBody.appendChild(btnColor)
  })

  const containerFooter = document.createElement('div')

  const btnEdit = document.createElement('button')
  btnEdit.innerHTML = 'Update'
  btnEdit.className = pfx + 'btn-prim ' + pfx + 'btn-import'
  btnEdit.style.float = 'right'
  btnEdit.onclick = () => {
    updateThemeColor(editor, selectedTheme.name)
    md.close()
  }

  const btnCancel = document.createElement('button')
  btnCancel.innerHTML = 'Cancel'
  btnCancel.className = pfx + 'btn-prim ' + pfx + 'btn-import'
  btnCancel.style.float = 'right'
  btnCancel.onclick = () => {
    md.close()
  }

  // box-shadow: 0 0 0 2pt #c5c5c575
  containerFooter.appendChild(btnEdit)
  containerFooter.appendChild(btnCancel)

  container.appendChild(containerBody)
  container.appendChild(containerFooter)
  return container
}

const getAllComponents = (model: any, result = [] as any[]) => {
  result.push(model)
  model.components().each((mod) => getAllComponents(mod, result))
  return result
}

const updateThemeColor = (editor, color) => {
  const wrapper = editor.DomComponents.getWrapper()
  const componentsAll = getAllComponents(wrapper, [])
  componentsAll.forEach((c) => {
    const { el } = c.view
    if (typeof el.className?.baseVal === 'string' && el.className?.baseVal.match(colorRegex)) {
      el.className.baseVal = el.className.baseVal.replace(colorRegex, `$1-${color}-$3`)
      c.replaceWith(el.outerHTML)
    } else if (typeof el.className === 'string' && el.className.match(colorRegex)) {
      el.className = el.className.replace(colorRegex, `$1-${color}-$3`)
      c.replaceWith(el.outerHTML)
    }
  })
}

export const loadPanels = (editor, isDev) => {
  // Show Style Manager
  editor.on('component:selected', () => {
    const openSmBtn = editor.Panels.getButton('views', 'open-sm')
    const openLayersBtn = editor.Panels.getButton('views', 'open-layers')

    // Don't switch when the Layer Manager is on or there is no selected component
    if ((!openLayersBtn || !openLayersBtn.get('active')) && editor.getSelected()) {
      openSmBtn && openSmBtn.set('active', 1)
    }
  })

  // Activate Blocks Manager
  editor.on('load', () => {
    const blockBtn = editor.Panels.getButton('views', 'open-blocks')
    blockBtn.set('active', 1)
  })

  // Connfig Commands
  editor.Commands.add('set-device-desktop', (e) => e.setDevice('Desktop'))
  editor.Commands.add('set-device-tablet', (e) => e.setDevice('Tablet'))
  editor.Commands.add('set-device-mobile', (e) => e.setDevice('Mobile portrait'))

  editor.Commands.add(
    'canvas-clear',
    (e) => confirm(txtConfirm) && e.runCommand('core:canvas-clear'),
  )

  const devicePanel = editor.Panels.getPanel('commands')
  devicePanel.get('buttons').add([
    { id: 'deviceDesktop', command: 'set-device-desktop', className: 'fa fa-desktop' },
    { id: 'deviceTablet', command: 'set-device-tablet', className: 'fa fa-tablet' },
    { id: 'deviceMobile', command: 'set-device-mobile', className: 'fa fa-mobile' },
  ])

  // Config Buttons
  editor.Panels.removeButton('options', 'export-template')
  editor.Panels.getButton('options', 'sw-visibility').set('active', false)
  if (!isDev)
    editor.Panels.addButton('options', {
      id: 'export-template',
      className: 'fa fa-code',
      command: (e) => e.runCommand('export-template'),
      attributes: { title: 'View Code' },
    })
  editor.Panels.addButton('options', {
    id: 'undo',
    className: 'fa fa-undo',
    command: (e) => e.runCommand('core:undo'),
    attributes: { title: 'Undo' },
  })
  editor.Panels.addButton('options', {
    id: 'redo',
    className: 'fa fa-repeat',
    command: 'core:redo',
    attributes: { title: 'Redo' },
  })
  editor.Panels.addButton('options', {
    id: 'update-theme',
    className: 'fa fa-wrench',
    command: 'open-update-theme',
    attributes: {
      title: 'About',
      'data-tooltip-pos': 'bottom',
    },
  })
  editor.Panels.addButton('options', {
    id: 'canvas-clear',
    className: 'fa fa-trash',
    command: (e) => e.runCommand('canvas-clear'),
  })

  editor.Panels.removeButton('options', 'fullscreen')

  // Add info command
  editor.Commands.add('open-update-theme', {
    run(_, sender) {
      sender.set('active', 0)
      const md = editor.Modal
      md.setTitle('Change Theme')
      const container = getUpdateThemeModal(editor)
      md.setContent(container)
      md.open()
    },
  })
}
