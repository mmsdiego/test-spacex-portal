import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LaunchProps } from '@/types/launch';
import Link from 'next/link';
import { formatDate } from '@/lib/format-date';

interface LaunchCardProps {
  launch: LaunchProps;
}

export function LaunchCard({launch}: LaunchCardProps) {
  const statusVariant = launch.launch_success ? "success" : "destructive";
  const statusText = launch.launch_success ? "Sucesso" : "Falha";
  
  const detailPath = `/launches/${launch.id}`;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 p-4 ">
      <CardHeader>
        <CardTitle className="text-xl line-clamp-2">{launch.mission_name}</CardTitle>
        <CardDescription>
          Foguete: {launch.rocket.rocket_name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Data: {formatDate(launch.launch_date_utc)}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge 
          variant={statusVariant as "default"}
          className={`
            ${launch.launch_success ? 'bg-green-500' : 'bg-red-500'}
            text-white
          `}
        >
          Status: {statusText}
        </Badge>
        <Button asChild>
          <Link href={detailPath} data-testid="launch-link">
            Ver Detalhes
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
