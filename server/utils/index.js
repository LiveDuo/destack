const formParse = (form, req) => new Promise((resolve, reject) => {
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
export {zip}

const exists = (fs, s) => new Promise(r => fs.access(s, fs.F_OK, e => r(!e)))
export {exists}
