import React from 'react'

import { ToolbarTextInput } from './ToolbarTextInput'
import { ToolbarDropdown } from './ToolbarDropdown'

import { useNode } from '@craftjs/core'

export type ToolbarItemProps = {
  prefix?: string
  label?: string
  full?: boolean
  propKey: string
  index: number
  children?: React.ReactNode
  type: string
  onChange?: (value: any) => any
}

export const ToolbarItem = ({
  full = false,
  propKey,
  type,
  onChange,
  index,
  ...props
}: ToolbarItemProps) => {
  const {
    actions: { setProp },
    propValue,
  } = useNode((node) => ({
    propValue: node.data.props[propKey],
  }))
  const value = Array.isArray(propValue) ? propValue[index] : propValue

  return (
    <div style={{ display: 'grid' }}>
      <div className="mb-2">
        {['text', 'color', 'bg', 'number'].includes(type) ? (
          <ToolbarTextInput
            {...props}
            type={type}
            value={value}
            onChange={(value) => {
              setProp((props: any) => {
                if (Array.isArray(propValue)) {
                  props[propKey][index] = onChange ? onChange(value) : value
                } else {
                  props[propKey] = onChange ? onChange(value) : value
                }
              }, 500)
            }}
          />
        ) : type === 'slider' ? (
          <>
            {props.label ? <h4 className="text-sm text-gray-400">{props.label}</h4> : null}
            <div />
          </>
        ) : type === 'radio' ? (
          <>
            {props.label ? <h4 className="text-sm text-gray-400">{props.label}</h4> : null}
            <input
              type="radio"
              value={value || 0}
              onChange={(e) => {
                const value = e.target.value
                setProp((props: any) => {
                  props[propKey] = onChange ? onChange(value) : value
                })
              }}
            >
              {props.children}
            </input>
          </>
        ) : type === 'select' ? (
          <ToolbarDropdown
            value={value || ''}
            onChange={(value) =>
              setProp((props: any) => (props[propKey] = onChange ? onChange(value) : value))
            }
            {...props}
          />
        ) : null}
      </div>
    </div>
  )
}
