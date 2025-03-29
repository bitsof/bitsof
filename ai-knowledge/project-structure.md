# Project Knowledge: BitsOf Website

## Overview

*   **Project Name:** BitsOf
*   **Purpose:** Static website for BitsOf (AI education/consulting), built with Bun & client-side Markdown rendering. Features a blog with AI-assisted writing workflow.
*   **Core Technology:** Bun server, Vanilla JS, Showdown.js (via CDN), Markdown.

## Team Expertise (Highlights)

Focuses on: Generative AI, Agentic LLMs, Tool Calling, Zapier/N8N automation.

## Content Structure & URL Mapping

*   Published content lives in `/content/`.
*   `/content/index.md` -> `/`
*   `/content/about.md` -> `/about`
*   `/content/blog/index.md` -> `/blog`
*   `/content/blog/post-name.md` -> `/blog/post-name`

## Client-Side Logic (`script.js`)

*   Handles single-page application (SPA) navigation using `history.pushState`.
*   Fetches corresponding Markdown from `/content/` based on URL path.
*   Implements fallback: If `/content/path.md` fails, tries `/content/path/index.md`.
*   Renders fetched Markdown to HTML (using Showdown.js) in the `#content` element.
*   Displays a "Not Found" message if content fetching fails.

## Server Logic (`server.js`)

*   Uses `Bun.serve` (run via `bun dev`).
*   Serves static assets (`.html`, `.css`, `.js`, images).
*   Serves requested `.md` files from `/content/` (for client-side fetching).
*   For path-based routes without extensions (e.g., `/about`, `/blog`) that don't match a file, serves `index.html` to enable client-side SPA routing.
*   Returns 404 for unresolved requests.

## Blog Drafting Workflow

*   **Location:** In-progress posts are in `/drafts/` (see `drafting-process.md`).
*   **Process:** Follows mandatory steps detailed in **`ai-knowledge/drafting-process.md`**.
*   **Standards:** Adheres to principles in **`ai-knowledge/writing-guide.md`**. 