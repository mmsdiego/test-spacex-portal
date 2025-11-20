import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
      <Skeleton className="h-30" />
      <Skeleton className="h-30 hidden sm:inline" />
      <Skeleton className="h-30 hidden sm:inline" />
      <Skeleton className="h-30 hidden sm:inline" />
    </div>
  );
}