const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const { slug } = req.query;
  
  try {
    const postPath = path.join(process.cwd(), `public/html/fragments/blog/${slug}.html`);
    
    if (fs.existsSync(postPath)) {
      const content = fs.readFileSync(postPath, 'utf8');
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(content);
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`<h1>Post Not Found</h1><p>The post "${slug}" was not found.</p><p><a href="/blog" hx-get="/api/get-blog-list" hx-target="#main-content" hx-push-url="/blog">Back to blog</a></p>`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`<h1>Error</h1><p>Could not load post.</p><p><a href="/blog" hx-get="/api/get-blog-list" hx-target="#main-content" hx-push-url="/blog">Back to blog</a></p>`);
  }
}; 