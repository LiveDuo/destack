import { parse } from 'node-html-parser'
import { source } from './source'

import { cleanHTMLElement } from '../../../utils/html'

const root = cleanHTMLElement(parse(source))

const Component = {
  root: root,
  displayName: 'Banner 3',
  category: 'Banners',
}
export default Component
