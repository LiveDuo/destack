#!/usr/bin/env node

const { spawn } = require('child_process')

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const fs = require('fs')
const path = require('path')

const isImported = __dirname.split(path.sep).includes('node_modules')

const copyDirectory = async (src, dest) => {
  await fs.promises.mkdir(dest, { recursive: true })

  const entries = await fs.promises.readdir(src, { withFileTypes: true })
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    entry.isDirectory()
      ? await copyDirectory(srcPath, destPath)
      : await fs.promises.copyFile(srcPath, destPath)
  }
}

const { argv } = yargs(hideBin(process.argv))

;(async () => {
  if (argv.dev || argv.d) {
    // CLI: ./node_modules/.bin/concurrently "./node_modules/.bin/ts-node-dev -O \"{\\\"module\\\":\\\"commonjs\\\"}\" ./lib/destack/server/react.ts"
    const startServerCommandUnix = isImported
      ? '"node ./node_modules/destack/build/custom/react.js"'
      : 'ts-node-dev -O "{\\"module\\":\\"commonjs\\"}" ../../lib/destack/server/react.ts'

    // CLI: .\node_modules\.bin\concurrently ".\node_modules\.bin\ts-node-dev -O ""{""""module"""": """"commonjs""""}"" ./lib/destack/server/react.ts"
    const startServerCommandWindows = isImported
      ? '"node ./node_modules/destack/build/custom/react.js"'
      : '"ts-node-dev -O ""{""""module"""": """"commonjs""""}"" ./../../lib/destack/server/react.ts"'

    const startServerCommand =
      process.platform === 'win32' ? startServerCommandWindows : startServerCommandUnix
    const spawnArgs = [startServerCommand, `\"${argv.d}\"`]

    const spawnOptions = process.platform === 'win32' ? { shell: true } : {}
    const proc = spawn('concurrently', spawnArgs, spawnOptions)
    proc.stdout.on('data', (data) => {
      process.stdout.write(data.toString())
    })
    proc.stderr.on('data', (data) => {
      process.stdout.write(data.toString())
    })
  } else if (argv.build || argv.b) {
    const projectPath = isImported ? '.' : path.join('dev', 'react-project')
    const pathFrom = path.join(__dirname, '..', '..', '..', projectPath, 'data')
    const pathTo = path.join(__dirname, '..', '..', '..', projectPath, 'public', 'data')
    await copyDirectory(pathFrom, pathTo)

    const spawnArgs = ['&&', argv.b]
    const proc = spawn('echo', spawnArgs, { shell: true })
    proc.stdout.on('data', (data) => {
      process.stdout.write(data.toString())
    })
    proc.stderr.on('data', (data) => {
      process.stdout.write(data.toString())
    })
  }
})()
