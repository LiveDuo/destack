import path from 'path'
// import fs from 'fs'

const fs = typeof window === 'undefined' ? require('fs') : null

const development = process.env.NODE_ENV !== 'production'
const rootPath = process.env.ROOT

const folderPath = 'data'

const saveData = async (req, res) => {
  if (!development) return res.status(401).json({ error: 'Not allowed' })
  
  await fs.promises.writeFile(path.join(rootPath, '/', folderPath, req.body.path), JSON.stringify(req.body.data))

  res.status(200).end()
}
export { saveData }