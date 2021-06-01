const fs = require('fs')
const path = require('path')
const {exec} = require('child_process')

const {Transform} = require('stream')

const debug = false

jest.setTimeout(300000)

const filepath = path.join(__dirname, '..', 'dev/nextjs-project/data/default.json')

let globalProcess

const deleteData = async () => {
    const hasData = await fs.promises.stat(filepath).then(() => true).catch(() => false)
    if (hasData) {
        fs.promises.unlink(filepath)
    }
}

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
        }
        globalProcess = serverProcess
    })

describe('Load editor', () => {
    // beforeAll(async () => {
        // await page.goto('http://localhost:3000', { waitUntil: 'load' })
    // })
    // afterAll(() => {
        // if (globalProcess) {
        //     globalProcess.kill('SIGINT')
        // }
        // process.kill('SIGINT')
    // })

    // it('should contain a "gjs" element', async () => {
        // await expect(page.$('#gjs')).resolves.not.toBeNull()
    // })
    // it('should add block to canvas', async () => {
        // await page.waitForSelector('#gjs')

        // await page.waitForSelector('#gjs .gjs-pn-panel.gjs-pn-options .gjs-pn-btn.fa-trash')
        // const button = await page.$('#gjs .gjs-pn-panel.gjs-pn-options .gjs-pn-btn.fa-trash')

        // await page.waitForTimeout(1000)

        // let confirmed = false
        // await page.on('dialog', async dialog => {if (!confirmed) { await dialog.accept(); confirmed = true }})
        // await button.click()

        // await page.waitForTimeout(1000)

        // await page.waitForSelector('#gjs .gjs-block-category.gjs-open')
        // const blockCategory = await page.$('#gjs .gjs-block-category.gjs-open')
        // const block = await blockCategory.$('.gjs-blocks-c > div:nth-child(2)')

        // const {x, y, width, height} = await block.boundingBox()
        // await page.mouse.move(x + width / 2, y + height / 2)
        // await page.mouse.down()
        // await page.mouse.move(-1000, 0)
        // await page.mouse.up()

        // await page.waitForTimeout(1000)

        // const iframeElement = await page.$('#gjs .gjs-frame')
        // const iframe = await iframeElement.contentFrame()
        // const wrapper = await iframe.$('#wrapper')
        // const heading =  await wrapper.$eval('div > div > div:nth-child(2) h1', el => el.textContent)
        // expect(heading).toMatch('The Catalyzer')
    // })
    it('should add block to canvas', async () => {
        await execAsync('cd dev/nextjs-project && npm run build')
        await execAsyncUntil('cd dev/nextjs-project && npm start -- -p 3001', {}, ['ready', 'http://localhost:3001'])

        await page.goto('http://localhost:3001', { waitUntil: 'load' })

        const heading2 = await page.waitForSelector('h1')
        const title = await heading2.evaluate(e => e.textContent, heading2)
        expect(title).toMatch('Welcome to Destack')
    })
    // it('should clean editor data', async () => {
        // await deleteData()
        // TODO should save inital data to tmp
    // })
})