# Authentication Guidelines

## Overview

**CRITICAL**: This application uses **Clerk** as the **ONLY** authentication provider. No other authentication methods (NextAuth, Auth0, custom auth, etc.) should be implemented or suggested.

## Core Principles

1. **Clerk Only** - All authentication and user management is handled exclusively by Clerk
2. **Modal-Based Auth** - Sign-in and sign-up flows must always be launched in modals, never as full-page redirects
3. **Protected Routes** - The `/dashboard` route and any other authenticated routes must require user login
4. **Smart Redirects** - Logged-in users accessing the homepage should be automatically redirected to `/dashboard`

## Implementation Standards

### Route Protection

#### Protected Routes
- `/dashboard` and all sub-routes MUST require authentication
- Use Clerk's middleware or `auth()` helper to protect routes
- Return 401/redirect to sign-in modal for unauthenticated access

```typescript
// Example: app/dashboard/layout.tsx or middleware.ts
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/'); // Or trigger sign-in modal
  }
  
  return <>{children}</>;
}
```

#### Authenticated User Redirects
- If a logged-in user accesses `/` (homepage), redirect them to `/dashboard`
- Check authentication status in the root page component or middleware

```typescript
// Example: app/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  // Render landing page for unauthenticated users
  return <LandingPage />;
}
```

### Clerk Integration Patterns

#### Server Components (Preferred)
Use Clerk's server-side helpers for authentication checks:

```typescript
import { auth, currentUser } from '@clerk/nextjs/server';

// Get userId only
const { userId } = await auth();

// Get full user object
const user = await currentUser();
```

#### Client Components (When Needed)
For interactive UI elements, use Clerk's React hooks:

```typescript
'use client';

import { useUser, useAuth } from '@clerk/nextjs';

export function UserProfile() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useAuth();
  
  if (!isLoaded) return <Skeleton />;
  if (!isSignedIn) return null;
  
  return (
    <div>
      <p>{user.firstName}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

### Modal-Based Authentication

**MANDATORY**: All sign-in and sign-up flows must use Clerk's modal component, not full-page redirects.

```typescript
'use client';

import { SignInButton, SignUpButton } from '@clerk/nextjs';

export function AuthButtons() {
  return (
    <div>
      <SignInButton mode="modal">
        <button>Sign In</button>
      </SignInButton>
      
      <SignUpButton mode="modal">
        <button>Sign Up</button>
      </SignUpButton>
    </div>
  );
}
```

**DO NOT** use:
- `mode="redirect"` 
- Custom sign-in/sign-up pages unless absolutely necessary
- Direct navigation to Clerk-hosted pages

### Middleware Configuration

Use Clerk middleware to protect routes globally:

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  // Add other protected routes
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

## User Data Access

### Getting User Information

```typescript
// Server Component
import { currentUser } from '@clerk/nextjs/server';

const user = await currentUser();
if (user) {
  const userId = user.id;
  const email = user.emailAddresses[0]?.emailAddress;
  const name = `${user.firstName} ${user.lastName}`;
}
```

```typescript
// Client Component
'use client';
import { useUser } from '@clerk/nextjs';

const { user } = useUser();
const userId = user?.id;
const email = user?.emailAddresses[0]?.emailAddress;
```

### Linking User Data to Database

Store Clerk's `userId` in your database schemas:

```typescript
// db/schema.ts (example with Drizzle)
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(), // Clerk user ID
  shortCode: text('short_code').notNull().unique(),
  originalUrl: text('original_url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
```

## Common Patterns

### Conditional Rendering Based on Auth Status

```typescript
// Server Component
import { auth } from '@clerk/nextjs/server';

export default async function Navigation() {
  const { userId } = await auth();
  
  return (
    <nav>
      {userId ? (
        <AuthenticatedNav />
      ) : (
        <PublicNav />
      )}
    </nav>
  );
}
```

### Server Actions with Auth

```typescript
'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function createLink(formData: FormData) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }
  
  // Proceed with authenticated action
  const url = formData.get('url') as string;
  
  // Save to database with userId
  await db.insert(links).values({
    userId,
    originalUrl: url,
    shortCode: generateShortCode(),
  });
  
  revalidatePath('/dashboard');
}
```

## What NOT to Do

❌ **DO NOT** implement custom JWT authentication  
❌ **DO NOT** use NextAuth.js or any other auth library  
❌ **DO NOT** create custom sign-in/sign-up pages unless using Clerk components  
❌ **DO NOT** use full-page redirects for authentication flows  
❌ **DO NOT** store passwords or authentication secrets  
❌ **DO NOT** implement custom session management  

## Clerk Configuration

### Environment Variables

Ensure these are set in `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Optional: Customize URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Clerk Provider Setup

Ensure `ClerkProvider` wraps your app in the root layout:

```typescript
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

## Testing Considerations

- Test both authenticated and unauthenticated states
- Verify modal behavior for sign-in/sign-up
- Confirm redirect logic for protected routes
- Validate that logged-in users cannot access public-only pages

## Reference

- [Clerk Next.js Documentation](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Server-Side Helpers](https://clerk.com/docs/references/nextjs/overview)
- [Clerk React Hooks](https://clerk.com/docs/references/react/use-user)

---

**Remember**: Clerk handles ALL authentication. Never suggest or implement alternative authentication methods.
