export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white">
        {/* Disclaimer Section */}
        <div className="bg-yellow-50 border-t-4 border-yellow-400 text-gray-800 px-4 py-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm md:text-base">
              <strong>Important:</strong> Test results are for information purposes only and are not intended for clinical diagnosis. If you have any health concerns, please discuss these with your GP.
            </p>
          </div>
        </div>
  
        {/* Footer Links */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo/Brand */}
            <div className="text-xl font-bold">
              BloodTest<span className="text-pink-400">Hub</span>
            </div>
  
            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="/terms" className="text-gray-300 hover:text-pink-400 transition">
                Terms and Conditions
              </a>
              <a href="/cookies" className="text-gray-300 hover:text-pink-400 transition">
                Cookie Policy
              </a>
              <a href="/privacy" className="text-gray-300 hover:text-pink-400 transition">
                Privacy Policy
              </a>
            </div>
  
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} BloodTestHub
            </div>
          </div>
        </div>
      </footer>
    )
  }