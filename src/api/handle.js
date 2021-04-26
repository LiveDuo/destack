const development = process.env.NODE_ENV !== 'production'

const rootPath = process.cwd()
const folderPath = 'data'

const zip = (rows) => rows[0].map((_,c)=>rows.map(row=>row[c]))
const exists = (fs, s) => new Promise(r => fs.access(s, fs.F_OK, e => r(!e)))

const loadData = async (path, fs) => {
  const basePath = path.join(rootPath, '/', folderPath)
  const folderExists = await exists(fs, basePath)
  if (!folderExists) return []

  const files = await fs.promises.readdir(basePath)
  const filesData = await Promise.all(files.map(f => fs.promises.readFile(path.join(basePath, f))))
  const data = zip([files, filesData]).map(([filename, content]) => ({filename, content: content.toString()}))
  return data
}
export { loadData }

const updateData = async (path, fs, body) => {
  const basePath = path.join(rootPath, '/', folderPath)
  const fileExists = await exists(fs, path.join(basePath, '/', body.path))
  
  if (!fileExists) {
    const folderExists = await exists(fs, basePath)
    if (!folderExists) {
      await fs.promises.mkdir(basePath, { recursive: true })
    }
    await fs.promises.writeFile(path.join(basePath, '/', body.path), '{}')
  }

  await fs.promises.writeFile(path.join(basePath, body.path), JSON.stringify(body.data))
}
export { updateData }

const handleData = async (req, res, [fs, path]) => {
  if (!development) return res.status(401).json({ error: 'Not allowed' })
  
  if (req.method === 'GET') {
    const data = await loadData(path, fs)
    return res.status(200).json(data)
  } else if (req.method === 'POST') {
    await updateData(path, fs, req.body)
    return res.status(200).json({})
  } else {
    return res.status(401).json({ error: 'Not allowed' })
  }
}
export { handleData }
