// Static HTML include processing utilities
const fs = require('fs').promises;
const path = require('path');

/**
 * Check if a file exists
 * @param {string} filepath - Path to check
 * @returns {Promise<boolean>} True if file exists
 */
async function fileExists(filepath) {
  try {
    await fs.access(filepath);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Process HTML include directives in content
 * @param {string} content - HTML content with include directives
 * @param {string} root - Root directory path
 * @param {string} host - Host for API requests
 * @param {string} proto - Protocol for API requests
 * @returns {Promise<string>} Processed HTML content
 */
async function processIncludeDirectives(content, root, host, proto) {
  const regexp = /<!--#include(.+?)-->/g;
  let result = '';
  let lastIndex = 0;
  let match;
  
  while ((match = regexp.exec(content)) !== null) {
    // Add the content between the last match and this one
    result += content.substring(lastIndex, match.index);
    lastIndex = match.index + match[0].length;
    
    // Extract the directive parameters
    const params = match[1].match(/(file|virtual)="(.+?)"/);
    if (params && params.length > 2) {
      const type = params[1];
      const value = params[2];
      
      try {
        if (type === 'file') {
          // Include a local file
          let includeContent;
          const includePath = path.join(root, 'public', value);
          
          // Check if included file exists
          const exists = await fileExists(includePath);
          if (!exists) {
            console.error(`Include file not found: ${includePath}`);
            result += `<!-- Error: Included file not found: ${value} -->`;
            continue;
          }
          
          console.log(`Processing include: ${value}`);
          
          // Using Bun's optimized file reading
          const bunFile = Bun.file(includePath);
          includeContent = await bunFile.text();
          
          // Recursively process includes in the included file
          const processedInclude = await processIncludeDirectives(includeContent, root, host, proto);
          result += processedInclude;
        } else if (type === 'virtual') {
          console.log(`Processing virtual include: ${value}`);
          // Parse the URL to extract query parameters
          const url = new URL(value, `${proto}://${host}`);
          // Fetch from a URL
          try {
            const fetchResponse = await fetch(url);
            if (fetchResponse.ok) {
              result += await fetchResponse.text();
            } else {
              const errorMsg = `Error fetching ${value}: ${fetchResponse.status} ${fetchResponse.statusText}`;
              console.error(errorMsg);
              result += `<!-- ${errorMsg} -->`;
            }
          } catch (fetchErr) {
            const errorMsg = `Error fetching ${value}: ${fetchErr.message}`;
            console.error(errorMsg);
            result += `<!-- ${errorMsg} -->`;
          }
        }
      } catch (err) {
        const errorMsg = `Error processing include ${value}: ${err.message}`;
        console.error(errorMsg);
        result += `<!-- ${errorMsg} -->`;
      }
    } else {
      const directive = match[0];
      const errorMsg = `Invalid include directive format: ${directive}`;
      console.error(errorMsg);
      result += `<!-- ${errorMsg} -->`;
    }
  }
  
  // Add any remaining content
  result += content.substring(lastIndex);
  return result;
}

module.exports = {
  processIncludeDirectives
}; 