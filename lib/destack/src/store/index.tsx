import React, { createContext, useState, useEffect } from 'react'

import { Element } from '@craftjs/core'

import Child from '../themes/shared/Child'

import { ContainerSimple } from '../themes/shared/Simple'
import { Container } from '../themes/shared/Container'
import { Text } from '../themes/shared/Text'
import { Link } from '../themes/shared/Link'
import { Button } from '../themes/shared/Button'
import { Image } from '../themes/shared/Image'
import { Component } from '../themes/shared/Child'

const themes = [
  { name: 'Hyper UI', load: () => import(`../themes/hyperui`) },
  { name: 'Tailblocks', load: () => import(`../themes/tailblocks`) },
  { name: 'Meraki UI', load: () => import(`../themes/meraki-light`) },
]

const getCategories = (components) => [...new Set(components?.map((c) => c.category))] as string[]

interface ContextInterface {
  components: any[]
  categories: string[]
  themeNames: string[]
  themeIndex: number
  resolver: object
  updateIndex: (number) => void
}

const _resolver = {
  Container,
  Component,
  ContainerSimple,
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
  resolver: _resolver,
  updateIndex: () => {},
}

const ThemeContext = createContext<ContextInterface>(defaultValue)

const ThemeProvider = ({ children }) => {
  const [themeIndex, setThemeIndex] = useState<number>(defaultValue.themeIndex)
  const [components, setComponents] = useState<any[]>(defaultValue.components)
  const [categories, setCategories] = useState<string[]>(defaultValue.categories)
  const [resolver, _setResolver] = useState<object>(defaultValue.resolver)

  const themeNames = themes.map((t) => t.name)

  useEffect(() => {
    updateIndex(0)
  }, [])

  const updateIndex = async (index) => {
    setThemeIndex(index)

    const componentsObject = await themes[index].load()
    const componentsArray = Object.values(componentsObject.default)
    setComponents(componentsArray)
    setCategories(getCategories(componentsArray))
  }

  const value = { components, categories, resolver, themeNames, themeIndex, updateIndex }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
export { ThemeContext, ThemeProvider }
