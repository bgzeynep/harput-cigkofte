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

      <section className="max-w-5xl mx-auto py-4 pb-16 px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="border border-red-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-red-800 mb-3">Vizyonumuz</h3>
            <p className="text-gray-700 leading-relaxed">
              Bandırma'nın en sevilen Harput çiğ köfte markası olmak ve
              geleneksel lezzeti özünden ödün vermeden gelecek nesillere
              taşımak.
            </p>
          </div>
          <div className="border border-red-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-red-800 mb-3">Misyonumuz</h3>
            <p className="text-gray-700 leading-relaxed">
              Her gün taze ve doğal malzemelerle, Harput'un asıl tarifine
              sadık kalarak, müşterilerimize güvenilir ve kaliteli bir lezzet
              deneyimi sunmak.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-yellow-400 via-red-600 to-red-800 py-10 px-6 text-center">
        <p className="text-white text-sm font-bold uppercase tracking-wide mb-2">🎉 Kaçırma!</p>
        <h2 className="text-3xl font-extrabold text-white mb-2">Sadakat Kampanyası</h2>
        <p className="text-white text-lg">Her ayın 10'u, 15'i ve 23'ünde %50 hediye!</p>
      </section>

      <section className="bg-red-800 py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Sipariş Vermek İster misin?</h2>
        <p className="text-white mb-6">Hemen WhatsApp'tan yaz, siparişini alalım.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://wa.me/905326549380"
            className="bg-white text-red-800 font-bold px-8 py-3 rounded-full inline-block hover:bg-gray-100 transition"
          >
            WhatsApp'tan İletişime Geç
          </a>
          <a
            href="https://instagram.com/harputcigkofte10"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-red-800 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Instagram'da Takip Et
          </a>
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-16 px-6">
        <h2 className="text-2xl font-bold text-center mb-6">Bizi Ziyaret Edin</h2>
        <div className="rounded-lg overflow-hidden shadow-sm">
          <iframe
            src="https://www.google.com/maps?q=40.3422926,27.9563401&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Harput Çiğ Köfte Konum"
          ></iframe>
        </div>
        <div className="text-center mt-4">
          <a
            href="https://share.google/Q6MeYNOiQWfOiD1oR"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-800 font-bold underline"
          >
            Google Haritalar'da Aç / Yol Tarifi Al
          </a>
        </div>
      </section>

      <section className="py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Çalışma Saatleri</h2>
        <p className="text-gray-700">Her gün 11:00 - 01:00</p>
        <p className="text-gray-700 mt-2">📍 Paşakonak, Mehmetçik Cd. no:165, Bandırma</p>
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