# Shift-app-front Project Overview

## Purpose
This is a shift/attendance management frontend application built with Next.js. The application allows users to:
- Track attendance with clock-in/clock-out functionality
- Record work content and issues/concerns for each shift
- View monthly attendance reports
- Manage users

The application is deployed at: https://shift-app-front.vercel.app/

## Tech Stack
- **Framework**: Next.js 15.2.4 with React 19
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS 4.1.9 with custom utilities
- **UI Components**: Extensive use of Radix UI components (@radix-ui/react-*)
- **Forms**: React Hook Form with Zod validation
- **Data Fetching**: SWR for client-side data fetching
- **State Management**: React hooks (useState, useEffect)
- **Icons**: Lucide React
- **Date/Time**: date-fns
- **Package Manager**: Yarn (yarn.lock present)

## Architecture
- **App Router**: Uses Next.js 13+ app directory structure
- **API Routes**: Backend proxy through Next.js API routes (`/api/users`, `/api/shifts`)
- **Backend Integration**: Connects to Go backend at `http://localhost:8080`
- **Components**: Modular UI components in `src/app/components/ui/`
- **Hooks**: Custom hooks for data management (`useShifts`, `useUsers`)

## Key Features
1. **Time Tracking**: Real-time clock display with clock-in/clock-out
2. **Shift Management**: Create and track shifts with work content and issues
3. **User Management**: Create and manage users
4. **Monthly Reports**: View attendance data by month
5. **Responsive Design**: Mobile-friendly interface