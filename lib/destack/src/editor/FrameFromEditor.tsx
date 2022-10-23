import React, { useEffect } from 'react'

import { Editor, Frame, Element, useEditor } from '@craftjs/core'

import { Viewport } from '../viewport'
import { RenderNode } from './RenderNode'

import Child from '../themes/shared/Child'

import { ContainerSimple } from '../themes/shared/Simple'
import { Container } from '../themes/shared/Container'
import { Text } from '../themes/shared/Text'
import { Link, Image } from '../themes/shared/Child'

import HyperUiComponents from '../themes/hyperui'

import { loadTemplate, saveTemplateDebounce } from '../utils/fetch'

const SimpleComponents = { Container, ContainerSimple, Element, Text, Child, Link, Image }
const resolver = { ...SimpleComponents, ...HyperUiComponents }

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
        <Element canvas is={Container} children={[]} custom={{ displayName: 'App' }} />
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
