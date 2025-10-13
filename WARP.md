# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **TanStack Start** application (React SSR framework) that serves as a blog/post management platform. The app uses Supabase for authentication and data storage, with role-based access control for content management.

## Development Commands

### Core Commands
- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm serve` - Preview production build locally

### Testing & Linting  
- `pnpm test` - Run all tests with Vitest
- `pnpm type` - Type checking with oxlint (type-aware)
- `vitest run --reporter=verbose src/path/to/test.test.ts` - Run specific test file

### Docker
- Build: `docker build -t imaginary_v2 .`
- Run: `docker run -p 3001:3001 imaginary_v2`

## Architecture Overview

### Tech Stack
- **Framework**: TanStack Start (React SSR with file-based routing)
- **Styling**: Tailwind CSS v4 + Reshaped UI components
- **State Management**: TanStack Query + Jotai for atomic state
- **Authentication**: Supabase Auth with role-based access (`owner` role required for admin routes)
- **Database**: Supabase
- **Form Handling**: TanStack Form with Valibot validation
- **Rich Text**: BlockNote editor
- **Animation**: Motion (Framer Motion) + GSAP
- **Testing**: Vitest + React Testing Library

### Directory Structure (Feature-Sliced Design Pattern)

```
src/
├── features/          # Business logic by domain
│   └── auth/         # Authentication feature
├── pages/            # Page-level components
│   ├── home/
│   └── posts/
├── shared/           # Shared utilities and configurations
│   ├── api/          # API schemas, keys, and utilities  
│   ├── hooks/        # Reusable React hooks
│   └── lib/          # Core utilities (Supabase, query config)
├── widgets/          # Complex UI components
│   └── common/       # Shared widgets (Navigator, etc.)
└── routes/           # TanStack Router file-based routes
```

### Key Architectural Patterns

**Authentication Flow**: 
- Server-side user fetching in `__root.tsx` using `fetchUserFn`
- Protected routes under `_authenticated/` require `owner` role
- Authentication state managed globally via router context

**Data Layer**:
- TanStack Query with optimized defaults (5min stale time, offline-first)
- Server functions for SSR data fetching
- Valibot schemas for runtime validation

**Routing Strategy**:
- File-based routing with TanStack Router
- Automatic route generation with `routeTree.gen.ts`
- Search params validation using Valibot schemas
- SSR integration with TanStack Query

### Environment Setup

Required environment variables:
```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development Tools Integration

**DevTools Available**:
- TanStack Router DevTools
- TanStack Query DevTools  
- TanStack Form DevTools
- All accessible via bottom-right panel in development

**Code Quality**:
- Oxlint for fast TypeScript linting
- Prettier with import sorting and Tailwind class sorting
- Strict TypeScript configuration

### Important Implementation Details

**Supabase Integration**: Custom server client factory in `shared/lib/supabase.ts` handles SSR cookie management for TanStack Start compatibility.

**Component Architecture**: Uses Reshaped design system with dark mode default. Layout components use Container with max-width of 1024px and responsive design.

**File Upload**: Implemented via `shared/hooks/use-upload-file.ts` with Supabase storage integration.

**Route Protection**: `_authenticated` layout route handles role-based access control with automatic redirects.

### Testing Strategy

- Unit tests with Vitest and jsdom
- React component testing with React Testing Library
- Test files located alongside source files with `.test.ts` suffix