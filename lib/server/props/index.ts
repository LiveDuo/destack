import 'regenerator-runtime/runtime'

import { dataType } from '../../types'
import { loadAllData } from '../api/handle'

const development = process.env.NODE_ENV !== 'production'

type StaticPropsReturn = {
  props: { data?: dataType[] }
}

const getStaticProps = async (): Promise<StaticPropsReturn> => {
  if (development) {
    return { props: {} }
  } else {
    const data = await loadAllData()
    return { props: { data: data } }
  }
}
export { getStaticProps }
