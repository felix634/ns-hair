# Nagy Sándor Hair & Beauty — Weboldal

Prémium fodrászat weboldala Szegeden — egyoldalas Astro site, Netlify-on hostolva.

🌐 **Élő site:** https://nagysandorhair.hu
📦 **Tech:** Astro 5 + React 19 + Tailwind CSS v4 + GSAP

---

## 📂 Projekt struktúra

```
ns-hair/
├── public/                    # Statikus fájlok (közvetlenül a / alá kerülnek)
│   ├── favicon.svg
│   ├── logo.png               # Logo (navbar + footer + JSON-LD)
│   ├── bg.png                 # Háttér kép
│   ├── munka1-6.png           # Galéria fotók
│   └── robots.txt
├── src/
│   ├── components/            # React komponensek (interaktív részek)
│   │   ├── Navbar.jsx
│   │   ├── HeroTitle.jsx
│   │   ├── FadeIn.jsx
│   │   ├── GSAPAnimations.jsx
│   │   ├── CookieBanner.jsx   # GDPR cookie consent
│   │   └── ConsentMap.jsx     # Google Maps consent-gated
│   ├── layouts/
│   │   └── Layout.astro       # Közös head + meta + JSON-LD
│   ├── pages/                 # Minden .astro fájl = 1 URL
│   │   ├── index.astro                       # /
│   │   ├── impresszum.astro                  # /impresszum
│   │   ├── adatkezelesi-tajekoztato.astro    # /adatkezelesi-tajekoztato
│   │   └── 404.astro
│   └── styles/
│       └── app.css            # Tailwind + custom CSS
├── astro.config.mjs           # Astro konfig (site URL, integrációk)
├── netlify.toml               # Netlify build + security headerek
└── package.json
```

---

## 🚀 Helyi fejlesztés

```bash
npm install         # függőségek telepítése (csak első alkalommal)
npm run dev         # dev szerver: http://localhost:4321
npm run build       # production build a ./dist/ mappába
npm run preview     # build előzetes megtekintése
```

---

## 🌍 Deploy

**Automatikus** — minden `main` branch-re pushölt commit triggereli a Netlify buildet és deployt.

- **Hosting:** Netlify
- **Domain:** nagysandorhair.hu (SSL: Let's Encrypt, auto-renewing)
- **Build parancs:** `npm run build`
- **Publish könyvtár:** `dist/`

---

## ✏️ Gyakori módosítások

### Új galéria fotó hozzáadása
1. Tedd a képet a `public/` mappába (pl. `munka7.png`)
2. Nyisd meg [src/pages/index.astro](src/pages/index.astro)
3. A `galleryItems` tömbhöz adj hozzá egy bejegyzést:
   ```js
   { img: 'munka7.png', text: 'Új munka leírása' }
   ```

### Nyitvatartás módosítása
Két helyen kell átírni:
1. [src/pages/index.astro](src/pages/index.astro) — látható szöveg a kapcsolat kártyán
2. [src/layouts/Layout.astro](src/layouts/Layout.astro) — JSON-LD strukturált adat (SEO)

### Telefonszám / email módosítása
Több helyen szerepel — keress rá a `+36305355678` és `nagysandorhair@gmail.com` stringekre, és cseréld mindenhol.

### Szolgáltatás kártya (Hajvágás, Festés, stb.)
[src/pages/index.astro](src/pages/index.astro) — `<!-- ===== SZOLGÁLTATÁSOK & ÁRAK ===== -->` szekció

### Cégadatok (cím, adószám, cégjegyzékszám)
- Impresszum: [src/pages/impresszum.astro](src/pages/impresszum.astro)
- Adatkezelési: [src/pages/adatkezelesi-tajekoztato.astro](src/pages/adatkezelesi-tajekoztato.astro)
- JSON-LD: [src/layouts/Layout.astro](src/layouts/Layout.astro)

---

## 🔍 SEO

- **Google Search Console** beállítva, sitemap submitted
- **Sitemap:** auto-generálódik buildkor → https://nagysandorhair.hu/sitemap-index.xml
- **robots.txt:** [public/robots.txt](public/robots.txt)
- **Structured data:** Schema.org HairSalon JSON-LD a Layout.astro-ban
- **Open Graph + Twitter Card** meta tag-ek a Layout.astro-ban

---

## 🔒 Adatvédelem / GDPR

- **Cookie consent banner** első látogatáskor megjelenik
- Választás localStorage-ban tárolva (`ns-cookie-consent` kulcs: `accepted` / `declined`)
- **Google Maps** csak elfogadás után tölt be ([ConsentMap.jsx](src/components/ConsentMap.jsx))
- **Adatkezelési tájékoztató:** `/adatkezelesi-tajekoztato`
- **Impresszum:** `/impresszum`

---

## 📝 Megjegyzések jövőbeli fejlesztéshez

Még nem készült el (átadás után jöhet):
- Képoptimalizálás (WebP konverzió + Astro `<Image>` komponens)
- Open Graph kép (1200×630)
- Apple-touch-icon (180×180) iOS-hez
- Analytics (Plausible vagy GA4)
- Google Fonts self-hosting (jelenleg CDN-ről jön)
