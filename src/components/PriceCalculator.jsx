import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PriceCalculator() {
  const [gender, setGender] = useState("female"); // Alapértelmezett: Nő
  const [length, setLength] = useState("short");  // Alapértelmezett: Rövid
  const [selectedServices, setSelectedServices] = useState([]);
  const [total, setTotal] = useState(0);

  // --- ÁRLISTA ADATBÁZIS ---
  // Itt tudod módosítani az árakat és a szolgáltatásokat
  const prices = {
    male: {
      base: [
        { id: "m_cut_machine", name: "Gépi vágás", price: 3500 },
        { id: "m_cut_scissors", name: "Ollós vágás + mosás", price: 4500 },
        { id: "m_beard", name: "Szakálligazítás", price: 2500 },
        { id: "m_father_son", name: "Apa-fia vágás", price: 7500 },
        { id: "m_gray", name: "Őszülés tompítás", price: 3000 },
      ],
    },
    female: {
      short: [
        { id: "f_s_wash_dry", name: "Mosás + Szárítás", price: 3500 },
        { id: "f_s_cut", name: "Vágás (mosással)", price: 6500 },
        { id: "f_s_root", name: "Tőfestés", price: 8900 },
        { id: "f_s_full", name: "Teljes festés", price: 12000 },
        { id: "f_s_balayage", name: "Balayage / Ombre", price: 18000 },
      ],
      long: [
        { id: "f_l_wash_dry", name: "Mosás + Szárítás", price: 4500 },
        { id: "f_l_cut", name: "Vágás (mosással)", price: 8500 },
        { id: "f_l_root", name: "Tőfestés", price: 9900 },
        { id: "f_l_full", name: "Teljes festés", price: 16000 },
        { id: "f_l_balayage", name: "Balayage / Ombre", price: 22000 },
      ],
    },
  };

  // Amikor váltasz nemet vagy hosszt, nullázzuk a kijelölést
  const handleGenderChange = (g) => {
    setGender(g);
    setSelectedServices([]);
  };

  const handleLengthChange = (l) => {
    setLength(l);
    setSelectedServices([]);
  };

  // Checkbox kezelése
  const toggleService = (service) => {
    if (selectedServices.find((s) => s.id === service.id)) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  // Összeg számolása
  useEffect(() => {
    const sum = selectedServices.reduce((acc, curr) => acc + curr.price, 0);
    setTotal(sum);
  }, [selectedServices]);

  // Az aktuális lista lekérése
  const currentOptions =
    gender === "male" ? prices.male.base : prices.female[length];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-6 md:p-8 rounded-2xl border border-white/20 shadow-2xl max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6 uppercase text-center border-b border-gray-800 pb-4">
        Árkalkulátor
      </h3>

      {/* 1. NEM KIVÁLASZTÁSA */}
      <div className="mb-8">
        <p className="text-gray-400 text-sm uppercase tracking-widest mb-3 text-center">Válassz nemet</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleGenderChange("female")}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
              gender === "female"
                ? "bg-ns-red text-white shadow-lg shadow-ns-red/30"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Hölgy
          </button>
          <button
            onClick={() => handleGenderChange("male")}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
              gender === "male"
                ? "bg-ns-red text-white shadow-lg shadow-ns-red/30"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Úr
          </button>
        </div>
      </div>

      {/* 2. HAJHOSSZ (Csak nőknél) */}
      <AnimatePresence>
        {gender === "female" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-3 text-center">Hajhossz</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleLengthChange("short")}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                  length === "short"
                    ? "border-ns-silver text-white bg-white/10"
                    : "border-gray-700 text-gray-500 hover:border-gray-500"
                }`}
              >
                Rövid / Félhosszú
              </button>
              <button
                onClick={() => handleLengthChange("long")}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                  length === "long"
                    ? "border-ns-silver text-white bg-white/10"
                    : "border-gray-700 text-gray-500 hover:border-gray-500"
                }`}
              >
                Hosszú
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. SZOLGÁLTATÁSOK LISTÁJA */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {currentOptions.map((item) => {
          const isSelected = selectedServices.find((s) => s.id === item.id);
          return (
            <motion.div
              key={item.id}
              layout
              onClick={() => toggleService(item)}
              className={`cursor-pointer p-4 rounded-xl border flex justify-between items-center transition-all duration-200 ${
                isSelected
                  ? "bg-ns-red/10 border-ns-red text-white"
                  : "bg-white/5 border-transparent text-gray-400 hover:bg-white/10 hover:border-gray-600"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Egyedi Checkbox design */}
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center ${
                    isSelected ? "bg-ns-red border-ns-red" : "border-gray-500"
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="font-medium">{item.name}</span>
              </div>
              <span className="text-ns-silver font-bold">{item.price.toLocaleString("hu-HU")} Ft</span>
            </motion.div>
          );
        })}
      </div>

      {/* 4. ÖSSZESÍTÉS */}
      <div className="bg-black/50 p-6 rounded-xl border border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-gray-400 text-sm">Várható végösszeg:</p>
          <div className="text-3xl font-bold text-white">
            {total === 0 ? "0 Ft" : `${total.toLocaleString("hu-HU")} Ft`}
          </div>
        </div>
        
        <a 
          href="#idopont"
          className={`px-8 py-3 rounded-full font-bold uppercase tracking-wide transition-all duration-300 ${
            total > 0 
            ? "bg-white text-black hover:bg-ns-silver cursor-pointer" 
            : "bg-gray-800 text-gray-600 cursor-not-allowed"
          }`}
        >
          Időpontot kérek
        </a>
      </div>
      <p className="text-center text-xs text-gray-600 mt-4">
        *Az árak tájékoztató jellegűek, a haj mennyiségétől és a felhasznált anyagoktól függően változhatnak.
      </p>
    </div>
  );
}