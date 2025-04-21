import { defineMiddleware } from 'astro:middleware';

/**
 * Middleware for handling redirects and URL normalization
 */
export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  
  // Redirect trailing slashes for consistency (except root)
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    return context.redirect(url.pathname.slice(0, -1) + url.search);
  }
  
  // Lowercase all URLs for consistency
  if (/[A-Z]/.test(url.pathname)) {
    return context.redirect(url.pathname.toLowerCase() + url.search);
  }
  
  // If none of the above conditions were met, continue to the next middleware or page
  return next();
}); 