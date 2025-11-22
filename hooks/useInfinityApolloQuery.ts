'use client';

import { useCallback, useRef, useState } from 'react';
import { DocumentNode } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

interface UseInfiniteApolloQueryProps<TResponse, TItem> {
  query: DocumentNode;
  pageSize: number;
  initialItems: TItem[];
  dataKey: keyof TResponse;
}

export function useInfiniteApolloQuery<TResponse, TItem>({
  query,
  pageSize,
  initialItems,
  dataKey
}: UseInfiniteApolloQueryProps<TResponse, TItem>) {

  const [items, setItems] = useState<TItem[]>(initialItems);
  const [offset, setOffset] = useState(initialItems.length);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { loading, error, fetchMore } = useQuery<TResponse>(query, {
    variables: { limit: pageSize, offset: 0 },
    notifyOnNetworkStatusChange: true,
    skip: initialItems.length > 0,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);

  const sentinelRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting && hasMore) {

        setIsFetchingMore(true);
        
        const response = await fetchMore({
          variables: { limit: pageSize, offset }
        });

        setIsFetchingMore(false);

        const newItems = (response?.data?.[dataKey] as unknown as TItem[]) ?? [];

        if (newItems.length === 0) {
          setHasMore(false);
          return;
        }

        setItems(prev => [...prev, ...newItems]);
        setOffset(prev => prev + newItems.length);
      }
    });

    if (node) observerRef.current.observe(node);

  }, [loading, fetchMore, hasMore, offset, pageSize, dataKey]);

  return {
    items,
    loading,
    isFetchingMore,
    error,
    sentinelRef,
    hasMore
  };
}
