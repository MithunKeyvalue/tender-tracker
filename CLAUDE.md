# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a React Router v7 full-stack application with SSR (server-side rendering) enabled, using TypeScript, Express server, PostgreSQL with DrizzleORM, and TailwindCSS v4.

## Essential Commands

### Development
- `npm run dev` - Start development server with hot module replacement on port 5173
- `npm run typecheck` - Run TypeScript type checking

### Build & Production
- `npm run build` - Build the application for production
- `npm start` - Start production server on port 3000

### Database
- `npm run db:generate` - Generate DrizzleORM migrations from schema changes
- `npm run db:migrate` - Apply pending database migrations to PostgreSQL

## Architecture

### Routing System
React Router v7 with file-based routing. Routes are defined in `app/routes.ts`:
- Routes map to files in `app/routes/` directory
- SSR is enabled by default via `react-router.config.ts`
- Server functions can be added to route files for data loading/actions

### Database Layer
- Schema definitions: `database/schema.ts`
- Database context: `database/context.ts`
- Migrations: `drizzle/` directory
- Uses DrizzleORM with PostgreSQL adapter

### Server Architecture
- Entry point: `server.js` (ES module)
- Express app configuration: `server/app.ts`
- Production builds serve from `build/server/index.js`
- Environment variables loaded from `.env` file

### Client Architecture
- Root component: `app/root.tsx`
- Entry point: `app/entry.client.tsx` (client hydration)
- Build output: `build/client/`
- Styling: TailwindCSS v4 with `app.css` as entry

## Development Workflow
1. Ensure PostgreSQL is running and `.env` file contains database connection string
2. Run migrations: `npm run db:migrate`
3. Start dev server: `npm run dev`
4. Routes automatically reload on file changes
5. Type checking runs via `npm run typecheck`

## Key Configuration Files
- `react-router.config.ts` - Controls SSR and bundling behavior
- `vite.config.ts` - Vite bundler configuration
- `drizzle.config.ts` - Database migration settings
- `tsconfig.json` - TypeScript compiler options

## UI Development

### shadcn/ui Setup
The project is configured to use shadcn/ui components with:
- Custom OKLCH color theme in `app/app.css`
- Component aliases: `@/components`, `@/lib`, `@/hooks`
- Utility function `cn()` for className merging in `app/lib/utils.ts`
- Components directory: `app/components/ui/`

### Installing shadcn Components
To add new shadcn components:
```bash
npx shadcn@latest add <component-name>
```

### Theme Variables
The custom theme uses OKLCH color space with CSS variables for:
- Light/dark mode support
- Primary, secondary, accent colors
- Sidebar-specific colors
- Chart colors (1-5)
- Border radius customization

### Tailwind Theme
- Use tailwind theme for UI components