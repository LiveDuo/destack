import React from 'react'

import { Editor, Frame, Element } from '@craftjs/core'

import { Viewport } from './viewport'
import { RenderNode } from './editor/RenderNode'

import { ContainerSimple } from './selectors/ContainerSimple'
import { Container } from './selectors/Container'
import Child from './selectors/Child'
import Banner1 from './selectors/Banner1'
import Banner2 from './selectors/Banner2'
import { Text } from './selectors/Text'

import './styles/app.css'

const resolver = { Container, ContainerSimple, Banner1, Banner2, Element, Text, Child }

function ContentProvider() {
  return (
    <div className="h-full h-screen">
      <Editor resolver={resolver} enabled={false} onRender={RenderNode}>
        <Viewport>
          <Frame>
            <Element
              canvas
              is={Container}
              width="800px"
              height="800px"
              background={{ r: 255, g: 255, b: 255, a: 1 }}
              padding={['0', '0', '0', '0']}
              custom={{ displayName: 'App' }}
            ></Element>
          </Frame>
        </Viewport>
      </Editor>
    </div>
  )
}
export { ContentProvider }
