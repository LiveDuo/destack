import ContentProviderApp from './editor'

import fs from 'fs/promises'

async function getData() {
  const d = await fs.readFile(process.cwd() + '/.gitignore', 'utf8')
  return d.substring(0, 100)
}

export default async function Page(props) {
  const data = await getData()
  return (
    <div>
      <div>{data}</div>
      <div style={{ height: '100%' }}>
        <ContentProviderApp />
      </div>
    </div>
  )
}
