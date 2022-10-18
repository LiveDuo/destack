import React from 'react'

import { parse } from 'node-html-parser'
import { source } from './source'

import Child, { Component } from '../../shared/Child'

import preview from './preview.png'

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
  displayName: 'Banner 3',
  category: 'CTA',
  image: preview,
  props: {},
  related: {},
}
export default Component2
