# SEO Keyword Optimization Guide

**Objective:** Provide a structured approach to selecting and implementing SEO keywords for BitsOf blog content to improve search visibility and traffic.

## SEO Keyword Selection Process

### Step 1: Research and Identify Keywords
* **Identify Core Topics:** Determine the main subject of your content
* **Brainstorm Related Terms:** List all relevant terms, phrases, and questions related to your topic
* **Use Keyword Research Tools:** Utilize tools like Google Keyword Planner, Ahrefs, SEMrush, or Ubersuggest to:
  - Find search volume data
  - Identify related keywords
  - Assess keyword difficulty
* **Analyze Competition:** Examine what keywords competitors rank for

### Step 2: Select Primary and Secondary Keywords
* **Primary Keyword (1-2):** The main terms you want to rank for
  - Should appear in title, meta description, headings, and throughout content
  - Aim for terms with good search volume but manageable competition
* **Secondary Keywords (3-5):** Supporting terms that enhance the primary keyword
  - Related terms, synonyms, and variations
  - Long-tail phrases (more specific, usually 3+ words)

### Step 3: Keyword Evaluation
* **Search Intent:** Does the keyword match the intention of your content?
* **Relevance:** Is the keyword directly relevant to your article topic?
* **Volume vs. Competition:** Balance between search popularity and ranking difficulty
* **Business Value:** Will ranking for this term drive valuable traffic?

## Content Locations and Workflow

### Draft Content
* **Location:** All draft blog posts should be placed in `/content/blog/drafts/`
* **Status:** Drafts are not published to the website
* **SEO Implementation:** Include all SEO elements in drafts to prepare for final publication
* **Naming Convention:** Use descriptive filenames (e.g., `ai-collaboration-draft.md`)

### Published Content
* **Location:** Finalized blog posts must be moved to `/src/content/blog/`
* **Important:** Only content in this directory will be processed and published
* **Transition Process:** 
  - Verify all SEO elements are properly implemented
  - Ensure keyword optimization is complete
  - Move the file (do not copy) to maintain a single source of truth

## Implementing Keywords in Astro Blog Posts

### Frontmatter Configuration
In Astro, keywords are added to the blog post frontmatter:

```markdown
---
title: "Your Blog Post Title"
description: "Your blog post description"
pubDate: 2025-04-20
tags: ["Tag1", "Tag2", "Tag3"]
keywords: ["primary keyword", "secondary keyword 1", "secondary keyword 2", "long-tail keyword"]
author: "Author Name"
---
```

### Content Schema Configuration
The content schema in `src/content/config.ts` includes a keywords field:

```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    author: z.string().optional(),
    // other fields...
  }),
});
```

### BaseHead Component Integration
The `BaseHead.astro` component includes keywords in the meta tags:

```astro
---
interface Props {
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
}

const { title, description, image = '/blog-placeholder-1.jpg', keywords = [] } = Astro.props;
---

<!-- Other meta tags -->
<meta name="title" content={title} />
<meta name="description" content={description} />
{keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
```

### Layout Component Integration
The blog post layout passes keywords to the BaseHead component:

```astro
---
// Import statements

const { title, description, pubDate, updatedDate, heroImage, keywords } = Astro.props;
---

<html lang="en">
  <head>
    <BaseHead title={title} description={description} keywords={keywords} />
    <!-- Other head content -->
  </head>
  <!-- Body content -->
</html>
```

## Best Practices for SEO

### Title and Meta Description
* Include the primary keyword in the title, preferably near the beginning
* Keep titles under 60 characters to avoid truncation in search results
* Write a compelling meta description under 160 characters that includes primary and secondary keywords

### Content Structure
* Use proper heading hierarchy (h1, h2, h3) with keywords in headings
* Include primary keyword in the first paragraph
* Use secondary keywords throughout the content naturally
* Aim for a keyword density of 1-2% (avoid keyword stuffing)

### URL Structure
* Astro automatically creates URL slugs from the filename
* Use descriptive filenames that include the primary keyword
* Use hyphens to separate words in filenames

### Image Optimization
* Use descriptive, keyword-rich file names
* Include keywords in alt text when appropriate
* Optimize image size for faster loading

## Additional Astro SEO Features

### Sitemap Generation
Astro automatically generates a sitemap for your site, which helps search engines discover and index your content.

### RSS Feed
Astro includes built-in RSS feed generation, which can help distribute your content and improve SEO.

### OpenGraph and Twitter Cards
Astro's BaseHead component includes OpenGraph and Twitter Card meta tags, which improve how your content appears when shared on social media.

## SEO Review Before Publication

Before moving content from `/content/blog/drafts/` to `/src/content/blog/`, perform this SEO review:

1. **Keyword Implementation Check:**
   - Verify that the primary keyword appears in the title, first paragraph, and at least one heading
   - Confirm that secondary keywords are distributed naturally throughout the content
   - Check that keyword density is appropriate (not too sparse or dense)

2. **Metadata Validation:**
   - Confirm that title and meta description are optimal lengths
   - Ensure that keywords array in frontmatter reflects the actual content
   - Verify that tags are relevant and consistent with site taxonomy

3. **Technical SEO Elements:**
   - Check that all images have alt text
   - Ensure links have descriptive anchor text
   - Verify proper heading hierarchy (h1, h2, h3, etc.)

4. **Content Quality Assessment:**
   - Confirm content provides value related to the target keywords
   - Check that content length is appropriate for the topic (typically 1000+ words for competitive terms)
   - Ensure readability is appropriate for the target audience

## DO's and DON'Ts

### DO:
* Write for humans first, search engines second
* Use keywords naturally and conversationally
* Update keyword strategy based on performance data
* Include LSI (Latent Semantic Indexing) keywords - related terms
* Consider user search intent when selecting keywords

### DON'T:
* Stuff keywords artificially
* Hide keywords or use deceptive practices
* Target irrelevant keywords just because they have high volume
* Sacrifice readability for keyword placement
* Use the exact same keywords across multiple posts (keyword cannibalization)
* Place draft content directly in the publication directory (`/src/content/blog/`)

## Monitoring and Improvement

After implementing keywords, monitor your site's performance using tools like:
* Google Search Console
* Google Analytics
* Ahrefs or SEMrush

Regularly review and update your keyword strategy based on performance data and changing search trends.
