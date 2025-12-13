import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Rólunk', href: '#rolunk' },
    { name: 'Szolgáltatások & Árak', href: '#arak' },
    { name: 'Munkáink', href: '#munkaink' },
    { name: 'Időpontfoglalás', href: '#idopont' },
    { name: 'Elérhetőségek', href: '#kapcsolat' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo a bal sarokban */}
          <div className="flex-shrink-0">
            <a href="#">
              <img className="h-12 w-auto" src="/logo.png" alt="Nagy Sándor Logo" />
            </a>
          </div>

          {/* Desktop Menü */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-ns-red hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 uppercase tracking-wider"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobil Menü Gomb */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Menü nyitása</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Menü Lista */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-ns-red block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}