"use client";

import { useState, useEffect } from "react";

const gorseller = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];

export default function BannerSlider() {
  const [aktif, setAktif] = useState(0);

  useEffect(() => {
    const zamanlayici = setInterval(() => {
      setAktif((onceki) => (onceki + 1) % gorseller.length);
    }, 4000);
    return () => clearInterval(zamanlayici);
  }, []);

  return (
    <div className="relative w-full h-[420px] overflow-hidden">
      {gorseller.map((gorsel, index) => (
        <img
          key={gorsel}
          src={gorsel}
          alt="Harput Çiğ Köfte"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === aktif ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Harput Çiğ Köfte</h1>
        <p className="text-lg text-white mb-6">Bandırma'nın gerçek Harput lezzeti, Veysel Usta elinden</p>
        <a
          href="https://wa.me/905326549380"
          className="bg-white text-red-800 font-bold px-6 py-3 rounded-full inline-block hover:bg-gray-100 transition"
        >
          WhatsApp'tan Sipariş Ver
        </a>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {gorseller.map((_, index) => (
          <button
            key={index}
            onClick={() => setAktif(index)}
            className={`w-2.5 h-2.5 rounded-full ${index === aktif ? "bg-white" : "bg-white/50"}`}
            aria-label={`Slayt ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}