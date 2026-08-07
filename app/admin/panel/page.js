import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UrunEkleForm from "./UrunEkleForm";
import UrunSatiri from "./UrunSatiri";

export default async function AdminPanel() {
  const cookieStore = await cookies();
  const girisYapildi = cookieStore.get("admin_giris");

  if (!girisYapildi) {
    redirect("/admin");
  }

  const { data: urunler } = await supabaseAdmin
    .from("urunler")
    .select("*")
    .order("sira", { ascending: true });

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      <UrunEkleForm />

      <h2 className="text-xl font-bold mt-12 mb-4">Ürünler</h2>
      <div className="space-y-3">
        {urunler?.map((urun) => (
          <UrunSatiri key={urun.id} urun={urun} />
        ))}
      </div>
    </div>
  );
}