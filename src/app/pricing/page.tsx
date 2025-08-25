import { PricingTable } from '@clerk/nextjs'
import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            All plans are billed per organization. Create an organization to subscribe to a plan.
          </p>
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <Star className="h-4 w-4 fill-current" />
            30-day free trial on all paid plans
          </div>
        </div>

        {/* Clerk Pricing Table */}
        <div className="max-w-7xl mx-auto mb-16">
          <PricingTable forOrganizations />
        </div>

        {/* Organization Billing Notice */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-center">Organization-Based Billing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-slate-600 mb-4">
                All subscriptions are tied to organizations. Even individual users need to create an organization to subscribe to paid plans.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">👤 Personal Account</h4>
                  <p className="text-slate-600">Access to free features only. Create an organization to unlock premium features.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🏢 Organization Account</h4>
                  <p className="text-slate-600">Subscribe to paid plans and share access with team members.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">What&apos;s included in the free trial?</h3>
              <p className="text-slate-600 text-sm">All paid plans include a 30-day free trial with full access to all features in that tier.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-slate-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-slate-600 text-sm">We accept all major credit cards and debit cards.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Is there a setup fee?</h3>
              <p className="text-slate-600 text-sm">No setup fees. You only pay the monthly subscription fee for your chosen plan.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}