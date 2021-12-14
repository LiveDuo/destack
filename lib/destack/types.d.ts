export interface dataType {
  filename: string
  content: string
}

export interface StaticBuildProps {
  html: string | undefined
  css: string | undefined
}

export interface ContentProviderProps extends StaticBuildProps {
  showEditorInProd: boolean
  standaloneBuilder: boolean
}
