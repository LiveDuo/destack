const fetchJSON = (method, url, data) => fetch(url, {method, headers: {'Content-Type': 'application/json'}, body: data ? JSON.stringify(data) : undefined})
    .then(res => res.json())

export { fetchJSON }

// fixes problem with tailwind (use of slashes in css class names)
const escapeName = (name) => `${name}`.trim().replace(/([^a-z0-9\w-\:\/]+)/gi, '-')
export { escapeName }

const getSvgHtml = (svg) => {
    if (typeof window === 'undefined') return ''
    const svgEl = svg()
    svgEl.setAttribute('width',  '100%')
    svgEl.setAttribute('height',  '100%')
    return svgEl.outerHTML
}
export {getSvgHtml}

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
