import { useRef, useCallback } from "react";
import { PexelsPhoto } from "@/types/pexels";
import PhotoCard from "./PhotoCard";

interface MasonryGridProps {
  photos: PexelsPhoto[];
  loading: boolean;
  hasMore: boolean;
  onIntersect: () => void;
}

export default function MasonryGrid({ photos, loading, hasMore, onIntersect }: MasonryGridProps) {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPhotoRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onIntersect();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onIntersect]
  );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {photos.map((photo, index) => (
          <PhotoCard
            key={photo.id + "" + index}
            photo={photo}
            innerRef={index === photos.length - 1 ? lastPhotoRef : undefined}
          />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {!hasMore && photos.length > 0 && (
        <p className="text-center py-8 text-gray-900">No more photos to load</p>
      )}
    </>
  );
}