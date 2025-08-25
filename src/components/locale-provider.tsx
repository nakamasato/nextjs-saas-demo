'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { jaJP } from '@clerk/localizations'
import { useEffect, useState } from 'react'

interface LocaleProviderProps {
  children: React.ReactNode
}

// Function to detect system language
function getSystemLanguage(): 'en' | 'ja' {
  if (typeof window === 'undefined') return 'en'
  
  const language = navigator.language.toLowerCase()
  
  // Check for Japanese variants
  if (language.startsWith('ja')) {
    return 'ja'
  }
  
  // Default to English
  return 'en'
}

// Function to get stored language preference or system default
function getPreferredLanguage(): 'en' | 'ja' {
  if (typeof window === 'undefined') return 'en'
  
  const stored = localStorage.getItem('preferred-language') as 'en' | 'ja' | null
  return stored || getSystemLanguage()
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocale] = useState<'en' | 'ja'>('en')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const preferredLang = getPreferredLanguage()
    setLocale(preferredLang)
    setIsLoaded(true)
  }, [])

  // Don't render until we know the preferred language to avoid hydration mismatch
  if (!isLoaded) {
    return (
      <ClerkProvider>
        {children}
      </ClerkProvider>
    )
  }

  const localization = locale === 'ja' ? jaJP : undefined

  return (
    <ClerkProvider localization={localization}>
      {children}
    </ClerkProvider>
  )
}

// Custom hook to manage language switching
export function useLanguage() {
  const [locale, setLocaleState] = useState<'en' | 'ja'>('en')

  useEffect(() => {
    const preferredLang = getPreferredLanguage()
    setLocaleState(preferredLang)
  }, [])

  const setLocale = (newLocale: 'en' | 'ja') => {
    setLocaleState(newLocale)
    localStorage.setItem('preferred-language', newLocale)
    // Reload to apply new localization
    window.location.reload()
  }

  return { locale, setLocale }
}