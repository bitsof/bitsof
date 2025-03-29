// server.js
import { serve } from "bun";
import path from "path"; // Need path module

serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    let filePath = path.join(".", url.pathname); // Get the requested path relative to root

    // Default to index.html for root path
    if (url.pathname === '/') {
      filePath = path.join(".", 'index.html');
    }

    // Security: Prevent path traversal
    const safePath = path.resolve(filePath);
    const projectRoot = path.resolve(".");
    if (!safePath.startsWith(projectRoot)) {
        console.warn(`Attempted path traversal: ${filePath}`);
        return new Response("Forbidden", { status: 403 });
    }

    const file = Bun.file(filePath);
    const fileExists = await file.exists();

    if (fileExists) {
        // Determine Content-Type based on file extension
        const extension = path.extname(filePath).toLowerCase();
        let contentType = "application/octet-stream"; // Default
        switch (extension) {
            case '.html': contentType = 'text/html'; break;
            case '.css': contentType = 'text/css'; break;
            case '.js': contentType = 'application/javascript'; break;
            case '.md': contentType = 'text/markdown'; break; // Serve markdown as text
            case '.json': contentType = 'application/json'; break;
            case '.png': contentType = 'image/png'; break;
            case '.jpg': case '.jpeg': contentType = 'image/jpeg'; break;
            // Add more mime types as needed
        }
        return new Response(file, { headers: { "Content-Type": contentType } });
    } else if (!path.extname(filePath) && url.pathname !== '/') {
        // If it's a path without an extension (like /about)
        // and wasn't found, it might be a client-side route.
        // Serve index.html to let the client handle routing.
        const indexFile = Bun.file(path.join(".", 'index.html'));
        if (await indexFile.exists()) {
            return new Response(indexFile, { headers: { "Content-Type": "text/html" } });
        }
    }

    // If file not found and it wasn't a client-side route fallback
    return new Response("Not Found", { status: 404 });
  },
  error(error) {
    console.error("Server error:", error);
    return new Response("Server Error: " + error.toString(), { status: 500 });
  },
});

console.log("Bun server listening on http://localhost:3000"); 