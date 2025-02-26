import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import { usePhotos } from "@/hooks/usePhotos";
import SearchBar from "@/components/SearchBar";
import MasonryGrid from "@/components/MasonryGrid";
import styled from "styled-components";

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem 0;
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  margin-bottom: 1rem;
`;

const RetryButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #c208c1;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #a206a1;
  }
`;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("q") || "";

  const { 
    photos, 
    loadMore, 
    hasMore, 
    loading, 
    error, 
    setSearch 
  } = usePhotos({
    initialPage: 1,
    initialPerPage: 30,
    initialSearch,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  const handleSearch = useCallback((q: string) => {
    setSearchParams((params) => {
      if (q) {
        params.set("q", q);
      } else {
        params.delete("q");
      }
      return params;
    });

    setSearch(q);
  }, [setSearchParams, setSearch]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} initialValue={initialSearch} />

      {error && !photos.length && (
        <ErrorContainer>
          <ErrorMessage>{error.message}</ErrorMessage>
          <RetryButton onClick={() => loadMore()}>
            Try Again
          </RetryButton>
        </ErrorContainer>
      )}

      <MasonryGrid
        photos={photos}
        loading={loading}
        hasMore={hasMore}
        onIntersect={loadMore}
        baseColumnWidth={300}
        columnGap={20}
        buffer={5}
      />
    </div>
  );
}
