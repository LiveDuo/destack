# Destack 🔌 Embrace design. Own the stack.

Build landing pages visually right in your React or Next.js projects. Deploy them zero further configuration!

**🏭 Examples:** [prettyfunnels.com](https://www.prettyfunnels.com/landing), [getdestack.com](https://www.getdestack.com/)

# Announcements

📣 [13/06/2023] Three more themes have been added [Preline](https://preline.co/), [Flow Bite](https://flowbite.com/) and [Flow Rift](https://flowrift.com/).

📣 [04/02/2023] The next version of Destack is out with the new editor is focused on simplicity. It's available on NPM with destack@2 or destack@latest.

📣 [17/12/2022] Destack v2 is now in beta. It's a major rewrite that comes new custom page builder based on Craft.js.

You can check it out at [destack-starter-beta](https://github.com/LiveDuo/destack-starter-beta). More info at https://github.com/LiveDuo/destack/pull/62 and https://github.com/LiveDuo/destack/issues/22.

📣 [11/10/2022] Destack now supports multiple themes. Two new themes have been added [Meraki UI](https://merakiui.com/) and [Hyper UI](https://www.hyperui.dev/).

[![Tutorial](https://raw.githubusercontent.com/LiveDuo/destack/main/assets/youtube/craft.jpg)](https://www.youtube.com/watch?v=JTfUCCGaUd4 "Tutorial")

# What's Destack?

It's a tool to build landing pages within your [React](https://reactjs.org/) or [Next.js](https://nextjs.org/) projects. Destack includes multiple components from [Tailblocks](https://tailblocks.cc/), [Meraki UI](https://merakiui.com/), [Hyper UI](https://www.hyperui.dev/), [Preline](https://preline.co/), [Flow Bite](https://flowbite.com/) and [Flow Rift](https://flowrift.com/).. It also supports image uploads and form submissions.

*Destack helps you stop worrying about marketing pages so you can focus on your project.*

# Themes

Destack now supports theme selection.

<table border="0">

 <tr>
    <td width="48%">
    <img src="https://raw.githubusercontent.com/LiveDuo/destack/feature/craftjs/assets/themes/screenshot-craft.png"/>    
    Theme selection
</td>
    <td width="48%"><img src="https://raw.githubusercontent.com/LiveDuo/destack/main/assets/themes/screenshot-meraki-ui.png"/>Meraki UI (<a href="https://merakiui.com/components">Components</a>)</td>
 </tr>
  <tr>
    <td width="48%"><img src="https://raw.githubusercontent.com/LiveDuo/destack/main/assets/themes/screenshot-hyper-ui.png"/>Hyper UI (<a href="https://www.hyperui.dev/components/marketing">Components</a>)</td>
    <td width="48%"><img src="https://raw.githubusercontent.com/LiveDuo/destack/main/assets/themes/screenshot-tailblocks.png"/>Tailblocks (<a href="https://tailblocks.cc/">Components</a>)</td>
 </tr>
  <tr>
    <td width="48%"><img src="https://raw.githubusercontent.com/LiveDuo/destack/main/assets/themes/screenshot-hyper-ui.png"/>Preline (<a href="https://preline.co/examples.html">Components</a>)</td>
    <td width="48%"><img src="https://raw.githubusercontent.com/LiveDuo/destack/main/assets/themes/screenshot-tailblocks.png"/>Flow Rift (<a href="https://flowrift.com/">Components</a>)</td>
 </tr>
 <tr>
    <td width="48%"><img src="https://raw.githubusercontent.com/LiveDuo/destack/main/assets/themes/screenshot-hyper-ui.png"/>Flow Bite (<a href="https://flowbite.com/blocks/">Components</a>)</td>
 </tr>
</table>


### Contribute (add a new theme)

There are many open source Tailwind themes that Destack can support. If you want to help adding a new theme create a new topic in [discussions](https://github.com/LiveDuo/destack/discussions) or reach out to me on [twitter](https://twitter.com/andreas_tzionis).

# Features

#### 🧱 Powerful Blocks

There are hundreds of well designed and heavily functional blocks from [Tailblocks](https://tailblocks.cc/), [Meraki UI](https://merakiui.com/), [Hyper UI](https://www.hyperui.dev/), [Preline](https://preline.co/), [Flow Bite](https://flowbite.com/) and [Flow Rift](https://flowrift.com/).. Supports Tailwind's theme colors ie. Red, Yellow, Green, Blue, Indigo, Purple & Pink.

#### 🃏 Delightful Builder

Powered by [Craft.js](https://craft.js.org/), a minimal page-builder framework. The builder was created with simplicity in mind and aims to be quickest way to build a landing page for a side-project.

#### 🕹 Data Ownership

Destack stores all your assets on Github, Bitbucket etc through the editor. There are no external dependencies to manage or worry about.

#### 🏞 Assets & Forms Support

Stores the images uploaded in the editor in your repository & displays them when needed on production. Also supports HTML and API form submission out of the box.

#### 👩🏻‍💻 Easy Setup & Deployment

Works existing & new [React](https://reactjs.org/) and [Next.js](https://nextjs.org/) projects. Requires minimal setup and no extra configuration to deploy your landing pages to production.

# Getting Started

### With a new Next.js project:

- Fork the [destack-starter](https://github.com/LiveDuo/destack-starter) project

- OR deploy a project to Vercel: [<img src="https://raw.githubusercontent.com/LiveDuo/destack/main/assets/deploy/vercel_big.png" width="92">](https://vercel.com/new/git/external?repository-url=https://github.com/LiveDuo/destack-starter&project-name=destack-starter&repository-name=destack-starter)

- OR preview it online with Gitpod: [<img src="https://raw.githubusercontent.com/LiveDuo/destack/main/assets/deploy/gitpod_big.png" width="92">](https://gitpod.io/#https://github.com/LiveDuo/destack-starter)

### With an existing Next.js project:

##### 1. Install Destack on your Next.js project

```sh
npm i destack
```

##### 2. Setup the builder endpoint

Create `pages/api/builder/handle.js` and add the following:
```js
export { handleEditor as default, config } from 'destack/build/server'
```

##### 3. Then create a new page

On any Next.js page you want to setup Destack:
```js
import 'destack/build/browser/index.css'
export { getStaticProps } from 'destack/build/server'
export { ContentProvider as default } from 'destack'
```

<details>
<summary>How to use the legacy page-builder (Grapesjs)</summary>
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

- OR deploy a project to Vercel: [<img src="https://raw.githubusercontent.com/LiveDuo/destack/main/assets/deploy/vercel_big.png" width="92">](https://vercel.com/new/git/external?repository-url=https://github.com/LiveDuo/destack-react-starter&project-name=destack-react-starter&repository-name=destack-react-starter)

- OR preview it online with Gitpod: [<img src="https://raw.githubusercontent.com/LiveDuo/destack/main/assets/deploy/gitpod_big.png" width="92">](https://gitpod.io/#https://github.com/LiveDuo/destack-react-starter)

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
import 'destack/build/browser/index.css'
export { ContentProviderReact as default } from 'destack'

```

<details>
<summary>How to use the legacy page-builder (Grapesjs)</summary>
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

> Next.js 🅧 ➕ Tailwind CSS 🍃 ➕ Craft.js 🧶 = 💣💣

Please go and show these projects some love (⭐️). 

Don't forget to check out [Tailblocks](https://tailblocks.cc/), [Meraki UI](https://merakiui.com/), [Hyper UI](https://www.hyperui.dev/), [Preline](https://preline.co/), [Flow Bite](https://flowbite.com/) and [Flow Rift](https://flowrift.com/)., without their amazing open sourced components none of this would have been possible.  

# Contributors
<a href="https://github.com/liveduo/destack/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=LiveDuo/destack" />
</a>  

Made with [contributors-img](https://contrib.rocks).  

# Upcoming Tasks
- [ ] Add admin UI as a Next.js route

