import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Színek definíciója a választóhoz
const COLORS = [
  { id: "black", name: "Fekete / Sötétbarna", hex: "#1a1a1a" },
  { id: "brown", name: "Középbarna / Világosbarna", hex: "#795548" },
  { id: "blonde", name: "Szőke / Szőkített", hex: "#FDD835" },
  { id: "red", name: "Vörös / Réz", hex: "#D32F2F" },
  { id: "gray", name: "Ősz / Ezüst", hex: "#9E9E9E" },
  { id: "vivid", name: "Extrém / Színes", hex: "#00E676" }, 
];

// Kiegészítő szolgáltatások (Checkboxok) - FEJBŐRMASSZÁZS ELTÁVOLÍTVA
const EXTRA_SERVICES = [
  { id: "balayage", name: "Balayage / Ombre technika", price: 15000, desc: "Színátmenetes festés" },
  { id: "mask", name: "Mélyhidratáló pakolás", price: 3500, desc: "Száraz, töredezett hajra" },
  { id: "styling", name: "Extra Styling (Vasalás/Göndörítés)", price: 2500, desc: "Az eseményhez illő forma" },
  { id: "plex", name: "K18 / Olaplex kezelés", price: 6000, desc: "Hajkötés sokszorozó védelem" },
];

export default function AdvancedPriceCalculator() {
  const [gender, setGender] = useState("female");
  const [length, setLength] = useState("long");
  const [wantsColor, setWantsColor] = useState(false);
  
  // Szín állapotok
  const [currentColor, setCurrentColor] = useState("brown");
  const [targetColor, setTargetColor] = useState("brown");

  // Extrák állapota
  const [selectedExtras, setSelectedExtras] = useState([]);

  const [total, setTotal] = useState(0);
  const [priceDetails, setPriceDetails] = useState([]);

  // Checkbox kezelő
  const toggleExtra = (id) => {
    if (selectedExtras.includes(id)) {
      setSelectedExtras(selectedExtras.filter(item => item !== id));
    } else {
      setSelectedExtras([...selectedExtras, id]);
    }
  };

  // --- ÁRKÉPZÉSI LOGIKA ---
  useEffect(() => {
    let price = 0;
    let details = [];

    // 1. ALAPDÍJAK
    if (gender === "male") {
      price += 4500; 
      details.push("Férfi komplett vágás (4.500 Ft)");
    } else {
      const basePrice = length === "short" ? 6500 : 8500;
      price += basePrice;
      details.push(length === "short" ? "Rövid haj vágás + szárítás (6.500 Ft)" : "Hosszú haj vágás + szárítás (8.500 Ft)");
    }

    // 2. FESTÉS SZÁMÍTÁS
    if (wantsColor) {
      let colorPrice = 0;
      let colorNote = "";

      const isMale = gender === "male";
      const baseColorPrice = isMale ? 6000 : (length === "short" ? 8900 : 9900);

      if (targetColor === "vivid") {
        colorPrice = isMale ? 15000 : (length === "short" ? 25000 : 35000);
        colorNote = "Szőkítés + Vivid színezés";
      } else if (currentColor === "black" && targetColor === "blonde") {
        colorPrice = isMale ? 12000 : (length === "short" ? 22000 : 32000);
        colorNote = "Teljes szőkítés + Árnyalás";
      } else if (currentColor === targetColor) {
        colorPrice = baseColorPrice;
        colorNote = isMale ? "Őszülés tompítás / Színfrissítés" : "Tőfestés / Színfrissítés";
      } else {
        colorPrice = isMale ? 9000 : (length === "short" ? 12000 : 16000);
        colorNote = "Teljes festés";
      }

      price += colorPrice;
      details.push(`${colorNote} (${colorPrice.toLocaleString()} Ft)`);
    }

    // 3. EXTRÁK HOZZÁADÁSA
    selectedExtras.forEach(extraId => {
      const service = EXTRA_SERVICES.find(s => s.id === extraId);
      if (service) {
        price += service.price;
        details.push(`${service.name} (+${service.price.toLocaleString()} Ft)`);
      }
    });

    setTotal(price);
    setPriceDetails(details);
  }, [gender, length, wantsColor, currentColor, targetColor, selectedExtras]);

  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-b from-[#1a1a1a] to-black rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative">
      {/* Háttér effekt */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-ns-red/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="p-6 md:p-10 relative z-10">
        <h3 className="text-3xl font-bold text-white mb-2 uppercase text-center">Prémium Árkalkulátor</h3>
        <p className="text-gray-400 text-center mb-10 text-sm">Állítsd össze a csomagodat a pontos becsléshez</p>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* BAL OSZLOP: BEÁLLÍTÁSOK */}
          <div className="space-y-8">
            
            {/* 1. NEM & HOSSZ */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-ns-silver uppercase tracking-widest">Alapadatok</label>
              <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
                <button onClick={() => { setGender("female"); }} className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${gender === "female" ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"}`}>Hölgy</button>
                <button onClick={() => { setGender("male"); }} className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${gender === "male" ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"}`}>Úr</button>
              </div>

              {/* Ha nő, akkor hajhossz választó */}
              <AnimatePresence>
                {gender === "female" && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-4 mt-2">
                      <button onClick={() => setLength("short")} className={`flex-1 py-2 px-4 rounded-lg border text-sm transition-all ${length === "short" ? "border-ns-red text-white bg-ns-red/10" : "border-gray-700 text-gray-500"}`}>Rövid / Félhosszú</button>
                      <button onClick={() => setLength("long")} className={`flex-1 py-2 px-4 rounded-lg border text-sm transition-all ${length === "long" ? "border-ns-red text-white bg-ns-red/10" : "border-gray-700 text-gray-500"}`}>Hosszú</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. FESTÉS KAPCSOLÓ */}
            <div className="space-y-4">
                 <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg cursor-pointer" onClick={() => setWantsColor(!wantsColor)}>
                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-white uppercase cursor-pointer">Festés / Színváltoztatás</label>
                        <span className="text-xs text-gray-400">{gender === 'male' ? 'Őszülés tompítás, teljes festés' : 'Tőfestés, Balayage, Szőkítés'}</span>
                    </div>
                    <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${wantsColor ? "bg-ns-red" : "bg-gray-700"}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${wantsColor ? "left-7" : "left-1"}`}></div>
                    </div>
                 </div>

                 <AnimatePresence>
                    {wantsColor && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden space-y-6 pt-2 border-l-2 border-ns-red pl-4 ml-2"
                        >
                            {/* JELENLEGI SZÍN */}
                            <div>
                                <p className="text-gray-400 text-xs mb-3 font-bold uppercase">Milyen most a hajad?</p>
                                <div className="flex flex-wrap gap-3">
                                    {COLORS.map((c) => (
                                        <button 
                                            key={`current-${c.id}`}
                                            onClick={() => setCurrentColor(c.id)}
                                            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 relative ${currentColor === c.id ? "border-white scale-110 shadow-[0_0_10px_white]" : "border-transparent opacity-50 hover:opacity-100"}`}
                                            style={{ backgroundColor: c.hex }}
                                            title={c.name}
                                        >
                                            {currentColor === c.id && <div className="absolute inset-0 flex items-center justify-center text-[10px] text-black/70 font-bold">✓</div>}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* KÍVÁNT SZÍN */}
                            <div>
                                <p className="text-gray-400 text-xs mb-3 font-bold uppercase">Milyet szeretnél?</p>
                                <div className="flex flex-wrap gap-3">
                                    {COLORS.map((c) => (
                                        <button 
                                            key={`target-${c.id}`}
                                            onClick={() => setTargetColor(c.id)}
                                            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 relative ${targetColor === c.id ? "border-ns-red scale-110 shadow-[0_0_15px_#D32F2F]" : "border-transparent opacity-50 hover:opacity-100"}`}
                                            style={{ backgroundColor: c.hex }}
                                            title={c.name}
                                        >
                                             {targetColor === c.id && <div className="absolute inset-0 flex items-center justify-center text-[10px] text-black font-bold">✓</div>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                 </AnimatePresence>
            </div>
            
            {/* 3. EXTRÁK (Checkbox lista) */}
            <div className="space-y-4 pt-4 border-t border-gray-800">
                <label className="text-xs font-bold text-ns-silver uppercase tracking-widest">Extrák & Kényeztetés</label>
                <div className="space-y-2">
                    {EXTRA_SERVICES.map((extra) => {
                        const isSelected = selectedExtras.includes(extra.id);
                        return (
                            <div 
                                key={extra.id}
                                onClick={() => toggleExtra(extra.id)}
                                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${isSelected ? "bg-white/10 border-ns-red text-white" : "bg-transparent border-gray-800 text-gray-500 hover:border-gray-600"}`}
                            >
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold">{extra.name}</span>
                                    <span className="text-[10px] text-gray-400">{extra.desc}</span>
                                </div>
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? "bg-ns-red border-ns-red" : "border-gray-600"}`}>
                                    {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

          </div>

          {/* JOBB OSZLOP: EREDMÉNY & ÖSSZEGZÉS */}
          <div className="bg-black/40 rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-white/5 relative overflow-hidden">
             
             {/* Animált felső csík */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ns-red to-transparent opacity-70"></div>

             <div className="space-y-6">
                <h4 className="text-xl font-bold text-white uppercase flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ns-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                    Összesítő
                </h4>
                
                <div className="space-y-3 text-sm text-gray-300 min-h-[150px]">
                    <AnimatePresence>
                        {priceDetails.map((detail, index) => (
                             <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex justify-between border-b border-gray-800 pb-2 last:border-0"
                             >
                                <span className={detail.includes("Extrém") || detail.includes("Szőkítés") ? "text-ns-red" : ""}>{detail.split('(')[0]}</span>
                                <span className="text-white font-mono">{detail.match(/\((.*?)\)/)?.[1] || ""}</span>
                             </motion.div>
                        ))}
                    </AnimatePresence>
                    {priceDetails.length === 0 && <p className="text-gray-600 italic">Válassz szolgáltatásokat...</p>}
                </div>
             </div>

             <div className="mt-8 pt-6 border-t border-gray-800">
                 <div className="flex justify-between items-end mb-6">
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Becsült fizetendő</p>
                    <motion.div 
                        key={total} 
                        initial={{ scale: 0.9, color: "#fff" }}
                        animate={{ scale: 1, color: "#fff" }}
                        className="text-4xl font-bold text-white text-right"
                    >
                        {total.toLocaleString('hu-HU')} <span className="text-lg text-ns-red">Ft</span>
                    </motion.div>
                 </div>

                 <a href="#idopont" className="group relative block w-full py-4 bg-ns-red overflow-hidden rounded-full shadow-lg shadow-red-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
                    <span className="relative text-white font-bold uppercase tracking-wide">Időpontfoglalás erre</span>
                 </a>
                 <p className="text-[10px] text-center text-gray-600 mt-3">*Az ár tájékoztató jellegű, a haj sűrűségétől és anyagfelhasználástól függően változhat.</p>
             </div>

          </div>

        </div>
      </div>
    </div>
  );
}