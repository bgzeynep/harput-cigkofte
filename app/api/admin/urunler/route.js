import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(request) {
  const cookieStore = await cookies();
  const girisYapildi = cookieStore.get("admin_giris");

  if (!girisYapildi) {
    return NextResponse.json({ hata: "Yetkisiz erişim" }, { status: 401 });
  }

  const formData = await request.formData();
  const isim = formData.get("isim");
  const fiyat = formData.get("fiyat");
  const gorsel = formData.get("gorsel");

  let gorselUrl = null;

  if (gorsel && gorsel.size > 0) {
    const dosyaAdi = `${Date.now()}-${gorsel.name}`;
    const { error: yuklemeHatasi } = await supabaseAdmin.storage
      .from("urun-gorselleri")
      .upload(dosyaAdi, gorsel);

    if (yuklemeHatasi) {
      return NextResponse.json({ hata: yuklemeHatasi.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from("urun-gorselleri")
      .getPublicUrl(dosyaAdi);

    gorselUrl = publicUrlData.publicUrl;
  }

  const { error } = await supabaseAdmin.from("urunler").insert({
    isim,
    fiyat,
    gorsel_url: gorselUrl,
  });

  if (error) {
    return NextResponse.json({ hata: error.message }, { status: 500 });
  }

  return NextResponse.json({ basarili: true });
}