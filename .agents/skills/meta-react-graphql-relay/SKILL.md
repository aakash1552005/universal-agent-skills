---
name: meta-react-graphql-relay
description: Meta frontend & API architecture: React 19 Server Components, GraphQL federation, Relay-style connections/pagination, and DataLoader N+1 prevention.
---

# Meta React 19 & GraphQL Architecture

Building fast, scalable user interfaces and federated data graphs inspired by Meta engineering standards.

## DataLoader N+1 Prevention Pattern (Node.js / GraphQL)
```typescript
import DataLoader from 'dataloader';

// Batch loader receives all IDs requested across sibling GraphQL fields in one tick
export const createUserDataLoader = (db: Database) =>
  new DataLoader<string, User>(async (userIds) => {
    const users = await db.query('SELECT * FROM users WHERE id IN ($1)', [userIds]);
    const userMap = new Map(users.map(u => [u.id, u]));
    return userIds.map(id => userMap.get(id) || null);
  });
```
