require('./styles/index.module.css')
export { getStaticProps } from 'destack/build/server'
import { ContentProviderGrapes } from 'destack'

const Index = (props) => {
  return (
    <div style={{ height: '100%' }}>
      <ContentProviderGrapes {...props} />
    </div>
  )
}
export default Index
