# Server-Side Includes (SSI) Implementation

This project implements a simplified Server-Side Includes (SSI) approach that makes it easy to build a static site with reusable components.

## Overview

This approach:
1. Uses SSI directives in HTML files (`<!--#include file="path/to/file.html" -->`)
2. Processes these directives at build time (for production) or on-the-fly (for development)
3. Produces completely static HTML files for deployment to Vercel

## Development Workflow

During development:
- Run `bun run dev` to start the development server
- The server processes SSI directives on-the-fly
- This lets you create modular components using SSI includes
- Changes to included files are immediately reflected

## Build Process

For production:
- Run `bun run build` to build the site
- The build script processes all HTML files, replacing SSI directives with the actual content
- The output is placed in the `dist` directory
- This creates a fully static site without any server-side processing required

## Advantages

- **Simplicity**: Basic HTML includes with no complex framework
- **Performance**: Faster page loads with zero client-side JavaScript
- **SEO-friendly**: Search engines see complete HTML content
- **Maintainability**: Reusable components through SSI
- **Static Hosting**: Can be hosted anywhere that supports static files

## SSI Directives

This implementation supports these SSI directives:

1. File includes:
   ```html
   <!--#include file="path/to/file.html" -->
   ```

2. Virtual (API) includes:
   ```html
   <!--#include virtual="/api/endpoint" -->
   ```

## File Structure

- `public/`: Source files with SSI directives
- `dist/`: Built files with SSI directives processed (created during build)
- `api/ssi-utils.js`: SSI processing utilities
- `server.js`: Development server
- `build.js`: Build script for processing SSI directives for production

## Deployment

Just deploy the contents of the `dist` directory to any static hosting service like Vercel.

## Vercel Configuration

The `vercel.json` file is configured to:
1. Use the build command `bun build.js` to generate the static site
2. Serve the files from the `dist` directory 