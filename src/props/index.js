import {loadData} from '../api/handle'

const getServerSideDataProps = async ({req}) => {
    const development = process.env.NODE_ENV !== 'production'
    if (development) return { props: {html: null} }
  
    const serverUrl = req ? req.headers['x-forwarded-host'] || req.headers['host'] : window.location.host
    const protocol = (serverUrl.indexOf('localhost') > -1) ? 'http' : 'https'
    try {
      const response = await fetchJSON('GET', protocol+'://'+serverUrl+'/api/builder/handle')
      const data = await response.json()
      const content = JSON.parse(data[1].content)
      return { props: {html: !development ? content.html : undefined} }
    } catch (error) {
      console.log(error.message)
      return { props: {} }
    }
  }
  export { getServerSideDataProps }
  
  const getStaticDataProps = async ([fs, path]) => {
  
    const development = process.env.NODE_ENV !== 'production'
    if (development) {
      return { props: {} }
    } else {
      const data = await loadData(path, fs)
      const template = data.find(c => c.filename === 'hero.json')
      if (template) {
        const content = JSON.parse(template.content)
        return { props: { html: content.html, css: content.css}}
      } else {
        return { props: {} }
      }
    }
  }
  export { getStaticDataProps }