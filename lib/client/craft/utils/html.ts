const cleanHTMLElement = (root) => {
  return {
    childNodes: root.childNodes.map(cleanHTMLElement),
    attrs: root.attrs,
    tagName: root.tagName,
    classNames: root?.classNames?.join(' ') ?? '',
    nodeType: root.nodeType,
    innerText: root.innerText,
    constructor: root.constructor.name,
  }
}

export { cleanHTMLElement }
