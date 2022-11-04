import { parse } from 'node-html-parser'
import { source } from './source'

import { cleanHTMLElement } from '../../../utils/html'

import preview from './preview.png'

const root = cleanHTMLElement(parse(source))

const WithProps = { craft: {} }
WithProps.craft = {
  root: root,
  displayName: 'Ecommerce 2',
  category: 'Ecommerce',
  image: preview,
  props: {},
  related: {},
}
export default WithProps
