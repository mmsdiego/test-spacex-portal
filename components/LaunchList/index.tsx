'use client';

import { GET_LAUNCHES } from '@/lib/graphql/getLaunches';
import { LaunchCard } from '@/components/LaunchCard';
import { LaunchProps, LaunchListDataProps } from '@/types/launch';
import { useInfiniteApolloQuery } from '@/hooks/useInfinityApolloQuery';
import { SkeletonLoader } from '../SkeletonLoader';

export default function LaunchList({ initialLaunches, pageSize }: { initialLaunches: LaunchProps[], pageSize: number }) {
  const {
    items: launches,
    isFetchingMore,
    error,
    sentinelRef,
    hasMore
  } = useInfiniteApolloQuery<LaunchListDataProps, LaunchProps>({
    query: GET_LAUNCHES,
    pageSize,
    initialItems: initialLaunches,
    dataKey: "launchesPast"
  });

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">
            Erro:
          </strong>
          <span className="block sm:inline ml-1">
            Não foi possível carregar os lançamentos.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
        {launches.map((l, idx) => <LaunchCard key={l.id + idx} launch={l} />)}
      </div>

      {isFetchingMore && (
        <SkeletonLoader />
      )}

      <div ref={sentinelRef} className="h-8" />

      {!hasMore && !isFetchingMore && (
        <p className="text-center mt-4 text-gray-400">
          Fim da lista dos lançamentos.
        </p>
      )}
    </div>
  );
}
