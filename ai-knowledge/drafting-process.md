# Blog Publishing Workflow and Best Practices

## Creating and Publishing Blog Posts

1. **Content Preparation**
   - Ensure content follows the writing guidelines in `writing-guide.md`
   - Make sure all images are properly formatted and referenced
   - Verify that all source attributions are present and accurate

2. **HTML Fragment Creation**
   - Create the blog post as an HTML fragment in `/public/html/fragments/blog/{slug}.html`
   - The slug should be a URL-friendly version of the title (e.g., `understanding-ai.html`)
   - HTML fragment must follow the established format with proper article structure

3. **HTML Fragment Structure**
   - Each blog post HTML fragment should follow this structure:
   ```html
   <article class="full-blog-post">
       <h1>Post Title</h1>
       
       <div class="post-meta">
           <span class="post-date">Posted on: YYYY-MM-DD</span>
           <span class="post-tags">Tags: tag1, tag2, tag3</span>
           <span class="post-author">By: Author Name</span>
       </div>
       
       <!-- Post content here -->
       
       <div class="post-navigation">
           <a href="/blog">← Back to all posts</a>
       </div>
   </article>
   ```

4. **Building the Site**
   - Run `bun build` to generate the static site
   - This will create a complete HTML page for your blog post at `dist/blog/post/{slug}.html`
   - The build process:
     - Extracts the title and description from your fragment
     - Creates a full HTML page with navigation and footer
     - Processes all include directives

5. **Quality Control**
   - Keep a backup copy of your HTML fragment before publishing
   - Verify that the generated HTML page renders correctly
   - Check that navigation links work properly
   - Ensure all images and references are accessible

## Static Site Generation Process

When you run `bun build`:

1. The build script reads all blog post fragments from `/public/html/fragments/blog/`
2. For each fragment, it:
   - Extracts the title from the `<h1>` tag
   - Gets a description from the first paragraph
   - Inserts the fragment content into the blog post template
   - Processes any include directives (like including navigation and footer)
   - Writes the complete HTML file to `dist/blog/post/{slug}.html`

## Common Pitfalls to Avoid

- Don't forget to run `bun build` after creating or updating a blog post
- Make sure your HTML fragment follows the established structure
- Ensure the HTML uses proper heading hierarchy (h1, h2, h3)
- Keep all navigation links as regular `<a href="/path">` links, not HTMX attributes
- Verify that the generated HTML looks correct by checking the file in `dist/blog/post/` 