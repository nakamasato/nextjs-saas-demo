import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Header } from '@/components/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, TrendingUp, Users, DollarSign, Lock } from 'lucide-react'
import Link from 'next/link'

export default async function AnalysisPage() {
  const { userId, orgId, has } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  if (!orgId) {
    redirect('/')  // Redirect to dashboard to select organization
  }

  // Check if organization has access to analytics feature
  const hasAccess = has({ feature: 'analytics' })

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="relative">
        {/* Blurred content */}
        <div className={hasAccess ? '' : 'blur-sm pointer-events-none'}>
          <AnalysisContent />
        </div>
        
        {/* Overlay for non-subscribers */}
        {!hasAccess && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <div className="max-w-2xl mx-auto text-center p-8">
              <div className="mb-8">
                <Lock className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h1 className="text-3xl font-bold mb-2">Upgrade Required</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Access to Business Analysis requires Business Starter plan or higher.
                </p>
              </div>
              
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Business Analysis Features</CardTitle>
                  <CardDescription>Unlock comprehensive analytics and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-left space-y-2 mb-6">
                    <li>• Revenue and growth analytics</li>
                    <li>• User activity monitoring</li>
                    <li>• Feature usage statistics</li>
                    <li>• Subscription health metrics</li>
                  </ul>
                  <Button size="lg" asChild>
                    <Link href="/pricing">View Pricing Plans</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function AnalysisContent() {
  return (
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Business Analysis</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive analytics and insights for your business.
          </p>
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm text-green-800 dark:text-green-200">
              ✅ <strong>Available with Business Starter Plan:</strong> You have access to Business Analytics features.
            </p>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5%</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Monthly revenue by plan type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Business Starter</span>
                  <span className="font-medium">$12,450</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Business Standard</span>
                  <span className="font-medium">$23,890</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enterprise</span>
                  <span className="font-medium">$8,892</span>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-sm font-medium">Total</span>
                  <span className="font-bold">$45,232</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Daily active users over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded">
                <p className="text-gray-500">Chart would be rendered here</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Features</CardTitle>
              <CardDescription>Most used features by your customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Dashboard</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-14 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-xs text-gray-500">87%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Analytics</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-10 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-xs text-gray-500">63%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Reports</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-6 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                    <span className="text-xs text-gray-500">38%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Health</CardTitle>
              <CardDescription>Current subscription metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Subscriptions</span>
                  <span className="font-medium text-green-600">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Churned This Month</span>
                  <span className="font-medium text-red-600">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">New Subscriptions</span>
                  <span className="font-medium text-blue-600">156</span>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-sm font-medium">Net Growth</span>
                  <span className="font-bold text-green-600">+133</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
  )
}