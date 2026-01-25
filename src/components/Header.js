'use client'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20 md:h-16">
          {/* Logo - Centered on mobile, left on desktop */}
          <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">
                BloodTest<span className="text-pink-600">Hub</span>
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/hormones" className="text-gray-700 hover:text-pink-600 font-medium transition">
              Hormones
            </a>
            <a href="/mens" className="text-gray-700 hover:text-pink-600 font-medium transition">
              Men's
            </a>
            <a href="/womens" className="text-gray-700 hover:text-pink-600 font-medium transition">
              Women's
            </a>
            <a href="/vitamins" className="text-gray-700 hover:text-pink-600 font-medium transition">
              Vitamins
            </a>
            <a href="/other" className="text-gray-700 hover:text-pink-600 font-medium transition">
              Other
            </a>
          </div>

          {/* Mobile Hamburger Button - Absolute positioned on right */}
          <div className="md:hidden absolute right-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-pink-600 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t pt-4">
            <a href="/hormones" className="block py-3 text-gray-700 hover:text-pink-600 font-medium">
              Hormones
            </a>
            <a href="/mens" className="block py-3 text-gray-700 hover:text-pink-600 font-medium">
              Men's
            </a>
            <a href="/womens" className="block py-3 text-gray-700 hover:text-pink-600 font-medium">
              Women's
            </a>
            <a href="/vitamins" className="block py-3 text-gray-700 hover:text-pink-600 font-medium">
              Vitamins
            </a>
            <a href="/other" className="block py-3 text-gray-700 hover:text-pink-600 font-medium">
              Other
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}