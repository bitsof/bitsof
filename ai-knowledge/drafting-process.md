# Blog Publishing Workflow and Best Practices

## Creating and Publishing Blog Posts

(Note: The iterative drafting/feedback phases described in `writing-guide.md` can potentially be automated, with primary human intervention focused on initial planning and final review/approval before publication.)

1. **Content Preparation**
   - Ensure content follows the writing guidelines in `writing-guide.md`
   - Make sure all images are properly formatted and referenced
   - Verify that all source attributions are present and accurate
   - Include SEO keywords following the guidelines in `seo-optimization.md`

2. **Draft Content Location**
   - All blog drafts MUST be stored in `/content/blog/drafts/` directory
   - Use a descriptive filename with a `.md` extension (e.g., `understanding-ai-draft.md`)
   - Include complete frontmatter as specified in the SEO guidelines
   - Keep all drafts in this location until they are ready for publication

3. **Final Publication Process**
   - Once a draft is finalized and approved, move it to `/src/content/blog/` directory
   - Use a clean, SEO-friendly filename (e.g., `understanding-ai.md`)
   - Ensure all frontmatter is correctly formatted and complete
   - IMPORTANT: Only content in `/src/content/blog/` will be published to the website
   - Never place draft content directly in the publishing directory

4. **Frontmatter Structure**
   - Each blog post must include the following frontmatter:
   ```markdown
   ---
   title: "Post Title"
   pubDate: YYYY-MM-DD
   description: "A compelling description of the post content"
   tags: ["tag1", "tag2", "tag3"]
   keywords: ["primary-keyword", "secondary-keyword-1", "secondary-keyword-2"]
   author: "Author Name"
   ---
   ```

5. **Building the Site**
   - Run `npm run build` to generate the static site
   - This will process all blog posts in the `/src/content/blog/` directory
   - The build process:
     - Creates pages based on the Astro content collection
     - Processes frontmatter and markdown content
     - Applies the BlogPost layout to each post

6. **Quality Control**
   - Always preview the site before final deployment
   - Verify that the generated blog post renders correctly
   - Check that all links, images, and embedded content work properly
   - Ensure metadata appears correctly in the page source

## Content Location Guidelines

To maintain a clean workflow:

1. **Draft Content**
   - Location: `/content/blog/drafts/`
   - Purpose: Work-in-progress content not ready for public viewing
   - Access: Available for review but never published to the site

2. **Published Content**
   - Location: `/src/content/blog/`
   - Purpose: Finalized content ready for public consumption
   - Access: Processed by Astro and published to the website

3. **Never Publish Drafts**
   - Content in `/content/blog/drafts/` is intentionally excluded from the build process
   - Moving a file from drafts to the publishing directory is a deliberate step
   - This separation ensures only polished content reaches the public site

## Common Pitfalls to Avoid

- Don't place draft content directly in `/src/content/blog/`
- Always run a build and preview before final deployment
- Ensure frontmatter is complete before moving to the publishing directory
- Keep file paths consistent with the established structure
- Verify that images referenced in content are properly accessible from the published location     