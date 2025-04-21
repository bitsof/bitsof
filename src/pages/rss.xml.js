import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

// Standard Astro API route
export const GET = async (context) => {
	const posts = await getCollection('blog');
	
	const rssContent = await rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site, // Assumes site is configured in astro.config.mjs
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
		})),
		// (Optional) Add custom data to your RSS feed.
		customData: `<language>en-us</language>`,
		// (Optional) Set a stylesheet target
		// stylesheet: '/rss/styles.xsl',
	});

	return new Response(rssContent, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
};
