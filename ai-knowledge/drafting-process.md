## Publishing Workflow and Best Practices

### Moving from Draft to Production

1. **Content Cleanup**
   - Remove draft version markers from titles (e.g., "Draft v4: ")
   - Ensure all placeholder images are properly formatted
   - Verify that all source attributions are present and accurate

2. **File System Considerations**
   - Draft content should remain in `/drafts/{topic-name}/` until final approval
   - Publishing to `/content/blog/` requires appropriate file system permissions
   - Coordinate with system administrators if encountering permission issues
   - Follow the established naming convention: convert from `final.md` to `{topic-name}.md`

3. **Quality Control**
   - Maintain a copy in the drafts directory until successful publication is confirmed
   - Verify that the published version maintains proper formatting
   - Double-check that all images and references are accessible in the production environment

### Common Pitfalls to Avoid

- Don't delete draft versions until successful publication is confirmed
- Ensure proper file permissions before attempting to publish
- Maintain consistent file naming conventions between drafts and published content
- Keep draft markers separate from actual content titles for easier cleanup 