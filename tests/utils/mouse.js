const dragAndDrop = async (originSelector, destinationSelector) => {
  const origin = await page.waitForSelector(originSelector)
  const destination = await page.waitForSelector(destinationSelector)
  const originBox = await origin.boundingBox()
  const destinationBox = await destination.boundingBox()
  const lastPositionCoordenate = (box) => ({
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
  })
  const getPayload = (box) => ({
    bubbles: true,
    cancelable: true,
    screenX: lastPositionCoordenate(box).x,
    screenY: lastPositionCoordenate(box).y,
    clientX: lastPositionCoordenate(box).x,
    clientY: lastPositionCoordenate(box).y,
  })

  const pageFunction = async (
    _originSelector,
    _destinationSelector,
    originPayload,
    destinationPayload,
  ) => {
    const _origin = document.querySelector(_originSelector)
    let _destination = document.querySelector(_destinationSelector)

    _destination = _destination.lastElementChild || _destination

    _origin.dispatchEvent(new MouseEvent('pointerdown', originPayload))
    _origin.dispatchEvent(new DragEvent('dragstart', originPayload))

    await new Promise((resolve) => setTimeout(resolve, 2000))
    _destination.dispatchEvent(new MouseEvent('dragenter', destinationPayload))
    _destination.dispatchEvent(new MouseEvent('pointerup', destinationPayload))
    _destination.dispatchEvent(new MouseEvent('drop', destinationPayload))
    _origin.dispatchEvent(new DragEvent('dragend', destinationPayload))
  }

  await page.evaluate(
    pageFunction,
    originSelector,
    destinationSelector,
    getPayload(originBox),
    getPayload(destinationBox),
  )
}
exports.dragAndDrop = dragAndDrop

const dragAndDrop2 = async (source, target) => {
  await page.evaluate(
    ({ source, target }) => {
      const getEvent = (type, rect) => {
        const clientX = rect.left + rect.width / 2
        const clientY = rect.top + rect.height / 2
        const opts = { clientX, clientY, bubbles: true, cancelable: true, view: window }
        if (type.startsWith('drag')) {
          const e = new DragEvent(type, opts)
          // e.dataTransfer = new DataTransfer()
          // const dt = new window.DataTransfer()
          // console.log(JSON.stringify([dt]))
          // console.log(JSON.stringify([dt.setData]))
          return e
        } else {
          return new MouseEvent(type, opts)
        }
      }

      const sourceEl = document.querySelector(source)
      const sourceRect = sourceEl.getBoundingClientRect()

      sourceEl.dispatchEvent(getEvent('mousedown', sourceRect))
      sourceEl.dispatchEvent(getEvent('dragstart', sourceRect))
      sourceEl.dispatchEvent(getEvent('drag', sourceRect))

      const targetEl = document.querySelector(target)
      const targetRect = targetEl.getBoundingClientRect()

      targetEl.dispatchEvent(getEvent('dragover', targetRect))
      targetEl.dispatchEvent(getEvent('drop', targetRect))
      targetEl.dispatchEvent(getEvent('dragend', targetRect))
    },
    { source, target },
  )
}
exports.dragAndDrop2 = dragAndDrop2

// await page.evaluate(() => document.onmousemove = (e) => { mouseX = e.clientX; mouseY = e.clientY })

// const mouseEvent = async (page, type, toX = null, toY = null) => {
//   if (!puppeteerConfig.headless || true) {
//     if (type === 'mouseup') {
//       await page.mouse.up()
//     } else if (type === 'mousemove') {
//       await page.mouse.move(toX, toY)
//     } else if (type === 'mousedown') {
//       await page.mouse.down()
//     }
//   } else {
//     // console.log(mouseX, mouseY)
//     await page.evaluate(({toX, toY, type}) => {
//       const clientX = toX !== null ? toX : mouseX
//       const clientY = toY !== null ? toY : mouseY
//       const opts = { clientX, clientY, bubbles: true, cancelable: true, view: window }
//       const clickEvent = new MouseEvent(type, opts)
//       document.dispatchEvent(clickEvent)
//     }, {toX, toY, type})
//   }
// }

const logMouseEvents = async (page) => {
  page.on('console', (c) => console.log(JSON.parse(c.text())))

  await page.evaluate(() => {
    document.addEventListener(
      'mouseup',
      (e) => console.log(JSON.stringify(['mouseup', e.clientX, e.clientY])),
      false,
    )
    document.addEventListener(
      'mousedown',
      (e) => console.log(JSON.stringify(['mousedown', e.clientX, e.clientY])),
      false,
    )
    document.addEventListener(
      'dragover',
      (e) => console.log(JSON.stringify(['dragover', e.clientX, e.clientY])),
      false,
    )
    document.addEventListener(
      'dragend',
      (e) => console.log(JSON.stringify(['dragend', e.clientX, e.clientY])),
      false,
    )
    document.addEventListener(
      'drop',
      (e) => console.log(JSON.stringify(['drop', e.clientX, e.clientY])),
      false,
    )
  })
}
exports.logMouseEvents = logMouseEvents
