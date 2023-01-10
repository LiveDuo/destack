import React, { createContext, useState, useEffect } from 'react'

import { Element } from '@craftjs/core'

import Child from '../themes/shared/Child'

import { Container } from '../themes/shared/Container'
import { Text } from '../themes/shared/Text'
import { Link } from '../themes/shared/Link'
import { Button } from '../themes/shared/Button'
import { Image } from '../themes/shared/Image'
import { Component } from '../themes/shared/Child'

const themes = [
  { name: 'Hyper UI', folder: 'hyperui', load: () => import(`../themes/hyperui`) },
  { name: 'Tailblocks', folder: 'tailblocks', load: () => import(`../themes/tailblocks`) },
  { name: 'Meraki UI', folder: 'meraki-light', load: () => import(`../themes/meraki-light`) },
]

const getCategories = (components) => [...new Set(components?.map((c) => c.category))] as string[]

interface ComponentInterface {
  displayName: string
  category: string
  source: any
}

interface ContextInterface {
  components: ComponentInterface[]
  categories: string[]
  themeNames: string[]
  themeIndex: number
  resolver: object
  standalone: Boolean
  setStandalone: (Boolean) => void
  updateIndex: (number) => void
}

const _resolver = {
  Container,
  Component,
  Element,
  Text,
  Child,
  Link,
  Button,
  Image,
}

const defaultValue = {
  components: [],
  categories: [],
  themeNames: [],
  themeIndex: 0,
  updateIndex: () => {},
  resolver: _resolver,
  standalone: false,
  setStandalone: () => {},
}

const ThemeContext = createContext<ContextInterface>(defaultValue)

const ThemeProvider = ({ children }) => {
  const [themeIndex, setThemeIndex] = useState<number>(defaultValue.themeIndex)
  const [components, setComponents] = useState<any[]>(defaultValue.components)
  const [categories, setCategories] = useState<string[]>(defaultValue.categories)
  const [standalone, setStandalone] = useState<Boolean>(defaultValue.standalone)
  const [resolver, _setResolver] = useState<object>(defaultValue.resolver)

  const themeNames = themes.map((t) => t.name)

  useEffect(() => {
    updateIndex(0)
  }, [])

  const updateIndex = async (index) => {
    setThemeIndex(index)

    const componentsObject = await themes[index].load()
    const componentsArray = Object.values(componentsObject.default) as ComponentInterface[]
    setComponents(
      componentsArray.map((c) => ({
        ...c,
        themeFolder: themes[index].folder,
        blockFolder: c.displayName.replaceAll(' ', '') as string,
      })),
    )
    setCategories(getCategories(componentsArray))
  }

  const value = {
    components,
    categories,
    resolver,
    themeNames,
    themeIndex,
    updateIndex,
    standalone,
    setStandalone,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
export { ThemeContext, ThemeProvider }
