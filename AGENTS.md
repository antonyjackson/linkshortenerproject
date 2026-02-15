# Agent Instructions - Link Shortener Project

This file serves as the entry point for all coding standards, architecture conventions, and development guidelines for the Link Shortener project.

## ⚠️ CRITICAL RULE

**YOU MUST READ THE RELEVANT `/docs` FILES BEFORE GENERATING ANY CODE.**

This is not optional. Every code generation task requires reading the appropriate documentation file first. Failure to do so will result in code that violates project standards and will need to be rewritten.

## 📚 Documentation Structure

All detailed instructions are organized in the `/docs` folder. Each file contains critical standards that MUST be followed.

### Available Documentation

- **[Authentication Guidelines](/docs/authentication.md)** - Clerk integration patterns, route protection, and auth implementation standards
- **[UI Components Guidelines](/docs/ui-components.md)** - shadcn/ui usage standards, component patterns, and styling conventions

## 🚀 Quick Start for AI Agents

**BEFORE WRITING ANY CODE:**

1. **📖 READ THE RELEVANT `/docs` FILE FIRST** - This is mandatory, not optional
   - Working with auth? → Read `/docs/authentication.md`
   - Working with UI? → Read `/docs/ui-components.md`
   - Adding new docs? → Update this list

**THEN proceed with development:**

2. **Follow TypeScript strict mode** - no `any` types unless absolutely necessary
3. **Use Server Components by default** - only use Client Components when needed (interactivity, hooks, browser APIs)
4. **Follow the established patterns** - check existing code for reference
5. **Use path aliases** - `@/` maps to the project root

## 🔑 Key Conventions

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Database**: PostgreSQL with Drizzle ORM
- **Auth**: Clerk
- **State Management**: React Server Components + Server Actions (minimize client state)

## 📝 Common Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx drizzle-kit push # Push schema changes to database
npx drizzle-kit studio # Open Drizzle Studio
```

## 🎯 Before Writing ANY UI Code

1. **Search shadcn/ui docs** for an existing component
2. **Check if it's installed** in `/components/ui/`
3. **Install if needed** using `npx shadcn@latest add [component]`
4. **Import and use** the shadcn component
5. **Customize** using variants and Tailwind classes

---

**Always refer to the detailed documentation in `/docs` before implementing features or making architectural decisions.**
