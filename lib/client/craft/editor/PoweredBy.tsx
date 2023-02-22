import React, { useEffect, useState } from 'react'

import { waitForElement, getElementProperty, isDarkBackground } from '../utils/html'

const loadPoweredBy = async () => {
  // wait loading
  await waitForElement(
    window.document.body,
    '.page-container > div:first-child > :not(:only-child)',
  )

  // get elements
  const container = window.document.querySelector('.page-container') as HTMLElement
  const lastComponent = container.querySelector(':scope > :first-child > :last-child')
  console.log(lastComponent)

  // get colors
  const bgColor = getElementProperty(
    lastComponent as HTMLElement,
    'backgroundColor',
    'rgba(0, 0, 0, 0)',
  )
  const textColor = isDarkBackground(bgColor) ? 'white' : 'grey'

  return { bgColor, textColor }
}

const PoweredBy = () => {
  const [textColor, setTextColor] = useState<string | null>(null)
  const [bgColor, setBgColor] = useState<string | null>(null)

  const loadTheme = async () => {
    const theme = await loadPoweredBy()
    setTextColor(theme.textColor)
    setBgColor(theme.bgColor)
  }

  useEffect(() => {
    loadTheme()
  }, [])

  if (!textColor || !bgColor) return null
  return (
    <div
      id="powered-by"
      style={{
        width: '100%',
        padding: '8px 0',
        textAlign: 'center',
        color: textColor,
        backgroundColor: bgColor,
      }}
    >
      Powered by&nbsp;
      <a
        rel="dofollow"
        href="https://www.getdestack.com/"
        target="_blank"
        className="font-bold hover:opacity-80"
      >
        Destack
      </a>
      &nbsp; | The open source page builder
    </div>
  )
}
export default PoweredBy
