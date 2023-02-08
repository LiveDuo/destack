interface AttrsProps {
  class?: String
}

interface RootProps {
  childNodes: RootProps[]
  attrs: AttrsProps
  tagName: string
  classNames: string
  nodeType: number
  innerText: string
  constructor: any
}
export { RootProps }

interface dataType {
  content: string
  name?: string
}
export { dataType }

interface StaticBuildProps {
  data?: dataType[]
}

interface ContentProviderProps extends StaticBuildProps {
  showEditorInProd: boolean
  standaloneServer: boolean
}
export { ContentProviderProps }
