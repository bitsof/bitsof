import { defineMiddleware } from 'astro:middleware';

/**
 * Middleware for handling redirects and URL normalization
 */
export const onRequest = defineMiddleware(({ request, redirect }) => {
  const url = new URL(request.url);
  
  // Redirect from old post URLs to new blog structure
  if (url.pathname.startsWith('/posts/')) {
    return redirect(`/blog/${url.pathname.replace('/posts/', '')}`);
  }
  
  // Handle old service URLs
  if (url.pathname.startsWith('/services-old/')) {
    return redirect(`/services/${url.pathname.replace('/services-old/', '')}`);
  }
  
  // Redirect trailing slashes for consistency (except root)
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    return redirect(url.pathname.slice(0, -1) + url.search);
  }
  
  // Lowercase all URLs for consistency
  if (/[A-Z]/.test(url.pathname)) {
    return redirect(url.pathname.toLowerCase() + url.search);
  }
}); 