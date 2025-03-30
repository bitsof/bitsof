// Bun HTML includes development server
const path = require('path');
const fs = require('fs').promises;
const { processIncludeDirectives } = require('./utils/include-utils');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DIST_DIR = path.join(process.cwd(), 'dist');

// Content type map for static files
function getContentType(ext) {
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  };
  return contentTypes[ext] || 'text/plain';
}

// Check if a file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

// Process and serve HTML files with includes
async function serveWithIncludes(req, filepath) {
  console.log(`Serving with includes: ${filepath}`);
  
  const exists = await fileExists(filepath);
  if (!exists) throw new Error(`File not found: ${filepath}`);
  
  const fileContent = await Bun.file(filepath).text();
  const host = req.headers.get('host') || `localhost:${PORT}`;
  const proto = req.headers.get('x-forwarded-proto') || 'http';
  const processed = await processIncludeDirectives(fileContent, process.cwd(), host, proto);
  
  return new Response(processed, {
    headers: { 'Content-Type': 'text/html' }
  });
}

// Serve static file
async function serveStaticFile(filePath) {
  console.log(`Serving static: ${filePath}`);
  const ext = path.extname(filePath).toLowerCase();
  return new Response(Bun.file(filePath), {
    headers: { 'Content-Type': getContentType(ext) }
  });
}

// Serve 404 page
async function serve404(req) {
  const notFoundPath = path.join(PUBLIC_DIR, '404.html');
  
  if (await fileExists(notFoundPath)) {
    return await serveWithIncludes(req, notFoundPath);
  }
  
  return new Response('<h1>404 - Page Not Found</h1>', {
    status: 404,
    headers: { 'Content-Type': 'text/html' }
  });
}

// Main request handler
async function handleRequest(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  
  try {
    // Handle root request
    if (pathname === '/' || pathname === '/index.html') {
      return await serveWithIncludes(req, path.join(PUBLIC_DIR, 'index.html'));
    }
    
    // Handle blog post URLs in dist directory
    if (pathname.startsWith('/blog/post/')) {
      const postPath = path.join(DIST_DIR, pathname + (pathname.endsWith('.html') ? '' : '.html'));
      if (await fileExists(postPath)) {
        return await serveStaticFile(postPath);
      }
    }
    
    // Try to serve as HTML page with includes
    let pagePath = path.join(PUBLIC_DIR, pathname);
    
    // Try with .html extension if needed
    if (!pathname.endsWith('.html')) {
      const pathWithExt = path.join(PUBLIC_DIR, pathname + '.html');
      if (await fileExists(pathWithExt)) {
        return await serveWithIncludes(req, pathWithExt);
      }
    }
    
    // Serve HTML with includes or static file
    if (await fileExists(pagePath)) {
      if (pathname.endsWith('.html')) {
        return await serveWithIncludes(req, pagePath);
      }
      return await serveStaticFile(pagePath);
    }
    
    // 404 response
    return await serve404(req);
  } catch (err) {
    console.error(`Server error: ${err.message}`);
    return new Response('<h1>500 - Server Error</h1>', {
      status: 500,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Start the server
const server = Bun.serve({
  port: PORT,
  fetch: handleRequest
});

console.log(`HTML includes development server running at http://localhost:${PORT}`);
console.log(`Serving files from: ${PUBLIC_DIR}`); 