# AI Whiteboard/Scratchpad Guide

**Purpose:** Short-term memory aid during AI sessions. Log key events, decisions, errors, temp context.

**Format (Recommended):** Markdown List Item

```markdown
- [YYYY-MM-DDTHH:MM:SSZ] Description: {Brief summary}. Payload: {Optional details/context/code}. 
```

*   **Timestamp:** ISO 8601. Accuracy matters, insertion order doesn't.
*   **Description:** Concise summary.
*   **Payload:** Optional details (text, JSON, etc.).
    *   *Examples:* User decisions, file generation status, errors, research notes, config details.

**Usage:**

*   **Be Brief:** Keep entries short unless detail is crucial.
*   **Be Accurate:** Use correct timestamps.
*   **Be Relevant:** Log only info pertinent to the current task/session.
*   **Log Tone Examples:** When providing feedback on article tone/voice, consider logging 1-2 specific examples here of desired phrasing or sentences to change.
*   **Temporary:** This is not a permanent log. Cleanup outdated/irrelevant entries periodically (e.g., post-task).
*   **Searchable:** Use consistent description terms.

============ WRITE MEMORY BELOW HERE ================

- [2024-03-30T00:00:00Z] Description: Blog Post Workflow Update. Payload:
    * Draft posts are stored in `/content/blog/drafts/{topic-name}/`
    * Final markdown goes to `/content/blog/posts/{topic-name}.md`
    * HTML fragments are generated at `/public/html/fragments/blog/{slug}.html`
    * Metadata must be added to `/public/data/blog-posts.json`
    * Server endpoints include `/get-post/{slug}` for HTMX content loading

- [Timestamp Placeholder] Description: How to Write an Amazing Hook. Payload:
    *   **Know Your Audience:** Who are you trying to reach? What are their pain points, desires, or questions?
    *   **Promise Value:** What will the reader gain? Hint at the core benefit or solution.
    *   **Be Specific (Often):** Concrete details or numbers can be more compelling than vague statements.
    *   **Ask a Question:** Engage the reader directly and make them think.
    *   **Use Intrigue/Curiosity:** Tease a surprising fact, a common misconception, or a story.
    *   **State a Bold Claim:** Make a strong (but supportable) statement to grab attention.
    *   **Relate to a Current Event/Trend:** Connect your topic to something timely.
    *   **Tell a (Micro) Story:** A very short anecdote can draw readers in.
    *   **Keep it Concise:** Get to the point quickly.
    *   **Match the Tone:** Ensure the hook fits the overall style and purpose of the piece.
    *   **Test It:** Read it aloud. Does it sound engaging?