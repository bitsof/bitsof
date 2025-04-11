# Git Automation Process

This document outlines the automated process for creating branches, building code, and submitting pull requests using GitHub's API.

## Branch Naming Convention

### For Blog Posts
When creating branches for blog-related changes, use the following format:
```
blog/YYYY-MM-DD-blog-title-slug
```

Example:
- `blog/2025-04-01-llm-environmental-impact`
- `blog/2025-03-29-ai-business-automation`

### For Feature Changes
For non-blog related features, use a descriptive feature name:
```
feature/brief-description-of-change
```

Example:
- `feature/add-social-sharing`
- `feature/update-navigation`

## Automated Process Flow

1. **Branch Creation**
   - System creates a new branch from main
   - Branch name is automatically generated based on content type
   - For blogs: extracted from the blog post title
   - For features: based on the feature description

2. **Build Process**
   ```bash
   bun build.js
   ```
   - Build must complete successfully before proceeding
   - Any build errors will halt the process

3. **File Changes**
   - All modified files are automatically staged
   - Commit includes build artifacts and source changes
   - Files are pushed to the remote branch

4. **Pull Request Creation**
   - PR is automatically created targeting main
   - Title format:
     - For blogs: `📝 Add blog: [Blog Title]`
     - For features: `✨ Add feature: [Feature Description]`
   
   - PR Description template:
   ```markdown
   ## Changes
   - [Automated] Built and staged changes
   - [Automated] Created from automated process

   ## Checklist
   - [ ] Build completed successfully
   - [ ] All files properly staged
   - [ ] PR title and description are appropriate
   ```

## Error Handling

The process will abort and notify if:
1. Branch creation fails
2. Build process fails
3. File staging encounters errors
4. PR creation is unsuccessful

## Manual Review Requirements

Despite automation, the following should be manually reviewed:
1. Build artifacts are correct
2. PR description accurately reflects changes
3. Branch naming follows convention
4. All necessary files are included

## Implementation Notes

This process uses GitHub's API through MCP tools:
- Branch creation: `mcp_github_bitsof_create_branch`
- File updates: `mcp_github_bitsof_push_files`
- PR creation: `mcp_github_bitsof_create_pull_request`

The process ensures atomic operations and proper error handling through API responses rather than shell commands. 