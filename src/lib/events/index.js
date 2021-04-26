import {fetchJSON} from '../../utils'

const handleEvents = (newEditor) => {
  const saveLocally = (data) => fetchJSON('post', '/api/builder/handle', {path: 'hero.json', data})
  newEditor.on('storage:store', (e) => saveLocally(e))
}
export {handleEvents}


