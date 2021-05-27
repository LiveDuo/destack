# Contributing to the project


* ## Instructions for development

1. `git clone https://github.com/LiveDuo/destack` and cd in there

2. `npm i --legacy-peer-deps` (see note below)

3. `npm link`

4. Create a Next.js project and cd into it

5. Add `pages/api/builder/handle.js` and `pages/[component].js` as shown above.

6. Rename `import 'grapesjs/dist/css/grapes.min.css'` to `import 'destack/node_modules/grapesjs/dist/css/grapes.min.css'`.

7. `npm link destack`

8. Move back into `destack` folder

9. `npm link ../\*\*your-next-project\*\*/node_modules/react`

**Note:** If you are installing npm packages into the plugin remember to install with `--legacy-peer-deps`. If you missed that remember to delete `node_modules/react` and `node_modules/react-dom` folders and run step 5 again. If you know a better way to do this please let me know.
