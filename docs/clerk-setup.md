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

## Step 7: Set Up Webhooks (Optional for Production)

For production, you may want to sync user data with your database:

1. Go to **"Webhooks"** in Clerk dashboard
2. Add endpoint URL: `https://your-domain.com/api/webhooks/clerk`
3. Select events to listen to:
   - `user.created`
   - `user.updated`
   - `user.deleted`

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

## Production Considerations

- Use production keys (`pk_live_` and `sk_live_`) for production deployment
- Configure proper redirect URLs for your production domain
- Set up proper CORS policies if using a separate frontend domain
- Enable webhook signature verification for security

## Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Integration Guide](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Discord Community](https://discord.com/invite/b5rXHjAg7A)