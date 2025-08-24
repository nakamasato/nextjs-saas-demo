import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, AlertTriangle, CheckCircle, XCircle, Clock, Lock } from 'lucide-react'
import { getUserSubscription, hasAccessToFeature, getRequiredPlanForFeature } from '@/lib/subscription'
import Link from 'next/link'

export default async function AuditPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const subscription = await getUserSubscription(userId)
  const hasAccess = hasAccessToFeature(subscription, 'audit')

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Lock className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h1 className="text-3xl font-bold mb-2">Upgrade Required</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Access to Security Audit requires {getRequiredPlanForFeature('audit')}.
              </p>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Security Audit Features</CardTitle>
                <CardDescription>Comprehensive security assessment and compliance monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 mb-6">
                  <li>• Real-time security monitoring</li>
                  <li>• Compliance framework assessment</li>
                  <li>• Vulnerability scanning</li>
                  <li>• Access control auditing</li>
                  <li>• Data protection analysis</li>
                </ul>
                <Button size="lg" asChild>
                  <Link href="/pricing">View Pricing Plans</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Security Audit</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive security assessment and compliance monitoring for your organization.
          </p>
          <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
            <p className="text-sm text-orange-800 dark:text-orange-200">
              🔒 <strong>Business Standard Plan Required:</strong> This feature is available for Business Standard subscribers and above.
            </p>
          </div>
        </div>

        {/* Security Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">92/100</div>
              <p className="text-xs text-muted-foreground">
                Excellent security posture
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">2</div>
              <p className="text-xs text-muted-foreground">
                Require immediate attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved Issues</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">47</div>
              <p className="text-xs text-muted-foreground">
                Fixed this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Scan</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h ago</div>
              <p className="text-xs text-muted-foreground">
                Next scan in 22h
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Security Issues</CardTitle>
              <CardDescription>Latest security findings and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Outdated SSL Certificate</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      SSL certificate for api.example.com expires in 5 days
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
                        Critical
                      </span>
                      <Button size="sm" variant="outline">Fix Now</Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Weak Password Policy</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      12 users have passwords that don&apos;t meet security requirements
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded">
                        Medium
                      </span>
                      <Button size="sm" variant="outline">Review</Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Two-Factor Authentication</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      All admin accounts now have 2FA enabled
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                        Resolved
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>Current compliance with security frameworks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">SOC 2 Type II</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">Compliant</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">ISO 27001</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">Compliant</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">GDPR</span>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium text-orange-600">Needs Review</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">HIPAA</span>
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-600">Non-Compliant</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>User permissions and access management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Admin Users</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Regular Users</span>
                  <span className="font-medium">142</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Inactive Accounts</span>
                  <span className="font-medium text-orange-600">23</span>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-sm font-medium">Total</span>
                  <span className="font-bold">173</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Network Security</CardTitle>
              <CardDescription>Network infrastructure protection status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Firewall Rules</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">DDoS Protection</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">VPN Access</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Intrusion Detection</span>
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Protection</CardTitle>
              <CardDescription>Data encryption and backup status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data at Rest</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data in Transit</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Backup Encryption</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Key Management</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Security Actions</CardTitle>
              <CardDescription>Quick actions to improve your security posture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button>Run Full Security Scan</Button>
                <Button variant="outline">Generate Compliance Report</Button>
                <Button variant="outline">Review User Permissions</Button>
                <Button variant="outline">Update Security Policies</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}