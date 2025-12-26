# Authentication & Security Setup - Abogados Watson

## Overview
This document describes the authentication and security implementation for the Abogados Watson application using Next.js App Router, TypeScript, and Auth.js (NextAuth v5).

## Stack
- **Next.js 16** with App Router
- **Auth.js v5** (next-auth@beta)
- **Prisma** with PostgreSQL
- **bcryptjs** for password hashing
- **Zod** for validation

## Roles
The system supports three user roles:
- `ADMIN` - Full system access
- `ABOGADO` - Lawyer access
- `CLIENTE` - Client access (default)

## Files Created

### Core Authentication
- **`src/auth.config.ts`** - Auth.js configuration with Credentials provider and callbacks
- **`src/auth.ts`** - Main Auth.js initialization
- **`src/types/next-auth.d.ts`** - TypeScript type definitions for session/JWT
- **`src/app/api/auth/[...nextauth]/route.ts`** - API route handlers

### Database
- **`prisma/schema.prisma`** - Added `User` model and `Role` enum

### Middleware & Helpers
- **`src/middleware.ts`** - Route protection middleware (integrated with next-intl)
- **`src/lib/auth-helpers.ts`** - Permission helper functions
- **`src/lib/definitions.ts`** - Role enum and validation schemas

### Server Actions
- **`src/actions/auth.ts`** - Login, register, and logout actions

## Environment Variables Required

Add to your `.env` file:

```bash
# Auth.js
AUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32

# Database (already configured)
DATABASE_URL="your-database-url"
```

## Database Setup

The Prisma schema has been updated with the `User` model. To apply changes:

```bash
# Push schema to database
npx prisma db push

# Or create a migration
npx prisma migrate dev --name add_user_auth
```

## Usage Examples

### Server Components

```typescript
import { auth } from '@/auth';
import { requireAdmin, isAbogado } from '@/lib/auth-helpers';

export default async function AdminPage() {
  // Require authentication
  const session = await auth();
  if (!session) redirect('/login');
  
  // Require admin role
  await requireAdmin();
  
  return <div>Admin Content</div>;
}
```

### Server Actions

```typescript
'use server';

import { requireAuth, hasRole } from '@/lib/auth-helpers';
import { Role } from '@/lib/definitions';

export async function createCase(data: any) {
  const user = await requireAuth();
  
  // Check if user is lawyer or admin
  const canCreate = await hasRole(Role.ABOGADO) || await hasRole(Role.ADMIN);
  if (!canCreate) {
    throw new Error('Unauthorized');
  }
  
  // Create case logic...
}
```

### Login/Register (Client Component)

```typescript
'use client';

import { login, register } from '@/actions/auth';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  
  async function handleLogin(formData: FormData) {
    const result = await login({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
    
    if (result.success) {
      router.push('/dashboard');
    }
  }
  
  return <form action={handleLogin}>...</form>;
}
```

## Protected Routes

The middleware automatically protects:
- `/dashboard/*` - Requires authentication
- `/admin/*` - Requires ADMIN role

To add more protected routes, edit `src/middleware.ts`.

## Permission Helpers

Available helper functions in `src/lib/auth-helpers.ts`:

- `getCurrentUser()` - Get current session user
- `hasRole(role)` - Check if user has specific role
- `isAdmin()` - Check if user is admin
- `isAbogado()` - Check if user is lawyer
- `isCliente()` - Check if user is client
- `hasAnyRole(roles[])` - Check if user has any of the roles
- `requireAuth()` - Require authentication (throws if not)
- `requireRole(role)` - Require specific role (throws if not)
- `requireAdmin()` - Require admin role (throws if not)

## Server Actions

Available in `src/actions/auth.ts`:

### `login(data)`
```typescript
const result = await login({ email, password });
// Returns: { success: boolean, error?: string }
```

### `register(data)`
```typescript
const result = await register({ name, email, password });
// Returns: { success: boolean, data?: { id, email }, error?: string }
```

### `logout()`
```typescript
const result = await logout();
// Returns: { success: boolean, error?: string }
```

## Next Steps

1. **Set AUTH_SECRET** in `.env`
2. **Push database schema**: `npx prisma db push`
3. **Create login/register UI pages** (out of scope for this task)
4. **Create admin user** manually in database or via seed script
5. **Test authentication flow**

## Integration with Existing Actions

To protect existing server actions (clients, cases, etc.), add authentication checks:

```typescript
import { requireAuth, requireRole } from '@/lib/auth-helpers';
import { Role } from '@/lib/definitions';

export async function createClient(data: any) {
  // Require lawyer or admin
  const user = await requireAuth();
  const isAuthorized = await hasAnyRole([Role.ADMIN, Role.ABOGADO]);
  
  if (!isAuthorized) {
    return { success: false, error: 'Unauthorized' };
  }
  
  // Existing logic...
}
```

## Notes

- **No UI created** - Only backend infrastructure as requested
- **Database schema** - Added `User` model without modifying existing entities
- **Middleware** - Chains with next-intl for internationalization
- **Type-safe** - Full TypeScript support with proper type definitions
