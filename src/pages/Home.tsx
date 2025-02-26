import { useSearchParams } from "react-router-dom";

import { usePhotos } from "@/hooks/usePhotos";
import SearchBar from "@/components/SearchBar";
import MasonryGrid from "@/components/MasonryGrid";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("q") || "";

  const { photos, loadMore, hasMore, loading, error, setSearch } = usePhotos(
    1,
    30,
    initialSearch
  );

  const handleOnSearch = (q: string) => {
    setSearchParams((params) => {
      if (q) {
        params.set("q", q);
      } else {
        params.delete("q");
      }

      return params;
    });

    setSearch(q);
  };

  return (
    <div>
      <SearchBar onSearch={handleOnSearch} initialValue={initialSearch} />

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

      <MasonryGrid
        photos={photos}
        loading={loading}
        hasMore={hasMore}
        onIntersect={loadMore}
      />
    </div>
  );
}
