/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { dataType } from '../../types'
import { formParse, getJson, exists, readdirRecursive } from '../utils'
import fs from 'fs'
import path from 'path'
import { IncomingForm } from 'formidable'
import { NextApiResponse, NextApiRequest } from 'next'

const DEFAULT_TEMPLATE = {
  ROOT: {
    type: { resolvedName: 'Container' },
    isCanvas: true,
    props: { width: '100%', height: '800px' },
    displayName: 'Container',
    custom: { displayName: 'App' },
  },
}

const development = process.env.NODE_ENV !== 'production'

const rootPath = process.cwd()

const dataFolder = 'data'
const uploadFolder = 'uploaded'

import formidable from 'formidable'

const uploadFiles = async (req: NextApiRequest): Promise<string[]> => {
  const form = new IncomingForm({ uploadDir: uploadFolder, keepExtensions: true })

  const uploadPath = path.join('public', uploadFolder)
  const uploadFolderExists = await exists(uploadPath)
  if (!uploadFolderExists) {
    await fs.promises.mkdir(uploadPath)
  }

  form.on('fileBegin', (_, file) => (file.path = path.join('public', uploadFolder, file.name!)))
  const files = await formParse(form, req)

  const urls = Object.values(files).map((f) =>
    path.join(path.sep, uploadFolder, (<formidable.File>f).name ?? ''),
  )
  return urls
}
export { uploadFiles }

const getFileNameFromRoute = (route) => (route === '/' ? 'default.json' : `${route}.json`)
const getRouteFromFilename = (filename) =>
  filename === '/default.json' ? '/' : `${filename.slice(0, -5)}`

const loadData = async (route: string): Promise<dataType> => {
  const fileName = getFileNameFromRoute(route)
  const dataPath = path.join(rootPath, dataFolder, fileName)
  const dataExists = await exists(dataPath)
  if (!dataExists) {
    return { content: JSON.stringify(DEFAULT_TEMPLATE) }
  } else {
    const content = await fs.readFileSync(dataPath, 'utf8')
    return { content }
  }
}
export { loadData }

const loadAllData = async (): Promise<dataType[]> => {
  const basePath = path.join(rootPath, dataFolder)
  const files = readdirRecursive(basePath) as string[]
  const data = await Promise.all(
    files.map((f) =>
      fs.promises
        .readFile(f, 'utf8')
        .then((c) => ({ name: getRouteFromFilename(f.replace(basePath, '')), content: c })),
    ),
  )
  return data
}
export { loadAllData }

const updateData = async (route: string, data: string): Promise<void> => {
  const fileName = getFileNameFromRoute(route)
  await fs.promises.writeFile(path.join(rootPath, dataFolder, fileName), JSON.stringify(data))
}
export { updateData }

const handleData = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    const data = await loadData(req.query.path as string)
    return res.status(200).json(data)
  } else if (req.method === 'POST') {
    const contentType = req.headers['content-type']!
    const isMultiPart = contentType.startsWith('multipart/form-data')
    if (!isMultiPart) {
      const body = await getJson(req)
      await updateData(req.query.path as string, body.data)
      return res.status(200).json({})
    } else {
      const urls = await uploadFiles(req)
      return res.status(200).json(urls)
    }
  } else {
    return res.status(401).json({ error: 'Not allowed' })
  }
}

const handleAsset = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    const assetPath = path.join(
      require.resolve('../../package.json'),
      '..',
      req.query.path as string,
    )
    const data = await fs.promises.readFile(assetPath)

    const options = { 'Content-Type': 'image/png', 'Content-Length': data.length }
    res.writeHead(200, options)
    res.end(data, 'binary')
  } else {
    return res.status(401).json({ error: 'Not allowed' })
  }
}

const handleEditor = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (!development) return res.status(401).json({ error: 'Not allowed' })

  if (req.query.type === 'data') {
    return handleData(req, res)
  } else if (req.query.type === 'asset') {
    return handleAsset(req, res)
  } else {
    return res.status(400).json({ error: 'Invalid type' })
  }
}
export { handleEditor }

const config = { api: { bodyParser: false } }
export { config }
