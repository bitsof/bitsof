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
   - Simply placing the final markdown file in this directory is sufficient for publication
   - **NO BUILD STEP REQUIRED**: Once the file is placed in `/src/content/blog/`, it will automatically be included in the site - no manual build or deployment step is needed
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
   image: {
     url: "/images/image-name.jpg",
     alt: "Descriptive alt text for the image"
   }
   ---
   ```

5. **Quality Control**
   - Verify that the blog post content and formatting is correct
   - Check that all links, images, and embedded content references are accurate
   - Ensure metadata in the frontmatter is complete and correctly formatted
   - Confirm all referenced images exist in the proper location

## Content Location Guidelines

To maintain a clean workflow:

1. **Draft Content**
   - Location: `/content/blog/drafts/`
   - Purpose: Work-in-progress content not ready for public viewing
   - Access: Available for review but never published to the site

2. **Published Content**
   - Location: `/src/content/blog/`
   - Purpose: Finalized content ready for public consumption
   - Access: Automatically processed by Astro and published to the website
   - **Note**: No additional build or deployment step is needed - adding files to this directory is all that's required for publication

3. **Never Publish Drafts**
   - Content in `/content/blog/drafts/` is intentionally excluded from publication
   - Moving a file from drafts to the publishing directory is a deliberate step
   - This separation ensures only polished content reaches the public site

## Common Pitfalls to Avoid

- Don't place draft content directly in `/src/content/blog/`
- Ensure frontmatter is complete before moving to the publishing directory
- Keep file paths consistent with the established structure
- Verify that images referenced in content exist and are properly accessible from the published location     