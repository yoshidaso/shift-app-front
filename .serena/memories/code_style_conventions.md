# Code Style and Conventions

## TypeScript Configuration
- **Strict mode**: Enabled for type safety
- **Target**: ES6
- **Module**: ESNext with bundler resolution
- **Path mapping**: `@/*` maps to project root
- **JSX**: Preserve mode for Next.js

## ESLint Configuration
- **Parser**: @typescript-eslint/parser
- **Extends**: 
  - eslint:recommended
  - @typescript-eslint/recommended (with type checking)
  - next/core-web-vitals
  - prettier (for formatting integration)
- **Comments**: Configuration includes Japanese comments

## Prettier Configuration
- **Tab Width**: 2 spaces
- **Semicolons**: Disabled (semi: false)
- **Quotes**: Single quotes for JS/TS, JSX single quotes enabled
- **Arrow Functions**: Always use parentheses around parameters

## Naming Conventions
- **Components**: PascalCase (e.g., `Home`, `MonthlyReportPage`)
- **Functions**: camelCase (e.g., `useShifts`, `handleClockIn`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `BACKEND_BASE_URL`)
- **Files**: kebab-case for UI components, camelCase for hooks

## File Organization
- **Pages**: App router structure in `src/app/`
- **Components**: Reusable UI components in `src/app/components/ui/`
- **Hooks**: Custom hooks in `src/app/hooks/`
- **API**: Server-side API routes in `src/app/api/`
- **Utils**: Utility functions in `src/app/lib/`

## Component Patterns
- **Functional Components**: Use arrow functions for exports
- **Hooks**: Custom hooks prefixed with "use"
- **Props**: TypeScript interfaces for component props
- **State**: useState with proper typing
- **Effects**: useEffect with dependency arrays

## Styling Conventions
- **Utility Classes**: Tailwind CSS with custom utilities
- **Class Merging**: Use `cn()` utility for conditional classes
- **Responsive**: Mobile-first approach
- **Dark Mode**: Theme support with next-themes

## Import Organization
- **External packages** first
- **Internal utilities** and components
- **Relative imports** last
- **Type imports**: Use `import type` when needed