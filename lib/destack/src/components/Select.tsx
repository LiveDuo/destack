import React from 'react'

import * as SelectPrimitive from '@radix-ui/react-select'

import CheckIcon from '@heroicons/react/24/outline/CheckIcon'

import cx from 'classnames'

const Select = ({ defaultValue, values, open, setOpen, onChange }) => {
  return (
    <SelectPrimitive.Root
      defaultValue={defaultValue}
      onValueChange={onChange}
      open={open}
      onOpenChange={(e) => setOpen(e)}
    >
      <SelectPrimitive.Content className="z-50 top-2">
        <SelectPrimitive.Viewport className="bg-white p-2 rounded-lg shadow-lg">
          <SelectPrimitive.Group>
            {values.map((f, i) => (
              <SelectPrimitive.Item
                key={i}
                value={f}
                className={cx(
                  'relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 font-medium',
                  'hover:opacity-70 cursor-pointer select-none',
                )}
              >
                <SelectPrimitive.ItemText>{f}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  )
}

export default Select
