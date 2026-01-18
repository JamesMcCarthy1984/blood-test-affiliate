'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { trackVisitor, trackPageVisit, trackEvent, saveLead } from '@/lib/tracking'

function LeadCaptureForm() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [marketing, setMarketing] = useState(false)
  const [status, setStatus] = useState('') // 'loading', 'success', 'error'
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      // Track form start event
      await trackEvent('form_start', { page: 'home', form: 'lead_capture' })

      // Save to Supabase first
      const supabaseResult = await saveLead(email, phone, marketing)
      
      if (!supabaseResult.success) {
        console.error('Supabase save failed:', supabaseResult.error)
      }

      // Then save to Mailchimp
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, marketing }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Thanks! Check your email to confirm your subscription.')
        
        // Send event to GTM
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'lead_form_submit',
            formType: 'newsletter_signup',
            userEmail: email,
            userPhone: phone || 'not_provided'
          })
        }
        
        // Track successful submission
        await trackEvent('form_submit_success', { 
          page: 'home', 
          email: email,
          has_phone: !!phone 
        })
        
        setEmail('')
        setPhone('')
        setMarketing(false)
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
        
        // Track failed submission
        await trackEvent('form_submit_error', { 
          page: 'home', 
          error: data.error 
        })
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
      
      // Track network error
      await trackEvent('form_submit_error', { 
        page: 'home', 
        error: 'network_error' 
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success/Error Messages */}
      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {message}
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {message}
        </div>
      )}

      {/* Email and Phone Row */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your.email@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition text-gray-900"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="07123 456789"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition text-gray-900"
          />
        </div>
      </div>

      {/* Marketing Opt-in Checkbox */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            required
            className="mt-1 h-5 w-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
          />
          <span className="ml-3 text-sm text-gray-700">
            <strong>Yes, I'd like to receive marketing communications.</strong> I agree to receive emails and SMS messages about health tips, test recommendations, and special offers. I understand I can unsubscribe at any time. *
          </span>
        </label>
      </div>

      {/* Privacy Notice */}
      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our{' '}
        <a href="/privacy" className="text-pink-600 hover:underline">Privacy Policy</a>
        {' '}and{' '}
        <a href="/terms" className="text-pink-600 hover:underline">Terms & Conditions</a>.
        We'll never share your data with third parties.
      </p>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-pink-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-pink-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Subscribing...' : 'Get Started - It\'s Free'}
      </button>

      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center items-center gap-6 pt-4 text-sm text-gray-500">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          No spam, ever
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Unsubscribe anytime
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          GDPR compliant
        </div>
      </div>
    </form>
  )
}

export default function Home() {
  useEffect(() => {
    const initTracking = async () => {
      await trackVisitor()  // Wait for visitor to be created first
      await trackPageVisit('Home')  // Then track page visit
    }
    initTracking()
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section with Background Image */}
        <section className="relative bg-gradient-to-br from-pink-500 via-rose-600 to-pink-700 text-white overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src="/images/hero-blood-test.jpg"
              alt="Blood test laboratory"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600/90 via-rose-700/90 to-pink-800/90"></div>
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-14">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
                Take Control of Your Health from Home
              </h1>
              <p className="text-lg md:text-xl mb-6 text-pink-50 drop-shadow">
                Compare the UK's leading at-home blood test providers. Fast results, doctor-reviewed, completely confidential.
              </p>
              <a href="/comparison" className="inline-block bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-pink-50 transition shadow-lg">
                Compare Top Tests
              </a>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="bg-white py-12 border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-black mb-2">50,000+</div>
                <div className="text-gray-600">Tests Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">48 Hours</div>
                <div className="text-gray-600">Average Results</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">GMC Registered</div>
                <div className="text-gray-600">Doctor Reviews</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">4.8★</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Tests */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4 text-black">Popular Blood Tests</h2>
            <p className="text-xl text-gray-600 text-center mb-12">Choose from our most requested health screens</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Test Card 1 */}
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="text-teal-500 text-4xl mb-4">🩺</div>
                <h3 className="text-2xl font-bold mb-3 text-black">General Health</h3>
                <p className="text-gray-600 mb-6">Complete overview of your key health markers including cholesterol, liver, and kidney function.</p>
                <div className="text-3xl font-bold text-black mb-4">From £39</div>
                <a href="/comparison" className="block w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition text-center">
                  View Providers
                </a>
              </div>

              {/* Test Card 2 */}
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition border-2 border-pink-500">
                <div className="bg-pink-100 text-pink-600 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">MOST POPULAR</div>
                <div className="text-teal-500 text-4xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold mb-3 text-black">Hormone Panel</h3>
                <p className="text-gray-600 mb-6">Comprehensive hormone testing including testosterone, thyroid, and cortisol levels.</p>
                <div className="text-3xl font-bold text-black mb-4">From £79</div>
                <a href="/comparison" className="block w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition text-center">
                  View Providers
                </a>
              </div>

              {/* Test Card 3 */}
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="text-teal-500 text-4xl mb-4">💪</div>
                <h3 className="text-2xl font-bold mb-3 text-black">Vitamin Check</h3>
                <p className="text-gray-600 mb-6">Test for vitamin D, B12, folate, and iron to optimize your energy and wellbeing.</p>
                <div className="text-3xl font-bold text-black mb-4">From £49</div>
                <a href="/comparison" className="block w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition text-center">
                  View Providers
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-black">How It Works</h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-teal-600 mx-auto mb-6">1</div>
                <h3 className="text-xl font-bold mb-3">Order Your Test</h3>
                <p className="text-gray-600">Choose from our curated selection of trusted providers. Kit delivered to your door next day.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-teal-600 mx-auto mb-6">2</div>
                <h3 className="text-xl font-bold mb-3">Take Your Sample</h3>
                <p className="text-gray-600">Simple finger-prick test at home. Post back using the prepaid envelope provided.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-teal-600 mx-auto mb-6">3</div>
                <h3 className="text-xl font-bold mb-3">Get Your Results</h3>
                <p className="text-gray-600">Doctor-reviewed results within 48 hours. Clear explanations and next steps included.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-pink-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Health Journey?</h2>
            <p className="text-xl mb-8 text-pink-100">Compare prices, read reviews, and find the perfect test for your needs.</p>
            <a href="/comparison" className="inline-block bg-white text-pink-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-pink-50 transition shadow-lg">
              Browse All Tests
            </a>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Get Exclusive Health Insights & Test Offers
                </h2>
                <p className="text-lg text-gray-600">
                  Join thousands receiving expert health tips, exclusive discounts, and early access to new tests.
                </p>
              </div>

              <LeadCaptureForm />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}