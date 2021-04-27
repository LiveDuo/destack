import {formParse, getJson, zip, exists} from '../utils'

const development = process.env.NODE_ENV !== 'production'

const rootPath = process.cwd()

const folderPath = 'data'
const publicPath = 'public'
const uploadPath = 'uploaded'

const uploadFiles = async (req, path) => {
  // Does not work when statically extracted. Should be
  // a problem with rollup. Also throws a warning:
  // "Critical dependency: require function is used in a way
  // in which dependencies cannot be statically extracted"
  const formidable = require('formidable')
	const form = new formidable.IncomingForm()
	form.uploadDir = uploadPath
	form.keepExtensions = true
	form.on('fileBegin', (_, file) => file.path = path.join(publicPath, uploadPath, file.name))
	const files = await formParse(form, req)
	const urls = Object.values(files).map(f => path.join('/', uploadPath, f.name))
	return urls
}
export { uploadFiles }

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

const handleData = async (req, res, [fs, path, formidable]) => {
  if (!development) return res.status(401).json({ error: 'Not allowed' })
  
  if (req.method === 'GET') {
    const data = await loadData(path, fs)
    return res.status(200).json(data)
  } else if (req.method === 'POST') {
    const contentType = req.headers['content-type']
    const isMultiPart = contentType.startsWith('multipart/form-data')
    if (!isMultiPart) {
      const body = await getJson(req)
      await updateData(path, fs, body)
      return res.status(200).json({})
    } else {
      const urls = await uploadFiles(req, path, formidable)
      return res.status(200).json(urls)
    }
  } else {
    return res.status(401).json({ error: 'Not allowed' })
  }
}
export { handleData }
