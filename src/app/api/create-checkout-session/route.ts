import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { stripe, SUBSCRIPTION_PLANS, SubscriptionPlan } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planType } = await req.json() as { planType: SubscriptionPlan }
    
    if (!planType || !SUBSCRIPTION_PLANS[planType]) {
      return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 })
    }

    const plan = SUBSCRIPTION_PLANS[planType]

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer_email: undefined, // You would get this from Clerk user data
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 30,
        metadata: {
          userId: userId,
          planType: planType,
        },
      },
      success_url: `${req.headers.get('origin')}/dashboard?success=true`,
      cancel_url: `${req.headers.get('origin')}/`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error: unknown) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    )
  }
}