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
import { MarkdownProvider } from 'next-grapejs-plugin'

import '../node_modules/next-grapejs-plugin/node_modules/grapesjs/dist/css/grapes.min.css'

export default function Home() { return <MarkdownProvider/> }
```

# TODO (launch)
1. Implement static building
2. Publish to NPM
3. Try cleaning up the CSS
4. Move grape.js styles into the package

# TODO (later)
1. Max width settings (+colors)
2. Move builder API route to next.config.js

# Developemnt
1. npm link
2. npm link ../next-plugin-wysiwyg/node_modules/react
3. npm link next-grapejs-plugin (in linked project)
4. npm link ../next-grapejs-plugin/node_modules/grapejs (in linked project)