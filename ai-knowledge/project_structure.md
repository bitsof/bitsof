# Project Knowledge: BitsOf Website

## Overview

*   **Project Name:** BitsOf
*   **Purpose:** A simple static website for BitsOf, built with Bun, JavaScript, and Markdown. The site aims to educate businesses about AI possibilities, showcase the team's expertise, and share AI news/insights via a blog.
*   **Core Technology:** Client-side rendering of Markdown files served by a custom Bun server.

## Team Expertise (Highlights)

The BitsOf team has specific experience in:
*   Generative AI solutions
*   Making Large Language Models (LLMs) agentic
*   Implementing tool calling for LLMs
*   Using automation platforms (Zapier, N8N) to integrate AI and automate business processes.

## Content Structure & URL Mapping

The project serves Markdown files from the `content/` directory as website pages. The structure within `content/` directly maps to the site's URL paths:

*   `content/index.md` -> `/`
*   `content/about.md` -> `/about`
*   `content/blog/index.md` -> `/blog`
*   `content/blog/some-post.md` -> `/blog/some-post`

## Client-Side Rendering & Routing (`script.js`)

1.  **Navigation Interception:** Clicks on local links (`<a href="...">`) are intercepted.
2.  **URL Update:** The browser's URL is updated using `history.pushState` without a full page reload.
3.  **Content Fetching (`loadContent` function):**
    *   Takes the requested path (e.g., `/blog`).
    *   Attempts to fetch the corresponding Markdown file first directly (e.g., `/content/blog.md`).
    *   If that fails (404), it attempts to fetch the `index.md` file within that path (e.g., `/content/blog/index.md`).
    *   If either fetch succeeds, the Markdown content is retrieved.
4.  **Markdown Conversion:** The fetched Markdown text is converted to HTML using the `Showdown.js` library (loaded via CDN in `index.html`).
5.  **DOM Update:** The resulting HTML is injected into the `<main id="content">` element in `index.html`.
6.  **Error Handling:** If neither potential Markdown path resolves, a "Page Not Found" message is displayed.

## Server (`server.js`)

The site is served using `bun dev`, which executes `bun --hot server.js`.

The `server.js` script uses `Bun.serve` to handle incoming HTTP requests:

*   **Static Files:** Serves existing files directly with appropriate Content-Type headers (e.g., `index.html`, `style.css`, `script.js`, images).
*   **Markdown Files:** Serves files from the `/content/` directory (e.g., `/content/about.md`, `/content/blog/index.md`) with a `text/markdown` Content-Type when requested by the client-side `fetch` call.
*   **Client-Side Route Handling:** If a request is made for a path that *doesn't* have a file extension (e.g., `/about`, `/blog`) and a direct file match isn't found, it serves the main `index.html` file. This allows the client-side JavaScript (`script.js`) loaded by `index.html` to handle the routing and fetch the correct Markdown content.
*   **Root Path:** Serves `index.html` for the `/` path.
*   **404:** Returns a 404 "Not Found" response for any requests that cannot be resolved by the above rules. 