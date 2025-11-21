import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-53px)] p-4">
      <h1 className="flex items-center gap-2 text-4xl font-bold mb-4">
        Bem-vindo ao portal SpaceX <Rocket />
      </h1>
      <p className="mb-6">
        Explore informações detalhadas sobre todos os lançamentos da SpaceX, incluindo missões passadas, foguetes utilizados e links adicionais.
      </p>
      
      <Link href="/launches">
        <Button variant="secondary" size="lg">
          <Rocket /> Ver lançamentos
        </Button>
      </Link>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="p-4 border rounded shadow-sm">
          <h2 className="font-semibold text-x1 mb-2">
            Missões Espaciais
          </h2>
          <p className="text-sm text-muted-foreground">
            Descubra todas as missões da SpaceX com informações detalhadas sobre cada lançamento.
          </p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h2 className="font-semibold text-x1 mb-2">
            Foguetes
          </h2>
          <p className="text-sm text-muted-foreground">
            Veja os foguetes utilizados em cada missão e suas especificações técnicas.
          </p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h2 className="font-semibold text-x1 mb-2">
            Links & Mídia
          </h2>
          <p className="text-sm text-muted-foreground">
            Acesse links úteis como Wikipedia, vídios e galerias de imagens dos lançamentos.
          </p>
        </div>
      </section>
    </main>
  )
}

