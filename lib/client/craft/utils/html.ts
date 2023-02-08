import { RootProps } from '../../../types'

const cleanHTMLClasses = (classNames: any) => {
  if (typeof classNames === 'string' || classNames instanceof String) return classNames
  else if (Array.isArray(classNames) || classNames instanceof Array) return classNames.join(' ')
  else return ''
}

const cleanHTMLElement = (root: RootProps): RootProps => {
  const classNames = cleanHTMLClasses(root?.classNames)
  return {
    childNodes: root.childNodes.map(cleanHTMLElement),
    attrs: root.attrs,
    tagName: root.tagName,
    classNames: classNames as string,
    nodeType: root.nodeType,
    innerText: root.innerText,
    constructor: root.constructor.name,
  }
}

export { cleanHTMLElement }
