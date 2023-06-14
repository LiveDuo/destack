import fs from 'fs/promises'

async function getData() {
  const d = await fs.readFile(process.cwd() + '/.gitignore', 'utf8')
  return d.substring(0, 100)
}

export default async function Page() {
  const name = await getData()
  return <div>{name}</div>
}
