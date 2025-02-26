import { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { usePhotos } from "@/hooks/usePhotos";

export default function Home() {
  const observer = useRef<IntersectionObserver | null>(null);

  const { photos, loadMore, hasMore, loading, error } = usePhotos();

  console.log(photos);
  const lastPhotoRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Photo Gallery</h1>

      {/* <PhotoFilter
        onFilterChange={handleFilterChange}
        onError={setError}
        onLoadingChange={setLoading}
      /> */}

      {error && !photos.length && (
        <div className="text-center py-12">
          <p className="text-red-600">{error.message}</p>
          <button
            onClick={() => {
              loadMore();
            }}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

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
    </div>
  );
}
