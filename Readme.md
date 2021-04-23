(ALPHA)

# Get started

### Installing the plugin
1. Run `npm i next-grapejs-plugin`

2. Create `pages/api/builder/handle.js` with the following:
```js
import { handleData } from 'next-grapejs-plugin'
export default (req, res) => handleData(req, res, {fs: require('fs'), path: require('path')}) 
```

3. Then create a Next.js page with:

```js
import { MarkdownProvider, getServerSideDataProps } from 'next-grapejs-plugin'

import '../node_modules/grapesjs/dist/css/grapes.min.css'

export { getServerSideDataProps as getServerSideProps }

export default function Home({html}) { return (<MarkdownProvider html={html}/>) }
```

### Installing the plugin (Development)
1. `git clone https://github.com/LiveDuo/next-grapejs-plugin` and cd in there

3. `npm i --legacy-peer-deps` (see note below)

4. `npm link`

5. create a Next.js project and cd into it

6. `npm link next-grapejs-plugin`

7. `npm link ../next-grapejs-plugin/node_modules/grapejs`

8. add `pages/api/builder/handle.js` and `pages/[component].js` as shown above.

9. move back into `next-grapejs-plugin` folder

10. `npm link ../\*\*the-next-project-folder\*\*/node_modules/react`

**Note:** If you are installing npm packages into the plugin remember to install with `--legacy-peer-deps`. If you missed that remember to delete `node_modules/react` and `node_modules/react-dom` folders and run step 5 again. If you know a better way to do this please let me know.


# TODO (launch)
-. Issue with data folder and json files not existing

1. Test out the NPM package
2. Check behavour for "prod" and "dev" env vars
3. Move grape.js styles into the plugin
4. Fix missing tailwind responsive classes

# TODO (later)
1. Fix "Basic", "Extra" and "Forms" blocks (default to closed)
2. Max width settings (+colors)
3. Move builder API route to next.config.js
