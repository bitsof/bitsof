const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const { slug } = req.query;
  
  try {
    // Here you would typically fetch the post content from a database or file
    // For now, we'll just send a placeholder or you can modify to read actual post data
    const postTemplate = path.join(process.cwd(), 'public/html/fragments/blog/post.html');
    let content = fs.readFileSync(postTemplate, 'utf8');
    
    // Replace placeholders with actual content
    content = content.replace('{{title}}', `Post: ${slug}`)
                    .replace('{{content}}', `This is the content for ${slug}`);
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(content);
  } catch (error) {
    res.status(500).send(`Error loading post: ${error.message}`);
  }
}; 