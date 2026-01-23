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
    console.log('👤 Existing Visitor ID:', visitorId);
    return visitorId;
  }
  
  visitorId = crypto.randomUUID();
  const expiryTime = Date.now() + (730 * 24 * 60 * 60 * 1000);
  
  localStorage.setItem(VISITOR_ID_KEY, visitorId);
  localStorage.setItem(VISITOR_ID_EXPIRY, expiryTime.toString());
  
  console.log('👤 New Visitor ID Created:', visitorId);
  return visitorId;
}

export function getVisitorId() {
  return getOrCreateVisitorId();
}

export function getOrCreateSessionId() {
  if (typeof window === 'undefined') return null;
  
  const SESSION_ID_KEY = 'bth_session_id';
  const SESSION_TIMEOUT = 30 * 60 * 1000;
  
  const stored = sessionStorage.getItem(SESSION_ID_KEY);
  
  if (stored) {
    const { sessionId, timestamp } = JSON.parse(stored);
    if (Date.now() - timestamp < SESSION_TIMEOUT) {
      sessionStorage.setItem(SESSION_ID_KEY, JSON.stringify({
        sessionId,
        timestamp: Date.now()
      }));
      console.log('🔄 Existing Session ID:', sessionId);
      return sessionId;
    }
  }
  
  const sessionId = crypto.randomUUID();
  sessionStorage.setItem(SESSION_ID_KEY, JSON.stringify({
    sessionId,
    timestamp: Date.now()
  }));
  
  console.log('🆕 New Session ID Created:', sessionId);
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
  
  console.log('🏷️ UTM Parameters captured:', utmParams);
  
  if (utmParams.utm_source) {
    sessionStorage.setItem('bth_utm_params', JSON.stringify(utmParams));
    console.log('✅ UTMs stored in sessionStorage');
  } else {
    console.log('ℹ️ No UTM parameters found in URL');
  }
  
  return utmParams;
}

export function getStoredUTMParameters() {
  if (typeof window === 'undefined') return {};
  
  const stored = sessionStorage.getItem('bth_utm_params');
  const params = stored ? JSON.parse(stored) : {};
  console.log('📦 Retrieved stored UTMs:', params);
  return params;
}

export async function trackVisitor() {
  const visitorId = getOrCreateVisitorId();
  if (!visitorId) return;
  
  console.log('👤 trackVisitor called with ID:', visitorId);
  return visitorId;
}

export async function trackPageVisit(pageTitle) {
  const visitorId = getOrCreateVisitorId();
  const sessionId = getOrCreateSessionId();
  
  console.log('📄 Tracking page visit:', { visitorId, sessionId, pageTitle });
  
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
    
    if (error) {
      console.error('❌ Error tracking page visit:', error);
    } else {
      console.log('✅ Page visit tracked successfully:', data);
    }
    return data;
  } catch (error) {
    console.error('❌ Exception tracking page visit:', error);
  }
}

export async function trackEvent(eventType, eventData = {}) {
  const visitorId = getOrCreateVisitorId();
  const sessionId = getOrCreateSessionId();
  const utmParams = getStoredUTMParameters();
  
  console.log('🔍 Tracking Event Debug:', {
    eventType,
    visitorId,
    sessionId,
    utmParams,
    referrer: document.referrer,
    pageUrl: window.location.href
  });
  
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
  
  console.log('📤 Sending payload to Supabase:', payload);
  
  const { data, error } = await supabase
    .from('events')
    .insert([payload]);
    
  if (error) {
    console.error('❌ Error tracking event:', error);
  } else {
    console.log('✅ Event tracked successfully:', data);
  }
  
  return data;
}

export async function saveLead(email, phone, marketingConsent) {
  const visitorId = getOrCreateVisitorId();
  
  console.log('💾 Saving lead:', { visitorId, email });
  
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
      console.error('❌ Error saving lead:', error);
      return { success: false, error };
    }
    
    console.log('✅ Lead saved successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Exception saving lead:', error);
    return { success: false, error };
  }
}