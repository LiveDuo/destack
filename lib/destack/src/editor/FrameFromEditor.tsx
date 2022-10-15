import React, { useEffect, useState } from 'react'

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

const FrameFromEditor = ({ data }) => {
  const { actions } = useEditor()

  useEffect(() => {
    if (data) {
      const content = JSON.parse(data[0].content)
      actions.deserialize(content)
    } else {
      loadTemplate(false)
        .then((d) => {
          const content = JSON.parse(d as string)
          actions.deserialize(content) // NOTE: also loads the data in the editor
        })
        .catch((e) => console.error(e))
    }
  }, [])

  return !data ? (
    <Viewport>
      <Frame>
        <Element
          canvas
          is={Container}
          width="100%"
          height="800px"
          background={{ r: 255, g: 255, b: 255, a: 1 }}
          padding={['0', '0', '0', '0']}
          custom={{ displayName: 'App' }}
        />
      </Frame>
    </Viewport>
  ) : (
    <div className="page-container">
      <Frame />
    </div>
  )
}

const RenderFromEditor = ({ data }) => {
  const onStateChange = (e) => {
    saveTemplateDebounce(e)
  }

  return (
    <Editor resolver={resolver} enabled={false} onRender={RenderNode} onNodesChange={onStateChange}>
      <FrameFromEditor data={data} />
    </Editor>
  )
}
export default RenderFromEditor
