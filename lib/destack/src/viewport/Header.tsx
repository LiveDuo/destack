import React from 'react'

import { useEditor } from '@craftjs/core'
import { Tooltip } from '@material-ui/core'

import Checkmark from '@material-ui/icons/Check'
import Customize from '@material-ui/icons/Edit'
import RedoSvg from '@material-ui/icons/Redo'
import UndoSvg from '@material-ui/icons/Undo'
import Export from '@material-ui/icons/CloudDownload'

export const Header = () => {
  const { state, query, actions } = useEditor((state, query) => ({ state, query }))
  const enabled = state.options.enabled

  const onExport = () => {
    console.log(JSON.parse(query.serialize()))
    alert('Export done!')
  }

  const togglePreview = () => {
    actions.setOptions((o) => (o.enabled = !enabled))
  }

  return (
    <div className="transition w-full bg-gray-300">
      <div className="flex px-4 py-2 justify-end">
        {enabled && (
          <div className="flex-1 flex">
            <Tooltip title="Undo" placement="bottom">
              <a
                className={`hover:opacity-50 ${
                  query.history.canUndo() ? 'cursor-pointer' : 'cursor-not-allowed'
                } p-2`}
                onClick={actions.history.undo}
              >
                <UndoSvg />
              </a>
            </Tooltip>
            <Tooltip title="Redo" placement="bottom">
              <a
                className={`hover:opacity-50 ${
                  query.history.canRedo() ? 'cursor-pointer' : 'cursor-not-allowed'
                } p-2`}
                onClick={actions.history.redo}
              >
                <RedoSvg />
              </a>
            </Tooltip>
            <Tooltip title="Export" placement="bottom">
              <a
                className={`hover:opacity-50 ${
                  query ? 'cursor-pointer' : 'cursor-not-allowed'
                } p-2`}
                onClick={onExport}
              >
                <Export />
              </a>
            </Tooltip>
          </div>
        )}
        <div className="flex">
          {enabled ? (
            <a
              className="flex bg-green-600 text-white rounded py-2 px-4 transition cursor-pointer"
              onClick={togglePreview}
            >
              <Checkmark style={{ marginRight: '8px', width: '16px' }} /> Preview
            </a>
          ) : (
            <a
              className="flex bg-primary text-white rounded py-2 px-4 transition cursor-pointer"
              onClick={togglePreview}
            >
              <Customize style={{ marginRight: '8px', width: '16px' }} /> Edit
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
