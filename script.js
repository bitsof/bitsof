document.addEventListener('DOMContentLoaded', () => {
    const contentElement = document.getElementById('content');
    const converter = new showdown.Converter();
    converter.setOption('ghCompatibleHeaderId', true);
    converter.setOption('simpleLineBreaks', true);

    const loadContent = async (path) => {
        // Standardize path: remove trailing slash unless it's the root
        let normalizedPath = path;
        if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
            normalizedPath = normalizedPath.slice(0, -1);
        }

        // Determine potential markdown file paths
        const pathAsFile = normalizedPath === '/' || normalizedPath === '' ? '/index' : normalizedPath;
        const primaryMdPath = `/content${pathAsFile}.md`;
        const indexMdPath = `/content${normalizedPath}/index.md`; // Path if it's a directory

        console.log(`Attempting to load content for: ${path}`);
        console.log(` -> Trying primary path: ${primaryMdPath}`);

        try {
            let response = await fetch(primaryMdPath);
            let markdown = '';

            if (response.ok) {
                markdown = await response.text();
                console.log(`    Success with primary path: ${primaryMdPath}`);
            } else if (response.status === 404) {
                console.log(`    Primary path not found. Trying index path: ${indexMdPath}`);
                response = await fetch(indexMdPath);
                if (response.ok) {
                    markdown = await response.text();
                    console.log(`    Success with index path: ${indexMdPath}`);
                } else {
                    // Both primary and index path failed
                    throw new Error(`Content not found at ${primaryMdPath} or ${indexMdPath}. Status: ${response.status}`);
                }
            } else {
                // Handle other non-404 errors from primary fetch
                throw new Error(`HTTP error! Status: ${response.status} for ${primaryMdPath}`);
            }

            // If we got markdown from either path
            const html = converter.makeHtml(markdown);
            contentElement.innerHTML = html;
            document.title = normalizedPath.split('/').pop() || 'Home'; // Basic title update

        } catch (error) {
            console.error('Error fetching or processing markdown:', error);
            contentElement.innerHTML = `
                <h2>Page Not Found</h2>
                <p>Sorry, the content for <code>${path}</code> could not be found.</p>
                <p>Looked for: <code>${primaryMdPath}</code> and <code>${indexMdPath}</code></p>
                <p>Check the URL or try the <a href="/">homepage</a>.</p>
            `;
            document.title = 'Page Not Found';
        }
    };

    const handleNavigation = (event) => {
        // Check if the clicked element or its parent is an anchor tag
        // within the same origin
        const anchor = event.target.closest('a');
        if (anchor && anchor.origin === window.location.origin) {
            event.preventDefault(); // Prevent default anchor click behavior
            const path = anchor.pathname;
            history.pushState({ path }, '', path); // Update URL without full reload
            loadContent(path); // Load new content
            window.scrollTo(0, 0); // Scroll to top
        }
    };

    // Load initial content based on the current URL path
    loadContent(window.location.pathname);

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        const path = event.state ? event.state.path : window.location.pathname;
        loadContent(path);
    });

    // Intercept clicks on local links for SPA-like navigation
    document.body.addEventListener('click', handleNavigation);
}); 