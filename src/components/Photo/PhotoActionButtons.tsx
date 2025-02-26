import { Camera, ExternalLink, Maximize } from "lucide-react";
import { PexelsPhoto } from "@/types/pexels";
import { Button } from "@/components/ui/Button";

interface PhotoActionButtonsProps {
  photo: PexelsPhoto;
}

export function PhotoActionButtons({ photo }: PhotoActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <Button
        href={photo.src.original}
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
      >
        <Maximize className="h-4 w-4 mr-2" />
        View Full Resolution
      </Button>
      
      <Button
        href={photo.url}
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
      >
        <ExternalLink className="h-4 w-4 mr-2" />
        View on Pexels
      </Button>
      
      <Button
        href={photo.photographer_url}
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
      >
        <Camera className="h-4 w-4 mr-2" />
        More by {photo.photographer}
      </Button>
    </div>
  );
}