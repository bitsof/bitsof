## Publishing Workflow and Best Practices

### Moving from Draft to Production

1. **Content Cleanup**
   - Remove draft version markers from titles (e.g., "Draft v4: ")
   - Ensure all placeholder images are properly formatted
   - Verify that all source attributions are present and accurate

2. **File System Workflow**
   - Draft content remains in `/content/blog/drafts/{topic-name}/` until final approval
   - Finalized markdown is moved to `/content/blog/posts/{topic-name}.md`
   - Final markdown must be converted to HTML fragment and placed in `/public/html/fragments/blog/{slug}.html`
   - The slug should match the entry in the blog-posts.json metadata file
   - HTML fragment must follow the established format with proper article structure and HTMX navigation

3. **Metadata Management**
   - Add an entry to `/public/data/blog-posts.json` with:
     - title: Post title
     - slug: URL-friendly version of the title (used in URL paths)
     - date: Publication date in YYYY-MM-DD format
     - author: Author name
     - tags: Comma-separated list of relevant tags
     - excerpt: Brief summary of the post
     - path: URL path to the post (usually `/blog/{slug}`)

4. **HTML Fragment Structure**
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
           <a href="/blog" 
              hx-get="/get-blog-list" 
              hx-target="#main-content" 
              hx-push-url="true">← Back to all posts</a>
       </div>
   </article>
   ```

5. **Quality Control**
   - Maintain a copy in the drafts directory until successful publication is confirmed
   - Verify that the published HTML fragment renders correctly
   - Check that HTMX navigation works properly
   - Ensure all images and references are accessible in the production environment

### Common Pitfalls to Avoid

- Don't delete draft versions until successful publication is confirmed
- Ensure the HTML fragment maintains proper HTMX attributes for navigation
- Make sure the slug in metadata matches the HTML fragment filename
- Keep metadata in blog-posts.json updated and properly formatted
- Ensure the HTML fragment follows the established structure for consistent styling 