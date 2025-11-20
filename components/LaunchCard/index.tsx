import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LaunchProps } from "@/types/launch";

interface LaunchCardProps {
  launch: LaunchProps;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-PT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

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
            ${launch.launch_success === true ? 'bg-green-500 hover:bg-green-600' : 
            launch.launch_success === false ? 'bg-red-500 hover:bg-red-600' : 
            'bg-gray-500 hover:bg-gray-600'}
            text-white
          `}
        >
          Status: {statusText}
        </Badge>
        <Button asChild>
          <a href={detailPath} data-testid="launch-link">
            Ver Detalhes
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
