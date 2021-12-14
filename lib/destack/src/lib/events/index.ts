import { fetchJSON } from '../../utils'

import { standaloneBuilderPort as port } from '../../../server/config'

const handleEvents = (newEditor, standaloneBuilder): void => {
  const baseUrl = standaloneBuilder ? `http://localhost:${port}` : ''
  const saveLocally = (data): Promise<JSON> =>
    fetchJSON({
      method: 'post',
      url: `${baseUrl}/api/builder/handle`,
      data: { path: 'default.json', data },
    })
  newEditor.on('storage:store', (e) => saveLocally(e))
}
export { handleEvents }
