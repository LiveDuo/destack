import React, {useState, Children, cloneElement, isValidElement, useEffect} from 'react'
import {convertToRaw, convertFromRaw, EditorState} from 'draft-js'
import {initEditor} from '../libs'

if (typeof window !== 'undefined') {
  require('grapesjs-preset-webpage')
}
const Editor = (typeof window !== 'undefined') ? require('react-draft-wysiwyg').Editor : null

const fetchJSON = (method, url, data) => fetch(url, {method, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})

const development = process.env.NODE_ENV !== 'production'

const getChildData = (c, data) => data.find(d => d.filename === c)
const getChildInitialData = (c, data) => {
  const childData = getChildData(c, data)
  return childData ? EditorState.createWithContent(convertFromRaw(JSON.parse(childData.content))) : EditorState.createEmpty()
}

const MarkdownProvider = ({data, children}) => {
  useEffect(() => initEditor(), [])

  if (typeof window === 'undefined') return null
  return (
    <div style={{height: '100%', margin: '0 auto'}}>
      <div id="gjs"></div>
    </div>
  )
}
export { MarkdownProvider }

const Block = ({path, initialEditorState}) => {
  const [value, setValue] = useState(initialEditorState)
  const [localEditing, setLocalEditing] = useState(false)
  const showEditing = localEditing && development
  return <div><Editor readOnly={(!showEditing)} toolbarHidden={!showEditing} editorState={value} toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName" editorClassName="editorClassName" onEditorStateChange={(e) => setValue(e)}/>
  <div style={{display: 'flex'}}>
    {development && <button style={{margin: 10, marginLeft: 'auto'}} onClick={() => {
      setLocalEditing(e => !e)
      if (localEditing) {
        fetchJSON('post', '/api/save', {path, data: convertToRaw(value.getCurrentContent())})
      }
    }}>{!localEditing ? 'Edit' : 'Save'}</button>}
    {development && localEditing && <button style={{margin: 10}} onClick={async () => {
      setLocalEditing(e => !e)
      const response = await fetchJSON('get', '/api/load')
      const data = await response.json()
      setValue(getChildInitialData(path, data))
    }}>Cancel</button>}
  </div>
  </div>
}

export { Block }
