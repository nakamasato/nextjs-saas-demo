# Nextjs SaaS demo

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Features

1. Auth & Organization support: [Clerk](https://clerk.com/)
    1. Google and email/password login
1. Payment: [Stripe](https://docs.stripe.com/)
    1. Subscription:
        1. One Month Free trial
        1. Per-user plans
            1. Business Starter (19 USD per month per user)
            1. Business Standard (39 USD per month per user)
            1. Enterprise (99 USD per month per user)
        1. Pay-as-you-go plans
            1. 10 USD per 100 credit (maximum 5 members)
1. UI: [ShadCN/UI](https://ui.shadcn.com/)
1. Service Name: **Nextjs SaaS Demo**
1. Navbar: Service Name at top left with right-sided page links and User avatar at the rightmost side.
1. Pages and features
    1. Login and logout with Google Oauth or email/password
    1. Feature
        1. Landing Page (`/` for non-logged-in users)
        1. Core feature (`/` after login)
        1. Analytics feature: only accessible for Business Starter or higher
            1. `/analytics`
        1. Security feature: only Business Standard or higher
            1. `/audit`

## Setup

Follow these steps to set up the Next.js SaaS Demo application:

### Prerequisites

- Node.js 18+ and npm/pnpm installed
- A [Clerk](https://clerk.com) account for authentication
- A [Stripe](https://stripe.com) account for payments

### 1. Clone and Install Dependencies

```bash
pnpm install
```

### 2. Environment Variables

Copy the example environment file and update with your keys:

```bash
cp .env.example .env.local
```

You'll need to configure the following services:

### 3. Set Up Authentication (Clerk)

Follow the detailed guide in [docs/clerk-setup.md](docs/clerk-setup.md) to:

1. Create a Clerk application
2. Configure Google OAuth
3. Get your API keys
4. Update `.env.local` with:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

### 4. Set Up Payments (Stripe)

Follow the detailed guide in [docs/stripe-setup.md](docs/stripe-setup.md) to:

1. Create products and pricing for all subscription plans
2. Get your API keys
3. Set up webhooks
4. Update `.env.local` with:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
5. Update price IDs in `src/lib/stripe.ts`

### 5. Run the Application

```bash
# Development mode
npm run dev
# or
pnpm dev

# Build for production
npm run build
npm start
```

### 6. Test the Application

1. Visit `http://localhost:3000`
2. Sign up using email/password or Google OAuth
3. Explore the dashboard
4. Try accessing `/analytics` or `/audit` (requires subscription)
5. Test the subscription flow with Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Any future expiry date and any 3-digit CVC

### 7. Local Webhook Testing (Optional)

For testing Stripe webhooks locally:

```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── analytics/       # Business analytics (Business Starter+)
│   ├── audit/          # Security audit (Business Standard+)
│   ├── api/            # API routes
│   └── page.tsx        # Landing/Dashboard
├── components/         # React components
├── lib/               # Utilities and configurations
└── middleware.ts      # Clerk authentication middleware
```

## Troubleshooting

- **Authentication issues**: Check Clerk API keys and configuration
- **Payment issues**: Verify Stripe API keys and webhook setup
- **Build errors**: Ensure all environment variables are set
- **Feature access**: Check subscription status and plan limits

## Features Implemented ✅

- **Authentication**: Clerk with Google OAuth and email/password
- **UI Components**: ShadCN/UI components (Button, Card, Avatar, Dropdown Menu)
- **Responsive Design**: Mobile-first, clean white theme
- **Landing Page**: Marketing page for non-authenticated users
- **Dashboard**: User dashboard with account overview
- **Subscription Tiers**:
  - Business Starter ($19/month) - Analytics access
  - Business Standard ($39/month) - Analytics + Audit access
  - Enterprise ($99/month) - All features
  - Pay-as-you-go ($10/100 credits) - Basic features
- **Access Control**: Role-based feature restrictions with upgrade prompts
- **Payment Integration**: Stripe Products and Prices configured
- **Webhook Support**: Stripe webhook handlers for subscription events

## Production Checklist

- [ ] Set up production database (PostgreSQL/MySQL)
- [ ] Implement real subscription status checking
- [ ] Add proper error handling and loading states
- [ ] Configure production environment variables
- [ ] Set up proper webhook validation
- [ ] Add comprehensive tests
- [ ] Configure monitoring and logging

For detailed setup instructions, see:
- [Clerk Setup Guide](docs/clerk-setup.md)
- [Stripe Setup Guide](docs/stripe-setup.md)
