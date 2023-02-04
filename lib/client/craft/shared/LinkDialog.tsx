import React, { useState } from 'react'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'

import cx from 'classnames'

const Dialog = ({ open, setOpen, node, actions }) => {
  const props = node.data.props
  const key = props.propId
  const [link, setLink] = useState(node.data.props[key]?.link ?? node.dom?.href)
  const [newTab, setNewTab] = useState(node.data.props[key]?.newTab)

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay>
          <DialogPrimitive.Content
            className={cx(
              'fixed shadow bg-white rounded-lg p-4',
              'w-[95vw] max-w-md md:w-full',
              'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
            )}
          >
            <DialogPrimitive.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Update Link
            </DialogPrimitive.Title>

            <div className="mt-8 mb-4">
              <div>
                <div>
                  <div className="flex justify-center mb-4 flex-col">
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
                      placeholder="Eg. https://github.com/LiveDuo/destack"
                      defaultValue={link as string}
                      onChange={(e) => setLink(e.target.value)}
                    />
                    <div className="flex items-center ml-4">
                      <p>Open in new tab</p>
                      <input
                        defaultChecked={newTab}
                        type="checkbox"
                        onChange={(e) => setNewTab(e.target.checked)}
                        className="ml-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <DialogPrimitive.Close
                onClick={() => {
                  setOpen(false)

                  actions.setProp(node.id, (prop) => {
                    if (!prop[key]) prop[key] = {}
                    prop[key].link = link
                    prop[key].newTab = newTab
                  })
                }}
                className={cx(
                  'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                  'bg-blue-600 text-white hover:bg-blue-700 border border-transparent',
                )}
              >
                Save
              </DialogPrimitive.Close>
            </div>

            <DialogPrimitive.Close
              onClick={() => setOpen(false)}
              className={cx(
                'absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1',
              )}
            >
              <XMarkIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

export default Dialog
