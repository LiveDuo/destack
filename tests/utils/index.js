const fs = require('fs')
const path = require('path')
const {exec} = require('child_process')

const {Transform} = require('stream')

const debug = false

const filepath = path.join(__dirname, '..', 'dev/nextjs-project/', 'data/default.json')

const deleteData = async () => {
    const hasData = await fs.promises.stat(filepath).then(() => true).catch(() => false)
    if (hasData) {
        fs.promises.unlink(filepath)
    }
}
exports.deleteData = deleteData

const execAsync = (cmd, opts = {}) => 
    new Promise((resolve, reject) => {
        const execProcess = exec(cmd, opts, (error, stdout, stderr) => {
            if (error !== null) return reject(new Error(stderr))
            return resolve(stdout)
        })
        if (debug) {
            execProcess.stdout.pipe(process.stdout)
        }
    })
exports.execAsync = execAsync

const execAsyncUntil = (cmd, opts = {}, checks = []) => 
    new Promise((resolve, reject) => {
        const serverProcess = exec(cmd, opts)

        const checkListeningTransform = new Transform({ decodeStrings: false })
        checkListeningTransform._transform = (chunk, _, done) => {
            const s = chunk.toString()
            const listening = s.includes(checks[0]) && s.includes(checks[1])
            if (listening) resolve(serverProcess)
            done(null, s)
        }
        const serverProcessChecked = serverProcess.stdout.pipe(checkListeningTransform)
        if (debug) {
            serverProcessChecked.pipe(process.stdout)
            serverProcess.stderr.pipe(process.stderr)
        }
    })
exports.execAsyncUntil = execAsyncUntil

const killServer = async () => {
    try {
        await execAsync('lsof -t -i tcp:3001')
        await execAsync('kill $(lsof -t -i tcp:3001)')
        // if (debug) console.log('Port 3001 killed')
    } catch (error) {
        // if (debug) console.log('Port 3001 is not used')
    }
}
exports.killServer = killServer