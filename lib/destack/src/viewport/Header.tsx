import React from 'react'

import { useEditor } from '@craftjs/core'

import SimpleTooltip from '../components/Tooltip'

import { CheckIcon } from '@heroicons/react/24/outline'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import { ArrowUturnRightIcon } from '@heroicons/react/24/outline'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'

export const Header = () => {
  const { state, query, actions } = useEditor((state, query) => ({ state, query }))
  const enabled = state.options.enabled

  const onExport = () => {
    console.log(query.serialize())
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
            <SimpleTooltip text="Undo" side="bottom" offset={4}>
              <a
                className={` ${
                  query.history.canUndo()
                    ? 'hover:opacity-50 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                } p-2`}
                onClick={actions.history.undo}
              >
                <ArrowUturnLeftIcon className="h-4 w-4" />
              </a>
            </SimpleTooltip>
            <SimpleTooltip text="Redo" side="bottom" offset={4}>
              <a
                className={` ${
                  query.history.canRedo()
                    ? 'hover:opacity-50 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                } p-2`}
                onClick={actions.history.redo}
              >
                <ArrowUturnRightIcon className="h-4 w-4" />
              </a>
            </SimpleTooltip>
            {/* <SimpleTooltip text="Export" side="bottom" offset={4}>
              <a
                className={`hover:opacity-50 ${
                  query ? 'cursor-pointer' : 'cursor-not-allowed'
                } p-2`}
                onClick={onExport}
              >
                <ArrowUpTrayIcon className="h-4 w-4" />
              </a>
            </SimpleTooltip> */}
          </div>
        )}
        <div className="flex">
          {enabled ? (
            <a
              className="flex bg-green-600 text-white rounded py-2 px-4 transition cursor-pointer items-center"
              onClick={togglePreview}
            >
              <CheckIcon className="h-4 w-4 mr-2" /> Preview
            </a>
          ) : (
            <a
              className="flex bg-primary text-white rounded py-2 px-4 transition cursor-pointer items-center"
              onClick={togglePreview}
            >
              <PencilSquareIcon className="h-4 w-4 mr-2" /> Edit
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
