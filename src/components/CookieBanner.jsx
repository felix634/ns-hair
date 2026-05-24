import React, { useState, useEffect } from 'react';

const CONSENT_KEY = 'ns-cookie-consent';
const CONSENT_EVENT = 'ns-cookie-consent-changed';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const setConsent = (value) => {
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Sütik kezelése"
      className="fixed bottom-0 left-0 right-0 z-[100] p-3 md:p-5 animate-fade-in"
    >
      <div className="max-w-5xl mx-auto bg-black/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-ns-red via-ns-gold to-ns-red"></div>

        <div className="p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">

          <div className="flex-1">
            <h3 className="text-white font-serif text-base md:text-lg font-semibold mb-1.5 flex items-center gap-2">
              <span className="text-ns-gold" aria-hidden="true">🍪</span>
              <span>Sütik használata</span>
            </h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Weboldalunk a működéshez és a felhasználói élmény javításához külső szolgáltatások (Google Maps, Google Fonts) sütijeit használja. Saját analitikai vagy marketingsütit nem helyezünk el. Részletek az{' '}
              <a href="/adatkezelesi-tajekoztato" className="text-ns-gold hover:underline">adatkezelési tájékoztatóban</a>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setConsent('declined')}
              className="px-5 py-2.5 text-xs uppercase tracking-wider font-medium text-gray-400 hover:text-white border border-white/10 hover:border-white/30 rounded-full transition-all duration-300"
            >
              Elutasítom
            </button>
            <button
              type="button"
              onClick={() => setConsent('accepted')}
              className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold text-white bg-gradient-to-r from-ns-red to-ns-red-light rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-ns-red/30 hover:-translate-y-0.5"
            >
              Elfogadom
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
