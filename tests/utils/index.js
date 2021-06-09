const fs = require('fs')
const path = require('path')
const os = require('os')

const projectPath = 'dev/nextjs-project'

const filepath = path.join(__dirname, '..', '..', projectPath, 'data', 'default.json')

const deleteData = async () => {
  const hasData = await fs.promises
    .stat(filepath)
    .then(() => true)
    .catch(() => false)
  if (hasData) {
    fs.promises.unlink(filepath)
  }
}
exports.deleteData = deleteData

const copyTemplateToTemp = async () => {
  await fs.promises.copyFile(filepath, path.join(os.tmpdir(), 'default.json'))
}
exports.copyTemplateToTemp = copyTemplateToTemp

const copyTemplateFromTemp = async () => {
  const tempPath = path.join(os.tmpdir(), 'default.json')
  await fs.promises.copyFile(tempPath, filepath)
  await fs.promises.unlink(tempPath)
}
exports.copyTemplateFromTemp = copyTemplateFromTemp
