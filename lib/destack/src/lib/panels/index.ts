const txtConfirm = "Are you sure you want to clear the editor? This can't be undone."

const colorList = [
  { name: 'indigo', color: '#6366f1' },
  { name: 'yellow', color: '#f59e0b' },
  { name: 'red', color: '#f56565' },
  { name: 'purple', color: '#9f7aea' },
  { name: 'pink', color: '#ed64a6' },
  { name: 'blue', color: '#4299e1' },
  { name: 'green', color: '#48bb78' },
]

import hyperuiLogo from '../../images/hyperui.png'
import merakiLogo from '../../images/meraki.png'
import tailblocksLogo from '../../images/tailblocks.png'

import { loadMerakiUiLightBlocks } from '../../lib/blocks/merakiui-light'
import { loadTailwindBlocks } from '../../lib/blocks/tailblocks'
import { loadHyperUiBlocks } from '../../lib/blocks/hyperui'

const themeList = [
  { name: 'Tailblocks', url: tailblocksLogo, load: loadTailwindBlocks },
  { name: 'Hyper UI', url: hyperuiLogo, load: loadHyperUiBlocks },
  { name: 'Meraki UI', url: merakiLogo, load: loadMerakiUiLightBlocks },
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
    const container = document.createElement('div')
    container.style.display = 'flex'
    container.style.flexDirection = 'column'
    container.style.alignItems = 'center'
    container.style.margin = '10px'
    container.style.padding = '10px'

    container.onmouseover = () => {
      container.style.opacity = '0.7'
      container.style.cursor = 'pointer'
    }
    container.onmouseout = () => (container.style.opacity = '1')

    const themeImage = document.createElement('img') as HTMLImageElement
    themeImage.style.width = '120px'
    themeImage.style.height = '120px'
    themeImage.style.marginBottom = '20px'

    themeImage.src = theme.url

    container.onclick = () => {
      selectedTheme = theme

      container.parentElement?.childNodes.forEach((e) => {
        ;(e as HTMLElement).style.outlineStyle = 'none'
      })

      container.style.outlineStyle = 'solid'
      container.style.outlineColor = '#6366f1'
      container.style.outlineWidth = '3px'
    }

    container.appendChild(themeImage)
    container.innerHTML += theme.name

    containerBody.appendChild(container)
  })

  const containerFooter = document.createElement('div')

  const btnEdit = document.createElement('button')
  btnEdit.innerHTML = 'Update'
  btnEdit.className = pfx + 'btn-prim ' + pfx + 'btn-import'
  btnEdit.style.float = 'right'
  btnEdit.onclick = () => {
    updateTheme(editor, selectedTheme?.load)
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

const getUpdateColorModal = (editor) => {
  const md = editor.Modal
  const pfx = editor.getConfig().stylePrefix

  const container = document.createElement('div')

  const containerBody = document.createElement('div')
  containerBody.style.padding = '40px 0px'
  containerBody.style.display = 'flex'
  containerBody.style.justifyContent = 'center'

  let selectedColor
  colorList.forEach((data) => {
    const btnColor = document.createElement('button')
    btnColor.style.width = '40px'
    btnColor.style.height = '40px'
    btnColor.style.borderRadius = '50%'
    btnColor.style.margin = '5px'

    btnColor.onmouseover = () => {
      btnColor.style.opacity = '0.7'
      btnColor.style.cursor = 'pointer'
    }
    btnColor.onmouseout = () => (btnColor.style.opacity = '1')

    // padding: 0;
    // border: none;
    btnColor.style.border = 'none'

    btnColor.style.backgroundColor = data.color
    btnColor.onclick = () => {
      selectedColor = data

      btnColor.parentElement?.childNodes.forEach((e) => {
        ;(e as HTMLElement).style.outlineStyle = 'none'
      })

      btnColor.style.outlineStyle = 'solid'
      btnColor.style.outlineColor = '#6366f1'
      btnColor.style.outlineWidth = '3px'
    }

    containerBody.appendChild(btnColor)
  })

  const containerFooter = document.createElement('div')

  const btnEdit = document.createElement('button')
  btnEdit.innerHTML = 'Update'
  btnEdit.className = pfx + 'btn-prim ' + pfx + 'btn-import'
  btnEdit.style.float = 'right'
  btnEdit.onclick = () => {
    updateColor(editor, selectedColor.name)
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

const updateColor = (editor, color) => {
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

const updateTheme = (editor, loadTheme) => {
  if (!loadTheme) return

  // NOTE: just calling getAll once do not work
  let models = editor.BlockManager.getAll().models
  while (models.length > 0) {
    models = editor.BlockManager.getAll().models
    models.forEach((element) => editor.BlockManager.remove(element.id))
  }
  editor.BlockManager.render()

  loadTheme(editor)
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
    id: 'update-color',
    className: 'fa fa-photo',
    command: 'open-update-color',
    attributes: {
      title: 'Color',
      'data-tooltip-pos': 'bottom',
    },
  })
  editor.Panels.addButton('options', {
    id: 'update-theme',
    className: 'fa fa-object-group',
    command: 'open-update-theme',
    attributes: {
      title: 'Theme',
      'data-tooltip-pos': 'bottom',
    },
  })
  editor.Panels.addButton('options', {
    id: 'canvas-clear',
    className: 'fa fa-trash',
    command: (e) => e.runCommand('canvas-clear'),
  })

  editor.Panels.removeButton('options', 'fullscreen')

  // Add color command
  editor.Commands.add('open-update-color', {
    run(_, sender) {
      sender.set('active', 0)
      const md = editor.Modal
      md.setTitle('Change Color')
      const container = getUpdateColorModal(editor)
      md.setContent(container)
      md.open()
    },
  })

  // Add theme command
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
