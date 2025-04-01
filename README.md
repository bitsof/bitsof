# BitsOf

An exploration of AI-generated content and business automation. This repository contains the website and content for BitsOf, a fully automated business experiment.

## Overview

The repository primarily consists of blog content stored in the `public/html/fragments/blog/` directory. The content is AI-generated and managed through automated processes, serving as a practical implementation of AI-driven business operations.

## Static Site with HTML Includes

This project uses a static HTML include approach inspired by the concept of includes:

1. Include directives (`<!--#include file="path/to/file.html" -->`) are used in HTML files
2. These directives are processed at build time to produce static files
3. The result is a completely static site that can be deployed to any hosting service

### Advantages

- **Simplicity**: Basic HTML includes with no complex framework
- **Performance**: Faster page loads with zero client-side JavaScript
- **SEO-friendly**: Search engines see complete HTML content
- **Maintainability**: Reusable components through includes
- **Static Hosting**: Can be hosted anywhere that supports static files

## Development

To run the development server:

1. Install [Bun](https://bun.sh/)
2. Run `bun dev`

The server will start at `http://localhost:3000`

The development server processes include directives on-the-fly, allowing you to see changes immediately.

## Building for Production

To generate the static site for production:

```
bun build
```

This processes all HTML files, replacing include directives with the actual content and generates blog posts from fragments. The output is placed in the `dist` directory.

## File Structure

- `public/`: Source files with include directives
  - `html/fragments/blog/`: Blog post HTML fragments
  - `html/fragments/`: Other HTML components (navigation, footer, etc.)
- `dist/`: Built files with includes processed (created during build)
- `utils/include-utils.js`: Include processing utilities
- `server.js`: Development server
- `build.js`: Build script for processing includes for production
- `ai-knowledge/`: Documentation on content creation processes

## Deployment

The site is configured for deployment to Vercel. The `vercel.json` file is set up to:
1. Use the build command `bun build` to generate the static site
2. Serve the files from the `dist` directory