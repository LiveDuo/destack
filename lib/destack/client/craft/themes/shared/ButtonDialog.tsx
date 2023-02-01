import React, { useState } from 'react'

import * as DialogPrimitive from '@radix-ui/react-dialog'

import Select from '../../components/Select'

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'

import cx from 'classnames'

import { capitalize } from '../../utils/text'

const options = ['url', 'email', 'submit']
const methods = ['GET', 'POST']

const Dialog = ({ open, setOpen, node, actions }) => {
  const [openSelect, setOpenSelect] = useState(false)

  const props = node.data.props
  const key = props.propId
  // console.log('id', key)

  const [url, setUrl] = useState(props.url)
  const [email, setEmail] = useState(props.email)
  const [submitUrl, setSubmitUrl] = useState(props.submitUrl)
  const [submitMethod, setSubmitMethod] = useState(props.submitMethod ?? 'GET')
  const [submitAsync, setSubmitAsync] = useState(props.submitAsync)
  const [methodSelect, setMethodSelect] = useState(props.methodSelect)
  const [newTab, setNewTab] = useState(props.newTab)
  const [type, setType] = useState(props.type ?? 'url')

  const onChange = (e) => {
    setType(e.toLowerCase())
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
              Update Button
            </DialogPrimitive.Title>

            <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
              <div className="mt-4 mb-4">
                <div>
                  <div
                    className="flex rounded py-2 px-4 transition cursor-pointer items-center ml-2 mb-4"
                    onClick={() => setOpenSelect(true)}
                  >
                    {capitalize(type)} <ChevronDownIcon className="h-4 w-4 ml-2" />
                  </div>
                  <Select
                    defaultValue={type}
                    values={options.map((o) => capitalize(o))}
                    open={openSelect}
                    setOpen={setOpenSelect}
                    onChange={onChange}
                  />

                  <div>
                    {/* Url */}
                    {type === 'url' && (
                      <div className="flex justify-center mb-4 flex-col">
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
                          placeholder="Eg. https://github.com/LiveDuo/destack"
                          defaultValue={url as string}
                          onChange={(e) => setUrl(e.target.value)}
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
                    )}
                    {/* Email */}
                    {type === 'email' && (
                      <div className="flex justify-center mb-4">
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                          placeholder="Eg. matt@mullenweg.com"
                          defaultValue={email as string}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    )}
                    {/* Submit */}
                    {type === 'submit' && (
                      <div className="flex justify-center mb-4 flex-col">
                        <div className="flex justify-end mb-4">
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Eg. /api/submit"
                            defaultValue={submitUrl as string}
                            onChange={(e) => setSubmitUrl(e.target.value)}
                          />
                          <div
                            className="flex rounded py-2 px-4 transition cursor-pointer items-center ml-2"
                            onClick={() => setMethodSelect(true)}
                          >
                            {submitMethod} <ChevronDownIcon className="h-4 w-4 ml-2" />
                          </div>
                          <Select
                            defaultValue={submitMethod}
                            values={methods}
                            open={methodSelect}
                            setOpen={setMethodSelect}
                            onChange={(e) => setSubmitMethod(e)}
                          />
                        </div>
                        <div className="flex items-center ml-4">
                          <p>Async</p>
                          <input
                            defaultChecked={submitAsync}
                            type="checkbox"
                            onChange={(e) => setSubmitAsync(e.target.checked)}
                            className="ml-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </DialogPrimitive.Description>

            <div className="mt-4 flex justify-end">
              <DialogPrimitive.Close
                onClick={() => {
                  setOpen(false)

                  actions.setProp(node.id, (prop) => {
                    if (!prop[key]) prop[key] = {}
                    prop[key].type = type.toLowerCase()
                    prop[key].url = url
                    prop[key].email = email
                    prop[key].newTab = newTab
                    prop[key].submitUrl = submitUrl
                    prop[key].submitMethod = submitMethod
                    prop[key].submitAsync = submitAsync
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
