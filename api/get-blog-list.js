const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    // Read blog posts from JSON data file
    const jsonPath = path.join(process.cwd(), 'public/data/blog-posts.json');
    const postsData = fs.readFileSync(jsonPath, 'utf8');
    const posts = JSON.parse(postsData);
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Generate HTML for blog post list
    let html = '<h1>Blog Posts</h1><div class="blog-posts">';
    
    posts.forEach(post => {
      const tagsHtml = post.tags ? 
        `<span class="post-tags">Tags: ${post.tags}</span>` : '';
      
      html += `
        <article class="blog-post">
          <h3>
            <a href="/blog/${post.slug}" 
               hx-get="/api/get-post/${post.slug}" 
               hx-target="#main-content" 
               hx-push-url="/blog/${post.slug}">${post.title}</a>
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
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
}; 