// Grapesjs implementation
// import 'regenerator-runtime/runtime'

// export { ContentProvider } from './components/index'
// export { ContentProviderReact } from './components/react'

import { Editor, Frame, Element } from '@craftjs/core'
import { createTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import React from 'react'

import { Viewport, RenderNode } from '../components/editor'
import { Container } from '../components/selectors'
import { ContainerSimple } from '../components/selectors'
import Child from '../components/selectors/Child'
import { Video } from '../components/selectors/Video'
import Banner1 from '../components/selectors/Banner1'
import Banner2 from '../components/selectors/Banner2'
import { Text } from '../components/selectors/Text'

const theme = createTheme({
  typography: {
    fontFamily: ['acumin-pro', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
})

const resolver = { Container, ContainerSimple, Banner1, Banner2, Element, Video, Text, Child }

function ContentProvider() {
  return (
    <ThemeProvider theme={theme}>
      <div className="h-full h-screen">
        <link rel="stylesheet" href={'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css'} />
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
