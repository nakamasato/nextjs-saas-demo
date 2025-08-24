import { SubscriptionPlan, SUBSCRIPTION_PLANS } from './stripe'

// This would normally come from your database
// For demo purposes, we'll simulate subscription data
export interface UserSubscription {
  plan: SubscriptionPlan | null
  status: 'active' | 'trialing' | 'canceled' | 'past_due' | null
  trialEndsAt: Date | null
  currentPeriodEnd: Date | null
}

// Mock function - in a real app, this would fetch from your database
export async function getUserSubscription(_userId: string): Promise<UserSubscription> {
  // For demo purposes, return a mock subscription
  // In a real app, you'd query your database here
  return {
    plan: null, // User has no subscription initially
    status: null,
    trialEndsAt: null,
    currentPeriodEnd: null,
  }
}

export function hasAccessToFeature(subscription: UserSubscription, feature: 'analysis' | 'audit'): boolean {
  // If user has no subscription, they don't have access to premium features
  if (!subscription.plan) {
    return false // Free users don't have access to premium features
  }

  const plan = SUBSCRIPTION_PLANS[subscription.plan]
  
  switch (feature) {
    case 'analysis':
      return plan.limits.analysis
    case 'audit':
      return plan.limits.audit
    default:
      return false
  }
}

export function getRequiredPlanForFeature(feature: 'analysis' | 'audit'): string {
  switch (feature) {
    case 'analysis':
      return 'Business Starter or higher'
    case 'audit':
      return 'Business Standard or higher'
    default:
      return 'Unknown'
  }
}