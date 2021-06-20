if (process.env.NODE_ENV !== 'production') {
  require('../../../node_modules/grapesjs/dist/css/grapes.min.css')
}

export { getStaticProps } from 'destack/build/server'
import { ContentProvider } from 'destack'

const Index = (props) => {
  return (
    <div style={{ height: '100%' }}>
      <ContentProvider {...props} showEditorInProd={true} />
    </div>
  )
}
export default Index
