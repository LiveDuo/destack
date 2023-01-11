import { useEffect } from 'react'

const loadReactScript = (props) => {
  const appRoot = document.createElement('div')
  appRoot.setAttribute('id', 'root')
  document.body.prepend(appRoot)

  import(`../build/browser/index`)
}

const Home = (props) => {
  useEffect(() => {
    loadReactScript(props)
  }, [])

  return null
}
export default Home
