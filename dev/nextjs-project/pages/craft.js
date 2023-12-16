export { getStaticProps } from 'destack/build/server'
import { ContentProvider } from 'destack/build/browser/craft'

const Index = (props) => {
  return (
    <div style={{ height: '100%' }}>
      <ContentProvider {...props} />
    </div>
  )
}
export default Index
