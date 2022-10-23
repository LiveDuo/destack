import React from 'react'

import { parse } from 'node-html-parser'
import { source } from './source'

import Child, { Component } from '../../shared/Child'

import { cleanHTMLElement } from '../../../utils/html'

import preview from './preview.png'

const root = cleanHTMLElement(parse(source))
const Component2 = ({ editable = true }) =>
  editable ? (
    <Component>
      <Child root={root} editable={editable} />
    </Component>
  ) : (
    <Child root={root} editable={editable} />
  )
Component2.craft = {
  displayName: 'Test',
  category: 'Test',
  image: preview,
  props: {},
  related: {},
}
export default Component2
