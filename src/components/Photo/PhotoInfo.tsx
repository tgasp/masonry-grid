import { Camera } from "lucide-react";
import { PexelsPhoto } from "@/types/pexels";

interface PhotoInfoProps {
  photo: PexelsPhoto;
}

export function PhotoInfo({ photo }: PhotoInfoProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        {photo.alt || `Beautiful Photo`}
      </h1>
      
      <div className="flex items-center text-gray-600">
        <a
          href={photo.photographer_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-primary transition-colors"
        >
          <Camera className="h-5 w-5 mr-2" />
          <span className="font-medium">{photo.photographer}</span>
        </a>
      </div>
    </div>
  );
}