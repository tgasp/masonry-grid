import { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { PexelsPhoto } from "@/types/pexels";

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
          <div
            key={photo.id + "" + index}
            ref={index === photos.length - 1 ? lastPhotoRef : undefined}
          >
            <Link to={`/photo/${photo.id}`} className="block group">
              <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-200">
                <img
                  src={photo.src.medium}
                  alt={photo.alt || `Photo by ${photo.photographer}`}
                  className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-900 truncate">
                  Photo by {photo.photographer}
                </p>
              </div>
            </Link>
          </div>
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