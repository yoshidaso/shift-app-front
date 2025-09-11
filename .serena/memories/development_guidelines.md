# Development Guidelines

## Design Patterns and Guidelines

### Component Design
- **Single Responsibility**: Each component should have one clear purpose
- **Composition over Inheritance**: Use composition patterns with children props
- **Accessibility First**: Leverage Radix UI components for accessibility
- **Mobile Responsive**: Use Tailwind's responsive utilities (sm:, md:, lg:)

### Data Fetching Patterns
- **SWR for API calls**: Use existing `useShifts` and `useUsers` hooks as templates
- **Error Handling**: Implement try-catch with user-friendly error messages
- **Loading States**: Show loading indicators during async operations
- **Optimistic Updates**: Use SWR's mutate for immediate UI updates

### Form Handling
- **React Hook Form**: Use with Zod validation for type-safe forms
- **Validation**: Client-side validation with server-side backup
- **User Feedback**: Clear error messages and success notifications

### Styling Guidelines
- **Utility-First**: Use Tailwind CSS utilities
- **Consistent Spacing**: Follow Tailwind's spacing scale
- **Color System**: Use semantic color classes (primary, secondary, destructive)
- **Typography**: Consistent text sizing and line heights

### API Integration
- **Proxy Pattern**: API routes act as proxies to backend
- **Error Handling**: Consistent error response format
- **Type Safety**: Define TypeScript interfaces for API responses
- **Environment**: Backend URL configured in `src/app/lib/utils.ts`

### Performance Considerations
- **Code Splitting**: Next.js handles automatically
- **Image Optimization**: Disabled in config but consider re-enabling
- **Bundle Size**: Monitor with `yarn build` output
- **Revalidation**: Configure SWR revalidation based on data freshness needs

### Security Practices
- **Input Validation**: Use Zod schemas for runtime validation
- **XSS Prevention**: React's built-in protection + proper sanitization
- **API Security**: Validate all inputs in API routes
- **Environment Variables**: Use for sensitive configuration

### Internationalization
- **Japanese Language**: App currently uses Japanese text
- **Date/Time Formatting**: Uses Japanese locale formatting
- **Consider i18n**: For future multi-language support

### Git Workflow
- **Feature Branches**: Create branches for new features
- **Meaningful Commits**: Descriptive commit messages
- **Pull Requests**: Use for code review before merging
- **Branch Naming**: Use descriptive names like `feature/user-management`