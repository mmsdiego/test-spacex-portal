import Link from "next/link";

export function Header() {
  return (
    <header className="w-full border-b p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        🚀 SpaceX Portal
      </Link>

      <nav className="flex gap-4">
        <Link href="/" className="hover:text-blue-500">Home</Link>
        <Link href="/launches" className="hover:text-blue-500">Lançamentos</Link>
      </nav>
    </header>
  );
}