import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "CineTrack",
  description: "Discover and track your favorite movies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-800 bg-slate-950 text-white">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-2xl font-bold">
              CineTrack
            </Link>

            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm text-slate-300 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/favorites"
                className="text-sm text-slate-300 transition hover:text-white"
              >
                Favorites
              </Link>
            </div>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}