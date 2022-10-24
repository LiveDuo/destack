require('destack/build/browser/index.css')

import { ContentProvider } from 'destack'

const App = () => {
  return (
    <div style={{ height: '100%' }}>
      <ContentProvider />
    </div>
  )
}
export default App
