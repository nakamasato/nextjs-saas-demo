import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: unknown) {
    console.error('Webhook signature verification failed:', err instanceof Error ? err.message : 'Unknown error')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  console.log('Received Stripe event:', event.type)

  switch (event.type) {
    case 'customer.subscription.created':
      const subscriptionCreated = event.data.object as Stripe.Subscription
      console.log('Subscription created:', subscriptionCreated.id)
      // Handle new subscription
      // You would update your database here with the user's subscription status
      break

    case 'customer.subscription.updated':
      const subscriptionUpdated = event.data.object as Stripe.Subscription
      console.log('Subscription updated:', subscriptionUpdated.id)
      // Handle subscription changes
      break

    case 'customer.subscription.deleted':
      const subscriptionDeleted = event.data.object as Stripe.Subscription
      console.log('Subscription canceled:', subscriptionDeleted.id)
      // Handle subscription cancellation
      break

    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice
      console.log('Payment succeeded:', invoice.id)
      // Handle successful payment
      break

    case 'invoice.payment_failed':
      const failedInvoice = event.data.object as Stripe.Invoice
      console.log('Payment failed:', failedInvoice.id)
      // Handle failed payment
      break

    default:
      console.log('Unhandled event type:', event.type)
  }

  return NextResponse.json({ received: true })
}