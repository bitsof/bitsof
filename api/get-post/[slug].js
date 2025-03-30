const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const { slug } = req.query;
  
  try {
    // Read the fragment content
    const fragmentPath = path.join(process.cwd(), `public/html/fragments/blog/${slug}.html`);
    const content = fs.readFileSync(fragmentPath, 'utf8');
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(content);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(404).send('Post not found');
  }
}; 