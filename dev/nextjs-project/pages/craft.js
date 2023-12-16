export { getStaticProps } from 'destack/build/server'
import { ContentProvider } from 'destack/build/browser/craft'

const Index = () => {
  return (
    <div style={{ height: '100%' }}>
      <ContentProvider />
    </div>
  )
}
export default Index
