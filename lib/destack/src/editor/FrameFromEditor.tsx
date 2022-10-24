import React, { useEffect, useContext } from 'react'

import { Editor, Frame, Element, useEditor, Resolver } from '@craftjs/core'

import { Viewport } from '../viewport'
import { RenderNode } from './RenderNode'

import { Container } from '../themes/shared/Container'

import { loadTemplate, saveTemplateDebounce } from '../utils/fetch'

import { ThemeContext } from '../store'

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
  const { resolver } = useContext(ThemeContext)

  const onStateChange = (e) => {
    saveTemplateDebounce(e)
  }

  return (
    <Editor
      resolver={resolver as Resolver}
      enabled={false}
      onRender={RenderNode}
      onNodesChange={onStateChange}
    >
      <FrameFromEditor data={data} />
    </Editor>
  )
}
export default RenderFromEditor
