import React from 'react'

export const ToolbarDropdown = ({ title, value, onChange, children }: any) => {
  return (
    <div>
      <label>{title}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {children}
      </select>
    </div>
  )
}
