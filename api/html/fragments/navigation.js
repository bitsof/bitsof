const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const filePath = path.join(process.cwd(), 'public/html/fragments/navigation.html');
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(content);
    }
    
    // Simple fallback navigation
    const nav = `
      <nav>
        <ul>
          <li><a href="/" hx-get="/api/get-home-content" hx-target="#main-content" hx-push-url="/">Home</a></li>
          <li><a href="/blog" hx-get="/api/get-blog-list" hx-target="#main-content" hx-push-url="/blog">Blog</a></li>
          <li><a href="/about" hx-get="/api/get-about-content" hx-target="#main-content" hx-push-url="/about">About</a></li>
        </ul>
      </nav>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(nav);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    
    // Minimal fallback
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    `);
  }
}; 