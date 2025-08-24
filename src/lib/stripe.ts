import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
})

export const SUBSCRIPTION_PLANS = {
  BUSINESS_STARTER: {
    name: 'Business Starter',
    priceId: 'price_1RzWnWJjIu4ndWVgrLUHUViC',
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
    priceId: 'price_1RzWnkJjIu4ndWVgei9aei6i',
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
    priceId: 'price_1RzWnwJjIu4ndWVgAwFRleqP',
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
    priceId: 'price_1RzWo8JjIu4ndWVgtvTlKP6O',
    price: 10,
    features: ['No monthly commitment', 'Maximum 5 members', 'Basic features'],
    limits: {
      users: 5,
      analysis: false,
      audit: false,
    }
  }
}

export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS