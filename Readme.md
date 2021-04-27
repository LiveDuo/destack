# Destack 🔌 Own your stack. Embrace your design.

Visually build landing pages on Next.js and easily host them on Vercel or Netlify. 

## What's Destack?

It's a tool to build landing pages within your [Next.js](https://nextjs.org/) project. It's powered by [Grapes.js](https://grapesjs.com/) and supports the complete set of blocks from [Tailblocks.cc](https://tailblocks.cc/). It also handles asset uploading for you and soon form submission. 

*Destack is a tool to help you stop worrying about the marketing sites and focus on your project.*

## How is this possible?

This project was none's bright idea. It was not something that was planned and design in depth in advance. Instead it was evolved out of the need and enjoyment of using some amazing tools and prototype quickly. These projects heavily improved my developer life and a few of my friends'.

> Next.js 🅧 ➕ Tailwind CSS 🍃 ➕ Grapes.js 🍇 = 💣💣

Please go and show these projects some love (⭐️). Don't forget to check out [Tailblocks.cc](https://tailblocks.cc/), without Mert's amazing designs none of this would have been possible.

## Features

🧱 **Powerful blocks:** There are 92 well designed and heavily functional blocks from the [Tailblocks](https://tailblocks.cc/) project.

🏞 **Image uploading:** Stores images uploaded in the editor in your repo and displays when needed on production.

🃏 **Delightful Builder:** Powered by [Grapes.js](https://grapesjs.com/), Destack is both flexible and feature-full.

🕹 **Stack Control:** Destack stores all your assets on Github, Bitbucket etc through the editor so you don't have to worry about them.

👩🏻‍💻 **Developer Ready:** Works out of the box with any [Next.js](https://nextjs.org/) project. It common to have one landing page with Destack a few more pages with the usuall Next.js toolkit.

🏃🏽 **Instant Deployment:** Uses environment detection so the visual editor popus up only in development and the compiled version in production.

📸 **Template Projects:** Click on the Deploy button below to create a new Destack project.


## One-minute demo

Deploy a new Next.js app on Vercel with Destack configured:\
\
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/progressive-web-app&project-name=progressive-web-app&repository-name=progressive-web-app)\
\
👨‍💻 When you run the project locally you will see the editor and a large number of Tailwind blocks to play with. 

💡 Notice the changes you are making are saved into a `default.json` file. That file contains the HTML for the and is used when your Next.js project is built. Also, images are saved in the `public/uploaded` folder. After testing Destack locally, remember to head back to Vercel and checkout deployed version!

## Installing the plugin

### 1. Install Destack on your Next.js project
```sh
npm i destack
```

### 2. Setup the builder endpoint

Create `pages/api/builder/handle.js` and add the following:
```js
import { handleData } from 'destack'
export const config = {api: {bodyParser: false}}
export default (req, res) => handleData(req, res, [require('fs'), require('path')])
```

### 3. Then create a new page
On any Next.js page you want to setup Destack:
```js
import { ContentProvider, getStaticDataProps } from 'destack'

import '../node_modules/grapesjs/dist/css/grapes.min.css'

export const getStaticProps = () => getStaticDataProps([require('fs'), require('path')]) 

export default function Home({html, css}) { return (<ContentProvider html={html} css={css}/>) }
```


## Contributing to the project

<details>
<summary>Instructions for development</summary>
<br>

1. `git clone https://github.com/LiveDuo/destack` and cd in there

2. `npm i --legacy-peer-deps` (see note below)

3. `npm link`

4. Create a Next.js project and cd into it

5. `npm link destack`

6. `npm link ../destack/node_modules/grapejs`

7. Add `pages/api/builder/handle.js` and `pages/[component].js` as shown above.

8. Move back into `destack` folder

9. `npm link ../\*\*the-next-project-folder\*\*/node_modules/react`

**Note:** If you are installing npm packages into the plugin remember to install with `--legacy-peer-deps`. If you missed that remember to delete `node_modules/react` and `node_modules/react-dom` folders and run step 5 again. If you know a better way to do this please let me know.
</details>

## Upcoming Tasks
- [ ] Fix forms blocks (tailwind HTML & icons)
- [ ] Write tests for ContentProvider
- [ ] Max width & colors settings
- [ ] Move builder API route to next.config.js
- [ ] Add support for form submission
