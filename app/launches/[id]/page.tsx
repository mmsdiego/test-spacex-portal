import { apolloSSR } from '@/lib/apollo-server';
import { GET_LAUNCH_DETAILS } from '@/lib/graphql/getLaunchDetails';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { LaunchDetailsProps, LaunchIdOnly } from '@/types/launch'
import LaunchCarousel from '@/components/LaunchCarousel';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/format-date';
import { gql } from '@apollo/client';

interface LaunchDetailProps {
  params: Promise<{ id: string }>;
}

interface LaunchGetProps {
  launch: LaunchDetailsProps
}

export default async function LaunchDetailPage({ params }: LaunchDetailProps) {
  const { id } = await params;

  const { data } = await apolloSSR.query<LaunchGetProps>({
    query: GET_LAUNCH_DETAILS,
    variables: { id: id },
  });

  const launch = data?.launch;

  if (!launch) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-red-500">Lançamento Não Encontrado</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">O ID da missão ({id}) é inválido ou não existe.</p>
        <Link href="/launches" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 underline">
          Voltar ao Catálogo
        </Link>
      </div>
    );
  }

  const statusVariant = launch.launch_success ? "success" : "destructive";
  const statusText = launch.launch_success ? "Sucesso" : "Falha";
  const formattedDate = formatDate(launch.launch_date_utc);

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
          {launch.mission_name}
        </h1>
        <Badge
          variant={statusVariant as "default"}
          className={`
            ${launch.launch_success ? 'bg-green-600' : 'bg-red-600'}
            text-white text-lg px-4 py-1 mt-2 sm:mt-0
          `}
        >
          Status: {statusText}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Missão</CardTitle>
          <CardDescription>
            Informações completas sobre o lançamento ocorrido em {formattedDate}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          <div className="space-y-2">
            <h3 className="text-lg font-semibold border-b pb-1">
              Descrição
            </h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {launch.details || "Sem descrição detalhada disponível."}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold border-b pb-1">
              Foguete Utilizado
            </h3>
            <p className="font-medium text-indigo-600 dark:text-indigo-400">
              Nome: {launch.rocket.rocket_name} {launch.rocket.rocket_type && `(${launch.rocket.rocket_type})`}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {launch?.rocket?.rocket?.description || "Sem descrição do foguete disponível."}
            </p>
          </div>

          {/* Links Adicionais */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold border-b pb-1">
              Links Adicionais
            </h3>
            <div className="flex flex-wrap gap-3">
              {launch.links.wikipedia && (
                <Link href={launch.links.wikipedia} target="_blank" rel="noopener noreferrer">
                  <Badge variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-50">
                    Wikipedia
                  </Badge>
                </Link>
              )}
              {launch.links.article_link && (
                <Link href={launch.links.article_link} target="_blank" rel="noopener noreferrer">
                  <Badge variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-50">
                    Artigo
                  </Badge>
                </Link>
              )}
              {launch.links.video_link && (
                <Link href={launch.links.video_link} target="_blank" rel="noopener noreferrer">
                  <Badge variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                    YouTube Vídeo
                  </Badge>
                </Link>
              )}
              {(!launch.links.wikipedia && !launch.links.article_link && !launch.links.video_link) && (
                <p className="text-gray-500 dark:text-gray-500">
                  Nenhum link adicional disponível.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold border-b pb-1">Imagens (Flickr)</h3>
            {launch.links.flickr_images.length > 0 ? (
              <LaunchCarousel images={launch.links.flickr_images} missionName={launch.mission_name} />
            ) : (
              <p className="text-gray-500 dark:text-gray-500">Nenhuma imagem de alta qualidade do Flickr disponível.</p>
            )}
          </div>

        </CardContent>
      </Card>

      <div className="text-center pt-4">
        <Button asChild>
          <Link href="/launches" className="mt-4 inline-block font-medium">
            <ArrowLeft /> Voltar ao Catálogo de Lançamentos
          </Link>
        </Button>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const { data } = await apolloSSR.query<LaunchIdOnly>({
    query: gql`
      query {
        launchesPast(limit: 20) {
          id
        }
      }
    `
  });

  return data?.launchesPast.map((launch: { id: string}) => ({
    id: launch.id,
  }));
}