import React, { createContext, useState } from 'react'

import { Element } from '@craftjs/core'

import hyperUiComponents from '../themes/hyperui'
import tailblocksComponents from '../themes/tailblocks'
import merakiLightComponents from '../themes/meraki-light'

import Child from '../themes/shared/Child'

import { ContainerSimple } from '../themes/shared/Simple'
import { Container } from '../themes/shared/Container'
import { Text } from '../themes/shared/Text'
import { Link } from '../themes/shared/Link'
import { Image } from '../themes/shared/Image'

const themes = [
  { name: 'Hyper UI', load: () => import(`../themes/hyperui`) },
  { name: 'Tailblocks', load: () => import(`../themes/tailblocks`) },
  { name: 'Meraki UI', load: () => import(`../themes/meraki-light`) },
]

const getCategories = (components) =>
  [...new Set(components?.map((c) => c.craft.category))] as string[]

const mapComponents = (c, n) =>
  Object.fromEntries(
    Object.entries(c).map(([k, v]) => [
      `${n.toLowerCase()}-${k.toLowerCase()}`,
      v as React.FunctionComponent,
    ]),
  )

interface ContextInterface {
  components: any[]
  categories: string[]
  themeNames: string[]
  themeIndex: number
  resolver: object
  updateIndex: (number) => void
}

const SimpleComponents = { Container, ContainerSimple, Element, Text, Child, Link, Image }

const _resolver = {
  ...SimpleComponents,
  ...mapComponents(hyperUiComponents, 'hyper'),
  ...mapComponents(tailblocksComponents, 'tailblocks'),
  ...mapComponents(merakiLightComponents, 'meraki-light'),
}

const defaultValue = {
  components: Object.values(hyperUiComponents),
  categories: getCategories(Object.values(hyperUiComponents)),
  themeNames: [],
  themeIndex: 0,
  resolver: _resolver,
  updateIndex: () => {},
}

const ThemeContext = createContext<ContextInterface>(defaultValue)

const ThemeProvider = ({ children }) => {
  const [themeIndex, setThemeIndex] = useState(defaultValue.themeIndex)
  const [components, setComponents] = useState(defaultValue.components)
  const [categories, setCategories] = useState(defaultValue.categories)
  const [resolver, setResolver] = useState(defaultValue.resolver)

  const themeNames = themes.map((t) => t.name)

  const updateIndex = async (index) => {
    setThemeIndex(index)

    const componentsObject = await themes[index].load()
    const componentsArray = Object.values(componentsObject.default)
    setComponents(componentsArray)
    setCategories(getCategories(componentsArray))

    // const themeName = themes[index].name.toLowerCase().replaceAll(' ', '-')
    // const _resolver = { ...SimpleComponents, ...mapComponents(componentsObject.default, themeName), }
    // setResolver(_resolver)

    // console.log(_resolver)
  }

  const value = { components, categories, resolver, themeNames, themeIndex, updateIndex }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
export { ThemeContext, ThemeProvider }
