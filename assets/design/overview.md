
## Overview

Destack has are 2 main components:
- A [React component](../../lib/client/index.tsx) that shows the editor in `development` and the rendered page in `production`.
- A local server that [loads](../../lib/client/craft/editor/Editor.tsx#L29) and [saves](../../lib/client/craft/editor/Editor.tsx#L64) the user page data and [serves](../../lib/client/craft/viewport/LeftSidebar.tsx#L40) the theme files.

The local server supports 3 query types:
1. The `data` type which [loads and saves](../../lib/server/api/handle.ts#L173) the user page data
2. The `asset` type which [loads](../../lib/server/api/handle.ts#L173) specific assets (that's only `image/png` now)
2. The `theme` type which [loads](../../lib/server/api/handle.ts#L173) the theme `HTML` source code

## Next.js

- The [React component](../../lib/client/index.tsx) can be imported in [any Next.js route](../../dev/nextjs-project/pages/index.js) in the `pages` folder. In `development` the component [calls](../../lib/client/craft/editor/Editor.tsx#L29) the local server through `localhost` as the server is hosted as a Next.js API route. In `production` it loads the user page data using Next.js [`getStaticProps`](../../lib/server/props/index.ts).
- The local server uses Next.js API routes and serve the [endpoints](../../lib/server/api/handle.ts#L173) mentioned above.

## React

- The [React component](../../lib/client/index.tsx) can be imported in `index.js` or any sub-component but user should handle routing themselves (eg. with `react-router-dom`). In `development` the component [calls](../../lib/client/craft/editor/Editor.tsx#L29) the local server through `localhost` on port `12785`. That server is started with `destack -d` [helper script](../../dev/react-project/package.json#L7). In `production` the user page data is loaded with `destack -b` [helper script](../../dev/react-project/package.json#L8).
- The local server is a [standalone Node.js script](../../lib/server/react.bin.js) with `express` in contrast to Next.js version above but it server the [same endpoints](../../lib/server/api/handle.ts#L173) mentioned in the overview.

