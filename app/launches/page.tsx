import { GET_LAUNCHES } from '@/lib/graphql/getLaunches';  
import { createApolloClient } from '@/lib/apollo-client';
import LaunchList from '@/components/LaunchList';
import { LaunchListDataProps } from '@/types/launch';

const PAGE_SIZE = 12;
const INITIAL_PAGE_SIZE = 20;

export default async function Home() {
  const client = createApolloClient()
  const { data } = await client.query<LaunchListDataProps>({
    query: GET_LAUNCHES,
    variables: { limit: INITIAL_PAGE_SIZE, offset: 0 },
  });

  const initialLaunches = data?.launchesPast ?? [];

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Catálogo de Lançamentos</h1>
      <LaunchList initialLaunches={initialLaunches} pageSize={PAGE_SIZE} />
    </main>
  );
}