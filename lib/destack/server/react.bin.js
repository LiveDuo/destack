#!/usr/bin/env node

const { spawn } = require('child_process')

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const { argv } = yargs(hideBin(process.argv))

if (argv.dev || argv.d) {
  const spawnArgs = [
    'nodemon --watch ../../lib/destack/server ../../node_modules/.bin/ts-node -O \'{"module":"commonjs"}\' ../../lib/destack/server/react.ts',
    argv.d,
  ]
  const proc = spawn('concurrently', spawnArgs)
  proc.stdout.on('data', (data) => {
    process.stdout.write(data.toString())
  })
  proc.stderr.on('data', (data) => {
    process.stdout.write(data.toString())
  })
} else if (argv.build || argv.b) {
  const spawnArgs = ['&&', argv.b]
  const proc = spawn(`echo`, spawnArgs, { shell: true })
  proc.stdout.on('data', (data) => {
    process.stdout.write(data.toString())
  })
  proc.stderr.on('data', (data) => {
    process.stdout.write(data.toString())
  })
}
