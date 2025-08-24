"use client"

import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const { isSignedIn } = useUser()

  return (
    <nav className="border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-xl bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Nextjs SaaS Demo
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              <div className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
                  Dashboard
                </Link>
                <Link href="/analysis" className="text-sm font-medium hover:underline underline-offset-4">
                  Analysis
                </Link>
                <Link href="/audit" className="text-sm font-medium hover:underline underline-offset-4">
                  Audit
                </Link>
                <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
                  Pricing
                </Link>
              </div>
              
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
                afterSignOutUrl="/"
                userProfileMode="modal"
                userProfileProps={{
                  additionalOAuthScopes: {
                    google: ['https://www.googleapis.com/auth/calendar']
                  }
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Billing"
                    labelIcon={<span>💳</span>}
                    href="/billing"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
                Pricing
              </Link>
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}