# Get started

### Install the plugin (ALPHA)
1. `npm i next-grapejs-plugin`

2. `pages/api/builder/handle.js`
```js
import { handleData } from 'next-grapejs-plugin'
export default (req, res) => handleData(req, res, {fs: require('fs'), path: require('path')}) 
```

3. `pages/[component].js` (Note: '..grapes.min.css') - **REMOVE CSS**
```js
import { MarkdownProvider, getServerSideDataProps } from 'next-grapejs-plugin'

import '../node_modules/next-grapejs-plugin/node_modules/grapesjs/dist/css/grapes.min.css'

export { getServerSideDataProps as getServerSideProps }

export default function Home({html}) { return (<MarkdownProvider html={html}/>) }
```

# TODO (launch)
1. Publish to NPM
2. Check behavour for "prod" and "dev" env vars
3. Move grape.js styles into the plugin
4. Fix missing tailwind responsive classes

# TODO (later)
1. Fix "Basic", "Extra" and "Forms" blocks (default to closed)
2. Max width settings (+colors)
3. Move builder API route to next.config.js

# Developemnt
1. npm link
2. npm link ../next-plugin-wysiwyg/node_modules/react
3. npm link next-grapejs-plugin (in linked project)
4. npm link ../next-grapejs-plugin/node_modules/grapejs (in linked project)