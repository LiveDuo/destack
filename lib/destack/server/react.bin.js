#!/usr/bin/env node

const { spawn } = require('child_process')

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const { argv } = yargs(hideBin(process.argv))

if (argv.dev || argv.d) {
  // const spawnArgs = ['echo aaa', argv.d]
  // const spawnArgs = ['pwd', argv.d]
  const spawnArgs = [
    'nodemon --watch ../../lib/destack/server ../../node_modules/.bin/ts-node -O \'{"module":"commonjs"}\' ../../lib/destack/server/react.ts',
    argv.d,
  ]
  // const spawnArgs = ['nodemon --watch destack.ts ../../.bin/ts-node -O \'{"module":"commonjs"}\' ../../../lib/destack/server/react.ts', argv.d]
  const proc = spawn('concurrently', spawnArgs)
  proc.stdout.on('data', (data) => {
    process.stdout.write(data.toString())
  })
  proc.stderr.on('data', (data) => {
    process.stdout.write(data.toString())
  })
  // setTimeout(() => {}, 40000)
  // console.log('dev with destack')
} else if (argv.build || argv.b) {
  console.log('build with destack')
}
