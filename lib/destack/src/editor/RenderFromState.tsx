import React from 'react'

import Banner1 from '../selectors/Banner1'
import { ContainerSimple } from '../selectors/ContainerSimple'

import json from '../data/default'

const Components = {
  Banner1: Banner1,
  Container: ContainerSimple,
}

const parse = (nodeId: string, parentNodeId?: string) => {
  const childNodeNames: string[] = json[nodeId]?.nodes || []
  const ReactComponent = Components[json[nodeId].type.resolvedName]
  const extendedProps = { ...json[nodeId].props, parentNodeId, nodeId, key: nodeId }

  if (childNodeNames.length === 0) {
    return <ReactComponent {...extendedProps} editable={false} />
  } else {
    const childNodes = childNodeNames.map((childNodeId) => parse(childNodeId, nodeId))
    if (ReactComponent) {
      return (
        <ReactComponent {...extendedProps} editable={false}>
          {childNodes}
        </ReactComponent>
      )
    } else {
      return <div>{childNodes}</div>
    }
  }
}

const RenderFromState = () => parse('ROOT')
export default RenderFromState
