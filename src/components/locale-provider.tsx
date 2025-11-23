'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { jaJP } from '@clerk/localizations'
import { useState } from 'react'

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
  const [locale] = useState<'en' | 'ja'>(() => getPreferredLanguage())
  const localization = locale === 'ja' ? jaJP : undefined

  return (
    <ClerkProvider localization={localization}>
      {children}
    </ClerkProvider>
  )
}

// Custom hook to manage language switching
export function useLanguage() {
  const [locale, setLocaleState] = useState<'en' | 'ja'>(() => getPreferredLanguage())

  const setLocale = (newLocale: 'en' | 'ja') => {
    setLocaleState(newLocale)
    localStorage.setItem('preferred-language', newLocale)
    // Reload to apply new localization
    window.location.reload()
  }

  return { locale, setLocale }
}