import { auth } from '@clerk/nextjs/server'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { CheckCircle, BarChart3, Shield, Users, Zap, Sparkles, TrendingUp, Globe, Clock } from 'lucide-react'

export default async function Home() {
  const { userId } = await auth()

  if (userId) {
    return <Dashboard />
  }

  return <LandingPage />
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Now Available - Business Intelligence Platform
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Transform Your Business
            <br />with Smart Analytics
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Unlock powerful insights, automate security monitoring, and scale your business with our all-in-one analytics platform. 
            Join 10,000+ companies already growing faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="text-lg px-8 py-4" asChild>
              <Link href="/sign-up">Start Free Trial</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
          <p className="text-sm text-slate-500">
            ✨ No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Advanced Analytics</CardTitle>
              <CardDescription className="text-base">Real-time insights and comprehensive reporting</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Revenue growth tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Customer behavior analysis</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Predictive forecasting</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Custom dashboards</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">Security Monitoring</CardTitle>
              <CardDescription className="text-base">Enterprise-grade security and compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">24/7 threat detection</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Compliance monitoring</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Vulnerability scanning</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Access control audits</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Automation & AI</CardTitle>
              <CardDescription className="text-base">Smart automation and AI-powered insights</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Automated reporting</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">AI-powered recommendations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Workflow automation</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Smart alerts</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-slate-50 rounded-2xl p-8 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Growing Companies</h2>
            <p className="text-lg text-slate-600">
              Join thousands of businesses already using our platform to drive growth
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-sm text-slate-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
              <div className="text-sm text-slate-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-sm text-slate-600">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">150+</div>
              <div className="text-sm text-slate-600">Countries</div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Sign Up</h3>
              <p className="text-slate-600">
                Create your account in seconds with Google OAuth or email. No credit card required to start.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Connect Data</h3>
              <p className="text-slate-600">
                Integrate your existing tools and data sources with our secure APIs and connectors.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Get Insights</h3>
              <p className="text-slate-600">
                Watch your data come to life with real-time analytics, automated reports, and actionable insights.
              </p>
            </div>
          </div>
        </div>

        {/* Free Features Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-4">Start Free, Upgrade When Ready</h2>
          <p className="text-lg text-slate-600 mb-12">
            Experience the power of our platform with full access during your 30-day free trial
          </p>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Free Features */}
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100/50 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    FREE FOREVER
                  </span>
                </div>
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl text-green-800 flex items-center gap-2">
                    <Clock className="h-6 w-6" />
                    Essential Tools
                  </CardTitle>
                  <CardDescription className="text-base text-green-700">
                    Perfect for getting started and exploring our platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-green-800">Personal Dashboard</span>
                        <p className="text-sm text-green-600">Clean overview of your account and basic metrics</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-green-800">Profile Management</span>
                        <p className="text-sm text-green-600">Manage your account settings and preferences</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-green-800">Basic Reporting</span>
                        <p className="text-sm text-green-600">Simple reports and data visualization</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-green-800">Community Support</span>
                        <p className="text-sm text-green-600">Access to documentation and community forums</p>
                      </div>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Button className="w-full" asChild>
                      <Link href="/sign-up">Get Started Free</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Premium Preview */}
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    30-DAY TRIAL
                  </span>
                </div>
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-blue-600" />
                    Advanced Analytics
                  </CardTitle>
                  <CardDescription className="text-base text-slate-600">
                    Unlock the full potential of your business data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0 mt-0.5"></div>
                      <div>
                        <span className="font-medium text-slate-800">Advanced Analytics</span>
                        <p className="text-sm text-slate-600">Deep insights with predictive modeling</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0 mt-0.5"></div>
                      <div>
                        <span className="font-medium text-slate-800">Security Monitoring</span>
                        <p className="text-sm text-slate-600">Real-time threat detection and compliance</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0 mt-0.5"></div>
                      <div>
                        <span className="font-medium text-slate-800">Team Collaboration</span>
                        <p className="text-sm text-slate-600">Multi-user workspaces and permissions</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0 mt-0.5"></div>
                      <div>
                        <span className="font-medium text-slate-800">Priority Support</span>
                        <p className="text-sm text-slate-600">24/7 dedicated support team</p>
                      </div>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Button variant="outline" className="w-full border-blue-200 hover:bg-blue-50" asChild>
                      <Link href="/pricing">View All Plans →</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-slate-600">Welcome back! Here&apos;s what&apos;s happening with your account.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Active</div>
              <p className="text-sm text-gray-500">Your subscription is active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Free Trial</div>
              <p className="text-sm text-gray-500">29 days remaining</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0 / ∞</div>
              <p className="text-sm text-gray-500">API calls used</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/analysis">📊 View Analytics</Link>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/audit">🔒 Security Audit</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                No recent activity to show
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}