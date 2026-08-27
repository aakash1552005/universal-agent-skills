---
name: mobile-cross-platform-flutter-react-native
description: Cross-platform mobile development with Flutter 3.x and React Native Expo: state management, native device APIs, offline-first syncing, and App Store / Google Play publishing.
---

# Cross-Platform Mobile Architecture (Flutter & Expo)

Building high-performance iOS and Android applications with offline-first synchronization and native device bridges.

## React Native Expo Offline SQLite Synced Pattern
```typescript
import * as SQLite from 'expo-sqlite';

export async function initOfflineDB() {
  const db = await SQLite.openDatabaseAsync('analytics_cache.db');
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS pending_sync (
      id TEXT PRIMARY KEY NOT NULL,
      payload TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
  `);
  return db;
}
```
