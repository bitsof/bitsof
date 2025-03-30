# Project Knowledge: BitsOf Website

## Overview

*   **Project Name:** BitsOf
*   **Purpose:** Website for BitsOf (AI education/consulting), built with Bun & HTMX. Features a blog with AI-assisted writing workflow.
*   **Core Technology:** Bun server, HTMX for dynamic content loading, static HTML fragments.

## Team Expertise (Highlights)

Focuses on: Generative AI, Agentic LLMs, Tool Calling, Zapier/N8N automation.

## Content Structure & URL Mapping

*   Published blog posts live in `/content/blog/posts/` as markdown files
*   Draft posts are stored in `/content/blog/drafts/`
*   Final HTML fragments for blog posts are in `/public/html/fragments/blog/`
*   Blog metadata is stored in `/public/data/blog-posts.json`
*   URL structure:
    *   `/` -> Home page
    *   `/about` -> About page
    *   `/blog` -> Blog listing page
    *   `/blog/{slug}` -> Individual blog post page

## Client-Side Logic

*   Uses HTMX for dynamic content loading without full page refreshes
*   Content is loaded via HTMX endpoints that return HTML fragments
*   Blog post URLs use the slug from metadata rather than the filename

## Server Logic (`server.js`)

*   Uses `Bun.serve` (run via `bun dev`).
*   Serves static assets (`.html`, `.css`, `.js`, images).
*   Provides HTMX endpoints that return HTML fragments:
    *   `/get-home-content` - Home page content
    *   `/get-about-content` - About page content
    *   `/get-blog-list` - List of all blog posts
    *   `/get-post/{slug}` - Content for a specific blog post
*   Blog posts are served from pre-generated HTML fragments in `/public/html/fragments/blog/`
*   Blog metadata is loaded from `/public/data/blog-posts.json`

## Blog Publishing Workflow

*   **Draft Location:** In-progress posts are in `/content/blog/drafts/` (see `drafting-process.md`).
*   **Final Markdown:** Completed posts go to `/content/blog/posts/` (example: `openai-models-explained.md`)
*   **HTML Conversion:** Final markdown is converted to HTML fragments in `/public/html/fragments/blog/` (example: `openai-models-explained.html`)
*   **Metadata:** Blog post metadata must be added to `/public/data/blog-posts.json`
*   **Process:** Follows mandatory steps detailed in **`ai-knowledge/drafting-process.md`**.
*   **Standards:** Adheres to principles in **`ai-knowledge/writing-guide.md`**. 