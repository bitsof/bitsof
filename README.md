# Bitsof - Astro Website

This project is the Astro implementation of the Bitsof website. It's built with modern web technologies to ensure fast performance, excellent SEO, and a great developer experience.

## 🚀 Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── UI components (.astro)
│   ├── content/
│   │   └── blog/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       └── formatDate.ts
├── astro.config.mjs
├── .env
├── .env.example
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🧞 Commands

All commands are run from the root of the project using [Bun](https://bun.sh/):

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun run dev`             | Starts local dev server at `localhost:4321`      |
| `bun run build`           | Build your production site to `./dist/`          |
| `bun run preview`         | Preview your build locally before deploying      |
| `bun run lint`            | Run ESLint to check for code issues              |
| `bun run lint:fix`        | Run ESLint and automatically fix issues          |
| `bun run format`          | Format code with Prettier                        |

## 🛠️ Technology Stack

- **[Astro](https://astro.build/)**: Core framework
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[MDX](https://mdxjs.com/)**: Enhanced Markdown for content
- **ESLint & Prettier**: Code quality and formatting

## 📦 Project Features

- 📝 **Content Collections** for type-safe content management
- 🔄 **Tailwind CSS** for styling
- 📱 **Responsive design** for all device sizes
- 🔍 **SEO optimized** with built-in sitemap generation
- 🖼️ **Image optimization** for faster loading
- 🔧 **TypeScript** for code quality and developer experience

## 🧪 Development Workflow

1. Create a new branch for your feature or bugfix
2. Implement your changes using the project's conventions
3. Run `bun run lint` and `bun run format` to ensure code quality
4. Test your changes using `bun run dev`
5. Create a pull request for review

## 🚢 Deployment

The site is built as a static site that can be deployed to any static hosting provider:

1. Run `bun run build` to generate the production build
2. The `dist/` directory can be deployed to services like Netlify, Vercel, or GitHub Pages

## 🔄 Environment Variables

Copy `.env.example` to `.env` and fill in your values. The following environment variables are available:

- `PUBLIC_SITE_URL`: The public URL of your site
- `PUBLIC_SITE_TITLE`: The title of your site
- `PUBLIC_SITE_DESCRIPTION`: The description of your site
- `API_TOKEN`: API token for external services (if needed)
- `DATABASE_URL`: Database URL (if needed)

```sh
bun create astro@latest -- --template blog
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/blog)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/blog)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/blog/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![blog](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun dev`             | Starts local dev server at `localhost:4321`      |
| `bun build`           | Build your production site to `./dist/`          |
| `bun preview`         | Preview your build locally, before deploying     |
| `bun astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
