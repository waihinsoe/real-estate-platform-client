import { Skeleton } from "@/components/ui/skeleton";

export function PropertyDetailSkeleton() {
  return (
    <div role="status" aria-label="Fetching property details" className="space-y-8">
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="aspect-video rounded-2xl" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-48 w-full" />
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border p-4">
          <Skeleton className="h-7 w-2/3" />
          <Skeleton className="h-10 w-full" />
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-11 w-full" />
            </div>
          ))}
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-11 w-full" />
        </div>
        <div className="space-y-4 rounded-2xl border p-6">
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
      <Skeleton className="h-80 w-full rounded-2xl" />
    </div>
  );
}
