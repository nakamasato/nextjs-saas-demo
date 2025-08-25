# Clerk Setup Guide

This guide will walk you through setting up Clerk authentication for the Next.js SaaS Demo application.

## Prerequisites

- A Clerk account (sign up at [clerk.com](https://clerk.com))

## Step 1: Create a Clerk Application

1. Log in to your [Clerk Dashboard](https://dashboard.clerk.com/)
2. Click **"+ New application"**
3. Enter your application name (e.g., "Next.js SaaS Demo")
4. Select the authentication methods:
   - ✅ **Email**
   - ✅ **Google**
5. Click **"Create application"**

## Step 2: Configure Google OAuth

### For Development (Recommended)

1. In your Clerk dashboard, go to **"User & Authentication"** → **"Social Connections"**
2. Click on **Google**
3. Toggle **"Enable Google as a sign-in option"**
4. Select **"Use Clerk's OAuth application"** (default)
   - This allows you to start testing immediately without any Google configuration
   - Perfect for development and testing

### For Production (Optional)

If you want to use your own Google OAuth application (for custom branding or production use):

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URIs from Clerk
5. In Clerk dashboard, select **"Use your own OAuth application"**
6. Copy your Google Client ID and Client Secret to Clerk

## Step 3: Get Your API Keys

1. In your Clerk dashboard, go to **"API Keys"**
2. Copy the following keys:
   - **Publishable key**: Starts with `pk_test_` or `pk_live_`
   - **Secret key**: Starts with `sk_test_` or `sk_live_`

## Step 4: Configure Environment Variables

Add the following to your `.env.local` file:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

## Step 5: Configure Clerk Settings

1. In Clerk dashboard, go to **"Paths"**
2. Set the following URLs:
   - **Sign-in URL**: `/sign-in`
   - **Sign-up URL**: `/sign-up`
   - **After sign-in URL**: `/`
   - **After sign-up URL**: `/`

## Step 6: Customize Appearance (Optional)

1. Go to **"Customization"** in your Clerk dashboard
2. Customize the appearance to match your brand:
   - Logo
   - Primary color
   - Font
   - Border radius

## Step 7: Localization Setup

The application supports multiple languages with automatic system language detection.

### Supported Languages
- **English** (default)
- **Japanese** (日本語)

### Features
- **Automatic Detection**: Uses system language as default
- **User Preference**: Language choice is saved in localStorage
- **Language Switcher**: Globe icon in the header allows easy switching
- **Clerk Integration**: All Clerk components are localized

### How it Works
1. On first visit, the system detects your browser language
2. If Japanese is detected, Japanese localization is applied
3. Otherwise, English is used as default
4. Users can manually switch languages using the globe icon
5. The preference is saved and persists across sessions

### Implementation
```tsx
// LocaleProvider automatically detects and applies localization
import { LocaleProvider } from '@/components/locale-provider'
import { jaJP } from '@clerk/localizations'

// Language switcher allows manual selection
import { LanguageSwitcher } from '@/components/language-switcher'
```

## Step 8: Enable Organizations

Organizations allow users to collaborate in teams and manage billing centrally. This is essential for SaaS applications.

1. In your Clerk dashboard, navigate to **"Organizations"** in the left sidebar
2. Click **"Enable Organizations"**
3. Configure the default settings:
   - **Roles**: Keep default roles (admin, basic_member, guest_member)
   - **Permissions**: Review and adjust as needed
   - **Creation**: ✅ Allow new users to create organizations
   - **Membership Limit**: Set to desired limit (default: unlimited)

### Organization Settings Configuration

#### Creation Permissions
- ✅ **Allow new users to create organizations**: This enables the individual sign-up → organization creation flow
- Set **Organizations per user limit**: Unlimited (recommended for SaaS)

#### Membership Limits
- **Default membership limit**: 5 members (can be increased per organization)
- **Upgrade prompt**: Configure to show pricing when limit is reached

#### Domain Verification (Optional)
- Enable **Verified domains** for enterprise features
- Configure **Auto-join by domain** if needed

### Testing Organization Features

Watch this helpful video tutorial: [Clerk Organizations Setup](https://www.youtube.com/watch?v=3PYtdzoQOKs)

After enabling organizations:
1. Sign up for a new account
2. Use the organization switcher in the header to create an organization
3. Subscribe to a plan through the organization
4. Switch between personal account and organizations using the organization switcher
5. Verify the dashboard updates to show organization context

## Step 9: Enable Clerk Billing

Clerk Billing provides zero-integration subscription management for organizations.

1. In your Clerk dashboard, navigate to **"Billing"** in the left sidebar
2. Click **"Enable Billing"**
3. Connect your Stripe account when prompted
4. Configure your subscription plans:
   - **Free**: Basic features (no permissions)
   - **Business Starter ($19/mo)**: Permission: `org:analysis:access`
   - **Business Standard ($39/mo)**: Permissions: `org:analysis:access`, `org:audit:access`
   - **Enterprise ($99/mo)**: All permissions plus custom features

### Key Benefits
- **No webhook code**: Clerk handles all Stripe webhooks automatically
- **No database management**: Subscription data synced automatically
- **Built-in UI components**: Use `<PricingTable />` for instant pricing page
- **Organization-aware**: Subscriptions are tied to organizations, not users

### Implementation
```tsx
// Pricing page - IMPORTANT: Use forOrganizations prop
import { PricingTable } from '@clerk/nextjs'

export default function PricingPage() {
  return <PricingTable forOrganizations />
}

// Feature gating
const { has } = await auth()
const hasAccess = await has({ permission: "org:analysis:access" })
```

### Testing
- Clerk automatically uses Stripe test mode in development
- Use test card: `4242 4242 4242 4242`

### Pricing
- Clerk Billing adds 0.7% on top of Stripe fees (production only)

## Step 10: Set Up Webhooks (Optional for Production)

For production, you may want to sync user data with your database:

1. Go to **"Webhooks"** in Clerk dashboard
2. Add endpoint URL: `https://your-domain.com/api/webhooks/clerk`
3. Select events to listen to:
   - `user.created`
   - `user.updated`
   - `user.deleted`
   - `organization.created`
   - `organization.updated`
   - `organizationMembership.created`

## Testing Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`

3. Test the authentication flow:
   - Click "Sign Up" to create a new account
   - Try signing in with email/password
   - Test Google OAuth login
   - Test organization creation and switching using the header

## Troubleshooting

### Common Issues

1. **"Invalid publishable key" error**
   - Ensure you copied the correct key from Clerk dashboard
   - Check that the key starts with `pk_test_` or `pk_live_`

2. **Google OAuth not working**
   - Verify Google OAuth is enabled in Clerk dashboard
   - Check that redirect URIs are correctly configured in Google Cloud Console

3. **Redirect loops**
   - Ensure your sign-in/sign-up URLs match the configuration in both code and Clerk dashboard

4. **Organizations not appearing**
   - Verify organizations are enabled in Clerk Dashboard
   - Check that `CLERK_SECRET_KEY` is set correctly
   - Ensure you're not in a cached state (try incognito mode)

5. **Organization switcher not showing**
   - Make sure the component is imported from `@clerk/nextjs`
   - Check browser console for any React errors
   - Verify the component is within a Clerk provider context

## Production Considerations

- Use production keys (`pk_live_` and `sk_live_`) for production deployment
- Configure proper redirect URLs for your production domain
- Set up proper CORS policies if using a separate frontend domain
- Enable webhook signature verification for security

## Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Integration Guide](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Organizations Overview](https://clerk.com/docs/organizations/overview)
- [Clerk Organizations Components Reference](https://clerk.com/docs/components/organization/organization-switcher)
- [Clerk Organizations Setup Video Tutorial](https://www.youtube.com/watch?v=3PYtdzoQOKs)
- [Clerk Discord Community](https://discord.com/invite/b5rXHjAg7A)

## Application Flow

### Sign-up Flow
1. User signs up with personal account
2. User creates organizations using the organization switcher in the header
3. User can switch between personal account and organizations
4. User manages detailed settings through the account portal (UserButton)

### Organization Management
- **Organization Switcher**: Quick organization creation and switching in the header
- **Account Portal**: Detailed organization settings, member management, and billing
- Organization switcher shows current context and allows easy switching

### Billing Integration
Organizations are designed to be the billing entity:
- Each organization can have its own subscription
- Billing is managed at the organization level
- Personal accounts remain free with limited features