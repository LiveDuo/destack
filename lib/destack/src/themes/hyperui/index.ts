import Banner1 from './Banner1'
import Banner2 from './Banner2'
import Banner3 from './Banner3'

const components = [
  {
    name: Banner1.craft.displayName,
    category: Banner1.craft.category,
    render: Banner1,
    image: Banner1.craft.image,
  },
  {
    name: Banner2.craft.displayName,
    category: Banner2.craft.category,
    render: Banner2,
    image: Banner2.craft.image,
  },
  {
    name: Banner3.craft.displayName,
    category: Banner3.craft.category,
    render: Banner3,
    image: Banner3.craft.image,
  },
]
export default components
