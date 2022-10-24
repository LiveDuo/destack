import React, { createContext, useState } from 'react'

import { Element } from '@craftjs/core'

import hyperUiComponents from '../themes/hyperui'
// import tailblocksComponents from '../themes/tailblocks'
// import merakiLightComponents from '../themes/meraki-light'

import Child from '../themes/shared/Child'

import { ContainerSimple } from '../themes/shared/Simple'
import { Container } from '../themes/shared/Container'
import { Text } from '../themes/shared/Text'
import { Link } from '../themes/shared/Link'
import { Image } from '../themes/shared/Image'

import HyperUiComponents from '../themes/hyperui'
// import TailblocksComponents from '../themes/tailblocks'
// import MerakiLightComponents from '../themes/meraki-light'

const mapComponents = (c, n) =>
  Object.fromEntries(
    Object.entries(c).map(([k, v]) => [
      `${n.toLowerCase()}-${k.toLowerCase()}`,
      v as React.FunctionComponent,
    ]),
  )

const SimpleComponents = { Container, ContainerSimple, Element, Text, Child, Link, Image }
const resolver = {
  ...SimpleComponents,
  ...mapComponents(HyperUiComponents, 'hyper'),
  // ...mapComponents(MerakiLightComponents, 'meraki'),
  // ...mapComponents(TailblocksComponents, 'tailblocks'),
}

const themes = [
  { name: 'Hyper UI', components: Object.values(hyperUiComponents) },
  // { name: 'Tailblocks', components: Object.values(tailblocksComponents) },
  // { name: 'Meraki UI', components: Object.values(merakiLightComponents) },
]

interface ContextInterface {
  components: any[]
  categories: string[]
  themeNames: string[]
  themeIndex: number
  resolver: object
  updateIndex: (number) => void
}

const defaultValue = {
  components: [],
  categories: [],
  themeNames: [],
  themeIndex: 0,
  resolver: resolver,
  updateIndex: () => {},
}
const ThemeContext = createContext<ContextInterface>(defaultValue)

const ThemeProvider = ({ children }) => {
  const [themeIndex, setThemeIndex] = useState(defaultValue.themeIndex)

  const components = themes[themeIndex]?.components
  const categories = [...new Set(components?.map((c) => c.craft.category))]
  const themeNames = themes.map((t) => t.name)

  const updateIndex = async (index) => {
    setThemeIndex(index)
  }

  const value = { components, categories, resolver, themeNames, themeIndex, updateIndex }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
export { ThemeContext, ThemeProvider }
