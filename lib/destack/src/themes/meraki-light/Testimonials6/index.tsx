import React from 'react'

import { parse } from 'node-html-parser'
import { source } from './source'

import { Component } from '../../shared/Child'

import { cleanHTMLElement } from '../../../utils/html'

import preview from './preview.png'

const root = cleanHTMLElement(parse(source))

const WithProps = ({ editable = true }) => <Component root={root} editable={editable} />
WithProps.craft = {
  displayName: 'Testimonial 6',
  category: 'Testimonials',
  image: preview,
  props: {},
  related: {},
}
export default WithProps
