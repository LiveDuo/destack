# Destack 🔌 Own your stack. Embrace your design.

Visually build landing pages on Next.js and easily host them on Vercel or Netlify. 

Check out the editor: [Destack Builder](https://destack-page.vercel.app/)

<!-- <img src="https://github.com/LiveDuo/destack/raw/main/assets/logo_icons.png" width="100%"> -->

## What's Destack?

It's a tool to build landing pages within your [Next.js](https://nextjs.org/) project. It's powered by [Grapes.js](https://grapesjs.com/) and supports the complete set of blocks from [Tailblocks.cc](https://tailblocks.cc/). It also handles asset uploading for you and soon form submission. 

*Destack is a tool to help you stop worrying about the marketing sites and focus on your project.*

## Features

🧱 **Powerful Blocks:** There are 92 well designed and heavily functional blocks from the [Tailblocks](https://tailblocks.cc/) project.

🏞 **Assets Uploading:** Stores the images uploaded in the editor in your repo. Displays them when needed on production.

🃏 **Delightful Builder:** Powered by [Grapes.js](https://grapesjs.com/), a flexible and feature-full editor with CSS like options similar to Webflow.

🕹 **Data Ownership:** Destack stores all your assets on Github, Bitbucket etc through the editor. There are no external dependencies to manage or worry about.

👩🏻‍💻 **Developer Ready:** Works out of the box with any [Next.js](https://nextjs.org/) project. Build a few landing pages with Destack and the rest of your app with the usuall Next.js toolkit.

🏃🏽 **Instant Deployment:** Destack supports environment detection. The visual editor comes up only in development and the compiled version on production.

📸 **Easy Setup:** Click the **Deploy** button below to create a new Destack project on Vercel or head to **Installing the plugin** for instructions for your existing Next.js projects.


## One-minute demo

Deploy a new Next.js app on Vercel with Destack configured or preview in Gitpod:\
\
[<img src="https://github.com/LiveDuo/destack/raw/main/assets/vercel_big.png" width="92">](https://vercel.com/new/git/external?repository-url=https://github.com/LiveDuo/destack-starter&project-name=destack-starter&repository-name=destack-starter)
&nbsp;&nbsp;&nbsp;
[<img src="https://github.com/LiveDuo/destack/raw/main/assets/gitpod_big.png" width="92">](https://gitpod.io/#https://github.com/LiveDuo/destack-starter)

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
export { handleData as default, config } from 'destack/build/server'
```

### 3. Then create a new page
On any Next.js page you want to setup Destack:
```js
import 'grapesjs/dist/css/grapes.min.css'
export { getStaticProps } from 'destack/build/server'
export { ContentProvider as default } from 'destack'
```

<details>
<summary>How to use along other components</summary>
<br>

```js
import { ContentProvider } from 'destack'
import 'grapesjs/dist/css/grapes.min.css'

export { getStaticProps } from 'destack/build/server'

export default function Page(props) { 
    return (
        <div>
            <ContentProvider {...props}/>
            <span>Hello world</span>
        </div>)
}
```
</details>

## Contributing to the project

<details>
<summary>Instructions for development</summary>
<br>

1. `git clone https://github.com/LiveDuo/destack` and cd in there

2. `npm i --legacy-peer-deps` (see note below)

3. `npm link`

4. Create a Next.js project and cd into it

5. `npm link destack`

6. `npm link ../destack/node_modules/grapesjs`

7. Add `pages/api/builder/handle.js` and `pages/[component].js` as shown above.

8. Move back into `destack` folder

9. `npm link ../\*\*the-next-project-folder\*\*/node_modules/react`

**Note:** If you are installing npm packages into the plugin remember to install with `--legacy-peer-deps`. If you missed that remember to delete `node_modules/react` and `node_modules/react-dom` folders and run step 5 again. If you know a better way to do this please let me know.
</details>

## How is this possible?

This project was none's bright idea. It was not something that was planned and design in depth in advance. Instead it was evolved out of the need and enjoyment of using some amazing tools and prototype quickly. These projects heavily improved my developer life and a few of my friends'.

> Next.js 🅧 ➕ Tailwind CSS 🍃 ➕ Grapes.js 🍇 = 💣💣

Please go and show these projects some love (⭐️). Don't forget to check out [Tailblocks.cc](https://tailblocks.cc/), without Mert's amazing designs none of this would have been possible.

## Upcoming Tasks
- [ ] Fix forms blocks (tailwind HTML & icons)
- [ ] Write tests for ContentProvider
- [ ] Max width & colors settings
- [ ] Move builder API route to next.config.js
- [ ] Add support for form submission
