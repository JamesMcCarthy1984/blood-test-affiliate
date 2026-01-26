'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/tracking'

export default function Cookiebot() {
  useEffect(() => {
    // Only load Cookiebot if it hasn't been loaded already
    if (typeof window !== 'undefined' && !window.Cookiebot) {
      // Check if script already exists
      if (!document.getElementById('Cookiebot')) {
        const script = document.createElement('script')
        script.id = 'Cookiebot'
        script.src = 'https://consent.cookiebot.com/uc.js'
        script.setAttribute('data-cbid', '81334869-f43d-4e33-8362-5c98fa5a65ec')
        script.setAttribute('data-blockingmode', 'auto')
        script.type = 'text/javascript'
        
        // Insert at the beginning of head to ensure it loads first
        const head = document.head || document.getElementsByTagName('head')[0]
        head.insertBefore(script, head.firstChild)
      }
    }
    
    // Track when user accepts cookies
    const handleAccept = () => {
      console.log('🍪 Cookiebot accepted - tracking consent')
      trackEvent('cookie_consent_accepted', { 
        consent_type: 'cookie',
        marketing: window.Cookiebot?.consent?.marketing || false,
        statistics: window.Cookiebot?.consent?.statistics || false,
        preferences: window.Cookiebot?.consent?.preferences || false
      })
    }
    
    // Track when user declines cookies
    const handleDecline = () => {
      console.log('🍪 Cookiebot declined')
      trackEvent('cookie_consent_declined', { consent_type: 'cookie' })
    }
    
    window.addEventListener('CookiebotOnAccept', handleAccept)
    window.addEventListener('CookiebotOnDecline', handleDecline)
    
    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('CookiebotOnAccept', handleAccept)
      window.removeEventListener('CookiebotOnDecline', handleDecline)
    }
  }, [])

  return null
}