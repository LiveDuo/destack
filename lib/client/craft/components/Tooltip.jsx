import React from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

const SimpleTooltip = ({ text, children, side, offset }) => (
  <Tooltip.Provider>
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Content side={side} sideOffset={offset} style={{ zIndex: 100000 }}>
        <div className="bg-gray-600 rounded text-white p-2 text-sm">{text}</div>
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
)
export default SimpleTooltip
