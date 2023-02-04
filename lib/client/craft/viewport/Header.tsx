import React, { useContext, useState } from 'react'

import { useEditor } from '@craftjs/core'

import SimpleTooltip from '../components/Tooltip'

import CheckIcon from '@heroicons/react/24/outline/CheckIcon'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import ArrowUturnLeftIcon from '@heroicons/react/24/outline/ArrowUturnLeftIcon'
import ArrowUturnRightIcon from '@heroicons/react/24/outline/ArrowUturnRightIcon'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'

import { ThemeContext } from '../store'

import Select from '../components/Select'

export const Header = () => {
  const { state, query, actions } = useEditor((state, query) => ({ state, query }))
  const { updateIndex, themeNames, themeIndex } = useContext(ThemeContext)
  const [selectOpen, setSelectOpen] = useState(false)

  const enabled = state.options.enabled

  const onExport = () => {
    console.log(query.serialize())
    alert('Export done!')
  }

  const onChange = (name) => {
    updateIndex(themeNames.indexOf(name))
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

            <div className="mr-auto ml-auto">
              <div
                className="flex rounded py-2 px-4 transition cursor-pointer items-center justify-center mr-auto ml-auto"
                onClick={() => setSelectOpen(true)}
              >
                {themeNames[themeIndex]}
                <ChevronDownIcon className="h-4 w-4 ml-2" />
              </div>
              <Select
                defaultValue={themeNames[themeIndex]}
                values={themeNames}
                open={selectOpen}
                setOpen={setSelectOpen}
                onChange={onChange}
              />
            </div>
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
