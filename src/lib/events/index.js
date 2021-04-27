import {fetchJSON} from '../../utils'

const handleEvents = (newEditor) => {
  const saveLocally = (data) => fetchJSON('post', '/api/builder/handle', {path: 'default.json', data})
  newEditor.on('storage:store', (e) => saveLocally(e))
}
export {handleEvents}


