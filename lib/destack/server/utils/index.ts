import formidable from 'formidable'
import fs from 'fs'
import { NextApiRequest } from 'next'
import IncomingForm from 'formidable/Formidable'
const formParse = (form: IncomingForm, req: NextApiRequest): Promise<formidable.Files> =>
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

const zip = (rows: unknown[][]): Array<unknown> =>
  rows[0].map((_: unknown, c: string | number) => rows.map((row) => row[c]))

const exists = (s: fs.PathLike): Promise<boolean> =>
  new Promise<boolean>((r) => {
    try {
      fs.promises.access(s)
      r(true)
    } catch (error) {
      r(false)
    }
  })

export { exists, zip }
