import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

export async function DELETE(request, { params }) {
  const cookieStore = await cookies();
  const girisYapildi = cookieStore.get("admin_giris");

  if (!girisYapildi) {
    return NextResponse.json({ hata: "Yetkisiz erişim" }, { status: 401 });
  }

  const { id } = await params;

  const { error } = await supabaseAdmin.from("urunler").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ hata: error.message }, { status: 500 });
  }

  return NextResponse.json({ basarili: true });
}

export async function PUT(request, { params }) {
  const cookieStore = await cookies();
  const girisYapildi = cookieStore.get("admin_giris");

  if (!girisYapildi) {
    return NextResponse.json({ hata: "Yetkisiz erişim" }, { status: 401 });
  }

  const { id } = await params;
  const formData = await request.formData();
  const isim = formData.get("isim");
  const fiyat = formData.get("fiyat");
  const kategori = formData.get("kategori");
  const sira = formData.get("sira");
  const gorsel = formData.get("gorsel");

  const guncellenecekVeri = { isim, fiyat };

  if (kategori !== null) {
    guncellenecekVeri.kategori = kategori;
  }

  if (sira !== null && sira !== "") {
    guncellenecekVeri.sira = sira;
  }

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

    guncellenecekVeri.gorsel_url = publicUrlData.publicUrl;
  }

  const { error } = await supabaseAdmin
    .from("urunler")
    .update(guncellenecekVeri)
    .eq("id", id);

  if (error) {
    return NextResponse.json({ hata: error.message }, { status: 500 });
  }

  return NextResponse.json({ basarili: true });
}