const development = process.env.NODE_ENV !== 'production'

const rootPath = process.cwd()
const folderPath = 'data'

const zip = (rows) => rows[0].map((_,c)=>rows.map(row=>row[c]))

const loadData = async (path, fs, rootPath, folderPath) => {
  const files = await fs.promises.readdir(path.join(rootPath, '/', folderPath,))
  const filesData = await Promise.all(files.map(f => fs.promises.readFile(path.join(rootPath, '/', folderPath, f))))
  const data = zip([files, filesData]).map(([filename, content]) => ({filename, content: content.toString()}))
  return data
}
export { loadData }

const updateData = async (path, fs, rootPath, folderPath, body) => {
  await fs.promises.writeFile(path.join(rootPath, '/', folderPath, body.path), JSON.stringify(body.data))
}
export { updateData }

const handleData = async (req, res, [fs, path]) => {
  if (!development) return res.status(401).json({ error: 'Not allowed' })
  
  if (req.method === 'GET') {
    const data = await loadData(path, fs, rootPath, folderPath)
    return res.status(200).json(data)
  } else if (req.method === 'POST') {
    await updateData(path, fs, rootPath, folderPath, req.body)
    return res.status(200).end()
  } else {
    return res.status(401).json({ error: 'Not allowed' })
  }
}
export { handleData }
