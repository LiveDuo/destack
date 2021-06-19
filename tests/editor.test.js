const { killServer, execAsyncUntil, exists, deleteFolder } = require('./utils')
const { copyTemplateFromTemp, copyTemplateToTemp } = require('./utils')

require('./config')

// https://github.com/puppeteer/puppeteer/issues/4690, https://github.com/puppeteer/puppeteer/issues/1265
// https://stackoverflow.com/questions/55848831/how-to-simulate-drag-drop-action-in-pupeteer
// As a very important final note, all the above functions work only with: headless: false
// It's an issue with await page.mouse events, they work with only headless = false.

const addIframeComponent = async (componentHtml) => {
  await page.evaluate((componentHtml) => {
    this.grapesjs.editors[0].getComponents().add(componentHtml, { at: 0 })
  }, componentHtml)
}

const getIframeElement = async () => {
  const iframeElement = await page.$('#gjs .gjs-frame')
  const iframe = await iframeElement.contentFrame()
  return iframe
}

const clearIframeContents = async () => {
  await page.waitForSelector('#gjs')
  await page.waitForSelector('#gjs .gjs-pn-panel.gjs-pn-options .gjs-pn-btn.fa-trash')
  const button = await page.$('#gjs .gjs-pn-panel.gjs-pn-options .gjs-pn-btn.fa-trash')
  let confirmed = false
  await page.on('dialog', async (dialog) => {
    if (!confirmed) {
      await dialog.accept()
      confirmed = true
    }
  })
  await button.click()
}

describe('Load editor', () => {
  beforeAll(async () => {
    await copyTemplateToTemp()
    await execAsyncUntil('npm run dev', {}, 'compiled successfully')
    await page.setViewport({ width: 800, height: 600 })
    await page.goto('http://localhost:3000', { waitUntil: 'load' })
  })
  it('should contain a "gjs" element', async () => {
    await expect(page.$('#gjs')).resolves.not.toBeNull()
  })
  it('should add block to canvas', async () => {
    await clearIframeContents()

    const componentHtml = '<div id="custom-component">This is a custom component</div>'
    await addIframeComponent(componentHtml)

    const iframe = await getIframeElement()

    await iframe.waitForSelector('#wrapper #custom-component')
    const componentText = await iframe.$eval('#wrapper #custom-component', (el) => el.textContent)
    expect(componentText).toMatch('This is a custom component')
  })
  it('should add image to canvas', async () => {
    await clearIframeContents()

    const componentHtml =
      '<img id="custom-image" src="https://www.w3schools.com/tags/img_girl.jpg"/>'
    await addIframeComponent(componentHtml)

    const iframe = await getIframeElement()

    await iframe.waitForSelector('#wrapper #custom-image')
    const image = await iframe.$('#wrapper #custom-image')

    await image.evaluate((e) => {
      const doubleClickEvent = document.createEvent('MouseEvents')
      doubleClickEvent.initEvent('dblclick', true, true)
      e.dispatchEvent(doubleClickEvent)
    })

    await page.waitForSelector('input[type=file]#gjs-am-uploadFile')
    const uploadInput = await page.$('input[type=file]#gjs-am-uploadFile')
    await uploadInput.uploadFile(__dirname + '/../' + 'assets' + '/' + 'logo.png')

    await page.waitForSelector(
      '#gjs-mdl-c .gjs-am-assets .gjs-am-asset.gjs-am-asset-image .gjs-am-preview',
    )
    const uploadedImage = await page.$(
      '#gjs-mdl-c .gjs-am-assets .gjs-am-asset.gjs-am-asset-image .gjs-am-preview',
    )

    uploadedImage.click()

    await page.waitForSelector('.gjs-mdl-container .gjs-mdl-btn-close')
    const closeButton = await page.waitForSelector('.gjs-mdl-container .gjs-mdl-btn-close')
    closeButton.click()

    await page.waitForTimeout(1000) // should possibly be improved
    await iframe.waitForSelector('#wrapper #custom-image')
    const imageNew = await iframe.$('#wrapper #custom-image')
    const imageSrc = await iframe.evaluate((el) => el.getAttribute('src'), imageNew)

    await page.waitForTimeout(1000) // should possibly be improved

    const imageIsUploaded = await exists(
      __dirname + '/../' + 'dev/nextjs-project' + '/' + 'public' + imageSrc,
    )
    expect(imageIsUploaded).toBe(true)

    await deleteFolder(__dirname + '/../' + 'dev/nextjs-project' + '/' + 'public/uploaded')
  })
  afterAll(async () => {
    await killServer(3000)
    await copyTemplateFromTemp()
  })
})
