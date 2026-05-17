import React, { useState, useEffect } from 'react';

const CONSENT_KEY = 'ns-cookie-consent';
const CONSENT_EVENT = 'ns-cookie-consent-changed';
const MAP_SRC = 'https://maps.google.com/maps?q=6720+Szeged,+Horv%C3%A1th+Mih%C3%A1ly+u.+9&t=&z=16&ie=UTF8&iwloc=&output=embed';

export default function ConsentMap() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setAccepted(localStorage.getItem(CONSENT_KEY) === 'accepted');

    const handler = (e) => setAccepted(e.detail === 'accepted');
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);

  const acceptNow = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: 'accepted' }));
  };

  if (accepted) {
    return (
      <iframe
        src={MAP_SRC}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        title="Nagy Sándor Hair & Beauty Térkép"
        className="absolute inset-0 w-full h-full filter grayscale-[80%] brightness-[0.6] contrast-[1.2] group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-700 ease-in-out"
      />
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-[#1a1a1a] to-black">
      <div className="w-14 h-14 mb-4 rounded-full bg-ns-red/10 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-ns-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h3 className="text-white font-serif text-lg font-semibold mb-2">Google Térkép</h3>
      <p className="text-gray-400 text-sm max-w-xs mb-5 leading-relaxed">
        A térkép megjelenítéséhez a Google Maps sütiket helyez el az eszközén. Megjelenítéséhez fogadd el a sütik használatát.
      </p>
      <button
        type="button"
        onClick={acceptNow}
        className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold text-white bg-gradient-to-r from-ns-red to-ns-red-light rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-ns-red/30 hover:-translate-y-0.5"
      >
        Térkép megjelenítése
      </button>
      <a href="/adatkezelesi-tajekoztato" className="mt-4 text-gray-500 hover:text-ns-gold text-xs underline transition-colors">
        Adatkezelési tájékoztató
      </a>
    </div>
  );
}
