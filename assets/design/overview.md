
## Overview

Destack has are 2 main components:
- A React component that shows the editor in `development` and the rendered page in `production`.
- A local server that loads and saves the user page data and serves the theme files.

The local server supports 3 query types:
1. The `data` type which loads and saves the user page data
2. The `asset` type which loads specific assets (that's only `image/png` now)
2. The `theme` type which loads the theme `HTML` source code

## Next.js

- The React component can be imported in any Next.js route in the `pages` folder. In `development` the component calls the local server through `localhost` as the server is hosted as a Next.js API route. In `production` it loads the user page data using Next.js `getStaticProps`.
- The local server uses Next.js API routes and serve the endpoints mentioned above.

## React

- The React component can be imported in `index.js` or any sub-component but user should handle routing themselves (eg. with `react-router-dom`). In `development` the component calls the local server through `localhost` on port `12785`. That server is started with `destack -d` helper script. In `production` the user page data is loaded with `destack -b` helper script.
- The local server is a standalone Node.js script with `express` in contrast to Next.js version above but it server the same endpoints mentioned in the overview.
