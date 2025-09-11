# Task Completion Checklist

## When a Task is Completed

### Code Quality Checks
1. **Linting**: Run `yarn lint` to check for code quality issues
2. **Type Checking**: TypeScript errors are ignored in build (next.config.mjs), but should be addressed in development
3. **Formatting**: Code should follow Prettier configuration (automatically handled by editor integration)

### Testing
- No test framework currently configured
- Manual testing recommended for UI changes
- Test the application locally with `yarn dev`

### Build Verification
- Run `yarn build` to ensure production build works
- Check for any build-time errors or warnings

### Code Review Points
- Follow established naming conventions (camelCase, PascalCase, etc.)
- Use TypeScript types properly
- Ensure responsive design works on mobile
- Check for accessibility considerations
- Verify API integration works with backend

### Documentation
- Update comments if adding complex logic
- Consider updating README.md for significant features
- Document any new environment variables or configuration

### Git Workflow
- Create meaningful commit messages
- Use feature branches when appropriate
- Ensure clean git history

### Deployment Considerations
- Changes will auto-deploy to Vercel on push to main branch
- Test locally before pushing
- Monitor deployment status on Vercel dashboard

## Development Best Practices
- Use the custom `cn()` utility for conditional CSS classes
- Leverage existing UI components in `src/app/components/ui/`
- Follow the established API pattern for backend integration
- Use SWR for data fetching consistency
- Implement proper error handling and user feedback