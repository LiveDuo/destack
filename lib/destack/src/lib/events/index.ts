import { fetchJSON } from '../../utils'

import { standaloneServerPort as port } from '../../../server/config'

const handleEvents = (newEditor, standaloneServer): void => {
  const baseUrl = standaloneServer ? `http://localhost:${port}` : ''
  const path =
    window.location.pathname === '/' || window.location.pathname === ''
      ? 'default.json'
      : `${window.location.pathname}.json`
  const saveLocally = (data): Promise<JSON> =>
    fetchJSON({
      method: 'post',
      url: `${baseUrl}/api/builder/handle`,
      data: { path, data },
    })
  newEditor.on('storage:store', (e) => saveLocally(e))
}
export { handleEvents }
