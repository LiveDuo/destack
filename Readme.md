# Get started

### Install the plugin (ALPHA)
1. npm i next-grapejs-plugin

2. pages/api/load.js & pages/api/save.js - **MERGE INTO ONE** TO FIX
```js
import { loadData } from 'next-grapejs-plugin'
export default loadData 
```
```js
import { saveData } from 'next-grapejs-plugin'
export default saveData 
```

3. next.config.js (NOTE: npm i next-transpile-modules) - **REMOVE withTM**
```js
const withTM = require('next-transpile-modules')(['next-grapejs-plugin'])
module.exports = withTM()
```

4. pages/[component].js (Note: '..grapes.min.css') - **REMOVE CSS**
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