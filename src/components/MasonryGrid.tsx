import { useEffect } from "react";
import styled from "styled-components";
import { PexelsPhoto } from "@/types/pexels";
import PhotoCard from "./PhotoCard";
import { useInView } from "@/hooks/useInView";

interface MasonryGridProps {
  photos: PexelsPhoto[];
  loading: boolean;
  hasMore: boolean;
  onIntersect: () => void;
}

const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
`;

const MasonryContainer = styled.div`
  columns: 300px;
  column-gap: 20px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px 0;

  &::after {
    content: "";
    width: 32px;
    height: 32px;
    border: 2px solid #fff;
    border-top: 2px solid #c208c1;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const EndMessage = styled.p`
  text-align: center;
  padding: 32px 0;
  color: #111827;
`;

export default function MasonryGrid({
  photos,
  loading,
  hasMore,
  onIntersect,
}: MasonryGridProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({
    once: false,
    rootMargin: "600px",
  });

  useEffect(() => {
    if (isInView && !loading) {
      onIntersect();
    }
  }, [isInView, loading, onIntersect]);

  return (
    <Container>
      <MasonryContainer>
        {photos.map((photo, index) => (
          <PhotoCard key={photo.id + "" + index} photo={photo} />
        ))}
      </MasonryContainer>

      {hasMore && <LoadingSpinner ref={ref} />}

      {!hasMore && (
        <EndMessage>
          {photos.length > 0 ? "No more photos to load" : "No photos"}
        </EndMessage>
      )}
    </Container>
  );
}
