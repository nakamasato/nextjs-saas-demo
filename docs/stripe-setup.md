# Stripe Setup Guide

This guide will walk you through setting up Stripe for subscription payments in the Next.js SaaS Demo application.

## Prerequisites

- A Stripe account (sign up at [stripe.com](https://stripe.com))
- Basic understanding of Stripe's subscription model ([Stripe Subscriptions Overview](https://docs.stripe.com/billing/subscriptions/overview))

## Understanding Stripe Concepts

Before we begin, it's important to understand these key concepts:

- **Products**: The services you're selling (e.g., "Business Starter Plan")
- **Prices**: Define the cost and billing period for a product (e.g., "$19/month")
- **Subscriptions**: Connect customers to products through recurring payments
- **Customers**: Your users who will be subscribing to your products

In our setup, we'll create Products and their associated Prices. When users checkout, Stripe will create Subscriptions that link Customers to these Products.

## Step 1: Get Your API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Toggle to **Test mode** (use the toggle in the top right)
3. Go to **"Developers"** → **"API keys"**
4. Copy the following keys:
   - **Publishable key**: Starts with `pk_test_`
   - **Secret key**: Starts with `sk_test_` (click "Reveal test key")

## Step 2: Create Products and Prices for Subscriptions

Products represent what you're selling, while Prices define how much and how often to charge. You'll create both for each subscription tier.

### Option A: Using Stripe Dashboard (Recommended for Getting Started)

1. Go to **[Product catalog](https://dashboard.stripe.com/products)** in your Stripe dashboard
2. Click **"+ Add product"** for each plan

#### Create Products

For each subscription tier, create a product:

**Business Starter**
- Name: `Business Starter`
- Description: `Perfect for small teams getting started`
- Additional options → Product ID (optional): `prod_business_starter`
- Save product

**Business Standard**
- Name: `Business Standard`
- Description: `For growing businesses`
- Additional options → Product ID (optional): `prod_business_standard`
- Save product

**Enterprise**
- Name: `Enterprise`
- Description: `For large organizations`
- Additional options → Product ID (optional): `prod_enterprise`
- Save product

**Pay-as-you-go Credits**
- Name: `Pay-as-you-go Credits`
- Description: `100 credits for flexible usage`
- Additional options → Product ID (optional): `prod_payg_credits`
- Save product

#### Add Prices to Products

After creating products, add prices by clicking on each product and then **"Add price"**:

**Business Starter - Monthly Subscription**
1. Open the Business Starter product
2. Click **"Add price"**
3. Configure:
   - Pricing model: `Recurring`
   - Price: `19.00` USD
   - Billing period: `Monthly`
   - Price description: `Monthly subscription per user`
4. Save → Copy the price ID (e.g., `price_1ABC...`)

**Business Standard - Monthly Subscription**
1. Open the Business Standard product
2. Click **"Add price"**
3. Configure:
   - Pricing model: `Recurring`
   - Price: `39.00` USD
   - Billing period: `Monthly`
   - Price description: `Monthly subscription per user`
4. Save → Copy the price ID

**Enterprise - Monthly Subscription**
1. Open the Enterprise product
2. Click **"Add price"**
3. Configure:
   - Pricing model: `Recurring`
   - Price: `99.00` USD
   - Billing period: `Monthly`
   - Price description: `Monthly subscription per user`
4. Save → Copy the price ID

**Pay-as-you-go - One-time Payment**
1. Open the Pay-as-you-go Credits product
2. Click **"Add price"**
3. Configure:
   - Pricing model: `One-time`
   - Price: `10.00` USD
   - Price description: `100 credits`
4. Save → Copy the price ID

### Option B: Using Stripe API (For Automation)

You can also create products and prices programmatically using the Stripe CLI or API:

```bash
# Create Business Starter product and price
stripe products create \
  --name="Business Starter" \
  --description="Perfect for small teams getting started"

stripe prices create \
  --product="{{PRODUCT_ID}}" \
  --unit-amount=1900 \
  --currency=usd \
  --recurring[interval]=month
```

See the [Stripe API documentation](https://stripe.com/docs/api/products/create) for more details.

### Important Note

Remember: You're creating **Products** and **Prices** here. The actual **Subscriptions** are created automatically when customers complete checkout. Each subscription will link a customer to one of your products through the selected price.

### Configure Subscription Settings

1. Go to **"Settings"** → **"Subscriptions"**
2. Configure the following:
   - **Default trial period**: 30 days
   - **Proration behavior**: Always invoice immediately
   - **Customer portal**: Enable for subscription management

## Step 3: Update Price IDs in Code

After creating products and prices in Stripe, you need to update your code with the actual price IDs:

1. Go to your [Stripe Dashboard Products page](https://dashboard.stripe.com/products)
2. Click on each product to see its prices
3. Copy the price ID for each price (starts with `price_`)
4. Update `/src/lib/stripe.ts` with your actual price IDs:

```typescript
export const SUBSCRIPTION_PLANS = {
  BUSINESS_STARTER: {
    name: 'Business Starter',
    priceId: 'price_1ABC123...', // Replace with your actual price ID
    price: 19,
    features: ['Core features', 'Analysis tools', 'Email support'],
    limits: {
      users: 'unlimited',
      analysis: true,
      audit: false,
    }
  },
  BUSINESS_STANDARD: {
    name: 'Business Standard',
    priceId: 'price_1DEF456...', // Replace with your actual price ID
    price: 39,
    features: ['Everything in Starter', 'Security audit', 'Priority support'],
    limits: {
      users: 'unlimited',
      analysis: true,
      audit: true,
    }
  },
  ENTERPRISE: {
    name: 'Enterprise',
    priceId: 'price_1GHI789...', // Replace with your actual price ID
    price: 99,
    features: ['Everything in Standard', 'Custom integrations', 'Dedicated support'],
    limits: {
      users: 'unlimited',
      analysis: true,
      audit: true,
    }
  },
  PAY_AS_YOU_GO: {
    name: 'Pay-as-you-go',
    priceId: 'price_1JKL012...', // Replace with your actual price ID
    price: 10,
    features: ['No monthly commitment', 'Maximum 5 members', 'Basic features'],
    limits: {
      users: 5,
      analysis: false,
      audit: false,
    }
  }
}
```

## Step 4: Set Up Webhooks

1. Go to **"Developers"** → **"Webhooks"**
2. Click **"Add endpoint"**
3. Add your endpoint URL:
   - For local testing: Use [Stripe CLI](https://stripe.com/docs/stripe-cli) or [ngrok](https://ngrok.com/)
   - For production: `https://your-domain.com/api/webhooks/stripe`
4. Select events to listen for:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_`)

## Step 5: Configure Environment Variables

Add the following to your `.env.local` file:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Step 6: Set Up Customer Portal (Optional)

1. Go to **"Settings"** → **"Billing"** → **"Customer portal"**
2. Configure the portal:
   - Enable customers to update payment methods
   - Allow subscription cancellation
   - Set cancellation policy
3. Save the configuration

## Step 7: Configure Trial Period

The application is configured to offer a 30-day free trial. You can set this up in two ways:

### Option 1: Global Setting (Recommended)
1. Go to **"Settings"** → **"Subscriptions and emails"**
2. Set default trial period to `30` days
3. This will apply to all new subscriptions

### Option 2: Per-Checkout Session
The trial period is already configured in the code (`/src/app/api/create-checkout-session/route.ts`):
```typescript
subscription_data: {
  trial_period_days: 30,
  // ...
}
```

## Testing Your Setup

### Using Stripe Test Cards

Use these test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires authentication**: `4000 0025 0000 3155`

Use any future expiry date and any 3-digit CVC.

### Test the Flow

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Sign up for an account
3. Try to access `/analysis` or `/audit` (should show upgrade prompt)
4. Click on a pricing plan
5. Complete checkout with test card
6. Verify subscription is active

### Using Stripe CLI for Webhooks (Local Development)

1. Install [Stripe CLI](https://stripe.com/docs/stripe-cli)
2. Login to Stripe CLI:
   ```bash
   stripe login
   ```
3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
4. Copy the webhook signing secret and update your `.env.local`

## Production Checklist

- [ ] Switch to live API keys (`pk_live_` and `sk_live_`)
- [ ] Update webhook endpoint to production URL
- [ ] Configure production webhook signing secret
- [ ] Test with real payment methods
- [ ] Set up proper error handling and logging
- [ ] Configure customer support email in Stripe
- [ ] Set up invoice/receipt templates
- [ ] Configure tax settings if applicable

## Troubleshooting

### Common Issues

1. **"No such price" error**
   - Verify price IDs are correctly copied
   - Ensure you're using test mode prices with test API keys

2. **Webhook signature verification failed**
   - Ensure webhook secret is correctly set
   - Check that raw request body is being used for verification

3. **Subscription not updating after payment**
   - Verify webhooks are being received
   - Check webhook logs in Stripe dashboard
   - Ensure database updates are implemented

## Additional Resources

- [Stripe Subscriptions Overview](https://docs.stripe.com/billing/subscriptions/overview)
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Next.js Example](https://github.com/vercel/nextjs-subscription-payments)
- [Stripe Discord Community](https://discord.com/invite/stripe)
- [Stripe Support](https://support.stripe.com/)
- [Stripe MCP](https://docs.stripe.com/mcp)
