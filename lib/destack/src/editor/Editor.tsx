import React, { useEffect, useContext } from 'react'

import { Editor as CraftEditor, Frame, Element, useEditor, Resolver } from '@craftjs/core'

import Viewport from '../viewport'
import EditorElement from './EditorElement'

import { Container } from '../themes/shared/Container'

import { loadTemplate, saveTemplateDebounce } from '../utils/fetch'

import { ThemeContext } from '../store'

const FrameEditor = ({ data, standaloneServer }) => {
  const { actions } = useEditor()

  useEffect(() => {
    if (data) {
      const content = JSON.parse(data[0].content)
      actions.deserialize(content)
    } else {
      loadTemplate(standaloneServer)
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

const Editor = ({ data, standaloneServer }) => {
  const { resolver, setStandalone } = useContext(ThemeContext)

  useEffect(() => setStandalone(standaloneServer), [])

  const onStateChange = (e) => {
    saveTemplateDebounce(e, standaloneServer)
  }

  return (
    <CraftEditor
      resolver={resolver as Resolver}
      enabled={!data}
      onRender={EditorElement}
      onNodesChange={onStateChange}
    >
      <FrameEditor data={data} standaloneServer={standaloneServer} />
    </CraftEditor>
  )
}
export default Editor
