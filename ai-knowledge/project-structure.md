# Project Knowledge: BitsOf Website

## Overview

*   **Project Name:** BitsOf
*   **Purpose:** Website for BitsOf (AI education/consulting), built with Astro. Features a blog with AI-assisted writing workflow.
*   **Core Technology:** Astro for content-focused web development with built-in content collections and Markdown support.

## Team Expertise (Highlights)

Focuses on: Generative AI, Agentic LLMs, Tool Calling, Zapier/N8N automation.

## Content Structure & URL Mapping

*   Blog posts are stored as Markdown files in `/src/content/blog/`
*   URL structure:
    *   `/` -> Home page
    *   `/about` -> About page
    *   `/blog` -> Blog listing page
    *   `/blog/{slug}` -> Individual blog post page

## Astro Content Collections

*   Uses Astro's built-in content collections for blog posts
*   Markdown files in `/src/content/blog/` are automatically processed by Astro
*   Frontmatter in each Markdown file provides metadata (title, description, date, etc.)
*   The result is a statically generated site with optimal performance

## Development Server

*   Uses Astro's development server (run via `bun dev` or `npm run dev`)
*   Automatically processes Markdown content and renders blog posts
*   Serves static assets (CSS, JS, images)
*   Provides hot module reloading for a smooth development experience

## Blog Publishing Workflow

*   **Content Creation:** Blog posts are written as Markdown files with frontmatter in `/content/blog/drafts/`
*   **Publication Process:** Final approved content is moved to `/src/content/blog/` (example: `openai-models-explained.md`)
*   **Automatic Processing:** Content in `/src/content/blog/` is automatically processed by Astro - no build step required
*   **Process:** Follows best practices detailed in **`ai-knowledge/drafting-process.md`**
*   **Standards:** Adheres to principles in **`ai-knowledge/writing-guide.md`** 