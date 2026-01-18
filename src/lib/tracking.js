import { supabase } from './supabase'

// Generate or get visitor ID from localStorage
export function getVisitorId() {
  if (typeof window === 'undefined') return null
  
  let visitorId = localStorage.getItem('visitor_id')
  
  if (!visitorId) {
    visitorId = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem('visitor_id', visitorId)
  }
  
  return visitorId
}

// Get UTM parameters from URL
export function getUtmParams() {
  if (typeof window === 'undefined') return {}
  
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_content: params.get('utm_content'),
    utm_term: params.get('utm_term'),
  }
}

// Get device info
export function getDeviceInfo() {
  if (typeof window === 'undefined') return {}
  
  const ua = navigator.userAgent
  let deviceType = 'desktop'
  
  if (/mobile/i.test(ua)) deviceType = 'mobile'
  else if (/tablet/i.test(ua)) deviceType = 'tablet'
  
  let browser = 'unknown'
  if (ua.includes('Chrome')) browser = 'Chrome'
  else if (ua.includes('Safari')) browser = 'Safari'
  else if (ua.includes('Firefox')) browser = 'Firefox'
  else if (ua.includes('Edge')) browser = 'Edge'
  
  return { deviceType, browser }
}

// Initialize or update visitor
export async function trackVisitor() {
  const visitorId = getVisitorId()
  if (!visitorId) return
  
  const utmParams = getUtmParams()
  const deviceInfo = getDeviceInfo()
  
  // Check if visitor exists
  const { data: existingVisitor } = await supabase
    .from('visitors')
    .select('visitor_id')
    .eq('visitor_id', visitorId)
    .single()
  
  if (existingVisitor) {
    // Update last visit
    await supabase
      .from('visitors')
      .update({ last_visit: new Date().toISOString() })
      .eq('visitor_id', visitorId)
  } else {
    // Create new visitor
    await supabase
      .from('visitors')
      .insert({
        visitor_id: visitorId,
        referrer: document.referrer || null,
        landing_page: window.location.pathname,
        ...utmParams,
        ...deviceInfo,
      })
  }
  
  return visitorId
}

// Track page visit
export async function trackPageVisit(pageTitle) {
  const visitorId = getVisitorId()
  if (!visitorId) return
  
  const { data, error } = await supabase
    .from('page_visits')
    .insert({
      visitor_id: visitorId,
      page_url: window.location.pathname,
      page_title: pageTitle || document.title,
    })
  
  if (error) console.error('Error tracking page visit:', error)
  
  return data
}

// Track custom event
export async function trackEvent(eventType, eventData = {}) {
  const visitorId = getVisitorId()
  if (!visitorId) return
  
  const { data, error } = await supabase
    .from('events')
    .insert({
      visitor_id: visitorId,
      event_type: eventType,
      event_data: eventData,
    })
  
  if (error) console.error('Error tracking event:', error)
  
  return data
}

// Save lead (form submission)
export async function saveLead(email, phone, marketingConsent) {
  const visitorId = getVisitorId()
  if (!visitorId) return
  
  const { data, error } = await supabase
    .from('leads')
    .insert({
      visitor_id: visitorId,
      email: email,
      phone: phone || null,
      marketing_consent: marketingConsent,
      source_page: window.location.pathname,
    })
  
  if (error) {
    console.error('Error saving lead:', error)
    return { success: false, error }
  }
  
  return { success: true, data }
}