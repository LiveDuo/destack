const axios = require('axios')
const fs = require('fs')

const pkg = require('../package.json')

;(async () => {
  if (process.argv[2] === 'patch') {
    const tag = process.argv[3]
    const tagVersion = await axios
      .get(`https://registry.npmjs.org/destack/`)
      .then(({ data }) => data['dist-tags'][tag] ?? data['dist-tags'].latest)
    const [vMajor, vMinor, vPatch] = tagVersion.split('.').map((r) => parseInt(r))
    pkg.version = `${vMajor}.${vMinor}.${vPatch + 1}`
    await fs.promises.writeFile('package.json', JSON.stringify(pkg, null, 2))
  } else if (process.argv[2] === 'undo') {
    const { data } = await axios.get('https://unpkg.com/destack/package.json')
    pkg.version = data.version
    await fs.promises.writeFile('package.json', JSON.stringify(pkg, null, 2))
  }
})()
