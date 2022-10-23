import React, { createContext, useState } from 'react'

import hyperUiComponents from '../themes/hyperui'
import tailblocksComponents from '../themes/tailblocks'
import merakiLightComponents from '../themes/meraki-light'

const themes = [
  { name: 'Tailblocks', components: Object.values(tailblocksComponents) },
  { name: 'Meraki UI', components: Object.values(merakiLightComponents) },
  { name: 'Hyper UI', components: Object.values(hyperUiComponents) },
]

interface ContextInterface {
  components: any[]
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
  const categories = [...new Set(components?.map((c) => c.craft.category))]
  const themeNames = themes.map((t) => t.name)

  const updateIndex = async (index) => {
    setThemeIndex(index)
  }

  const value = { components, categories, themeNames, themeIndex, updateIndex }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
export { ThemeContext, ThemeProvider }
