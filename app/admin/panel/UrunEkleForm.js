"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UrunEkleForm() {
  const [isim, setIsim] = useState("");
  const [fiyat, setFiyat] = useState("");
  const [kategori, setKategori] = useState("");
  const [gorsel, setGorsel] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const router = useRouter();

  async function urunEkle(e) {
    e.preventDefault();
    setYukleniyor(true);

    const formData = new FormData();
    formData.append("isim", isim);
    formData.append("fiyat", fiyat);
    formData.append("kategori", kategori);
    if (gorsel) formData.append("gorsel", gorsel);

    const res = await fetch("/api/admin/urunler", {
      method: "POST",
      body: formData,
    });

    setYukleniyor(false);

    if (res.ok) {
      setIsim("");
      setFiyat("");
      setKategori("");
      setGorsel(null);
      router.refresh();
    } else {
      const veri = await res.json();
      alert("HATA: " + veri.hata);
    }
  }

  return (
    <form onSubmit={urunEkle} className="space-y-3 border rounded p-4">
      <h2 className="font-bold">Yeni Ürün Ekle</h2>
      <input
        type="text"
        placeholder="Ürün adı"
        value={isim}
        onChange={(e) => setIsim(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        type="number"
        placeholder="Fiyat"
        value={fiyat}
        onChange={(e) => setFiyat(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        type="text"
        placeholder="Kategori (örn: Ana Yemekler, İçecekler)"
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setGorsel(e.target.files[0])}
        className="w-full"
      />
      <button
        type="submit"
        disabled={yukleniyor}
        className="bg-red-800 text-white font-bold px-4 py-2 rounded disabled:opacity-50"
      >
        {yukleniyor ? "Ekleniyor..." : "Ürünü Ekle"}
      </button>
    </form>
  );
}