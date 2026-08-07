"use client";

import { useRouter } from "next/navigation";

export default function UrunSilButon({ id }) {
  const router = useRouter();

  async function urunSil() {
    const emin = confirm("Bu ürünü silmek istediğine emin misin?");
    if (!emin) return;

    const res = await fetch(`/api/admin/urunler/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Silinirken bir hata oluştu");
    }
  }

  return (
    <button
      onClick={urunSil}
      className="text-red-700 border border-red-700 rounded px-3 py-1 text-sm"
    >
      Sil
    </button>
  );
}