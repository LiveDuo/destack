import React, { useEffect, useState } from 'react'

import { Editor, Frame, Element, useEditor } from '@craftjs/core'

import { Viewport } from '../viewport'
import { RenderNode } from './RenderNode'

import { ContainerSimple } from '../themes/shared/Simple'
import { Container } from '../themes/shared/Container'
import Child from '../themes/shared/Child'
import Banner1 from '../themes/hyperui/Banner1'
import Banner2 from '../themes/hyperui/Banner2'
import Banner3 from '../themes/hyperui/Banner3'
import { Text } from '../themes/shared/Text'
import { Link, Image } from '../themes/shared/Child'

import { loadTemplate, saveTemplateDebounce } from '../utils/fetch'

const resolver = {
  Container,
  ContainerSimple,
  Banner1,
  Banner2,
  Banner3,
  Element,
  Text,
  Child,
  Link,
  Image,
}

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
