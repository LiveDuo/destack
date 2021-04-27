# Get started

### Installing the plugin
1. Run `npm i destack`

2. Create `pages/api/builder/handle.js` with the following:
```js
import { handleData } from 'destack'
export const config = {api: {bodyParser: false}}
export default (req, res) => handleData(req, res, [require('fs'), require('path')])
```

3. Then create a Next.js page with:

```js
import { ContentProvider, getStaticDataProps } from 'destack'

import '../node_modules/grapesjs/dist/css/grapes.min.css'

export const getStaticProps = () => getStaticDataProps([require('fs'), require('path')]) 

export default function Home({html, css}) { return (<ContentProvider html={html} css={css}/>) }
```

Deploy a new Next.js app on Vercel:\
\
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/progressive-web-app&project-name=progressive-web-app&repository-name=progressive-web-app)

<details>
<summary>Development</summary>
<br>

1. `git clone https://github.com/LiveDuo/destack` and cd in there

2. `npm i --legacy-peer-deps` (see note below)

3. `npm link`

4. create a Next.js project and cd into it

5. `npm link destack`

6. `npm link ../destack/node_modules/grapejs`

7. add `pages/api/builder/handle.js` and `pages/[component].js` as shown above.

8. move back into `destack` folder

9. `npm link ../\*\*the-next-project-folder\*\*/node_modules/react`

**Note:** If you are installing npm packages into the plugin remember to install with `--legacy-peer-deps`. If you missed that remember to delete `node_modules/react` and `node_modules/react-dom` folders and run step 5 again. If you know a better way to do this please let me know.
</details>

# TODO
- [ ] Fix forms blocks (tailwind HTML & icons)
- [ ] Write tests for ContentProvider
- [ ] Max width & colors settings
- [ ] Move builder API route to next.config.js
- [ ] Add support for form submission
