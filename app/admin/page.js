"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGiris() {
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");
  const router = useRouter();

  async function girisYap(e) {
    e.preventDefault();
    setHata("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: sifre }),
    });

    const veri = await res.json();

    if (veri.basarili) {
      router.push("/admin/panel");
    } else {
      setHata("Şifre yanlış");
    }
  }

  return (
    <div className="max-w-sm mx-auto py-24 px-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Girişi</h1>
      <form onSubmit={girisYap} className="space-y-4">
        <input
          type="password"
          value={sifre}
          onChange={(e) => setSifre(e.target.value)}
          placeholder="Şifre"
          className="w-full border rounded px-4 py-2"
        />
        {hata && <p className="text-red-600 text-sm">{hata}</p>}
        <button type="submit" className="w-full bg-red-800 text-white font-bold py-2 rounded">
          Giriş Yap
        </button>
      </form>
    </div>
  );
}