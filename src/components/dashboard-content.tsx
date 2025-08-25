"use client"

import { useOrganization, useAuth } from '@clerk/nextjs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Building2 } from 'lucide-react'

export function DashboardContent() {
  const { organization, isLoaded } = useOrganization()

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!organization) {
    return <NoOrganizationDashboard />
  }

  return <OrganizationDashboard organization={organization} />
}

function NoOrganizationDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Building2 className="h-8 w-8 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
        <p className="text-slate-600 text-lg mb-8">
          You&apos;re currently using a personal account with limited features.
        </p>
        
        <Card className="border-gray-200 mb-8">
          <CardHeader>
            <CardTitle>Get Started with Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-6">
              To unlock premium features and collaborate with your team, create an organization.
            </p>
            <div className="space-y-2 text-sm text-slate-500">
              <div className="inline-flex items-center gap-2">
                <span>🏢</span>
                <span>Use the organization switcher in the header to create a new organization</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <span>💳</span>
                <span>Subscribe to a plan through the organization to unlock features</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4 text-left">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2 text-sm">Free Features</h3>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• Basic dashboard</li>
              <li>• Profile management</li>
              <li>• Community support</li>
            </ul>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2 text-sm">Business Starter</h3>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• Business Analytics</li>
              <li>• Revenue tracking</li>
              <li>• Team collaboration</li>
            </ul>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold mb-2 text-sm">Business Standard</h3>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• Everything in Starter</li>
              <li>• Security Audit</li>
              <li>• Priority support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

interface Organization {
  id: string
  name: string
  membersCount?: number
}

function OrganizationDashboard({ organization }: { organization: Organization }) {
  const { has } = useAuth()
  
  // Check plans using Clerk Billing
  const hasAnalysis = has({ plan: 'business_starter' }) || 
                     has({ plan: 'business_standard' }) || 
                     has({ plan: 'enterprise' })
  const hasAudit = has({ plan: 'business_standard' }) || 
                  has({ plan: 'enterprise' })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to {organization.name}</h1>
        <p className="text-slate-600">
          Here&apos;s an overview of your organization&apos;s activity and settings.
        </p>
      </div>


      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full justify-start" 
              variant={hasAnalysis ? "outline" : "secondary"} 
              disabled={!hasAnalysis}
              asChild={hasAnalysis}
            >
              {hasAnalysis ? (
                <Link href="/analysis">📊 View Analytics</Link>
              ) : (
                <>📊 View Analytics (Business Starter)</>
              )}
            </Button>
            <Button 
              className="w-full justify-start" 
              variant={hasAudit ? "outline" : "secondary"} 
              disabled={!hasAudit}
              asChild={hasAudit}
            >
              {hasAudit ? (
                <Link href="/audit">🔒 Security Audit</Link>
              ) : (
                <>🔒 Security Audit (Business Standard)</>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Building2 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No recent activity to show</p>
              <p className="text-xs">Get started by exploring our features</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}