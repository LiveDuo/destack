import { parse } from 'node-html-parser'
import { source } from './source'

import Child, { Component, ToolbarComponent } from '../Child'
import React from 'react'

const root = parse(source)
const Component2 = ({ editable = true }) =>
  editable ? (
    <Component>
      <Child root={root} editable={editable} />
    </Component>
  ) : (
    <Child root={root} editable={editable} />
  )
Component2.craft = {
  displayName: 'Banner 2',
  props: {},
  related: { toolbar: () => <ToolbarComponent title="Banner 2" /> },
}
export default Component2
