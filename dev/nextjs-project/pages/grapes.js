import '../../../lib/node_modules/grapesjs/dist/css/grapes.min.css'

export { getStaticProps } from 'destack/build/server'
import { ContentProviderGrapes } from 'destack'

const Index = () => {
  return (
    <div style={{ height: '100%' }}>
      <ContentProviderGrapes />
    </div>
  )
}
export default Index
