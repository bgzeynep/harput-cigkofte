import { supabase } from "../../lib/supabase";

export default async function MenuSayfasi() {
  const { data: urunler } = await supabase
    .from("urunler")
    .select("*")
    .order("sira", { ascending: true });

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">Menü</h1>

      {(!urunler || urunler.length === 0) && (
        <p className="text-center text-gray-500">
          Menü yakında burada olacak.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {urunler?.map((urun) => (
          <div key={urun.id} className="border rounded-lg overflow-hidden shadow-sm">
            {urun.gorsel_url && (
              <img src={urun.gorsel_url} alt={urun.isim} className="w-full h-48 object-cover" />
            )}
            <div className="p-4 flex justify-between items-center">
              <span className="font-semibold">{urun.isim}</span>
              <span className="text-red-800 font-bold">{urun.fiyat} ₺</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
