# Clerk Billing Setup Guide

This guide explains how to set up Clerk Billing for organization-based subscriptions in your Next.js SaaS application.

## Overview

Clerk Billing provides a zero-integration approach to SaaS billing by handling:
- Subscription management UI
- Stripe integration
- Organization-based billing
- Feature gating based on plans

## Prerequisites

1. Clerk account with Organizations enabled
2. Stripe account
3. Next.js application with Clerk authentication

## Step 1: Enable Clerk Billing

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com/)
2. Navigate to **Billing** in the left sidebar
3. Click **Enable Billing**
4. Connect your Stripe account when prompted

## Step 2: Configure Billing Plans

### Create Subscription Plans

1. In Clerk Dashboard, go to **Billing** → **Plans**
2. Create your plans (e.g., Free, Business Starter, Business Standard, Enterprise)
3. For each plan, configure:
   - **Name**: Display name for the plan
   - **Stripe Product ID**: Will be created automatically
   - **Features**: List of features included
   - **Permissions**: Clerk permissions granted

### Example Plan Configuration

```
Free Plan:
- Price: $0/month
- Features: Basic dashboard, Profile management
- Permissions: None

Business Starter:
- Price: $19/month per organization
- Features: Business Analytics, Revenue tracking
- Permissions: org:analysis:access

Business Standard:
- Price: $39/month per organization
- Features: Everything in Starter + Security Audit
- Permissions: org:analysis:access, org:audit:access

Enterprise:
- Price: $99/month per organization
- Features: Everything + Custom integrations
- Permissions: org:analysis:access, org:audit:access, org:enterprise:access
```

## Step 3: Implement Billing Components

### Update Pricing Page

Replace the existing pricing page with Clerk's PricingTable:

```tsx
// src/app/pricing/page.tsx
import { PricingTable } from '@clerk/nextjs'
import { Header } from '@/components/header'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            All plans are billed per organization.
          </p>
        </div>

        {/* Important: forOrganizations prop is required */}
        <PricingTable forOrganizations />
      </main>
    </div>
  )
}
```

## Step 4: Update Feature Gating

### Using Clerk's Authorization

Replace custom subscription checks with Clerk's `has()` helper:

```tsx
// Server Component
import { auth } from '@clerk/nextjs/server'

export default async function AnalysisPage() {
  const { userId, has } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Check if organization has analysis access
  const hasAccess = await has({ permission: "org:analysis:access" })
  
  if (!hasAccess) {
    // Show upgrade prompt
  }
}
```

### Client Component Protection

```tsx
// Client Component
import { Protect } from '@clerk/nextjs'

export function PremiumFeature() {
  return (
    <Protect
      condition={(has) => has({ permission: "org:analysis:access" })}
      fallback={<UpgradePrompt />}
    >
      <AnalyticsContent />
    </Protect>
  )
}
```

## Step 5: Organization Billing Flow

### Key Concepts

1. **All billing is organization-based**: Even individual users need an organization to subscribe
2. **Personal accounts remain free**: Users can use basic features without an organization
3. **Organizations own subscriptions**: Subscriptions are attached to organizations, not users

### Implementation Steps

1. User signs up → Gets personal account (free features only)
2. User creates organization → Can subscribe to paid plans
3. Organization members share the subscription benefits

## Step 6: Testing

### Development Testing

1. Clerk automatically uses Stripe test mode in development
2. Use test credit cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

### Test Flow

1. Create a new user account
2. Create an organization
3. Navigate to pricing page
4. Select a plan and complete checkout
5. Verify feature access is granted

## Step 7: Production Deployment

1. Ensure Stripe is in live mode
2. Update environment variables for production
3. Test the complete billing flow
4. Monitor Stripe dashboard for transactions

## Pricing Considerations

- Clerk Billing adds 0.7% on top of Stripe fees
- Only charged in production
- No upfront costs or monthly fees

## Troubleshooting

### Common Issues

1. **PricingTable not showing plans**
   - Verify plans are configured in Clerk Dashboard
   - Check that Stripe is properly connected

2. **Permissions not working**
   - Ensure organization context is active
   - Verify permission names match exactly

3. **Subscription not syncing**
   - Check Stripe webhook configuration
   - Verify Clerk-Stripe connection

## Benefits of Clerk Billing

1. **Zero webhook code**: Clerk handles all Stripe webhooks
2. **No database management**: Subscription data synced automatically
3. **Built-in UI components**: PricingTable, subscription management
4. **Organization-aware**: Perfect for B2B SaaS

## Limitations

- Currently USD only
- Limited customization of pricing UI
- No usage-based billing (yet)

## Resources

- [Clerk Billing Documentation](https://clerk.com/docs/billing)
- [Clerk Organizations + Billing Tutorial](https://www.youtube.com/watch?v=3PYtdzoQOKs)
- [Example Repository](https://github.com/panteliselef/clerk-stripe-organizations)