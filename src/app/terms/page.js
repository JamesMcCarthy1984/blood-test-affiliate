import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Terms & Conditions | BloodTestHub',
  description: 'Terms of use for BloodTestHub.',
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-black">Terms & Conditions</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-500 mb-8">Last updated: January 22, 2026</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing BloodTestHub ("the Site"), you agree to be bound by these Terms and Conditions. 
            If you do not agree to these terms, please do not use the Site.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Use of the Site</h2>
          <p>
            BloodTestHub is a comparison and information website for at-home blood test providers in the UK. 
            We provide information and comparisons to help you make informed decisions about blood testing services.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Affiliate Relationships</h2>
          <p>
            BloodTestHub participates in affiliate marketing programs. This means we may earn commissions when you 
            click on certain links and make purchases through providers featured on our site. These affiliate relationships 
            do not influence our editorial content or comparisons, which are based on research and publicly available information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. No Medical Advice</h2>
          <p>
            The information provided on BloodTestHub is for informational purposes only and should not be considered 
            medical advice. Always consult with a qualified healthcare provider before making decisions about blood tests 
            or health-related matters. The blood test providers featured on our site are regulated services, but we do not 
            provide medical services ourselves.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Accuracy of Information</h2>
          <p>
            While we strive to keep all information on BloodTestHub accurate and up-to-date, prices, test offerings, 
            and provider details may change. We recommend verifying current details directly with providers before making 
            any purchases.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Third-Party Links</h2>
          <p>
            Our Site contains links to third-party websites (blood test providers). We are not responsible for the content, 
            privacy practices, or terms of service of these external sites. When you click through to a provider's website, 
            their terms and conditions will apply.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. User Conduct</h2>
          <p>
            You agree not to use the Site for any unlawful purpose or in any way that could damage, disable, or impair 
            the Site. You may not attempt to gain unauthorized access to any part of the Site.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Intellectual Property</h2>
          <p>
            All content on BloodTestHub, including text, graphics, logos, and software, is the property of BloodTestHub 
            or our licensors and is protected by copyright and other intellectual property laws. You may not reproduce, 
            distribute, or create derivative works without our express written permission.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Limitation of Liability</h2>
          <p>
            BloodTestHub and its operators will not be liable for any damages arising from your use of the Site or 
            reliance on information provided. This includes direct, indirect, incidental, or consequential damages.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately 
            upon posting to the Site. Your continued use of the Site after changes constitutes acceptance of the modified terms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">11. Governing Law</h2>
          <p>
            These Terms and Conditions are governed by the laws of England and Wales. Any disputes will be subject to 
            the exclusive jurisdiction of the courts of England and Wales.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">12. Contact Us</h2>
          <p>
            If you have questions about these Terms and Conditions, please contact us at: <a href="mailto:hello@bloodtesthub.com" className="text-pink-600 hover:text-pink-700">hello@bloodtesthub.com</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}