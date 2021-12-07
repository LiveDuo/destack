export interface dataType {
  filename: string
  content: string
}

export interface ContentProviderProps {
  data: dataType[]
  showEditorInProd: boolean
}
