// server.js
import { serve } from "bun";
import path from "path";
import { readdir, readFile } from "fs/promises";
import fs from "fs";

// Content type map for static files
const CONTENT_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Get blog posts metadata from the public directory
async function getBlogPosts() {
    try {
        // Read the JSON file that will contain blog metadata
        const data = await readFile('public/data/blog-posts.json', 'utf-8');
        const posts = JSON.parse(data);
        return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
        console.error(`Error loading blog posts metadata: ${error}`);
        return [];
    }
}

serve({
    port: 3000,
    async fetch(req) {
        const url = new URL(req.url);
        const pathname = url.pathname;
        
        // Security: Prevent path traversal - but allow root path
        // Skip security check for root path or standard routes
        if (pathname !== '/' && 
            !pathname.startsWith('/get-') && 
            !pathname.startsWith('/css/') && 
            !pathname.startsWith('/js/') && 
            !pathname.startsWith('/images/') && 
            !pathname.startsWith('/data/') && 
            !pathname.match(/^\/blog(\/.*)?$/) && 
            pathname !== '/about' && 
            pathname !== '/index.html') {
            
            // Only apply path traversal check for non-standard paths
            if (!path.normalize(pathname).startsWith('/')) {
                return new Response("Forbidden", { status: 403 });
            }
        }

        // HTMX fragment endpoints
        if (pathname === '/get-home-content') {
            try {
                const content = await readFile('public/html/fragments/home.html', 'utf-8');
                return new Response(content, { 
                    headers: { 'Content-Type': 'text/html' }
                });
            } catch (error) {
                console.error(`Error loading home content: ${error}`);
                return new Response("Error loading home content", { status: 500 });
            }
        }
        
        if (pathname === '/get-about-content') {
            try {
                const content = await readFile('public/html/fragments/about.html', 'utf-8');
                return new Response(content, { 
                    headers: { 'Content-Type': 'text/html' }
                });
            } catch (error) {
                console.error(`Error loading about content: ${error}`);
                return new Response("Error loading about content", { status: 500 });
            }
        }
        
        if (pathname === '/get-blog-list') {
            try {
                const posts = await getBlogPosts();
                
                // Generate HTML for blog post list
                let html = '<h1>Blog Posts</h1><div class="blog-posts">';
                
                posts.forEach(post => {
                    const tagsHtml = post.tags ? 
                        `<span class="post-tags">Tags: ${post.tags}</span>` : '';
                    
                    html += `
                        <article class="blog-post">
                            <h3>
                                <a href="/blog/${post.slug}" 
                                   hx-get="/get-post/${post.slug}" 
                                   hx-target="#main-content" 
                                   hx-push-url="true">${post.title}</a>
                            </h3>
                            <div class="post-meta">
                                <span class="post-date">Posted on: ${post.date}</span>
                                ${tagsHtml}
                            </div>
                            <p class="post-excerpt">${post.excerpt || ''}</p>
                        </article>
                    `;
                });
                
                html += '</div>';
                
                return new Response(html, { 
                    headers: { 'Content-Type': 'text/html' }
                });
            } catch (error) {
                console.error(`Error loading blog posts: ${error}`);
                return new Response("Error loading blog posts", { status: 500 });
            }
        }
        
        if (pathname.startsWith('/get-post/')) {
            try {
                const slug = pathname.split('/').pop();
                const postPath = `public/html/fragments/blog/${slug}.html`;
                
                // Check if file exists
                if (!fs.existsSync(postPath)) {
                    return new Response("Blog post not found", { status: 404 });
                }
                
                const content = await readFile(postPath, 'utf-8');
                
                return new Response(content, { 
                    headers: { 'Content-Type': 'text/html' }
                });
            } catch (error) {
                console.error(`Error loading blog post: ${error}`);
                return new Response("Error loading blog post", { status: 404 });
            }
        }

        // Handle normal page requests (full HTML pages)
        if (pathname === '/' || pathname === '/index.html') {
            try {
                const file = Bun.file('public/index.html');
                return new Response(file, { 
                    headers: { 'Content-Type': 'text/html' }
                });
            } catch (error) {
                console.error(`Error serving index: ${error}`);
                return new Response("Error loading page", { status: 500 });
            }
        }
        
        if (pathname === '/about') {
            try {
                const file = Bun.file('public/html/about.html');
                return new Response(file, { 
                    headers: { 'Content-Type': 'text/html' }
                });
            } catch (error) {
                console.error(`Error serving about page: ${error}`);
                return new Response("Error loading page", { status: 500 });
            }
        }
        
        if (pathname === '/blog') {
            try {
                const file = Bun.file('public/html/blog/index.html');
                return new Response(file, { 
                    headers: { 'Content-Type': 'text/html' }
                });
            } catch (error) {
                console.error(`Error serving blog index: ${error}`);
                return new Response("Error loading page", { status: 500 });
            }
        }
        
        if (pathname.match(/^\/blog\/[^\/]+$/)) {
            try {
                const slug = pathname.split('/').pop();
                const postMetadata = await getBlogPosts().then(posts => 
                    posts.find(post => post.slug === slug)
                );
                
                if (!postMetadata) {
                    return new Response("Blog post not found", { status: 404 });
                }
                
                // Read the blog post template
                let templateContent = await readFile('public/html/blog/post.html', 'utf-8');
                
                // Replace template variables with actual metadata
                templateContent = templateContent
                    .replace('{{title}}', postMetadata.title || 'Blog Post')
                    .replace('{{excerpt}}', postMetadata.excerpt || 'Read our latest blog post');
                
                return new Response(templateContent, { 
                    headers: { 'Content-Type': 'text/html' }
                });
            } catch (error) {
                console.error(`Error serving blog post page: ${error}`);
                return new Response("Error loading page", { status: 500 });
            }
        }

        // Try serving static files from public directory
        try {
            let filePath;
            if (pathname.startsWith('/css/') || 
                pathname.startsWith('/js/') || 
                pathname.startsWith('/images/') ||
                pathname.startsWith('/data/')) {
                filePath = path.join('public', pathname);
            } else {
                filePath = path.join('public', pathname.slice(1));
            }
            
            const file = Bun.file(filePath);
            if (await file.exists()) {
                const contentType = CONTENT_TYPES[path.extname(filePath)] || 'application/octet-stream';
                return new Response(file, { 
                    headers: { 'Content-Type': contentType }
                });
            }
        } catch (error) {
            console.error(`Error serving static file: ${error}`);
        }

        // Default 404 response
        return new Response("Page Not Found", { status: 404 });
    }
});

console.log("Server running at http://localhost:3000"); 