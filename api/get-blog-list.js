const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const filePath = path.join(process.cwd(), 'public/html/fragments/blog/index.html');
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(content);
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Blog Posts</h1><p>No posts available.</p>');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Blog Posts</h1><p>Error loading posts.</p>');
  }
}; 