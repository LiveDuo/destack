# Get started

### Install the plugin (ALPHA)
1. npm i next-grapejs-plugin

2. pages/api/load.js & pages/api/save.js - **MERGE INTO ONE** TO FIX
```js
import { loadData } from 'next-grapejs-plugin'
export default (_, res) => loadData(_, res, {fs: require('fs'), path: require('path')}) 
```
```js
import { saveData } from 'next-grapejs-plugin'
export default (req, res) => saveData(req, res, {fs: require('fs'), path: require('path')}) 
```

3. pages/[component].js (Note: '..grapes.min.css') - **REMOVE CSS**
```js
import { MarkdownProvider } from 'next-grapejs-plugin'

import '../node_modules/next-grapejs-plugin/node_modules/grapesjs/dist/css/grapes.min.css'

export default function Home() { return <MarkdownProvider/> }
```

# TODO
1. Reduce "Get started"
2. Publish to NPM
3. Implement static building
4. Add components from [https://tailblocks.cc/]
5. Max width settings

# Developemnt
1. npm link
2. npm link ../next-plugin-wysiwyg/node_modules/react
3. npm link next-grapejs-plugin (in linked project)