export interface dataType {
  content: string
}

export interface StaticBuildProps {
  data?: dataType[]
}

export interface ContentProviderProps extends StaticBuildProps {
  showEditorInProd: boolean
  standaloneServer: boolean
}
