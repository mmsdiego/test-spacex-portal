import { Rocket } from 'lucide-react';

export function Footer() {
  return (
    <footer className="flex items-center justify-center gap-2 w-full border-t p-4 text-sm">
      Desenvolvido para teste técnico — SpaceX API <Rocket className="text-sm" />
    </footer>
  );
}