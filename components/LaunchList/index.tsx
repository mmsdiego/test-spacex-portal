'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useQuery } from "@apollo/client/react";
import { GET_LAUNCHES } from '@/lib/graphql/getLaunches';
import { LaunchCard } from '@/components/LaunchCard';
import { LaunchProps, LaunchListDataProps } from '@/types/launch';
import { SkeletonLoader } from '../SkeletonLoader';

export default function LaunchList({ initialLaunches, pageSize }: { initialLaunches: LaunchProps[], pageSize: number }) {
  const [launches, setLaunches] = useState(initialLaunches);
  const [offset, setOffset] = useState(initialLaunches.length);
  const [hasMore, setHasMore] = useState(true);

  // 👉 Aqui estava o problema: faltava fetchMore
  const { data, loading, error, fetchMore } = useQuery<LaunchListDataProps>(GET_LAUNCHES, {
    variables: { limit: pageSize, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data) {
      console.log("Query completed:", data);
    }
  }, [data]);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // 👇 Agora fetchMore existe
          const { data } = await fetchMore({
            variables: { limit: pageSize, offset }
          });

          const newItems = data?.launchesPast ?? [];

          if (newItems.length === 0) {
            setHasMore(false);
            return;
          }

          setLaunches(prev => [...prev, ...newItems]);
          setOffset(prev => prev + newItems.length);
        }
      }, { rootMargin: '200px' });

      if (node) observerRef.current.observe(node);
    },
    [fetchMore, loading, offset, pageSize, hasMore]
  );

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erro:</strong>
          <span className="block sm:inline ml-1">Não foi possível carregar os lançamentos.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
        {launches.map(l => <LaunchCard key={l.id} launch={l} />)}
      </div>

      {loading && (
        <SkeletonLoader />
      )}

      <div ref={sentinelRef} className="h-8" />

      {!hasMore && !loading && (
        <p className="text-center mt-4 text-gray-400">Fim da lista</p>
      )}
    </div>
  );
}
