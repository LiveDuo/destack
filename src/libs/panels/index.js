const cmdDeviceDesktop = 'set-device-desktop',
    cmdDeviceTablet = 'set-device-tablet',
    cmdDeviceMobile = 'set-device-mobile'

export const loadPanels = (editor) => {
    // Add devices buttons
    const pn = editor.Panels
    const panelDevices = pn.addPanel({id: 'devices-c'})
    panelDevices.get('buttons').add([{id: cmdDeviceDesktop, command: cmdDeviceDesktop, className: 'fa fa-desktop', active: 1},
        {id: cmdDeviceTablet, command: cmdDeviceTablet, className: 'fa fa-tablet'},
        {id: cmdDeviceMobile, command: cmdDeviceMobile, className: 'fa fa-mobile'}])

    const txtConfirm = 'Are you sure you want to clear the editor? This can\'t be undone.'
    const cmdClear = 'canvas-clear'

    const cm = editor.Commands
    cm.add(cmdDeviceDesktop, e => e.setDevice('Desktop'))
    cm.add(cmdDeviceTablet, e => e.setDevice('Tablet'))
    cm.add(cmdDeviceMobile, e => e.setDevice('Mobile portrait'))
    cm.add(cmdClear, e => confirm(txtConfirm) && e.runCommand('core:canvas-clear'))

    editor.Panels.getButton('options', 'sw-visibility').set('active', false)

    editor.Panels.addButton('options', {id: 'undo', className: 'fa fa-undo', command: 'undo', attributes: { title: 'Undo' }})
    editor.Panels.addButton('options', {id: 'redo', className: 'fa fa-repeat', command: 'redo', attributes: { title: 'Redo'}})
    editor.Panels.addButton('options', {id: cmdClear, className: 'fa fa-trash', command: e => e.runCommand(cmdClear)})

    editor.Panels.removeButton('options','fullscreen')
    editor.Panels.removeButton('options','export-template')
    
    editor.getConfig().showDevices = 0
    editor.Panels.addPanel({ id: 'devices-c' }).get('buttons').add([
        { id: cmdDeviceDesktop, command: (e) => { return e.setDevice('Desktop') }, className: 'fa fa-desktop', active: 1},
        { id: cmdDeviceTablet, command: (e) => { return e.setDevice('Tablet') }, className: 'fa fa-tablet' },
        { id: cmdDeviceMobile, command: (e) => { return e.setDevice('Mobile portrait') }, className: 'fa fa-mobile' },
    ])
    // editor.Panels.render() // problem with traits panel
}