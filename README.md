# TenderFlow - AI-Powered Government Tender Discovery Platform

TenderFlow is a full-stack web application that helps contractors discover and win government contracts through AI-powered tender matching and automated outreach, saving 50+ hours monthly on manual searches.

## 🚀 Key Features

### For Contractors
- **AI-Powered Tender Matching**: Automatically discover relevant tenders with 98% relevance rate
- **Smart Dashboard**: Real-time statistics, performance metrics, and application tracking
- **Automated Outreach**: Direct reach to procurement officers with personalized campaigns
- **Application Management**: Submit, track, and manage tender applications in one place
- **Save & Organize**: Bookmark important tenders and organize them by category
- **Calendar Integration**: Never miss a deadline with integrated calendar view

### For Administrators
- **User Management**: Manage contractors, users, and permissions
- **Tender Administration**: Add, edit, and manage government tenders
- **Analytics Dashboard**: Track platform usage and performance
- **Audit Logs**: Complete activity tracking and compliance

## 🛠️ Technologies Used

### Frontend
- **React 19** with TypeScript for type-safe development
- **React Router v7** with server-side rendering (SSR)
- **TailwindCSS v4** with custom OKLCH color theme
- **shadcn/ui** component library
- **Lucide React** for modern iconography
- **Vite** for fast development and building

### Backend
- **Node.js** with Express.js server
- **PostgreSQL** database for reliable data storage
- **DrizzleORM** for type-safe database queries
- **Zod** for runtime validation
- **bcrypt** for secure password hashing

### Development Tools
- **TypeScript** for enhanced developer experience
- **Hot Module Replacement** for instant updates
- **Docker** for containerized deployment
- **Docker Compose** for multi-container orchestration

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- PostgreSQL 14.x or higher (or use Docker)
- Docker and Docker Compose (optional, for containerized setup)



#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/vibeHackathon.git
cd vibeHackathon
```

## 🔧 Development Workflow

1. **Start PostgreSQL** (locally or via Docker)
2. **Configure environment** variables in `.env`
3. **Install dependencies**: `npm install`
4. **Run migrations**: `npm run db:migrate`
5. **Seed database** (optional): `npm run db:seed`
6. **Start dev server**: `npm run dev`
7. **Make changes** - hot reload will update automatically
8. **Type check**: `npm run typecheck` before committing
## 📁 Project Structure

```
vibeHackathon/
├── app/                    # React application source
│   ├── components/        # Reusable UI components
│   │   └── ui/           # shadcn/ui components
│   ├── routes/           # File-based routing (React Router v7)
│   ├── containers/       # Container components
│   ├── lib/              # Utility functions
│   ├── hooks/            # Custom React hooks
│   ├── constants/        # Constants and data
│   ├── entry.client.tsx  # Client entry point
│   ├── entry.server.tsx  # Server entry point
│   └── root.tsx          # Application root component
├── database/              # Database layer
│   ├── schema.ts         # DrizzleORM schema definitions
│   └── context.ts        # Database connection context
├── drizzle/              # Database migrations
├── server/               # Express server configuration
│   └── app.ts           # Server application setup
├── scripts/              # Utility scripts
│   └── seed.ts          # Database seeding script
├── build/                # Production build output
├── server.js             # Production server entry
├── react-router.config.ts # React Router v7 configuration
├── vite.config.ts        # Vite bundler configuration
├── drizzle.config.ts     # DrizzleORM configuration
└── tsconfig.json         # TypeScript configuration
```







**TenderFlow** - Revolutionizing government tender discovery for contractors 🚀