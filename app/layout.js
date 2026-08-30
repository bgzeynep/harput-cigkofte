import "./globals.css";

export const metadata = {
  title: "Harput Çiğ Köfte",
  description: "Bandırma'nın çiğ köfte adresi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <meta name="google-site-verification" content="-631s_ivgZfk9TanC9Bf_TtkCC0T-IoyZ4RKM6fVh-w" />
      </head>
      <body>
        <nav className="bg-red-700 text-white px-6 py-4 flex gap-6 items-center">
          <span className="font-bold text-lg">Harput Çiğ Köfte</span>
          <a href="/" className="hover:underline">Ana Sayfa</a>
          <a href="/hakkimizda" className="hover:underline">Hakkımızda</a>
          <a href="/menu" className="hover:underline">Menü</a>
          <a href="/iletisim" className="hover:underline">İletişim</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}