import { fetchJSON } from '../../utils'

const handleEvents = (newEditor): void => {
  const saveLocally = (data): Promise<JSON> =>
    fetchJSON({ method: 'post', url: '/api/builder/handle', data: { path: 'default.json', data } })
  newEditor.on('storage:store', (e) => saveLocally(e))
}
export { handleEvents }
