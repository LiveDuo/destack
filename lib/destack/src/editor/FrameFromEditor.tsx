import React, { useEffect } from 'react'

import { Editor, Frame, Element, useEditor } from '@craftjs/core'

import { Viewport } from '../viewport'
import { RenderNode } from './RenderNode'

import { ContainerSimple } from '../selectors/ContainerSimple'
import { Container } from '../selectors/Container'
import Child from '../selectors/Child'
import Banner1 from '../selectors/Banner1'
import Banner2 from '../selectors/Banner2'
import { Text } from '../selectors/Text'

import { loadTemplate, saveTemplateDebounce } from '../utils/fetch'

const resolver = { Container, ContainerSimple, Banner1, Banner2, Element, Text, Child }

const FrameFromEditor = () => {
  const { actions } = useEditor()

  useEffect(() => {
    loadTemplate(false)
      .then((d) => {
        const data = JSON.parse(d as string)
        actions.deserialize(data) // NOTE: also loads the data in the editor
      })
      .catch((e) => console.error(e))
  }, [])

  return (
    <Viewport>
      <Frame>
        <div className="bg-white">
          <Element
            canvas
            is={Container}
            width="800px"
            height="800px"
            background={{ r: 255, g: 255, b: 255, a: 1 }}
            padding={['0', '0', '0', '0']}
            custom={{ displayName: 'App' }}
          />
        </div>
      </Frame>
    </Viewport>
  )
}

const RenderFromEditor = () => {
  const onStateChange = (e) => {
    console.log('saving', !!e)
    // saveTemplateDebounce(e)
  }

  return (
    <Editor resolver={resolver} enabled={false} onRender={RenderNode} onNodesChange={onStateChange}>
      <FrameFromEditor />
    </Editor>
  )
}
export default RenderFromEditor
