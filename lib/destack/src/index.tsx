import { Editor, Frame, Element } from '@craftjs/core'
import { createTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import React from 'react'

import { Viewport } from './viewport'
import { RenderNode } from './editor/RenderNode'
import { Container } from './selectors/Container'
import { ContainerSimple } from './selectors/ContainerSimple'
import Child from './selectors/Child'
import Banner1 from './selectors/Banner1'
import Banner2 from './selectors/Banner2'
import { Text } from './selectors/Text'

import './styles/app.css'

const theme = createTheme({
  typography: {
    fontFamily: ['acumin-pro', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
})

const resolver = { Container, ContainerSimple, Banner1, Banner2, Element, Text, Child }

function ContentProvider() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}
export { ContentProvider }
