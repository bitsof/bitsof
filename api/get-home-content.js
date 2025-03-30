const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const filePath = path.join(process.cwd(), 'public/html/fragments/home.html');
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(content);
    }
    
    // Simple fallback
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>BitsOf - AI Solutions</h1><p>Welcome to BitsOf.</p>');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>BitsOf</h1><p>Error loading content.</p>');
  }
}; 