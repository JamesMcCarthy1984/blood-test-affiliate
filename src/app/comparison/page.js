import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: "Blood Test Provider Comparison | BloodTestHub",
  description: "Compare the UK's top at-home blood test providers. See prices, turnaround times, and reviews side-by-side.",
}

export default function ComparisonPage() {
  const providers = [
    {
      name: "Thriva",
      logo: "🩺",
      rating: 4.7,
      reviews: 12500,
      price: "£29.99",
      turnaround: "2-3 days",
      tests: "30+ tests",
      shipping: "Free",
      gmc: true,
      url: "#",
      pros: ["Quick results", "Easy to use", "Great app"],
      cons: ["Limited test range", "Premium pricing"]
    },
    {
      name: "Medichecks",
      logo: "⚡",
      rating: 4.8,
      reviews: 18000,
      price: "£34.99",
      turnaround: "2-5 days",
      tests: "100+ tests",
      shipping: "Free",
      gmc: true,
      url: "#",
      pros: ["Huge test range", "Detailed results", "Expert support"],
      cons: ["Slower results", "Complex interface"],
      featured: true
    },
    {
      name: "LetsGetChecked",
      logo: "💪",
      rating: 4.6,
      reviews: 9000,
      price: "£79.00",
      turnaround: "2-5 days",
      tests: "25+ tests",
      shipping: "Free",
      gmc: true,
      url: "#",
      pros: ["US & UK coverage", "Phone consultations", "Discreet packaging"],
      cons: ["Higher prices", "Limited UK range"]
    }
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Blood Test Provider Comparison
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Compare the UK leading at-home blood test providers side-by-side.
            </p>
          </div>
        </section>

        <section className="py-12 hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Provider</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Rating</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Price</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Results</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Tests</th>
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
                        <div className="text-gray-700">{provider.tests}</div>
                      </td>
                      <td className="px-6 py-6">
                        <a href={provider.url} className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition inline-block">
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

        <section className="py-8 md:hidden">
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
                </div>
                <a href={provider.url} className="block w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition text-center">
                  View Tests
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}