/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { dataType } from '../../types'
import { formParse, getJson, zip, exists, readdirRecursive } from '../utils'
import fs from 'fs'
import path from 'path'
import { IncomingForm } from 'formidable'
import { NextApiResponse, NextApiRequest } from 'next'

const development = process.env.NODE_ENV !== 'production'

const rootPath = process.cwd()

const folderPath = 'data'
const publicPath = 'public'
const uploadPath = 'uploaded'

import formidable from 'formidable'

const uploadFiles = async (req: NextApiRequest): Promise<string[]> => {
  const form = new IncomingForm({ uploadDir: uploadPath, keepExtensions: true })

  const uploadFolder = path.join(publicPath, uploadPath)
  const uploadFolderExists = await exists(uploadFolder)
  if (!uploadFolderExists) {
    await fs.promises.mkdir(uploadFolder)
  }

  form.on('fileBegin', (_, file) => (file.path = path.join(publicPath, uploadPath, file.name!)))
  const files = await formParse(form, req)

  const urls = Object.values(files).map((f) =>
    path.join('/', uploadPath, (<formidable.File>f).name),
  )
  return urls
}
export { uploadFiles }

const loadData = async (pathName: string): Promise<dataType[]> => {
  const basePath = path.join(rootPath, '/', folderPath)
  const folderExists = await exists(basePath)
  if (!folderExists) return []
  const files = readdirRecursive(basePath) as string[]

  const filesFilter = files.filter((f) => f.replace(basePath, '') === `${pathName}.json`)

  const filesData = await Promise.all(filesFilter.map((f) => fs.promises.readFile(f)))

  const data = zip([filesFilter, filesData]).map(([filename, content]) => ({
    filename: filename.replace(basePath, ''),
    content: content.toString(),
  }))

  return data
}
export { loadData }

const updateData = async (body: Record<string, string>): Promise<void> => {
  const basePath = path.join(rootPath, '/', folderPath)
  const fileExists = await exists(path.join(basePath, '/', body.path))

  if (!fileExists) {
    const folderExists = await exists(basePath)
    if (!folderExists) {
      await fs.promises.mkdir(basePath, { recursive: true })
    }
    await fs.promises.writeFile(path.join(basePath, '/', body.path), '{}')
  }

  await fs.promises.writeFile(path.join(basePath, body.path), JSON.stringify(body.data))
}
export { updateData }

const handleData = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (!development) return res.status(401).json({ error: 'Not allowed' })

  if (req.method === 'GET') {
    const pathName = req.query.pathname as string
    const data = await loadData(pathName)
    return res.status(200).json(data)
  } else if (req.method === 'POST') {
    const contentType = req.headers['content-type']!
    const isMultiPart = contentType.startsWith('multipart/form-data')
    if (!isMultiPart) {
      const body = await getJson(req)
      await updateData(body)
      return res.status(200).json({})
    } else {
      const urls = await uploadFiles(req)
      return res.status(200).json(urls)
    }
  } else {
    return res.status(401).json({ error: 'Not allowed' })
  }
}
export { handleData }

const config = { api: { bodyParser: false } }
export { config }
