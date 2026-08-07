import { supabase } from "../lib/supabase";

export default async function AnaSayfa() {
  const { data: urunler } = await supabase
    .from("urunler")
    .select("*")
    .order("sira", { ascending: true })
    .limit(4);

  return (
    <div>
      <section className="bg-red-800 text-white text-center py-20 px-6">
        <h1 className="text-4xl font-bold mb-4">Harput Çiğ Köfte</h1>
        <p className="text-lg mb-6">Bandırma'nın gerçek Harput lezzeti, Veysel Usta elinden</p>
        <a href="https://wa.me/905326549380" className="bg-white text-red-800 font-bold px-6 py-3 rounded-full inline-block">
          WhatsApp'tan Sipariş Ver
        </a>
      </section>

      {urunler && urunler.length > 0 && (
        <section className="max-w-4xl mx-auto py-16 px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Menümüzden</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {urunler.map((urun) => (
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
          <div className="text-center mt-8">
            <a href="/menu" className="text-red-800 font-bold underline">
              Tüm Menüyü Gör
            </a>
          </div>
        </section>
      )}

      <section className="max-w-3xl mx-auto py-16 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Hikayemiz</h2>
        <p className="text-gray-700 leading-relaxed">
          Yıllardır Bandırma'da geleneksel Harput usulü çiğ köfte yapıyoruz.
          Her gün taze malzemelerle, özenle hazırlıyoruz.
        </p>
      </section>

      <section className="bg-gray-100 py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Sadakat Kampanyası</h2>
        <p className="text-gray-700">Her ayın 10'u, 15'i ve 23'ünde %50 hediye!</p>
      </section>

      <section className="py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Çalışma Saatleri</h2>
        <p className="text-gray-700">Her gün 11:00 - 01:00</p>
        <p className="text-gray-700 mt-2">📍 Bandırma</p>
        <p className="text-gray-700">📞 0532 654 93 80</p>
      </section>
    </div>
  );
}