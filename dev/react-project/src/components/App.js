require('../styles/index.module.css')
// export { getStaticProps } from 'destack/build/server'

// import { useEffect, useState } from 'react'

import { ContentProvider } from 'destack'

const App = () => {
  // const [data, setData] = useState(false)

  // useEffect(() => {

  //   fetch('/data/default.json')
  //     .then(response => response.json())
  //     .then(_data => setData(_data));
  // }, [])

  return (
    <div>
      <ContentProvider />
      {/* <link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.1.4/dist/tailwind.min.css" />
        {data?.css && <style> {data.css}</style>}

        {data?.html && <div dangerouslySetInnerHTML={{ __html: data.html }}></div>} */}
    </div>
  )
}

export default App
