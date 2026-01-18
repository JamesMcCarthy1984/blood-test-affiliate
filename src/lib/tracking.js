const SUPABASE_URL = 'https://wvqfdypifomlxxtijmam.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2cWZkeXBpZm9tbHh4dGlqbWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NTg4MzgsImV4cCI6MjA4NDMzNDgzOH0.sCVGNI6WVJGd5UfIW1g0o4nfO_RMehI6e6cBJsgiGHI'

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
}

export function getVisitorId() {
  if (typeof window === 'undefined') return null
  let visitorId = localStorage.getItem('visitor_id')
  if (!visitorId) {
    visitorId = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem('visitor_id', visitorId)
  }
  return visitorId
}

export async function trackVisitor() {
  const visitorId = getVisitorId()
  if (!visitorId) return

  try {
    // Check if visitor exists
    const checkRes = await fetch(
      `${SUPABASE_URL}/rest/v1/visitors?visitor_id=eq.${visitorId}&select=visitor_id`,
      { headers }
    )
    
    if (checkRes.ok) {
      const data = await checkRes.json()
      if (data.length > 0) {
        // Update last visit
        await fetch(
          `${SUPABASE_URL}/rest/v1/visitors?visitor_id=eq.${visitorId}`,
          {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ last_visit: new Date().toISOString() })
          }
        )
        return visitorId
      }
    }

    // Create new visitor
    await fetch(`${SUPABASE_URL}/rest/v1/visitors`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        visitor_id: visitorId,
        referrer: document.referrer || null,
        landing_page: window.location.pathname,
        device_type: /mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Other'
      })
    })

    return visitorId
  } catch (error) {
    console.error('Error tracking visitor:', error)
  }
}

export async function trackPageVisit(pageTitle) {
  const visitorId = getVisitorId()
  if (!visitorId) return

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/page_visits`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        visitor_id: visitorId,
        page_url: window.location.pathname,
        page_title: pageTitle || document.title
      })
    })
  } catch (error) {
    console.error('Error tracking page visit:', error)
  }
}

export async function trackEvent(eventType, eventData = {}) {
  const visitorId = getVisitorId()
  if (!visitorId) return

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/events`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        visitor_id: visitorId,
        event_type: eventType,
        event_data: eventData
      })
    })
  } catch (error) {
    console.error('Error tracking event:', error)
  }
}

export async function saveLead(email, phone, marketingConsent) {
  const visitorId = getVisitorId()
  if (!visitorId) return

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        visitor_id: visitorId,
        email: email,
        phone: phone || null,
        marketing_consent: marketingConsent,
        source_page: window.location.pathname
      })
    })

    if (res.ok) {
      return { success: true }
    } else {
      const error = await res.json()
      return { success: false, error }
    }
  } catch (error) {
    console.error('Error saving lead:', error)
    return { success: false, error }
  }
}