import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required Supabase environment variables. Please check your .env.local file.')
}

if (!supabaseServiceRoleKey) {
  console.warn('SUPABASE_SERVICE_ROLE_KEY is not set. Admin operations will not be available.')
}

// Client for frontend use (with RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for backend use (bypasses RLS)
export const supabaseAdmin = supabaseServiceRoleKey 
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

// Database types
export interface Customer {
  id: string
  clerk_user_id: string
  stripe_customer_id: string | null
  email: string
  full_name: string | null
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  customer_id: string
  stripe_subscription_id: string
  status: 'active' | 'trialing' | 'canceled' | 'past_due' | 'incomplete' | 'incomplete_expired' | 'unpaid'
  plan_id: string
  current_period_start: string | null
  current_period_end: string | null
  trial_start: string | null
  trial_end: string | null
  cancel_at: string | null
  canceled_at: string | null
  created_at: string
  updated_at: string
}

export interface SubscriptionItem {
  id: string
  subscription_id: string
  stripe_subscription_item_id: string
  stripe_price_id: string
  quantity: number
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  customer_id: string
  subscription_id: string | null
  stripe_invoice_id: string
  status: string
  amount_due: number
  amount_paid: number
  currency: string
  period_start: string | null
  period_end: string | null
  created_at: string
  updated_at: string
}