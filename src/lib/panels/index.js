const cmdDeviceDesktop = 'set-device-desktop',
    cmdDeviceTablet = 'set-device-tablet',
    cmdDeviceMobile = 'set-device-mobile'
const osm = 'open-sm',
    ola = 'open-layers'
const cmdClear = 'canvas-clear'

const txtConfirm = 'Are you sure you want to clear the editor? This can\'t be undone.'

export const loadPanels = (editor) => {

    // Config Buttons
    editor.Panels.getButton('options', 'sw-visibility').set('active', false)

    editor.Panels.addButton('options', {id: 'undo', className: 'fa fa-undo', command: 'undo', attributes: { title: 'Undo' }})
    editor.Panels.addButton('options', {id: 'redo', className: 'fa fa-repeat', command: 'redo', attributes: { title: 'Redo'}})
    editor.Panels.addButton('options', {id: cmdClear, className: 'fa fa-trash', command: e => e.runCommand(cmdClear)})

    editor.Panels.removeButton('options','fullscreen')
    editor.Panels.removeButton('options','export-template')

    // Show Style Manager
    editor.on('component:selected', () => {
        const openSmBtn = editor.Panels.getButton('views', osm)
        const openLayersBtn = editor.Panels.getButton('views', ola)

        // Don't switch when the Layer Manager is on or there is no selected component
        if ((!openLayersBtn || !openLayersBtn.get('active')) && editor.getSelected()) {
            openSmBtn && openSmBtn.set('active', 1)
        }
    })

    // Connfig Commands
    editor.Commands.add(cmdDeviceDesktop, e => e.setDevice('Desktop'))
    editor.Commands.add(cmdDeviceTablet, e => e.setDevice('Tablet'))
    editor.Commands.add(cmdDeviceMobile, e => e.setDevice('Mobile portrait'))
    editor.Commands.add(cmdClear, e => confirm(txtConfirm) && e.runCommand('core:canvas-clear'))

    // , active: 1
    const devicePanel = editor.Panels.getPanel('commands')
    devicePanel.get('buttons').add([
      { id: 'deviceDesktop', command: 'set-device-desktop', className: 'fa fa-desktop' }, 
      { id: 'deviceTablet', command: 'set-device-tablet', className: 'fa fa-tablet' }, 
      { id: 'deviceMobile', command: 'set-device-mobile', className: 'fa fa-mobile' }])
    
    // console.log(editor.Panels.getPanels())
        
}