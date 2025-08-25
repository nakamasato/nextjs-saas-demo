"use client"

import Link from "next/link"
import { SignedIn, SignedOut, UserButton, OrganizationSwitcher } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "./language-switcher"

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-xl bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Nextjs SaaS Demo
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <SignedIn>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
                Dashboard
              </Link>
              <Link href="/analytics" className="text-sm font-medium hover:underline underline-offset-4">
                Analytics
              </Link>
              <Link href="/audit" className="text-sm font-medium hover:underline underline-offset-4">
                Audit
              </Link>
              <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
                Pricing
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              
              <OrganizationSwitcher 
                hidePersonal={false}
                afterCreateOrganizationUrl="/"
                afterSelectOrganizationUrl="/"
                appearance={{
                  elements: {
                    organizationSwitcherTrigger: "px-3 py-1.5 rounded-md hover:bg-gray-100 text-sm",
                    organizationSwitcherTriggerIcon: "text-gray-600",
                  }
                }}
              />
              
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
                afterSignOutUrl="/"
                showName={false}
              />
            </div>
          </SignedIn>
          
          <SignedOut>
            <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
              Pricing
            </Link>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}