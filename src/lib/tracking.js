// src/lib/tracking.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export function getOrCreateVisitorId() {
  if (typeof window === 'undefined') return null;
  
  const VISITOR_ID_KEY = 'bth_visitor_id';
  const VISITOR_ID_EXPIRY = 'bth_visitor_expiry';
  
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  let expiry = localStorage.getItem(VISITOR_ID_EXPIRY);
  
  if (visitorId && expiry && Date.now() < parseInt(expiry)) {
    return visitorId;
  }
  
  visitorId = crypto.randomUUID();
  const expiryTime = Date.now() + (730 * 24 * 60 * 60 * 1000); // 2 years
  
  localStorage.setItem(VISITOR_ID_KEY, visitorId);
  localStorage.setItem(VISITOR_ID_EXPIRY, expiryTime.toString());
  
  return visitorId;
}

// Backward compatibility alias
export function getVisitorId() {
  return getOrCreateVisitorId();
}

export function getOrCreateSessionId() {
  if (typeof window === 'undefined') return null;
  
  const SESSION_ID_KEY = 'bth_session_id';
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  
  const stored = sessionStorage.getItem(SESSION_ID_KEY);
  
  if (stored) {
    const { sessionId, timestamp } = JSON.parse(stored);
    if (Date.now() - timestamp < SESSION_TIMEOUT) {
      sessionStorage.setItem(SESSION_ID_KEY, JSON.stringify({
        sessionId,
        timestamp: Date.now()
      }));
      return sessionId;
    }
  }
  
  const sessionId = crypto.randomUUID();
  sessionStorage.setItem(SESSION_ID_KEY, JSON.stringify({
    sessionId,
    timestamp: Date.now()
  }));
  
  return sessionId;
}

export function captureUTMParameters() {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  
  const utmParams = {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_term: urlParams.get('utm_term'),
    utm_content: urlParams.get('utm_content')
  };
  
  if (utmParams.utm_source) {
    sessionStorage.setItem('bth_utm_params', JSON.stringify(utmParams));
  }
  
  return utmParams;
}

export function getStoredUTMParameters() {
  if (typeof window === 'undefined') return {};
  
  const stored = sessionStorage.getItem('bth_utm_params');
  return stored ? JSON.parse(stored) : {};
}

// Backward compatibility - keeps trackVisitor working
export async function trackVisitor() {
  const visitorId = getOrCreateVisitorId();
  if (!visitorId) return;
  
  // This now happens automatically in trackEvent/trackPageVisit
  // Just return the visitorId for compatibility
  return visitorId;
}

export async function trackPageVisit(pageTitle) {
  const visitorId = getOrCreateVisitorId();
  const sessionId = getOrCreateSessionId();
  
  if (!visitorId) return;
  
  try {
    const { data, error } = await supabase
      .from('page_visits')
      .insert([{
        visitor_id: visitorId,
        session_id: sessionId,
        page_url: window.location.pathname,
        page_title: pageTitle || document.title
      }]);
    
    if (error) console.error('Error tracking page visit:', error);
    return data;
  } catch (error) {
    console.error('Error tracking page visit:', error);
  }
}

export async function trackEvent(eventType, eventData = {}) {
  const visitorId = getOrCreateVisitorId();
  const sessionId = getOrCreateSessionId();
  const utmParams = getStoredUTMParameters();
  
  const payload = {
    event_type: eventType,
    visitor_id: visitorId,
    session_id: sessionId,
    utm_source: utmParams.utm_source || null,
    utm_medium: utmParams.utm_medium || null,
    utm_campaign: utmParams.utm_campaign || null,
    utm_term: utmParams.utm_term || null,
    utm_content: utmParams.utm_content || null,
    referrer: document.referrer || null,
    page_url: window.location.href,
    event_data: {
      ...eventData,
      timestamp: new Date().toISOString()
    }
  };
  
  const { data, error } = await supabase
    .from('events')
    .insert([payload]);
    
  if (error) console.error('Error tracking event:', error);
  
  return data;
}

export async function saveLead(email, phone, marketingConsent) {
  const visitorId = getOrCreateVisitorId();
  
  if (!visitorId) return;
  
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([{
        visitor_id: visitorId,
        email: email,
        phone: phone || null,
        marketing_consent: marketingConsent,
        source_page: window.location.pathname
      }]);
    
    if (error) {
      console.error('Error saving lead:', error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error saving lead:', error);
    return { success: false, error };
  }
}