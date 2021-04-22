const development = process.env.NODE_ENV !== 'production'

const rootPath = process.cwd()
const folderPath = 'data'

const zip = (rows) => rows[0].map((_,c)=>rows.map(row=>row[c]))

const handleData = async (req, res, node) => {
  if (!development) return res.status(401).json({ error: 'Not allowed' })
  
  const {fs, path} = node
  if (req.method === 'GET') {
    const files = await fs.promises.readdir(path.join(rootPath, '/', folderPath,))
    const filesData = await Promise.all(files.map(f => fs.promises.readFile(path.join(rootPath, '/', folderPath, f))))
    const data = zip([files, filesData]).map(([filename, content]) => ({filename, content: content.toString()}))
    
    return res.status(200).json(data)
  } else if (req.method === 'POST') {
    await fs.promises.writeFile(path.join(rootPath, '/', folderPath, req.body.path), JSON.stringify(req.body.data))

    return res.status(200).end()
  } else {
    return res.status(401).json({ error: 'Not allowed' })
  }
}
export { handleData }
