'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { trackVisitor, trackPageVisit, trackEvent, captureUTMParameters } from '@/lib/tracking'

export default function HormonesPage() {
  const providers = [
    {
      name: "Thriva",
      logo: "🩺",
      rating: 4.7,
      reviews: 12500,
      price: "£79.99",
      turnaround: "2-3 days",
      tests: "Testosterone, Thyroid, Cortisol",
      shipping: "Free",
      gmc: true,
      url: "#",
      pros: ["Quick results", "Easy to use", "Great app"],
      cons: ["Limited hormone range", "Premium pricing"]
    },
    {
      name: "Medichecks",
      logo: "⚡",
      rating: 4.8,
      reviews: 18000,
      price: "£89.99",
      turnaround: "2-5 days",
      tests: "Full hormone panel (10+ markers)",
      shipping: "Free",
      gmc: true,
      url: "#",
      pros: ["Comprehensive panel", "Detailed results", "Expert support"],
      cons: ["Slower results", "Higher price point"],
      featured: true
    },
    {
      name: "LetsGetChecked",
      logo: "💪",
      rating: 4.6,
      reviews: 9000,
      price: "£99.00",
      turnaround: "2-5 days",
      tests: "Hormone balance panel",
      shipping: "Free",
      gmc: true,
      url: "#",
      pros: ["Phone consultations", "US & UK coverage", "Discreet packaging"],
      cons: ["Higher prices", "Limited UK range"]
    }
  ]

  useEffect(() => {
    const initTracking = async () => {
      captureUTMParameters()
      await trackVisitor()
      await trackPageVisit('Hormones Page')
    }
    initTracking()
  }, [])

  const handleProviderClick = (providerName) => {
    trackEvent('provider_click', { 
      provider: providerName,
      page: 'hormones' 
    })
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-500 via-rose-600 to-pink-700 text-white">
          <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Hormone Testing at Home
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-pink-50">
                Understand your hormone levels and take control of your health. Fast, accurate, and completely confidential.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="bg-white py-12 border-b">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Why Test Your Hormones?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg mb-4">
                Hormones are chemical messengers that regulate nearly every function in your body. From energy levels and mood to metabolism and reproductive health, hormones play a crucial role in your overall wellbeing.
              </p>
              <p className="text-lg mb-4">
                Hormone imbalances can cause a wide range of symptoms including fatigue, weight changes, mood swings, sleep problems, and reduced libido. At-home hormone testing makes it easy to check your levels without visiting a clinic.
              </p>
            </div>
          </div>
        </section>

        {/* What Hormones Are Tested Section */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12">
              Key Hormones Tested
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-4xl mb-4">🧪</div>
                <h3 className="text-xl font-bold text-black mb-3">Testosterone</h3>
                <p className="text-gray-600">
                  Essential for muscle mass, bone density, energy, and libido. Important for both men and women.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-black mb-3">Thyroid Hormones</h3>
                <p className="text-gray-600">
                  Regulates metabolism, energy production, and body temperature. Includes TSH, T3, and T4.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-4xl mb-4">🌙</div>
                <h3 className="text-xl font-bold text-black mb-3">Cortisol</h3>
                <p className="text-gray-600">
                  Your stress hormone. High levels can indicate chronic stress and affect sleep and energy.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-4xl mb-4">💊</div>
                <h3 className="text-xl font-bold text-black mb-3">Estrogen</h3>
                <p className="text-gray-600">
                  Critical for reproductive health, bone density, and mood regulation in both men and women.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="text-xl font-bold text-black mb-3">Progesterone</h3>
                <p className="text-gray-600">
                  Important for menstrual cycle regulation, pregnancy, and overall hormonal balance.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-black mb-3">SHBG</h3>
                <p className="text-gray-600">
                  Sex hormone binding globulin affects how much testosterone and estrogen your body can use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who Should Test Section */}
        <section className="bg-white py-12 border-b">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Who Should Consider Hormone Testing?
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <div className="text-pink-600 text-2xl mr-4">✓</div>
                <div>
                  <strong className="text-black">Experiencing fatigue or low energy</strong> - Hormone imbalances are a common cause of persistent tiredness
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-pink-600 text-2xl mr-4">✓</div>
                <div>
                  <strong className="text-black">Unexplained weight changes</strong> - Thyroid and cortisol issues can affect metabolism
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-pink-600 text-2xl mr-4">✓</div>
                <div>
                  <strong className="text-black">Mood swings or depression</strong> - Hormonal fluctuations can significantly impact mental health
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-pink-600 text-2xl mr-4">✓</div>
                <div>
                  <strong className="text-black">Sleep problems</strong> - Cortisol and melatonin imbalances can disrupt sleep patterns
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-pink-600 text-2xl mr-4">✓</div>
                <div>
                  <strong className="text-black">Reduced libido</strong> - Testosterone and estrogen levels directly affect sexual health
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-pink-600 text-2xl mr-4">✓</div>
                <div>
                  <strong className="text-black">Menopausal or perimenopausal symptoms</strong> - Understanding hormone levels helps manage this transition
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-pink-600 text-2xl mr-4">✓</div>
                <div>
                  <strong className="text-black">Athletes or fitness enthusiasts</strong> - Monitor testosterone and recovery hormones for optimal performance
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-4">
              Compare Hormone Test Providers
            </h2>
            <p className="text-xl text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Compare the UK's leading at-home hormone test providers side-by-side to find the best option for your needs.
            </p>
          </div>
        </section>

        {/* Desktop Comparison Table */}
        <section className="py-12 hidden md:block bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Provider</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Rating</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Price</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Results</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Hormones Tested</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {providers.map((provider, index) => (
                    <tr key={index} className={provider.featured ? 'bg-pink-50 border-t' : 'border-t'}>
                      <td className="px-6 py-6">
                        <div className="flex items-center">
                          <span className="text-3xl mr-3">{provider.logo}</span>
                          <div>
                            <div className="font-bold text-lg text-black">{provider.name}</div>
                            {provider.featured && (
                              <span className="text-xs bg-pink-600 text-white px-2 py-1 rounded-full">RECOMMENDED</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="font-semibold text-black">{provider.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="font-bold text-xl text-black">{provider.price}</div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="text-gray-700">{provider.turnaround}</div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="text-gray-700 text-sm">{provider.tests}</div>
                      </td>
                      <td className="px-6 py-6">
                        <a 
                          href={provider.url} 
                          onClick={() => handleProviderClick(provider.name)}
                          className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition inline-block">
                          View Tests
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Mobile Comparison Cards */}
        <section className="py-8 md:hidden bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 space-y-6">
            {providers.map((provider, index) => (
              <div key={index} className={provider.featured ? 'bg-white rounded-xl shadow-lg p-6 border-2 border-pink-500' : 'bg-white rounded-xl shadow-lg p-6'}>
                {provider.featured && (
                  <div className="bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">RECOMMENDED</div>
                )}
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">{provider.logo}</span>
                  <div>
                    <h3 className="text-xl font-bold text-black">{provider.name}</h3>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="font-semibold">{provider.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-bold text-black">{provider.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Results:</span>
                    <span className="text-black">{provider.turnaround}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hormones:</span>
                    <span className="text-black text-sm">{provider.tests}</span>
                  </div>
                </div>
                <a 
                  href={provider.url} 
                  onClick={() => handleProviderClick(provider.name)}
                  className="block w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition text-center">
                  View Tests
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white py-12 border-b">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12">
              How Hormone Testing Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-pink-600 mx-auto mb-6">1</div>
                <h3 className="text-xl font-bold mb-3 text-black">Order Your Test</h3>
                <p className="text-gray-600">Choose a hormone test kit from a trusted provider. Delivered to your door in discreet packaging.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-pink-600 mx-auto mb-6">2</div>
                <h3 className="text-xl font-bold mb-3 text-black">Take Your Sample</h3>
                <p className="text-gray-600">Simple finger-prick blood sample at home. Some tests may require a saliva sample. Follow the included instructions.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-pink-600 mx-auto mb-6">3</div>
                <h3 className="text-xl font-bold mb-3 text-black">Get Your Results</h3>
                <p className="text-gray-600">Doctor-reviewed results within 2-5 days. Clear explanations of your hormone levels and what they mean.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-black mb-3">When is the best time to test hormones?</h3>
                <p className="text-gray-700">
                  For women, hormone levels vary throughout the menstrual cycle. Most providers recommend testing on day 3 of your cycle for accurate results. For men, testing can be done at any time, though morning samples are often preferred for testosterone.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-black mb-3">How accurate are at-home hormone tests?</h3>
                <p className="text-gray-700">
                  At-home hormone tests use the same laboratory methods as clinic-based tests. All providers featured use GMC-registered doctors to review results, ensuring accuracy and reliability.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-black mb-3">What should I do if my hormones are imbalanced?</h3>
                <p className="text-gray-700">
                  If your results show hormone imbalances, many providers offer consultations with healthcare professionals. They can help interpret your results and discuss treatment options, lifestyle changes, or further testing if needed.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-black mb-3">Can I use my results with my GP?</h3>
                <p className="text-gray-700">
                  Yes, you can share your results with your GP. Many providers include detailed reports that you can download and take to your doctor for further discussion and potential treatment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-pink-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Check Your Hormone Levels?</h2>
            <p className="text-xl mb-8 text-pink-100">Compare providers above and find the perfect hormone test for your needs.</p>
            <a href="/comparison" className="inline-block bg-white text-pink-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-pink-50 transition shadow-lg">
              View All Providers
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
