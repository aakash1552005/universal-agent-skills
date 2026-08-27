---
name: auth-and-session-management
description: Enterprise authentication & session management: Auth.js / NextAuth, Clerk, Supabase Auth, OAuth2/OIDC, JWT refresh token rotation, and Passkeys / WebAuthn.
---

# Authentication & Session Security Architecture

Implementing modern, secure authentication, role-based access control (RBAC), and session management.

## NextAuth / Auth.js v5 Configuration Pattern
```typescript
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role ?? 'member';
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.role = token.role as string;
      return session;
    },
  },
});
```
