import React, { useEffect, useContext } from 'react'

import { Editor as CraftEditor, Frame, Element, useEditor, Resolver } from '@craftjs/core'

import Viewport from '../viewport'
import EditorElement from './EditorElement'

import { Container } from '../themes/shared/Container'

import { loadTemplate, saveTemplateDebounce } from '../utils/fetch'
import { loadPoweredBy } from '../utils/powerby'

import { ThemeContext } from '../store'

const FrameEditor = ({ data, standaloneServer }) => {
  const { actions } = useEditor()

  const loadData = async () => {
    if (data) {
      const templateData = data.find(({ name }) => name === location.pathname)
      const content = JSON.parse(templateData.content)
      actions.deserialize(content)

      loadPoweredBy()
    } else {
      const result = await loadTemplate(standaloneServer)
      const content = JSON.parse(result as string)
      actions.deserialize(content) // NOTE: also loads the data in the editor
    }
  }

  useEffect(() => {
    loadData()
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
      onRender={({ render }) => (
        <EditorElement render={render} standaloneServer={standaloneServer} />
      )} //
      onNodesChange={onStateChange}
    >
      <FrameEditor data={data} standaloneServer={standaloneServer} />
    </CraftEditor>
  )
}
export default Editor
