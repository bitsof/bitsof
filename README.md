# Bitsof - Astro Website

This project is the Astro implementation of the Bitsof website. It's built with modern web technologies to ensure fast performance, excellent SEO, and a great developer experience.

## 🚀 Project Structure

```
/
├── src/                        # Public website (Astro)
│   ├── components/             # UI components (.astro)
│   ├── content/blog/           # Published blog posts
│   ├── layouts/                # Page layouts
│   ├── pages/                  # Route pages
│   ├── styles/                 # Global styles
│   └── utils/                  # Utility functions
│
├── internal/                   # Business operations (not published)
│   ├── drafts/
│   │   ├── blog/               # Blog post drafts
│   │   └── tweet/              # Tweet drafts
│   ├── processes/              # Workflows & guides
│   ├── clients/                # Client materials
│   └── templates/              # Reusable templates
│
├── tools/                      # Automation & tooling
│   ├── publishing/             # Publishing scripts
│   └── ai/                     # AI tooling
│
├── public/                     # Static assets
├── astro.config.mjs
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
