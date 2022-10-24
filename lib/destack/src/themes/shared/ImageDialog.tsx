import React, { useState } from 'react'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XMarkIcon } from '@heroicons/react/24/outline'

import cx from 'classnames'

import { uploadFile } from '../../utils/fetch'

const Content = ({ url, text, setText, onUpload, onChange }) => {
  return (
    <div className="mt-4 mb-4">
      {!url ? (
        <div>
          <div className="flex justify-center mt-8 mb-4">
            <button
              className={
                'rounded-md px-4 py-2 text-sm font-medium bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-700 hover:text-white border border-transparent'
              }
              onClick={() => {
                const input = document.createElement('input')
                input.type = 'file'
                input.onchange = onUpload
                input.click()
              }}
            >
              Upload
            </button>
          </div>
          <div className="flex justify-center mb-4">OR</div>
          <div className="flex justify-center mb-4">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Eg. https://www.w3schools.com/html/pic_trulli.jpg"
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={() => onChange()}
              className={cx(
                'rounded-md px-4 py-2 text-sm font-medium bg-transparent border',
                'text-blue-500 hover:opacity-50 border border-transparent',
                `${text !== '' ? 'hover:opacity-50' : 'opacity-50 cursor-not-allowed'}`,
              )}
              disabled={text === ''}
            >
              Set
            </button>
          </div>
        </div>
      ) : (
        <img src={url} />
      )}
    </div>
  )
}

const Dialog = ({ currentUrl, open, setOpen, actions }) => {
  const [url, setUrl] = useState<string | null>(currentUrl)
  const [text, setText] = useState<string | null>('')

  const onUpload = async (e) => {
    const file = e?.path[0].files[0]
    const response = await uploadFile(file, false)
    setUrl(response[0])
  }

  const onChange = async () => {
    setUrl(text)
  }

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
              Upload Image
            </DialogPrimitive.Title>

            <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
              <Content
                url={url}
                text={text}
                setText={setText}
                onUpload={onUpload}
                onChange={onChange}
              />
            </DialogPrimitive.Description>

            <div className="mt-4 flex justify-end">
              <button
                style={{ marginRight: 'auto' }}
                className={cx(
                  'rounded-md px-4 py-2 text-sm font-medium bg-transparent border',
                  'text-blue-500 hover:opacity-50 border border-transparent',
                )}
                onClick={() => {
                  setUrl(null)
                  setText('')
                }}
              >
                Replace
              </button>

              <DialogPrimitive.Close
                onClick={() => {
                  setOpen(false)
                  actions.setProp((prop) => (prop.url = url), 500)
                }}
                className={cx(
                  'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                  `bg-blue-600 text-white border border-transparent ${
                    url ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'
                  }`,
                )}
                disabled={!url}
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
