# Get started

### Install the plugin (ALPHA)
1. next.config.js (NOTE: npm i next-transpile-modules)
```js
const withTM = require('next-transpile-modules')(['next-grapejs-plugin'], {resolveSymlinks: false})
module.exports = withTM({
  env: {
    ROOT: __dirname,
  }
})
```

2. styles/globals.css
```css
html,
body,
#__next {
  height: 100%;
}
```

3. pages/api/load.js & pages/api/save.js
```js
import { loadData } from 'next-grapejs-plugin'
export default loadData 
```
```
import { saveData } from 'next-grapejs-plugin'
export default saveData 
```

4. pages/[component].js (Note: '..grapes.min.css' and '...grape-fix.module.css')
```js
import { MarkdownProvider, getStaticDataProps } from 'next-grapejs-plugin'

import '../node_modules/next-grapejs-plugin/node_modules/grapesjs/dist/css/grapes.min.css'
import '../styles/grape-fix.module.css'

export { getStaticDataProps as getStaticProps }

export default function Home({data}) { return <MarkdownProvider data={data}/> }
```

5. next-grapejs-plugin/src/api/index.js (Hardcoded URL)
```js
const serverUrl = 'http://localhost:3000'
```

# TODO
1. Reduce "Get started"
2. Implement static building