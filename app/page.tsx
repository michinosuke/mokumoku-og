import Link from "next/link";

export default function Home() {
  const links = [
    { href: "/gc-next-24", name: "GC Next 24" },
    { href: "/gc-next-25", name: "GC Next 25" },
    { href: "/iret-media", name: "iret media" },
    { href: "/iret-media-competition", name: "iret media 対抗戦" },
    { href: "/re-invent-2024", name: "re:Invent 2024" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">
          OGイメージジェネレーター
        </h1>
        <div className="space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="w-full bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-between px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 group"
            >
              <span className="font-medium text-lg">{link.name}</span>
              <span className="text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-300">
                →
              </span>
            </Link>
          ))}
        </div>
        <footer className="mt-12 text-center text-sm text-slate-500">
          © OGイメージジェネレーター
        </footer>
      </div>
    </main>
  );
}
