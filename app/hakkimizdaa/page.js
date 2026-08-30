export const metadata = {
  title: "Hakkımızda | Harput Çiğ Köfte",
  description: "Harput Çiğ Köfte'nin hikayesi, vizyonu ve misyonu",
};

export default function HakkimizdaSayfasi() {
  return (
    <div>
      <section className="bg-red-800 text-white text-center py-16 px-6">
        <h1 className="text-4xl font-bold">Hakkımızda</h1>
      </section>

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
    </div>
  );
}