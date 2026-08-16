import { supabase } from "../lib/supabase";
import BannerSlider from "./components/BannerSlider";

export const revalidate = 0;

export default async function AnaSayfa() {
  const { data: urunler } = await supabase
    .from("urunler")
    .select("*")
    .order("sira", { ascending: true });

  const kategoriler = {};
  urunler?.forEach((urun) => {
    const kat = urun.kategori || "Genel";
    if (!kategoriler[kat]) kategoriler[kat] = [];
    kategoriler[kat].push(urun);
  });

  return (
    <div>
      <BannerSlider />

      {urunler && urunler.length > 0 && (
        <section className="max-w-5xl mx-auto py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Menümüzden</h2>
          {Object.entries(kategoriler).map(([kategoriAdi, urunlerListesi]) => (
            <div key={kategoriAdi} className="mb-12">
              <h3 className="text-xl font-bold text-red-800 mb-6 border-b border-red-800 pb-2">
                {kategoriAdi}
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {urunlerListesi.map((urun) => (
                  <div key={urun.id} className="border rounded-lg overflow-hidden shadow-sm bg-white">
                    {urun.gorsel_url && (
                      <img
                        src={urun.gorsel_url}
                        alt={urun.isim}
                        className="w-full h-48 object-contain bg-white"
                      />
                    )}
                    <div className="p-4 flex justify-between items-center">
                      <span className="font-semibold">{urun.isim}</span>
                      <span className="text-red-800 font-bold">{urun.fiyat} ₺</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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

      <section className="bg-red-800 py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Sipariş Vermek İster misin?</h2>
        <p className="text-white mb-6">Hemen WhatsApp'tan yaz, siparişini alalım.</p>
        <a
          href="https://wa.me/905326549380"
          className="bg-white text-red-800 font-bold px-8 py-3 rounded-full inline-block hover:bg-gray-100 transition"
        >
          WhatsApp'tan İletişime Geç
        </a>
      </section>

      <section className="py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Çalışma Saatleri</h2>
        <p className="text-gray-700">Her gün 11:00 - 01:00</p>
        <p className="text-gray-700 mt-2">📍 Bandırma</p>
        <p className="text-gray-700">📞 0532 654 93 80</p>
      </section>

      <a
        href="https://wa.me/905326549380"
        className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-green-700 transition z-50"
        aria-label="WhatsApp'tan yaz"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.412-.074-.124-.272-.198-.57-.347z" />
          <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.85.499 3.61 1.451 5.163L2 22l4.966-1.436A9.953 9.953 0 0012.001 22C17.523 22 22 17.522 22 12S17.523 2 12.001 2zm0 18.15a8.13 8.13 0 01-4.148-1.134l-.297-.176-3.038.88.858-2.96-.194-.304A8.13 8.13 0 013.85 12c0-4.502 3.65-8.15 8.151-8.15 4.502 0 8.151 3.648 8.151 8.15 0 4.502-3.649 8.15-8.151 8.15z" />
        </svg>
      </a>
    </div>
  );
}