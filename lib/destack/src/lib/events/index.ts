import { fetchJSON } from '../../utils'

const handleEvents = (newEditor): void => {
  // FIX for react: url = http://localhost:3000/api/builder/handle
  const saveLocally = (data): Promise<JSON> =>
    fetchJSON({ method: 'post', url: '/api/builder/handle', data: { path: 'default.json', data } })
  newEditor.on('storage:store', (e) => saveLocally(e))
}
export { handleEvents }
