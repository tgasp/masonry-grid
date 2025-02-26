import { useState, memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useInView } from "@/hooks/useInView";
import { PexelsPhoto } from "@/types/pexels";

interface PhotoCardProps {
  photo: PexelsPhoto;
}

const CardWrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const ImageContainer = styled.div<{ $aspectRatio: number; $bgColor: string }>`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  padding-bottom: ${(props) => (1 / props.$aspectRatio) * 100}%;
  background-color: ${(props) => props.$bgColor};
`;

const Image = styled.img<{ $imageLoaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.$imageLoaded ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const PhotoInfo = styled.div<{ $isLoaded: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 20px 16px 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
  visibility: ${(props) => (props.$isLoaded ? "visible" : "hidden")};

  ${CardWrapper}:hover & {
    opacity: 1;
  }
`;

const Photographer = styled.p`
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

// Using React.memo to prevent unnecessary re-renders
const PhotoCard = memo(function PhotoCard({ photo }: PhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [ref, isInView] = useInView<HTMLDivElement>({
    once: true,
    rootMargin: "200px", // Load images earlier for smoother experience
  });
  const aspectRatio = photo.width / photo.height;

  return (
    <CardWrapper ref={ref}>
      <Link to={`/photo/${photo.id}`}>
        <ImageContainer $aspectRatio={aspectRatio} $bgColor={photo.avg_color}>
          {isInView && (
            <Image
              src={photo.src.medium}
              srcSet={`${photo.src.small} 400w, ${photo.src.medium} 800w, ${photo.src.large} 1200w`}
              sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
              alt={photo.alt || `Photo by ${photo.photographer}`}
              onLoad={() => setImageLoaded(true)}
              $imageLoaded={imageLoaded}
              loading="lazy"
              width={photo.width}
              height={photo.height}
            />
          )}

          <PhotoInfo $isLoaded={imageLoaded}>
            <Photographer>Photo by {photo.photographer}</Photographer>
          </PhotoInfo>
        </ImageContainer>
      </Link>
    </CardWrapper>
  );
});

export default PhotoCard;
