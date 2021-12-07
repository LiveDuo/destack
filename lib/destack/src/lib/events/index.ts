import { fetchJSON } from '../../utils'

const handleEvents = (newEditor): void => {
  const path =
    window.location.pathname === '/' ? 'default.json' : `${window.location.pathname}.json`
  const saveLocally = (data): Promise<JSON> =>
    fetchJSON({ method: 'post', url: '/api/builder/handle', data: { path, data } })
  newEditor.on('storage:store', (e) => saveLocally(e))
}
export { handleEvents }
