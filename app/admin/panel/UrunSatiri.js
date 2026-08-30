"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UrunSatiri({ urun }) {
  const [duzenlemeModu, setDuzenlemeModu] = useState(false);
  const [isim, setIsim] = useState(urun.isim);
  const [fiyat, setFiyat] = useState(urun.fiyat);
  const [kategori, setKategori] = useState(urun.kategori || "");
  const [sira, setSira] = useState(urun.sira ?? "");
  const [gorsel, setGorsel] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const router = useRouter();

  async function kaydet() {
    setYukleniyor(true);
    const formData = new FormData();
    formData.append("isim", isim);
    formData.append("fiyat", fiyat);
    formData.append("kategori", kategori);
    formData.append("sira", sira);
    if (gorsel) formData.append("gorsel", gorsel);

    const res = await fetch(`/api/admin/urunler/${urun.id}`, {
      method: "PUT",
      body: formData,
    });

    setYukleniyor(false);

    if (res.ok) {
      setDuzenlemeModu(false);
      router.refresh();
    } else {
      alert("Güncellenirken bir hata oluştu");
    }
  }

  async function sil() {
    const emin = confirm("Bu ürünü silmek istediğine emin misin?");
    if (!emin) return;

    const res = await fetch(`/api/admin/urunler/${urun.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Silinirken bir hata oluştu");
    }
  }

  if (duzenlemeModu) {
    return (
      <div className="border rounded p-3 space-y-2">
        <input
          type="text"
          value={isim}
          onChange={(e) => setIsim(e.target.value)}
          placeholder="Ürün adı"
          className="w-full border rounded px-3 py-1"
        />
        <input
          type="number"
          value={fiyat}
          onChange={(e) => setFiyat(e.target.value)}
          placeholder="Fiyat"
          className="w-full border rounded px-3 py-1"
        />
        <input
          type="text"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          placeholder="Kategori (örn: Ana Yemekler)"
          className="w-full border rounded px-3 py-1"
        />
        <input
          type="number"
          value={sira}
          onChange={(e) => setSira(e.target.value)}
          placeholder="Sıra (küçük sayı = üstte görünür)"
          className="w-full border rounded px-3 py-1"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setGorsel(e.target.files[0])}
          className="w-full"
        />
        <div className="flex gap-2">
          <button
            onClick={kaydet}
            disabled={yukleniyor}
            className="bg-red-800 text-white font-bold px-3 py-1 rounded text-sm disabled:opacity-50"
          >
            {yukleniyor ? "Kaydediliyor..." : "Kaydet"}
          </button>
          <button
            onClick={() => setDuzenlemeModu(false)}
            className="border px-3 py-1 rounded text-sm"
          >
            Vazgeç
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between border rounded p-3">
      <div className="flex items-center gap-3">
        {urun.gorsel_url && (
          <img src={urun.gorsel_url} alt={urun.isim} className="w-12 h-12 object-cover rounded" />
        )}
        <div>
          <p className="font-semibold">{urun.isim}</p>
          <p className="text-sm text-gray-600">{urun.fiyat} ₺</p>
          <p className="text-xs text-gray-400">
            {urun.kategori || "Kategori yok"} · Sıra: {urun.sira ?? "-"}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setDuzenlemeModu(true)}
          className="text-gray-700 border rounded px-3 py-1 text-sm"
        >
          Düzenle
        </button>
        <button
          onClick={sil}
          className="text-red-700 border border-red-700 rounded px-3 py-1 text-sm"
        >
          Sil
        </button>
      </div>
    </div>
  );
}