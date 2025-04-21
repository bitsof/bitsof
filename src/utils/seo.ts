/**
 * Utility functions for SEO optimization
 */

/**
 * Generates structured data (JSON-LD) for a blog post
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  publishDate: Date;
  updateDate?: Date;
  authorName?: string;
  image?: string;
  url: URL;
}) {
  const { title, description, publishDate, updateDate, authorName, image, url } = article;
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "datePublished": publishDate.toISOString(),
    ...(updateDate && { "dateModified": updateDate.toISOString() }),
    ...(authorName && {
      "author": {
        "@type": "Person",
        "name": authorName
      }
    }),
    ...(image && { 
      "image": {
        "@type": "ImageObject",
        "url": new URL(image, url).toString()
      }
    }),
    "url": url.toString(),
    "publisher": {
      "@type": "Organization",
      "name": "BitsOf",
      "logo": {
        "@type": "ImageObject",
        "url": new URL("/favicon.svg", url).toString()
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url.toString()
    }
  };
}

/**
 * Generates structured data (JSON-LD) for a service page
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: URL;
  image?: string;
  price?: string;
  priceCurrency?: string;
}) {
  const { name, description, url, image, price, priceCurrency } = service;
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": url.toString(),
    ...(image && {
      "image": new URL(image, url).toString()
    }),
    ...(price && priceCurrency && {
      "offers": {
        "@type": "Offer",
        "price": price,
        "priceCurrency": priceCurrency
      }
    }),
    "provider": {
      "@type": "Organization",
      "name": "BitsOf",
      "logo": {
        "@type": "ImageObject",
        "url": new URL("/favicon.svg", url).toString()
      }
    }
  };
} 