// src/components/venue/VenueDetailSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

const VenueDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... Skeleton loading ... */}
      <Skeleton className="h-12 w-3/4 mb-6" />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Skeleton className="w-full h-96 rounded-lg" />
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-24 h-24 rounded-md" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-10 w-full mt-4" />
        </div>
      </div>
    </div>
  );
};

export default VenueDetailSkeleton;
