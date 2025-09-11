# Codebase Structure

## Directory Structure
```
shift-app-front/
├── src/app/                    # Next.js app directory
│   ├── api/                    # API routes (backend proxy)
│   │   ├── shifts/             # Shift management endpoints
│   │   └── users/              # User management endpoints
│   ├── components/             # Reusable components
│   │   └── ui/                 # UI component library (50+ components)
│   ├── hooks/                  # Custom React hooks
│   │   ├── useShifts.ts        # Shift data management
│   │   ├── useUsers.ts         # User data management
│   │   └── use-*.ts            # Other utility hooks
│   ├── lib/                    # Utility functions
│   │   └── utils.ts            # Common utilities (cn, API constants)
│   ├── monthly/                # Monthly reports page
│   ├── users/                  # User management page
│   ├── styles/                 # Global styles
│   │   └── globals.css         # Tailwind imports and custom styles
│   ├── layout.tsx              # Root layout component
│   └── page.tsx                # Home page (main attendance interface)
├── public/                     # Static assets
├── .github/                    # GitHub workflows and templates
└── config files               # Next.js, TypeScript, ESLint, Prettier configs
```

## Key Files and Their Purpose

### Main Application Files
- `src/app/page.tsx` - Main attendance tracking interface with clock-in/out functionality
- `src/app/layout.tsx` - Root layout with theme provider
- `src/app/monthly/page.tsx` - Monthly attendance report view
- `src/app/users/page.tsx` - User creation and management interface

### API Integration
- `src/app/api/shifts/route.ts` - Proxy to backend shift API
- `src/app/api/users/route.ts` - Proxy to backend user API
- `src/app/lib/utils.ts` - Contains `BACKEND_BASE_URL` constant

### Data Management
- `src/app/hooks/useShifts.ts` - SWR-based shift data fetching and mutations
- `src/app/hooks/useUsers.ts` - SWR-based user data fetching and mutations

### UI Components
- `src/app/components/ui/` - Comprehensive UI component library based on Radix UI
- Includes: buttons, cards, forms, dialogs, tables, navigation, etc.
- Uses consistent styling with Tailwind CSS

## Architecture Patterns

### Data Flow
1. **Frontend** → API Routes → **Backend** (Go server at localhost:8080)
2. **SWR** for client-side caching and revalidation
3. **Local Storage** for temporary shift record storage

### Component Architecture
- Functional components with TypeScript
- Custom hooks for data management
- Radix UI primitives for accessible components
- Tailwind CSS for styling with utility classes

### State Management
- React hooks (useState, useEffect) for local state
- SWR for server state management
- No global state management library (Redux, Zustand, etc.)