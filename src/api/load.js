import path from 'path'
// import fs from 'fs'

const fs = typeof window === 'undefined' ? require('fs') : null

const development = process.env.NODE_ENV !== 'production'
const rootPath = process.cwd()
const folderPath = 'data'

const zip = (rows) => rows[0].map((_,c)=>rows.map(row=>row[c]))

const loadData = async (_, res) => {
  if (!development) return res.status(401).json({ error: 'Not allowed' })

  const files = await fs.promises.readdir(path.join(rootPath, '/', folderPath,))
  const filesData = await Promise.all(files.map(f => fs.promises.readFile(path.join(rootPath, '/', folderPath, f))))
  const data = zip([files, filesData]).map(([filename, content]) => ({filename, content: content.toString()}))
  
  res.status(200).json(data)
}
export { loadData }
