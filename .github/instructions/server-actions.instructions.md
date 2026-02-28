---
description: Always read these instructions before implementing data mutations or server actions. This file outlines the strict guidelines for handling data mutations through server actions in this application.
---

# Server Actions Guidelines

## Core Principles

All data mutations in this application MUST be performed exclusively through Next.js server actions.

## Server Action Requirements

### File Structure
- Server action files MUST be named `actions.ts`
- Server actions MUST be colocated in the same directory as the component that calls them

### Component Architecture
- Server actions MUST be called from client components only
- Client components should use the `"use client"` directive

### Type Safety
- ALL data passed to server actions MUST have appropriate TypeScript types
- **DO NOT** use the `FormData` TypeScript type for server action parameters
- Define explicit interfaces or types for all server action inputs

### Data Validation
- ALL data received by server actions MUST be validated using Zod schemas
- Validation should happen at the beginning of the server action

### Authentication
- ALL server actions MUST check for a logged-in user before performing any database operations
- Use appropriate authentication checks at the start of each server action

### Database Operations
- Server actions MUST NOT directly use Drizzle queries
- ALL database operations MUST be delegated to helper functions located in the `/data` directory
- These helper functions wrap Drizzle queries and should be the only place where direct database queries occur

### Error Handling
- Server actions MUST NOT throw errors
- ALL server actions MUST return an object with either an `error` or `success` property
- Use this pattern for consistent error handling in client components

## Example Structure

```typescript
// app/example/actions.ts
'use server'

import { z } from 'zod'
import { auth } from '@clerk/nextjs/server'
import { createRecord } from '@/data/create-record'

const schema = z.object({
  name: z.string().min(1),
  value: z.number()
})

export async function exampleAction(data: { name: string; value: number }) {
  try {
    // 1. Check authentication
    const { userId } = await auth()
    if (!userId) {
      return { error: 'Unauthorized' }
    }
    
    // 2. Validate data
    const validated = schema.parse(data)
    
    // 3. Use helper function from /data directory
    const result = await createRecord(userId, validated)
    
    return { success: true, data: result }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'An error occurred' }
  }
}
```

## Compliance

Following these guidelines ensures:
- Type-safe data handling
- Consistent validation patterns
- Secure authentication checks
- Maintainable database operations
- Clear separation of concerns
