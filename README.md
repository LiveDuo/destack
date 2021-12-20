# Destack 🔌 Own your stack. Embrace your design.

Build landing pages visually right in your React or Next.js projects. Deploy them zero further configuration!

Editor preview: [Destack Online Builder](https://destack-page.vercel.app/)

Example in production: [prettyfunnels.com](https://www.prettyfunnels.com/landing)

<!-- <img src="https://github.com/LiveDuo/destack/raw/main/assets/logo_icons.png" width="100%"> -->

[![Tutorial](https://github.com/LiveDuo/destack/raw/main/assets/youtube_preview.jpg)](https://www.youtube.com/watch?v=zJoaxMX7AKM "Tutorial")

# What's Destack?

It's a tool to build landing pages within your [React](https://reactjs.org/) or [Next.js](https://nextjs.org/) projects. It's powered by [Grapes.js](https://grapesjs.com/) and includes the complete set of blocks from [Tailblocks.cc](https://tailblocks.cc/). Supports asset uploading, form submission and a variaty of Tailwind colors. 

*Destack is a tool to help you stop worrying about the marketing pages and focus on your project.*

# Features

#### 🧱 Powerful Blocks

There are 92 well designed and heavily functional blocks from the [Tailblocks](https://tailblocks.cc/) project. Supports Tailwind's theme colors ie. Red, Yellow, Green, Blue, Indigo, Purple & Pink.

#### 🃏 Delightful Builder

Powered by [Grapes.js](https://grapesjs.com/), a flexible and feature-full editor similar to Webflow that supports margins, paddings, borders and a lot of others CSS-like options that are familiar to developers.

#### 🕹 Data Ownership

Destack stores all your assets on Github, Bitbucket etc through the editor. There are no external dependencies to manage or worry about.

#### 🏞 Assets & Forms Support

Stores the images uploaded in the editor in your repository & displays them when needed on production. Also supports HTML and API form submission out of the box.

#### 👩🏻‍💻 Easy Setup & Deployment

Works existing & new [React](https://reactjs.org/) and [Next.js](https://nextjs.org/) projects. Requires minimal setup and no extra configuration to deploy your landing pages to production.

# Getting Started

### With a new Next.js project:

- Fork the [destack-starter](https://github.com/LiveDuo/destack-starter) project

- OR deploy a project to Vercel: [<img src="https://github.com/LiveDuo/destack/raw/main/assets/vercel_big.png" width="92">](https://vercel.com/new/git/external?repository-url=https://github.com/LiveDuo/destack-starter&project-name=destack-starter&repository-name=destack-starter)

- OR preview it online with Gitpod: [<img src="https://github.com/LiveDuo/destack/raw/main/assets/gitpod_big.png" width="92">](https://gitpod.io/#https://github.com/LiveDuo/destack-starter)

### With an existing Next.js project:

##### 1. Install Destack on your Next.js project

```sh
npm i destack
```

##### 2. Setup the builder endpoint

Create `pages/api/builder/handle.js` and add the following:
```js
export { handleData as default, config } from 'destack/build/server'
```

##### 3. Then create a new page

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
        <div style={{height: '100%'}}>
            <span>Hello world</span>
            <ContentProvider {...props}/>
        </div>)
}
```
</details>

### With a new React.js project:

- Fork the [destack-react-starter](https://github.com/LiveDuo/destack-react-starter) project

- OR deploy a project to Vercel: [<img src="https://github.com/LiveDuo/destack/raw/main/assets/vercel_big.png" width="92">](https://vercel.com/new/git/external?repository-url=https://github.com/LiveDuo/destack-react-starter&project-name=destack-react-starter&repository-name=destack-react-starter)

- OR preview it online with Gitpod: [<img src="https://github.com/LiveDuo/destack/raw/main/assets/gitpod_big.png" width="92">](https://gitpod.io/#https://github.com/LiveDuo/destack-react-starter)

### With an existing React.js project:

##### 1. Install Destack on your React.js project

```sh
npm i destack
```

##### 2. Setup the builder endpoint

In `package.json`:
- Replace the "start" script with `destack -d \"react-scripts start\"`
- Then, replace the "build" script with `destack -b \"react-scripts build\"`

##### 3. Then create a new page

In any React.js component you want to setup Destack:
```js
import 'grapesjs/dist/css/grapes.min.css'
export { ContentProviderReact as default } from 'destack'

```

<details>
<summary>How to use along other components</summary>
<br>

```js
import 'grapesjs/dist/css/grapes.min.css'

import { ContentProviderReact } from 'destack'

const App = () => {
  return (
    <div style={{ height: '100%' }}>
      <span>Hello world</span>
      <ContentProviderReact />
    </div>
  )
}
export default App
```
</details>

# How it works

🛠 Destack is composed of two main components, the first is a React component that shows the editor or the generated page and the second is a Next.js API route that saves your progress to your repository.

👨‍💻 When you run the project in `development` (ie. with `npm run dev`) the React component understands it from the `NODE_ENV` environment variable and shows you the editor where you can create your landing page visually. 

💡 Every change you make goes to the API route which updates a `default.json` file. That file contains the HTML for your landing page and it remembers how you structure your page so you can come back later to update it. 

🚀 When is time to go in `production` (ie. do `npm run build`  or deploy to Vercel) the React component reads `NODE_ENV` again and statically generates the HTML version of the page you build in the editor from the `default.json` file Destack created for you earlier.

> Note: The above description is for Next.js. In React.js, the `destack -b` script creates an API route similar to the one described above that handles template changes and file uploads in development. In production the `destack -d` script copies `default.json` to the `public` folder and builds a static version of the page.

# How to's & guides

### Adding an HTML form

- Drop a block that contains a form
- Click on the form & head to components settings
- Add form URL & check `async` if don't want a redirection
- To handle a `async` forms you can create an API route
  - Next.js: Create a file in [api/submit.js](https://github.com/LiveDuo/destack/blob/main/dev/nextjs-project/pages/api/submit.js)
  - React.js: You will need a seperate Node.js server listening on `/api/submit`

### Uploading images

- Drop a block that contains an image or use image block
- Click on an image to open the upload modal
- Select the image you want to update and click on it to add it to the page
- Note: Images are uploaded to `public/uploaded` with their original filenames

### Show editor in production

- Install Destack to a new or existing project
- Set `showEditorInProd={true}` in the `ContentProvider` component
- The result should be similar to [Destack Online Builder](https://destack-page.vercel.app/)

Note: this is only available for Next.js.

<details>
<summary>Code snippet</summary>
<br>

```js
import { ContentProvider } from 'destack'
import 'grapesjs/dist/css/grapes.min.css'

export { getStaticProps } from 'destack/build/server'

export default function Page(props) { 
  return (
    <div style={{height: '100%'}}>
      <ContentProvider {...props} showEditorInProd={true}/>
    </div>)
}
```
</details>

# Multi-page Support

### Next.js

Create a new page file in `pages` folder of the Next.js project and import `destack` as described in [#with-an-existing-nextjs-project](#with-an-existing-nextjs-project) to various pages.

### React.js

Install a routing library such as `react-router-dom` or `router-tutorial` in the React.js project and import `destack` as described in [#with-a-new-reactjs-project](#with-a-new-reactjs-project) to various routes. For more info check out [destack-react-starter](https://github.com/LiveDuo/destack-react-starter).

# Contributing to the project
  See [CONTRIBUTING.md](CONTRIBUTING.md)
<br>

# How this project came to existence

This project was nothing that was planned and design in depth in advance. Instead it was evolved out of the need and enjoyment of using some amazing tools and prototype quickly. These projects heavily improved my developer life and a few of my friends'.

> Next.js 🅧 ➕ Tailwind CSS 🍃 ➕ Grapes.js 🍇 = 💣💣

Please go and show these projects some love (⭐️). Don't forget to check out [Tailblocks.cc](https://tailblocks.cc/), without Mert's amazing designs none of this would have been possible.  

# Contributors
<a href="https://github.com/liveduo/destack/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=LiveDuo/destack" />
</a>  

Made with [contributors-img](https://contrib.rocks).  

# Upcoming Tasks
- [ ] Intoduce Destack templates
- [ ] Custom tailwind.config.js file
