import React, { useEffect, useState, useRef } from 'react'

const duration = 3000

const ToastContainer = () => {
  const mounted = useRef<boolean>(false)
  const [show, setShow] = useState<Boolean>(false)
  const [aboutToHide, setAboutToHide] = useState<Boolean>(false)

  const [text, setText] = useState<String | null>(null)
  const [color, setColor] = useState<String | null>(null)
  const [icon, setIcon] = useState<String | null>(null)

  useEffect(() => {
    if (mounted.current) return

    const fn = (e) => {
      if (show) return

      const typeTemp = e.detail.type
      const textTemp = e.detail.message
      if (typeTemp === 'success') {
        setColor('green')
        setIcon('bi-check')
        setText(textTemp ?? 'Success')
      } else if (typeTemp === 'info') {
        setColor('gray')
        setIcon('bi-info')
        setText(textTemp ?? 'Info')
      } else if (typeTemp === 'warning') {
        setColor('orange')
        setIcon('bi-exclamation')
        setText(textTemp ?? 'Warning')
      } else if (typeTemp === 'error') {
        setColor('red')
        setIcon('bi-x')
        setText(textTemp ?? 'Error')
      }

      setShow(true)

      setTimeout(() => setAboutToHide(true), duration)
    }
    document.addEventListener('toast', fn, false)

    mounted.current = true

    return () => document.removeEventListener('toast', fn, false)
  }, [])
  const onAnimationEnd = (e) => {
    if (e.animationName === 'hideToastAnimation') {
      setAboutToHide(false)
      setShow(false)
      setColor(null)
      setIcon(null)
      setText(null)
    }
  }
  const animationClass = !aboutToHide ? 'show-toast' : 'hide-toast'
  if (show && color && text && icon) {
    return (
      <div
        className={[animationClass, 'flex', 'flex-col', 'justify-center'].join(' ')}
        style={{
          margin: '0 auto',
          maxWidth: '400px',
          padding: '0 40px',
          position: 'fixed',
          left: 0,
          right: 0,
          zIndex: 1,
          bottom: '20px',
          transition: 'all 0.3s ease-out',
        }}
        onAnimationEnd={onAnimationEnd}
      >
        <div
          className={`flex items-center bg-white border-l-4 border-${color}-700 py-3 px-5 shadow-md mb-2 rounded-lg`}
        >
          <div className={`text-${color}-500 rounded-full bg-${color}-500 mr-3`}>
            <svg
              width="1.8em"
              height="1.8em"
              viewBox="0 0 16 16"
              className={`bi ${icon}`}
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
              />
            </svg>
          </div>
          <div
            className={`text-gray-500 max-w-xs`}
            style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
          >
            {text}
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export { ToastContainer }
