import { shortest } from "@antiwork/shortest";

shortest("Site loads and shows the main title", [
  "Navigate to the home page",
  "Assert that the main site title is visible",
]);

shortest("About page loads correctly", [
  "Navigate to the /about page",
  "Assert that the main content of the About page is visible",
]);

shortest("Blog index page shows multiple blog posts", [
  "Navigate to the blog index page",
  "Assert that several blog post previews are displayed on the page",
]);

shortest("Can navigate to and view a single blog post", [
  "Navigate to the blog index page",
  "Click the title link of the first blog post preview",
  "Assert that the page navigated to the full blog post page",
  "Assert that the full content of the blog post, including its title, is visible",
]);
