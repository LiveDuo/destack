import React from 'react'

export const ToolbarSection = ({ title, props, summary, children }: any) => {
  return (
    <div>
      <div>
        <div className="px-6 w-full">
          <div style={{ display: 'grid' }}>
            <div style={{ display: 'grid' }}>
              <h5 className="text-sm text-gray-600 text-left font-medium text-dark-gray">
                {title}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: '0px 24px 20px' }}>
        <div />
        <div style={{ display: 'grid' }}>{children}</div>
      </div>
    </div>
  )
}
