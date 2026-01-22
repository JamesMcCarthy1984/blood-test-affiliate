import './globals.css'
import GoogleAnalytics from './GoogleAnalytics'

export const metadata = {
  title: 'BloodTestHub - Compare At-Home Blood Test Providers',
  description: 'Compare the UK\'s leading at-home blood test providers. Find the best service for your needs based on price, speed, and test range.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Cookiebot - Must load first */}
        <script 
          id="Cookiebot" 
          src="https://consent.cookiebot.com/uc.js" 
          data-cbid="81334869-f43d-4e33-8362-5c98fa5a65ec" 
          data-blockingmode="auto" 
          type="text/javascript"
        />
        
        {/* Google Analytics - Will be blocked until consent */}
        <GoogleAnalytics />
      </head>
      <body>
        {/* GTM noscript */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-KPTX8BHG"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}