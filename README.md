# BitsOf Website

A simple website for BitsOf, built with Bun, JavaScript, and Markdown.

## Structure

*   `index.html`: Main HTML file, includes navigation and content area.
*   `style.css`: Basic CSS styling.
*   `script.js`: Fetches Markdown based on URL, converts it using Showdown.js (via CDN), and displays it. Handles basic client-side routing using the History API.
*   `content/`: Directory containing all Markdown page content.
    *   The file structure inside `content/` dictates the URL structure.
    *   `content/index.md` maps to the root URL (`/`).
    *   `content/about.md` maps to `/about`.
    *   `content/blog/post.md` maps to `/blog/post`.

## How to Run

### Using Bun (Recommended)

[Bun](https://bun.sh/) provides a fast, built-in development server with hot reloading.

1.  Make sure you have Bun installed.
2.  Navigate to the project directory in your terminal.
3.  Run `bun dev` (uses the script defined in `package.json` which executes `bun --hot server.js`).
4.  Open your web browser and go to `http://localhost:3000` (or the port specified in `server.js`).

## Adding Content

1.  Create `.md`