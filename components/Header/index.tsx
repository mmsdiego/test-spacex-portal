import Link from 'next/link';
import { Rocket } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full border-b p-4 flex justify-between items-center sticky top-0 bg-white z-[9999]">
      <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
        <Rocket className='text-2xl' /> SpaceX Portal
      </Link>

      <nav className="flex gap-4">
        <Link href="/" className="hover:text-blue-500">Home</Link>
        <Link href="/launches" className="hover:text-blue-500">Lançamentos</Link>
      </nav>
    </header>
  );
}