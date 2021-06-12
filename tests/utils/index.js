const fs = require('fs')
const path = require('path')
const os = require('os')
const { exec } = require('child_process')

const { Transform } = require('stream')

const debug = false

const projectPath = 'dev/nextjs-project'

const templateFilepath = path.join(__dirname, '..', '..', projectPath, 'data', 'default.json')

const deleteFile = async (file) => {
  const hasData = await fs.promises
    .stat(file)
    .then(() => true)
    .catch(() => false)
  if (hasData) {
    await fs.promises.unlink(templateFilepath)
  }
}
exports.deleteFile = deleteFile

const deleteFolder = async (folder) => {
  const hasData = await fs.promises
    .stat(folder)
    .then(() => true)
    .catch(() => false)
  if (hasData) {
    fs.promises.unlink(templateFilepath)
    await fs.promises.rmdir(folder, { recursive: true })
  }
}
exports.deleteFolder = deleteFolder

const execAsync = (cmd, opts = {}) =>
  new Promise((resolve, reject) => {
    const execProcess = exec(cmd, { cwd: projectPath, ...opts }, (error, stdout, stderr) => {
      if (error !== null) return reject(new Error(stderr))
      return resolve(stdout)
    })
    if (debug) {
      execProcess.stdout.pipe(process.stdout)
    }
  })
exports.execAsync = execAsync

const execAsyncUntil = (cmd, opts = {}, regexStr) =>
  new Promise((resolve, reject) => {
    const serverProcess = exec(cmd, { cwd: projectPath, ...opts })

    let stderrLog = '',
      stdoutLog = ''
    serverProcess.on('exit', () => reject(new Error(stderrLog)))

    const regex = new RegExp(regexStr)

    const checkListeningTransform = new Transform({ decodeStrings: false })
    checkListeningTransform._transform = (c, _, done) => {
      const s = c.toString()
      if (regex.test(s)) resolve(serverProcess)
      done(null, s)
    }
    const serverProcessChecked = serverProcess.stdout.pipe(checkListeningTransform)
    if (debug) {
      serverProcessChecked.pipe(process.stdout)
      serverProcess.stderr.pipe(process.stderr)
    } else {
      serverProcess.stderr.on('data', (c) => (stderrLog += c.toString()))
      serverProcess.stdout.on('data', (c) => (stdoutLog += c.toString()))
    }
  })
exports.execAsyncUntil = execAsyncUntil

const killServer = async (port) => {
  try {
    // const pidCmd = `lsof -t -i tcp:${port}`
    const pidCmd = `lsof -i tcp:${port} | grep node | tr -s ' ' | cut -d ' ' -f2`
    await execAsync(pidCmd)
    await execAsync(`kill $(${pidCmd})`)
    // if (debug) console.log('Port 3001 killed')
  } catch (error) {
    // if (debug) console.log('Port 3001 is not used')
  }
}
exports.killServer = killServer

const copyTemplateToTemp = async () => {
  await fs.promises.copyFile(templateFilepath, path.join(os.tmpdir(), 'default.json'))
}
exports.copyTemplateToTemp = copyTemplateToTemp

const copyTemplateFromTemp = async () => {
  const tempPath = path.join(os.tmpdir(), 'default.json')
  await fs.promises.copyFile(tempPath, templateFilepath)
  await fs.promises.unlink(tempPath)
}
exports.copyTemplateFromTemp = copyTemplateFromTemp

const exists = (s) =>
  fs.promises
    .access(s)
    .then(() => true)
    .catch(() => false)
exports.exists = exists
