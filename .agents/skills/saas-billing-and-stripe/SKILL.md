---
name: saas-billing-and-stripe
description: Master Stripe billing & monetization: subscription lifecycles, checkout sessions, webhook idempotency, metered usage, customer billing portal, and dunning management.
---

# Stripe & SaaS Billing Architecture

Engineering resilient, audit-compliant monetization and subscription billing architectures with Stripe API and webhooks.

## Key Principles:
1. **Webhook Idempotency**: Record incoming `event.id` in PostgreSQL before processing to avoid duplicate credit granting.
2. **Checkout Session Pattern**: Always use Stripe Checkout / Customer Portal instead of custom credit card forms for 100% PCI compliance.

```typescript
import Stripe from 'stripe';
import { db } from '@/lib/db';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function handleStripeWebhook(rawBody: string, sig: string) {
  const event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  
  // Idempotency check
  const existing = await db.query('SELECT id FROM processed_events WHERE id = $1', [event.id]);
  if (existing.rows.length > 0) return { received: true };

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await db.query(
      'UPDATE organizations SET subscription_status = $1, stripe_customer_id = $2 WHERE id = $3',
      ['active', session.customer, session.client_reference_id]
    );
  }

  await db.query('INSERT INTO processed_events (id, created_at) VALUES ($1, NOW())', [event.id]);
  return { received: true };
}
```
