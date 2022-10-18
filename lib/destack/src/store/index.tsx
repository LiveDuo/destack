import React, { createContext, useState } from 'react'

import hyperUiComponents from '../themes/hyperui'

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
