import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { name: 'Rólunk', href: '#rolunk' },
    { name: 'Szolgáltatások', href: '#arak' },
    { name: 'Munkáink', href: '#munkaink' },
    { name: 'Kapcsolat', href: '#idopont' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Active section detection
      const sections = ['rolunk', 'arak', 'munkaink', 'idopont'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(`#${id}`);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="main-navbar"
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/50'
          : 'bg-transparent border-b border-transparent'
        }`}
    >
      {/* Scroll Progress Bar */}
      <div
        id="scroll-progress"
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-ns-red via-ns-gold to-ns-red"
        style={{ transform: 'scaleX(0)' }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" aria-label="Főoldal – Nagy Sándor Hair & Beauty" className="group flex items-center gap-3">
              <img className="h-11 w-auto transition-transform duration-300 group-hover:scale-105" src="/logo.webp" alt="Nagy Sándor Hair & Beauty – Prémium Fodrászat Szegeden" width="666" height="375" />
              <div className="hidden sm:block">
                <span className="text-white font-serif text-lg font-semibold tracking-wide">NS</span>
                <span className="text-ns-gold text-xs block -mt-1 tracking-[0.2em] uppercase font-light">Hair & Beauty</span>
              </div>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={activeSection === link.href ? 'page' : undefined}
                  className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 uppercase tracking-wider group ${activeSection === link.href
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                    }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-ns-red to-ns-gold transition-all duration-300 ${activeSection === link.href ? 'w-3/4' : 'w-0 group-hover:w-1/2'
                      }`}
                  ></span>
                </a>
              ))}
              <a
                href="#idopont"
                className="ml-4 px-5 py-2 text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-ns-red to-ns-red-light text-white rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-ns-red/30 hover:-translate-y-0.5"
              >
                Foglalj!
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Menü bezárása' : 'Menü nyitása'}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ns-gold/60"
            >
              <span className="sr-only">{isOpen ? 'Menü bezárása' : 'Menü nyitása'}</span>
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-current transform transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-current transform transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-black/95 backdrop-blur-md border-t border-white/10 px-4 pt-4 pb-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              aria-current={activeSection === link.href ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${activeSection === link.href
                  ? 'text-white bg-white/5 border-l-2 border-ns-red'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#idopont"
            onClick={() => setIsOpen(false)}
            className="block text-center mt-4 px-4 py-3 bg-gradient-to-r from-ns-red to-ns-red-light text-white rounded-full font-bold uppercase tracking-wider"
          >
            Foglalj!
          </a>
        </div>
      </div>
    </nav>
  );
}