# Project Knowledge: BitsOf Website

## Overview

*   **Project Name:** BitsOf
*   **Purpose:** Website for BitsOf (AI education/consulting), built with Bun & static HTML includes. Features a blog with AI-assisted writing workflow.
*   **Core Technology:** Bun for development server, static includes for component reuse, static site generation.

## Team Expertise (Highlights)

Focuses on: Generative AI, Agentic LLMs, Tool Calling, Zapier/N8N automation.

## Content Structure & URL Mapping

*   HTML fragments for blog posts are in `/public/html/fragments/blog/`
*   URL structure:
    *   `/` -> Home page
    *   `/about` -> About page
    *   `/blog` -> Blog listing page
    *   `/blog/post/{slug}` -> Individual blog post page

## Static Site Architecture

*   Uses HTML include directives for component reuse
*   Include directives (`<!--#include file="/path/to/file.html" -->`) are processed at build time
*   The result is a completely static site with no client-side JavaScript dependencies
*   Blog post pages are generated from fragments during the build process
*   Complete static HTML files are created in the `dist` directory

## Development Server (`server.js`)

*   Uses Bun's native HTTP server (run via `bun dev`)
*   Processes include directives on-the-fly during development
*   Serves static assets (`.html`, `.css`, `.js`, images)
*   Blog posts are served from the generated HTML in `dist/blog/post/` directory

## Build Process (`build.js`)

*   Processes main HTML pages replacing include directives with actual content
*   Generates individual blog post pages from fragments in `/public/html/fragments/blog/`
*   Creates a directory structure in `dist` that matches the URL structure
*   Copies static assets (CSS, JS, images) to the `dist` directory
*   Runs via `bun build` command

## Blog Publishing Workflow

*   **HTML Creation:** Blog posts are created as HTML fragments in `/public/html/fragments/blog/` (example: `openai-models-explained.html`)
*   **Component Structure:** Posts use a consistent HTML structure with proper metadata
*   **Build Step:** Running `bun build` generates complete HTML pages for each blog post
*   **Process:** Follows best practices detailed in **`ai-knowledge/drafting-process.md`**
*   **Standards:** Adheres to principles in **`ai-knowledge/writing-guide.md`** 