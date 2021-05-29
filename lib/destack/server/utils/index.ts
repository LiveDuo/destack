import fs from 'fs'
import {NextApiRequest} from 'next'
const formParse = (form: import("formidable/Formidable"), req:NextApiRequest) => new Promise<Object>((resolve, reject) => {
	form.parse(req, (err, _, files) => {
		if (err) return reject(err)
		resolve(files)
	})
})
export {formParse}

const getJson = (req) => new Promise((resolve) => {
	if (!req.body) {
		let buffer = ''
		req.on('data', (chunk) => { buffer += chunk })
		req.on('end', () => {
      	const str = Buffer.from(buffer).toString()
			if (str && str.indexOf('{') > -1 ) resolve(JSON.parse(str))
		})
	}
})
export {getJson}

const zip = (rows) => rows[0].map((_,c)=>rows.map(row=>row[c]))

const exists = (s:fs.PathLike) => new Promise<boolean>(async r =>{
  try {
    await fs.promises.access(s);
    r(true)
} catch (error) {
  r(false)
}
})

export {exists,zip}
