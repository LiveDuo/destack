import {fetchJSON} from '../../utils'

const handleEditorEvents = (newEditor) => {
  const saveLocally = (data) => fetchJSON('post', '/api/builder/handle', {path: 'hero.json', data})
  newEditor.on('storage:store', (e) => saveLocally(e))
}
export {handleEditorEvents}


