import React, { createContext, useState } from 'react'

import Banner1 from '../selectors/Banner1'
import Banner2 from '../selectors/Banner2'
import Banner3 from '../selectors/Banner3'

import bannerImage1 from '../selectors/Banner1/preview.png'
import bannerImage2 from '../selectors/Banner2/preview.png'

const hyperUiComponents = [
  { name: 'Banner 1', category: 'Banners', render: Banner1, image: bannerImage1 },
  { name: 'Banner 2', category: 'Banners', render: Banner2, image: bannerImage2 },
  { name: 'Banner 3', category: 'CTA', render: Banner3, image: bannerImage2 },
]

const themes = [
  { name: 'Tailblocks', components: [] },
  { name: 'Meraki UI', components: [] },
  { name: 'Hyper UI', components: hyperUiComponents },
]

interface Component {
  name: string
  category: string
  render
  image: string
}

interface ContextInterface {
  components: Component[]
  categories: string[]
  themeNames: string[]
  themeIndex: number
  updateIndex: (number) => void
}

const defaultValue = {
  components: [],
  categories: [],
  themeNames: [],
  themeIndex: 0,
  updateIndex: () => {},
}
const ThemeContext = createContext<ContextInterface>(defaultValue)

const ThemeProvider = ({ children }) => {
  const [themeIndex, setThemeIndex] = useState(2)

  const components = themes[themeIndex]?.components
  const categories = [...new Set(components?.map((c) => c.category))]
  const themeNames = themes.map((t) => t.name)

  const updateIndex = async (index) => {
    setThemeIndex(index)
  }

  const value = { components, categories, themeNames, themeIndex, updateIndex }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
export { ThemeContext, ThemeProvider }
