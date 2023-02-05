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

const getJson = (req: NextApiRequest): Promise<Record<string, string>> =>
  new Promise<Record<string, string>>((resolve) => {
    if (!req.body) {
      let buffer = ''
      req.on('data', (chunk) => {
        buffer += chunk
      })
      req.on('end', () => {
        const str = Buffer.from(buffer).toString()
        if (str && str.indexOf('{') > -1) resolve(JSON.parse(str))
      })
    }
  })
export { getJson }

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
