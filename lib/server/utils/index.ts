import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import { NextApiRequest } from 'next'

import FormidableForm from 'formidable/Formidable'

const formParse = (form: FormidableForm, req: NextApiRequest): Promise<formidable.Files> =>
  new Promise<formidable.Files>((resolve, reject) => {
    form.parse(req, (err, _, files) => {
      if (err) return reject(err)
      resolve(files)
    })
  })
export { formParse }

const getPage = (req: NextApiRequest): Promise<string> =>
  new Promise<string>((resolve) => {
    if (!req.body) {
      let buffer = ''
      req.on('data', (chunk) => {
        buffer += chunk
      })
      req.on('end', () => {
        resolve(buffer)
      })
    } else {
      resolve(req.body)
    }
  })
export { getPage }

const exists = (s: fs.PathLike): Promise<boolean> =>
  fs.promises
    .access(s)
    .then(() => true)
    .catch(() => false)

export { exists }

const readdirRecursive = (folder: string, files: string[] = []): string[] | void => {
  fs.readdirSync(folder).forEach((file) => {
    const pathAbsolute = path.join(folder, file)
    if (fs.statSync(pathAbsolute).isDirectory()) {
      readdirRecursive(pathAbsolute, files)
    } else {
      files.push(pathAbsolute)
    }
  })
  return files
}
export { readdirRecursive }

const isNextJs = path.parse(process.argv[1]).base === 'next'
export { isNextJs }
