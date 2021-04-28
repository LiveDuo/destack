
const txtConfirm = 'Are you sure you want to clear the editor? This can\'t be undone.'

export const loadPanels = (editor, server) => {

    // Show Style Manager
    editor.on('component:selected', () => {
        const openSmBtn = editor.Panels.getButton('views', 'open-sm')
        const openLayersBtn = editor.Panels.getButton('views', 'open-layers')

        // Don't switch when the Layer Manager is on or there is no selected component
        if ((!openLayersBtn || !openLayersBtn.get('active')) && editor.getSelected()) {
            openSmBtn && openSmBtn.set('active', 1)
        }
    })

    // Connfig Commands
    editor.Commands.add('set-device-desktop', e => e.setDevice('Desktop'))
    editor.Commands.add('set-device-tablet', e => e.setDevice('Tablet'))
    editor.Commands.add('set-device-mobile', e => e.setDevice('Mobile portrait'))
    
    editor.Commands.add('canvas-clear', e => confirm(txtConfirm) && e.runCommand('core:canvas-clear'))

    const devicePanel = editor.Panels.getPanel('commands')
    devicePanel.get('buttons').add([
      { id: 'deviceDesktop', command: 'set-device-desktop', className: 'fa fa-desktop' }, 
      { id: 'deviceTablet', command: 'set-device-tablet', className: 'fa fa-tablet' }, 
      { id: 'deviceMobile', command: 'set-device-mobile', className: 'fa fa-mobile' }])
    
    // Config Buttons
    editor.Panels.removeButton('options','export-template')
    editor.Panels.getButton('options', 'sw-visibility').set('active', false)
    if (!server) editor.Panels.addButton('options', {id: 'export-template', className: 'fa fa-code', command: e => e.runCommand('export-template'), attributes: { title: 'View Code' }})
    editor.Panels.addButton('options', {id: 'undo', className: 'fa fa-undo', command: e => e.runCommand('core:undo'), attributes: { title: 'Undo' }})
    editor.Panels.addButton('options', {id: 'redo', className: 'fa fa-repeat', command: 'core:redo', attributes: { title: 'Redo'}})
    editor.Panels.addButton('options', {id: 'canvas-clear', className: 'fa fa-trash', command: e => e.runCommand('canvas-clear')})
    
    editor.Panels.removeButton('options','fullscreen')
    
}