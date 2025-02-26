import { PexelsPhoto } from "@/types/pexels";
import { PhotoActions } from "./PhotoActions";

interface PhotoImageProps {
  photo: PexelsPhoto;
}

export function PhotoImage({ photo }: PhotoImageProps) {
  return (
    <div className="relative overflow-hidden bg-gray-100" style={{ background: photo.avg_color }}>
      <PhotoActions photo={photo} />
      <img
        src={photo.src.large2x}
        alt={photo.alt || `Photo by ${photo.photographer}`}
        className="w-full object-contain mx-auto max-h-[80vh] min-h-[300px]"
        loading="eager"
      />
    </div>
  );
}