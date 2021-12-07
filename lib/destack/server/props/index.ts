import 'regenerator-runtime/runtime'

import { loadData } from '../api/handle'

const development = process.env.NODE_ENV !== 'production'

interface dataType {
  filename: string
  content: string
}
type StaticPropsReturn = {
  props: { data?: dataType[] }
}

const getStaticProps = async (): Promise<StaticPropsReturn> => {
  if (development) {
    return { props: {} }
  } else {
    const data = await loadData()
    return { props: { data: data } }
  }
}
export { getStaticProps }
