import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Check, X, Star } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Start with our free features, then upgrade to unlock advanced analytics and security tools.
          </p>
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <Star className="h-4 w-4 fill-current" />
            30-day free trial on all paid plans
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 max-w-7xl mx-auto mb-16">
          {/* Free Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription className="text-3xl font-bold">$0<span className="text-sm font-normal">/month</span></CardDescription>
              <p className="text-sm text-slate-600">Perfect for getting started</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline" asChild>
                <Link href="/sign-up">Get Started Free</Link>
              </Button>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Features included:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Basic dashboard access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Profile management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Email support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-slate-400">No analytics access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-slate-400">No security audit</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Starter */}
          <Card className="relative">
            <CardHeader>
              <CardTitle>Business Starter</CardTitle>
              <CardDescription className="text-3xl font-bold">$19<span className="text-sm font-normal">/month/user</span></CardDescription>
              <p className="text-sm text-slate-600">Perfect for small teams</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" asChild>
                <Link href="/sign-up">Start Free Trial</Link>
              </Button>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Everything in Free, plus:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span><strong>Business Analytics</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Revenue & growth tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>User activity monitoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Feature usage statistics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-slate-400">No security audit</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Standard - Most Popular */}
          <Card className="relative border-2 border-blue-500 shadow-lg">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <CardHeader>
              <CardTitle>Business Standard</CardTitle>
              <CardDescription className="text-3xl font-bold">$39<span className="text-sm font-normal">/month/user</span></CardDescription>
              <p className="text-sm text-slate-600">For growing businesses</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" asChild>
                <Link href="/sign-up">Start Free Trial</Link>
              </Button>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Everything in Starter, plus:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span><strong>Security Audit</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Real-time security monitoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Compliance reporting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Vulnerability scanning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Priority support</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enterprise */}
          <Card className="relative">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription className="text-3xl font-bold">$99<span className="text-sm font-normal">/month/user</span></CardDescription>
              <p className="text-sm text-slate-600">For large organizations</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline" asChild>
                <Link href="/sign-up">Contact Sales</Link>
              </Button>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Everything in Standard, plus:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Custom integrations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Advanced reporting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Dedicated support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Custom training</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>SLA guarantee</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pay-as-you-go Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Pay-as-you-go</CardTitle>
              <CardDescription className="text-2xl font-bold">$10<span className="text-sm font-normal"> per 100 credits</span></CardDescription>
              <p className="text-sm text-slate-600">Flexible usage-based pricing</p>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <Button className="w-full max-w-sm" variant="outline" asChild>
                <Link href="/sign-up">Buy Credits</Link>
              </Button>
              
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>No monthly commitment</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Maximum 5 team members</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Basic features only</span>
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
              <h3 className="font-semibold mb-2">What's included in the free trial?</h3>
              <p className="text-slate-600 text-sm">All paid plans include a 30-day free trial with full access to all features in that tier.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-slate-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-slate-600 text-sm">We accept all major credit cards and debit cards through Stripe.</p>
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