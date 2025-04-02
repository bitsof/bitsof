// Build script for processing HTML includes at build time
const fs = require('fs/promises');
const path = require('path');
const { processIncludeDirectives } = require('./utils/include-utils');

// Configuration
const sourceDir = path.join(process.cwd(), 'public');
const outputDir = path.join(process.cwd(), 'dist');
const host = process.env.VERCEL_URL || 'yourdomain.com'; // This will be used for API calls in includes
const proto = 'https';

// Pages to process (relative to public directory)
const mainPages = [
  'index.html',
  'about.html',
  'blog.html',
  '404.html'
  // 'post.html' - No longer needed as we'll generate individual post files
];

// Assets to copy (subdirectories of public)
const assetDirs = [
  'css',
  'js',
  'images'
];

// Blog post template
const postTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} - BitsOf</title>
    <meta name="description" content="{{DESCRIPTION}}">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <header>
        <!--#include file="/html/fragments/navigation.html" -->
    </header>
    
    <main>
        <div id="main-content">
            {{CONTENT}}
        </div>
    </main>

    <footer>
        <!--#include file="/html/fragments/footer.html" -->
    </footer>
</body>
</html>`;

// Ensure output directory exists
async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
}

// Copy a directory (only non-HTML files)
async function copyAssetDir(src, dest) {
  try {
    // Check if source directory exists
    try {
      await fs.access(src);
    } catch (err) {
      console.log(`Skipping non-existent directory: ${src}`);
      return;
    }

    // Create destination directory
    await ensureDir(dest);
    
    // Get all files in the directory
    const entries = await fs.readdir(src, { withFileTypes: true });
    
    // Process each entry
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively copy subdirectory
        await copyAssetDir(srcPath, destPath);
      } else if (!entry.name.endsWith('.html')) {
        // Copy non-HTML files
        await fs.copyFile(srcPath, destPath);
        console.log(`Copied: ${path.relative(sourceDir, srcPath)}`);
      }
    }
  } catch (err) {
    console.error(`Error copying assets: ${err.message}`);
  }
}

// Process an HTML file with include directives
async function processHtmlFile(filename) {
  try {
    const src = path.join(sourceDir, filename);
    const dest = path.join(outputDir, filename);
    
    console.log(`Processing ${filename}`);
    
    // Ensure the destination directory exists
    await ensureDir(path.dirname(dest));
    
    // Read the file
    const content = await fs.readFile(src, 'utf8');
    
    // Process include directives
    const processed = await processIncludeDirectives(content, process.cwd(), host, proto);
    
    // Write the processed file
    await fs.writeFile(dest, processed, 'utf8');
    
    console.log(`✓ Processed ${filename}`);
  } catch (err) {
    console.error(`Error processing ${filename}: ${err.message}`);
  }
}

// Extract metadata from a blog post fragment
async function extractPostMetadata(filePath, slug) {
  const content = await fs.readFile(filePath, 'utf8');
  
  // Extract title from h1
  const titleMatch = content.match(/<h1>(.*?)<\/h1>/);
  const title = titleMatch ? titleMatch[1] : 'Untitled Post';
  
  // Extract first paragraph for excerpt
  const excerptMatch = content.match(/<p>(.*?)<\/p>/);
  const excerpt = excerptMatch ? excerptMatch[1].substring(0, 155) + '...' : '';
  
  // Extract metadata from post-meta div
  const metaMatch = content.match(/<div class="post-meta">([\s\S]*?)<\/div>/);
  let date = new Date();
  let tags = [];
  
  if (metaMatch) {
    // Extract date
    const dateMatch = metaMatch[1].match(/Posted on: (.*?)(?:<\/span>|\n)/);
    if (dateMatch) {
      date = new Date(dateMatch[1]);
    }
    
    // Extract tags
    const tagsMatch = metaMatch[1].match(/Tags: (.*?)(?:<\/span>|\n)/);
    if (tagsMatch) {
      tags = tagsMatch[1].split(', ').map(tag => tag.trim());
    }
  }
  
  return {
    slug,
    title,
    date,
    tags,
    excerpt
  };
}

// Generate the blog list HTML
function generateBlogListHtml(posts) {
  // Sort posts by date, newest first
  posts.sort((a, b) => b.date - a.date);
  
  return `<h1>Blog Posts</h1>
<div class="blog-posts">
    ${posts.map(post => `<article class="blog-post">
        <h3>
            <a href="/blog/post/${post.slug}">${post.title}</a>
        </h3>
        <div class="post-meta">
            <span class="post-date">Posted on: ${post.date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span class="post-tags">Tags: ${post.tags.join(', ')}</span>
        </div>
        <p class="post-excerpt">${post.excerpt}</p>
    </article>`).join('\n    ')}
</div>`;
}

// Generate blog list fragment
async function generateBlogList() {
  try {
    const fragmentsDir = path.join(sourceDir, 'html/fragments/blog');
    const files = await fs.readdir(fragmentsDir);
    const posts = [];
    
    // Collect metadata from all posts
    for (const file of files) {
      if (file.endsWith('.html')) {
        const slug = file.replace('.html', '');
        const metadata = await extractPostMetadata(
          path.join(fragmentsDir, file),
          slug
        );
        posts.push(metadata);
      }
    }
    
    // Generate and write the blog list
    const blogListHtml = generateBlogListHtml(posts);
    const blogListPath = path.join(sourceDir, 'html/fragments/blog-list.html');
    
    // Ensure the fragments directory exists
    await ensureDir(path.dirname(blogListPath));
    
    // Write the generated list
    await fs.writeFile(blogListPath, blogListHtml);
    console.log(`✓ Generated blog list with ${posts.length} posts`);
    
  } catch (err) {
    console.error(`Error generating blog list: ${err.message}`);
  }
}

// Generate individual blog post pages from fragments
async function generateBlogPosts() {
  try {
    const fragmentsDir = path.join(sourceDir, 'html/fragments/blog');
    const outputBlogDir = path.join(outputDir, 'blog/post');
    
    // Ensure the output directory exists
    await ensureDir(outputBlogDir);
    
    // Check if blog fragments directory exists
    try {
      await fs.access(fragmentsDir);
    } catch (err) {
      console.log(`Blog fragments directory not found: ${fragmentsDir}`);
      return;
    }
    
    // Get all blog post fragments
    const files = await fs.readdir(fragmentsDir);
    
    for (const file of files) {
      if (file.endsWith('.html')) {
        const postId = file.replace('.html', '');
        const fragmentPath = path.join(fragmentsDir, file);
        const outputPath = path.join(outputBlogDir, `${postId}.html`);
        
        console.log(`Generating blog post page: ${postId}`);
        
        // Read the post content
        let content = await fs.readFile(fragmentPath, 'utf8');
        
        // Clean up HTMX attributes from the content if they exist
        content = content.replace(/hx-get="[^"]*"/g, '');
        content = content.replace(/hx-target="[^"]*"/g, '');
        content = content.replace(/hx-push-url="[^"]*"/g, '');
        
        // Replace back-to-blog links to use regular links
        content = content.replace(
          /<a\s+href="\/blog"[^>]*>/g, 
          '<a href="/blog">'
        );
        
        // Get metadata for title and description
        const metadata = await extractPostMetadata(fragmentPath, postId);
        
        // Create the post HTML
        let postHtml = postTemplate
          .replace('{{TITLE}}', metadata.title)
          .replace('{{DESCRIPTION}}', metadata.excerpt)
          .replace('{{CONTENT}}', content);
        
        // Process include directives in the generated file
        const processed = await processIncludeDirectives(postHtml, process.cwd(), host, proto);
        
        // Write the file
        await fs.writeFile(outputPath, processed, 'utf8');
        
        console.log(`✓ Generated blog post: ${postId}`);
      }
    }
  } catch (err) {
    console.error(`Error generating blog posts: ${err.message}`);
  }
}

// Main build function
async function build() {
  console.log('Starting build process...');
  const startTime = Date.now();
  
  try {
    // Clean output directory
    await fs.rm(outputDir, { recursive: true, force: true });
    await ensureDir(outputDir);
    
    // Generate the blog list first
    await generateBlogList();
    
    // Process main HTML pages
    for (const page of mainPages) {
      await processHtmlFile(page);
    }
    
    // Generate individual blog post pages
    await generateBlogPosts();
    
    // Copy asset directories
    for (const dir of assetDirs) {
      await copyAssetDir(path.join(sourceDir, dir), path.join(outputDir, dir));
    }
    
    const endTime = Date.now();
    console.log(`Build completed in ${((endTime - startTime) / 1000).toFixed(3)} seconds`);
  } catch (err) {
    console.error(`Build failed: ${err.message}`);
    process.exit(1);
  }
}

// Run the build
build(); 